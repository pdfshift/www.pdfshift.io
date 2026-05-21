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

// Cache for converted markdown (persists across requests in the same edge function instance)
const markdownCache = new Map<string, string>();

// Initialize Turndown service
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_'
});

export default async (request: Request, context: Context) => {
    const acceptHeader = request.headers.get("accept") || "";

    // Only intercept if client accepts markdown
    if (!acceptHeader.includes("text/markdown")) {
        return; // Continue to normal response
    }

    const url = new URL(request.url);
    let pathname = url.pathname.replace(/\/$/, '') || "/";

    // Map URL path to markdown file path
    // / → /content/index.md
    // /faq → /content/faq.md
    // /guides/ruby/faraday/accessing-secured-pages → /content/guides/ruby/faraday/accessing-secured-pages.md
    if (pathname === "/" || pathname === "") {
        pathname = '/index'
    }

    const markdownPath = `/content${pathname}.md`;

    let markdownContent: string | null = null;

    try {
        // Try to fetch the markdown file from static content
        const markdownUrl = new URL(markdownPath, url.origin);
        const mdResponse = await fetch(markdownUrl.toString());

        if (mdResponse.ok) {
            markdownContent = await mdResponse.text();
        }
    } catch (error) {
        console.error("Error fetching markdown file:", error);
    }

    // If markdown file doesn't exist, convert HTML to markdown
    if (!markdownContent) {
        // Check cache first
        if (markdownCache.has(pathname)) {
            markdownContent = markdownCache.get(pathname)!;
        } else {
            try {
                // Fetch the HTML page
                const htmlUrl = new URL(pathname === '/index' ? '/' : pathname, url.origin);
                const htmlResponse = await fetch(htmlUrl.toString(), {
                    headers: {
                        'Accept': 'text/html'
                    }
                });

                if (!htmlResponse.ok) {
                    return; // HTML page not found, continue to normal response
                }

                const htmlContent = await htmlResponse.text();

                // Parse HTML and extract content from #nuxt-layout-content
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, "text/html");

                if (!doc) {
                    console.error("Failed to parse HTML");
                    return;
                }

                const layoutElement = doc.getElementById("nuxt-layout-content");

                if (!layoutElement) {
                    console.error("Could not find #nuxt-layout-content in HTML");
                    return;
                }

                // Get the inner HTML
                const layoutHtml = layoutElement.innerHTML;

                // Convert HTML to markdown
                markdownContent = turndownService.turndown(layoutHtml);

                // Cache the result
                markdownCache.set(pathname, markdownContent);
            } catch (error) {
                console.error("Error converting HTML to markdown:", error);
                return; // On error, continue to normal HTML response
            }
        }
    }

    if (!markdownContent) {
        return; // No content available, continue to normal response
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
        },
    });
};
