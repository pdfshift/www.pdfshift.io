/**
 * Server middleware to add Link response headers for agent discovery
 * Implements RFC 8288 (Web Linking) and RFC 9727 (API Discovery)
 *
 * This middleware adds Link headers pointing to:
 * - API documentation (service-doc)
 * - API endpoint/specification (service-desc)
 * - Status page (status)
 * - Security policy (security-policy per RFC 9116)
 */

export default defineEventHandler((event) => {
  // Build Link header value with multiple relations
  // Format: <uri>; rel="relation", <uri2>; rel="relation2"
  const linkHeaders = [
    '<https://docs.pdfshift.io>; rel="service-doc"',
    '<https://api.pdfshift.io/v3>; rel="service-desc"',
    '<https://status.pdfshift.io>; rel="status"',
    '</.well-known/security.txt>; rel="security-policy"'
  ].join(', ')

  // Set the Link header
  setResponseHeader(event, 'Link', linkHeaders)
})
