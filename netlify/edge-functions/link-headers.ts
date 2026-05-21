/**
 * Netlify Edge Function for Link headers middleware
 * Adds Link response headers for agent discovery
 * Implements RFC 8288 (Web Linking) and RFC 9727 (API Discovery)
 *
 * Runs on Deno at the edge
 * Docs: https://docs.netlify.com/edge-functions/overview/
 */

import type { Context } from "https://edge.netlify.com";
import { SKIP_PATHS, SKIP_EXTENSIONS } from "../../utils/skip-paths.ts";

async function returnResponseWithLinkHeaders(context: Context) {
  const response = await context.next();
  
  // Build Link header value with multiple relations
  // Format: <uri>; rel="relation", <uri2>; rel="relation2"
  const linkHeaders = [
    '<https://docs.pdfshift.io>; rel="service-doc"',
    '<https://api.pdfshift.io/v3>; rel="service-desc"',
    '<https://status.pdfshift.io>; rel="status"',
    '</.well-known/security.txt>; rel="security-policy"'
  ].join(', ')

  // Add Link header to the response
  response.headers.set('Link', linkHeaders);
  
  return response;
}

export default async (request: Request, context: Context) => {
  // Skip processing for static assets and special paths
  const url = new URL(request.url);
  let pathname = url.pathname.replace(/\/$/, '') || "/";
  
  // Early exit for static assets
  if (SKIP_PATHS.some(prefix => pathname.startsWith(prefix)) || SKIP_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    return; // Skip edge function for static assets
  }
  
  // Return response with Link headers
  return await returnResponseWithLinkHeaders(context);
}