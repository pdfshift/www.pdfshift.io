/**
 * Server middleware for Markdown for Agents content negotiation
 * Implements content negotiation to serve markdown when requested via Accept header
 *
 * Spec: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import TurndownService from 'turndown'
import * as cheerio from 'cheerio'
import { parseAcceptHeader, shouldServeMarkdown } from '../../utils/content-negotiation'

// Cache for converted markdown (cleared on server restart)
const markdownCache = new Map<string, string>()

// Initialize Turndown service
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_'
})

export default defineEventHandler(async (event) => {
    const acceptHeader = getRequestHeader(event, 'accept') || ''

    // Always set Vary header to indicate response varies based on Accept header
    setResponseHeader(event, 'Vary', 'Accept')

    // Check if client accepts markdown
    if (!acceptHeader) {
        return // No Accept header, continue with normal HTML response
    }

    // Parse accept header and check if markdown should be served
    if (!shouldServeMarkdown(acceptHeader)) {
        return // HTML preferred or markdown not accepted, continue with normal response
    }

    const url = getRequestURL(event)
    const pathname = url.pathname

    // Map URL path to content file
    let contentPath: string
    if (pathname === '/' || pathname === '') {
        contentPath = join(process.cwd(), 'content', 'index.md')
    } else {
        // Remove leading slash and add .md extension if not present
        const cleanPath = pathname.replace(/^\//, '').replace(/\/$/, '')
        contentPath = join(process.cwd(), 'content', `${cleanPath}.md`)
    }

    let content: string

    // Check if markdown file exists in /content folder
    if (existsSync(contentPath)) {
        try {
            const markdownContent = await readFile(contentPath, 'utf-8')
            // Extract frontmatter if present (YAML between --- delimiters)
            content = markdownContent
            let frontmatter = {}
            const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
            if (frontmatterMatch) {
                // Parse frontmatter (simple key: value parsing)
                const frontmatterText = frontmatterMatch[1]
                const lines = frontmatterText.split('\n')
                lines.forEach(line => {
                    const match = line.match(/^(\w+):\s*"?([^"]+)"?$/)
                    if (match) {
                        frontmatter[match[1]] = match[2]
                    }
                })
                content = frontmatterMatch[2]
            }

        } catch (error) {
            console.error('Error reading markdown file:', error)
            return // Continue with normal HTML response on error
        }
    } else if (markdownCache.has(pathname)) {
        // Check cache first
        content = markdownCache.get(pathname)!
    } else {
        // Fetch HTML and convert to markdown
        try {
            // Fetch the HTML page from the local server
            const htmlUrl = `http://localhost:3000${pathname}`
            const htmlResponse = await fetch(htmlUrl, {
                headers: {
                    'Accept': 'text/html'
                }
            })

            if (!htmlResponse.ok) {
                return // HTML page not found, continue with normal response
            }

            const htmlContent = await htmlResponse.text()

            // Parse HTML and extract content from #main-content
            const $ = cheerio.load(htmlContent)
            const layoutContent = $('#main-content').html()

            if (!layoutContent) {
                console.error('Could not find #main-content in HTML')
                return // Content not found, continue with normal response
            }

            // Convert HTML to markdown
            content = turndownService.turndown(layoutContent)

            // Cache the result
            markdownCache.set(pathname, content)
        } catch (error) {
            console.error('Error converting HTML to markdown:', error)
            return // On error, continue with normal HTML response
        }
    }

    // Estimate token count (rough approximation: ~4 chars per token)
    const estimatedTokens = Math.ceil(content.length / 4)

    // Set response headers
    setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    setResponseHeader(event, 'x-markdown-tokens', estimatedTokens.toString())

    // Optional: Add Content-Signal header for AI training preferences
    setResponseHeader(event, 'Content-Signal', 'ai-train=yes, search=yes, ai-input=yes')

    // Return the markdown content
    return content
})
