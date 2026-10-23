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

// Only the production site may be indexed. Any other host serving this code (dev.pdfshift.io,
// deploy previews, *.netlify.app) gets a noindex, so copies of the site don't compete with it in search.
const INDEXABLE_HOSTS = ['pdfshift.io'];

async function returnResponseWithLinkHeaders(context: Context, indexable: boolean) {
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

  if (!indexable) {
    response.headers.set('X-Robots-Tag', 'noindex');
  }
  
  return response;
}

export default async (request: Request, context: Context) => {
  // Skip processing for static assets and special paths
  const url = new URL(request.url);
  let pathname = url.pathname.replace(/\/$/, '') || "/";
  const indexable = INDEXABLE_HOSTS.includes(url.hostname);
  
  // Early exit for static assets
  if (SKIP_PATHS.some(prefix => pathname.startsWith(prefix)) || SKIP_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
    if (indexable) {
      return; // Skip edge function for static assets
    }

    // Outside production, assets (images, PDFs, llms.txt...) must not be indexed either
    const response = await context.next();
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }
  
  // Return response with Link headers
  return await returnResponseWithLinkHeaders(context, indexable);
}
