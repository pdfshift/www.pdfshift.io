/**
 * Server middleware for Markdown for Agents content negotiation
 * Implements content negotiation to serve markdown when requested via Accept header
 *
 * Spec: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  const acceptHeader = getRequestHeader(event, 'accept') || ''

  // Check if client accepts markdown
  if (!acceptHeader.includes('text/markdown')) {
    return // Continue with normal HTML response
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

  // Check if markdown file exists
  if (!existsSync(contentPath)) {
    return // Continue with normal HTML response (file not found)
  }

  try {
    // Read the markdown content
    const markdownContent = await readFile(contentPath, 'utf-8')

    // Extract frontmatter if present (YAML between --- delimiters)
    let content = markdownContent
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

    // Estimate token count (rough approximation: ~4 chars per token)
    const estimatedTokens = Math.ceil(content.length / 4)

    // Set response headers
    setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    setResponseHeader(event, 'x-markdown-tokens', estimatedTokens.toString())

    // Optional: Add Content-Signal header for AI training preferences
    setResponseHeader(event, 'Content-Signal', 'ai-train=yes, search=yes, ai-input=yes')

    // If frontmatter exists, prepend it as YAML
    if (Object.keys(frontmatter).length > 0) {
      const yamlFrontmatter = Object.entries(frontmatter)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
      content = `---\n${yamlFrontmatter}\n---\n\n${content}`
    }

    // Return the markdown content
    return content
  } catch (error) {
    console.error('Error reading markdown file:', error)
    return // Continue with normal HTML response on error
  }
})
