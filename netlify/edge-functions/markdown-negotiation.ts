/**
 * Netlify Edge Function for Markdown for Agents content negotiation
 * Implements RFC content negotiation to serve markdown when requested
 *
 * Runs on Deno at the edge
 * Docs: https://docs.netlify.com/edge-functions/overview/
 */

import type { Context } from "https://edge.netlify.com";

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

    try {
        // Try to fetch the markdown file
        const markdownUrl = new URL(markdownPath, url.origin);
        const mdResponse = await fetch(markdownUrl.toString());

        if (!mdResponse.ok) {
            return; // Markdown file not found, continue to normal HTML response
        }

        const markdownContent = await mdResponse.text();

        // Estimate token count (rough approximation: ~4 chars per token)
        const estimatedTokens = Math.ceil(markdownContent.length / 4);

        // Return markdown response with proper headers
        return new Response(markdownContent, {
            status: 200,
            headers: {
                "Content-Type": "text/markdown; charset=utf-8",
                "x-markdown-tokens": estimatedTokens.toString(),
                "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
                "Cache-Control": "public, max-age=300", // Cache for 5 minutes
            },
        });
    } catch (error) {
        console.error("Error serving markdown:", error);
        return; // On error, continue to normal HTML response
    }
};
