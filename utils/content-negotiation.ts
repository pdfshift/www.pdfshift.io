/**
 * Content negotiation utilities for Accept header parsing
 * Used by both server middleware and Netlify edge functions
 */

/**
 * Parse Accept header and extract media types with their q-values
 *
 * @param acceptHeader - The Accept header value (e.g., "text/html;q=1.0, text/markdown;q=0.9")
 * @returns Array of media types with their quality values, sorted by q-value (highest first)
 *
 * @example
 * parseAcceptHeader("text/html;q=1.0, text/markdown;q=0.5")
 * // Returns: [{ type: "text/html", q: 1.0 }, { type: "text/markdown", q: 0.5 }]
 */
export function parseAcceptHeader(acceptHeader: string): Array<{ type: string; q: number }> {
    return acceptHeader
        .split(',')
        .map(part => {
            const [type, ...params] = part.trim().split(';')
            const qParam = params.find(p => p.trim().startsWith('q='))
            const q = qParam ? parseFloat(qParam.split('=')[1]) : 1.0
            return { type: type.trim(), q }
        })
        .sort((a, b) => b.q - a.q) // Sort by quality value (highest first)
}

/**
 * Check if markdown should be served based on Accept header q-values
 *
 * @param acceptHeader - The Accept header value
 * @returns true if markdown should be served, false if HTML should be served
 *
 * @example
 * shouldServeMarkdown("text/markdown") // true
 * shouldServeMarkdown("text/html;q=1.0, text/markdown;q=0.5") // false (HTML has higher q)
 * shouldServeMarkdown("text/markdown;q=1.0, text/html;q=0.5") // true (markdown has higher q)
 */
export function shouldServeMarkdown(acceptHeader: string): boolean {
    const types = parseAcceptHeader(acceptHeader)

    const markdown = types.find(t => t.type === 'text/markdown')

    const html = types.find(t =>
        t.type === 'text/html' ||
        t.type === 'text/*' ||
        t.type === '*/*'
    )

    // If markdown is explicitly requested and has equal or higher q-value than HTML
    if (markdown && (!html || markdown.q >= html.q)) {
        return true
    }

    return false
}
