import { withTrailingSlash } from 'ufo'

export const SITE_URL = 'https://pdfshift.io'

/**
 * Absolute URL of a page on the site, in its canonical form.
 *
 * Netlify serves every prerendered page from `<path>/index.html` and 301-redirects
 * `/pricing` to `/pricing/`, so canonical tags, the sitemap and structured data all
 * use the trailing-slash version. Query strings and hashes are dropped.
 *
 * @example
 * siteUrl('/pricing') // "https://pdfshift.io/pricing/"
 * siteUrl('/')        // "https://pdfshift.io/"
 */
export function siteUrl(path: string = '/'): string {
    const pathname = path.split(/[?#]/)[0] || '/'
    return SITE_URL + withTrailingSlash(pathname)
}
