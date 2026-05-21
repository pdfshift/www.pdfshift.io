/**
 * Simplified Netlify Edge Function for Markdown for Agents content negotiation
 * Falls back to serving pre-generated markdown files only
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
    if (pathname === "/" || pathname === "") {
        pathname = '/index'
    }

    const markdownPath = `/content${pathname}.md`;

    try {
        // Try to fetch the markdown file from static content
        const markdownUrl = new URL(markdownPath, url.origin);
        const mdResponse = await fetch(markdownUrl.toString());

        if (mdResponse.ok) {
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
                    "Cache-Control": "public, max-age=86400",
                },
            });
        }
    } catch (error) {
        console.error("Error fetching markdown file:", error);
    }

    // If markdown file doesn't exist, continue to normal HTML response
    return;
};
