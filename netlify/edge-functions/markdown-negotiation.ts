/**
 * Netlify Edge Function for Markdown for Agents content negotiation
 * Implements RFC content negotiation to serve markdown when requested
 *
 * Runs on Deno at the edge
 * Docs: https://docs.netlify.com/edge-functions/overview/
 */

import type { Context } from "https://edge.netlify.com";

// Map of routes to markdown content files in dist
const markdownRoutes: Record<string, string> = {
  "/": "/index.md",
  "/faq": "/faq.md",
};

export default async (request: Request, context: Context) => {
  const acceptHeader = request.headers.get("accept") || "";

  // Only intercept if client accepts markdown
  if (!acceptHeader.includes("text/markdown")) {
    return; // Continue to normal response
  }

  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, '') || "/";

  // Check if we have a markdown version for this route
  const markdownPath = markdownRoutes[pathname];
  if (!markdownPath) {
    return; // No markdown version, continue to normal HTML response
  }

  try {
    // Fetch the markdown content from the static site (served from dist/content/)
    const markdownUrl = new URL(`/content${markdownPath}`, url.origin);
    const response = await context.next();

    // Try to fetch the markdown file
    const mdResponse = await fetch(markdownUrl.toString());

    if (!mdResponse.ok) {
      return response; // Markdown file not found, return normal HTML response
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
