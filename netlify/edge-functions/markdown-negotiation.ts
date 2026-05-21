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

// Initialize Turndown service once at module load
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_'
});

console.log('[Markdown Negotiation] Edge function initialized with TurndownService and DOMParser');

export default async (request: Request, context: Context) => {
    const acceptHeader = request.headers.get("accept") || "";

    // Only intercept if client accepts markdown
    if (!acceptHeader.includes("text/markdown")) {
        return; // Continue to normal response
    }

    const url = new URL(request.url);
    let pathname = url.pathname.replace(/\/$/, '') || "/";

    console.log(`[Markdown Negotiation] Processing request for: ${pathname}`);

    // Map URL path to markdown file path
    if (pathname === "/" || pathname === "") {
        pathname = '/index'
    }

    const markdownPath = `/content${pathname}.md`;

    let markdownContent: string | null = null;

    // Try to fetch pre-generated markdown file first
    try {
        console.log(`[Markdown Negotiation] Attempting to fetch markdown file: ${markdownPath}`);
        const markdownUrl = new URL(markdownPath, url.origin);
        const mdResponse = await fetch(markdownUrl.toString());

        if (mdResponse.ok) {
            markdownContent = await mdResponse.text();
            console.log(`[Markdown Negotiation] Successfully loaded markdown file, length: ${markdownContent.length}`);
        } else {
            console.log(`[Markdown Negotiation] Markdown file not found (status: ${mdResponse.status}), will attempt HTML conversion`);
        }
    } catch (error) {
        console.error(`[Markdown Negotiation] Error fetching markdown file:`, error);
    }

    // If markdown file doesn't exist, convert HTML to markdown
    if (!markdownContent) {
        // Check cache first
        if (markdownCache.has(pathname)) {
            markdownContent = markdownCache.get(pathname)!;
            console.log(`[Markdown Negotiation] Loaded from cache for ${pathname}, length: ${markdownContent.length}`);
        } else {
            console.log(`[Markdown Negotiation] Starting HTML to markdown conversion for: ${pathname}`);

            try {
                // Fetch the HTML page
                const htmlPath = pathname === '/index' ? '/' : pathname;
                const htmlUrl = new URL(htmlPath, url.origin);
                console.log(`[Markdown Negotiation] Fetching HTML from: ${htmlUrl.toString()}`);

                const htmlResponse = await fetch(htmlUrl.toString(), {
                    headers: {
                        'Accept': 'text/html'
                    }
                });

                if (!htmlResponse.ok) {
                    console.error(`[Markdown Negotiation] HTML page not found (status: ${htmlResponse.status})`);
                    return; // HTML page not found, continue to normal response
                }

                console.log(`[Markdown Negotiation] HTML fetched successfully (status: ${htmlResponse.status})`);
                const htmlContent = await htmlResponse.text();
                console.log(`[Markdown Negotiation] HTML content length: ${htmlContent.length}`);

                // Parse HTML and extract content from #main-content
                console.log(`[Markdown Negotiation] Parsing HTML...`);
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, "text/html");

                if (!doc) {
                    console.error(`[Markdown Negotiation] Failed to parse HTML document`);
                    return;
                }

                console.log(`[Markdown Negotiation] HTML parsed successfully`);

                const layoutElement = doc.getElementById("main-content");

                if (!layoutElement) {
                    console.error(`[Markdown Negotiation] Could not find #main-content in HTML`);
                    // Log available IDs to help debug
                    const availableIds = Array.from(doc.querySelectorAll('[id]')).map(el => el.id);
                    console.log(`[Markdown Negotiation] Available IDs in document:`, availableIds.join(', '));
                    return;
                }

                console.log(`[Markdown Negotiation] Found #main-content element`);

                // Get the inner HTML
                const layoutHtml = layoutElement.innerHTML;
                console.log(`[Markdown Negotiation] Extracted content length: ${layoutHtml.length}`);

                // Convert HTML to markdown
                console.log(`[Markdown Negotiation] Converting HTML to markdown...`);
                markdownContent = turndownService.turndown(layoutHtml);
                console.log(`[Markdown Negotiation] Conversion complete, markdown length: ${markdownContent.length}`);

                // Cache the result
                markdownCache.set(pathname, markdownContent);
                console.log(`[Markdown Negotiation] Cached result for ${pathname}`);

            } catch (error) {
                console.error(`[Markdown Negotiation] Error during HTML to markdown conversion:`, error);
                if (error instanceof Error) {
                    console.error(`[Markdown Negotiation] Error stack:`, error.stack);
                }
                return; // On error, continue to normal HTML response
            }
        }
    }

    if (!markdownContent) {
        console.error(`[Markdown Negotiation] No markdown content available after all attempts`);
        return; // No content available, continue to normal response
    }

    // Estimate token count (rough approximation: ~4 chars per token)
    const estimatedTokens = Math.ceil(markdownContent.length / 4);

    console.log(`[Markdown Negotiation] Returning markdown response for ${pathname} (${estimatedTokens} tokens)`);

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
