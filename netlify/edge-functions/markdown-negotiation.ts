/**
 * Netlify Edge Function for Markdown for Agents content negotiation
 * Implements RFC content negotiation to serve markdown when requested
 *
 * Runs on Deno at the edge
 * Docs: https://docs.netlify.com/edge-functions/overview/
 */

import type { Context } from "https://edge.netlify.com";
import TurndownService from "https://esm.sh/turndown@7.2.0";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { parseAcceptHeader, shouldServeMarkdown } from "../../utils/content-negotiation.ts";
import { SKIP_PATHS, SKIP_EXTENSIONS } from "../../utils/skip-paths.ts";

// Cache for converted markdown (persists across requests in the same edge function instance)
const markdownCache = new Map<string, string>();

// Initialize Turndown service once at module load
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_'
});

async function returnResponseVary(context) {
    const response = await context.next();
    response.headers.set("Vary", "Accept");
    return response;
}

export default async (request: Request, context: Context) => {
    const url = new URL(request.url);
    let pathname = url.pathname.replace(/\/$/, '') || "/";

  // Skip processing for static assets and special paths
  const skipPaths = SKIP_PATHS;
  const skipExtensions = SKIP_EXTENSIONS;

    // Early exit for static assets
    if (skipPaths.some(prefix => pathname.startsWith(prefix)) || skipExtensions.some(ext => pathname.endsWith(ext))) {
        return; // Skip edge function for static assets
    }

    const acceptHeader = request.headers.get("accept") || "";

    // Check if client accepts markdown
    if (!acceptHeader) {
        return; // No Accept header, continue with normal HTML response
    }

    // Parse accept header and check if markdown should be served
    if (!shouldServeMarkdown(acceptHeader)) {
        // Get the original response to add Vary header
        return await returnResponseVary(context)
    }

    console.log(`[Markdown Negotiation] Markdown requested and preferred`);

    // Map URL path to markdown file path
    if (pathname === "/" || pathname === "") {
        pathname = '/index'
    }

    const markdownPath = `/content${pathname}.md`;

    let markdownContent: string | null = null;

    // Try to fetch pre-generated markdown file first
    try {
        const markdownUrl = new URL(markdownPath, url.origin);
        const mdResponse = await fetch(markdownUrl.toString());

        if (mdResponse.ok) {
            markdownContent = await mdResponse.text();
        }
    } catch (error) {}

    // If markdown file doesn't exist, convert HTML to markdown
    if (!markdownContent) {
        // Check cache first
        if (markdownCache.has(pathname)) {
            markdownContent = markdownCache.get(pathname)!;
        } else {
            try {
                // Fetch the HTML page
                const htmlPath = pathname === '/index' ? '/' : pathname;
                const htmlUrl = new URL(htmlPath, url.origin);
                const htmlResponse = await fetch(htmlUrl.toString(), {
                    headers: {
                        'Accept': 'text/html'
                    }
                });

                if (!htmlResponse.ok) {
                    console.error(`[Markdown Negotiation] HTML page not found (status: ${htmlResponse.status})`);
                    // Return the original response with Vary header
                    return await returnResponseVary(context);
                }

                const htmlContent = await htmlResponse.text();

                // Parse HTML and extract content from #main-content
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, "text/html");

                if (!doc) {
                    console.error(`[Markdown Negotiation] Failed to parse HTML document`);
                    // Return the original response with Vary header
                    return await returnResponseVary(context);
                }

                const layoutElement = doc.getElementById("main-content");

                if (!layoutElement) {
                    console.error(`[Markdown Negotiation] Could not find #main-content in HTML`);
                    // Log available IDs to help debug
                    const availableIds = Array.from(doc.querySelectorAll('[id]')).map(el => el.id);
                    // Return the original response with Vary header
                    return await returnResponseVary(context);
                }

                // Get the inner HTML
                const layoutHtml = layoutElement.innerHTML;

                // Convert HTML to markdown
                markdownContent = turndownService.turndown(layoutHtml);

                // Cache the result
                markdownCache.set(pathname, markdownContent);
            } catch (error) {
                // Return the original response with Vary header
                return await returnResponseVary(context);
            }
        }
    }

    if (!markdownContent) {
        // Return the original response with Vary header
        return await returnResponseVary(context);
    }

    // Estimate token count (rough approximation: ~4 chars per token)
    const estimatedTokens = Math.ceil(markdownContent.length / 4);

    // Return markdown response with proper headers
    return new Response(markdownContent, {
        status: 200,
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "x-markdown-tokens": estimatedTokens.toString(),
            "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
            "Cache-Control": "public, max-age=86400", // Cache for 24 hours (until next deployment)
            "Vary": "Accept", // Indicate that response varies based on Accept header
        },
    });
};
