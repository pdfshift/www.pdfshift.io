/**
 * Simple test edge function to verify edge functions are working
 */

import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    const url = new URL(request.url);

    // Only run for a test path
    if (url.pathname === "/.netlify/edge-test") {
        return new Response("Edge functions are working!", {
            headers: {
                "content-type": "text/plain",
                "x-edge-test": "success"
            }
        });
    }

    // Continue to normal response
    return;
};
