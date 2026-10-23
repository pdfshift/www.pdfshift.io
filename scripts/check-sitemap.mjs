// Anti-regression check, run after `nuxt generate` (the Netlify build command runs it):
//
//   npm run check:sitemap
//
// Compares the generated sitemap with the one currently live on https://pdfshift.io and fails
// (exit code 1, which stops the Netlify deploy) when the new sitemap has more than 15% fewer URLs,
// e.g. after a routing or prerendering bug that silently drops pages.
//
// Environment variables:
//   SITEMAP_MAX_DROP=0.25   allowed drop ratio (default: 0.15)
//   SITEMAP_CHECK_SKIP=1    skip the check, for an intentional large removal of pages
//
// If the live sitemap can't be fetched, the check is skipped with a warning rather than
// blocking the deploy.

import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { relative, resolve } from 'path'

const ROOT = process.cwd()
const sitemapFile = resolve(ROOT, process.argv[2] || '.output/public/sitemap.xml')
const liveSitemapUrl = 'https://pdfshift.io/sitemap.xml'
const maxDrop = Number(process.env.SITEMAP_MAX_DROP ?? 0.15)

if (process.env.SITEMAP_CHECK_SKIP) {
    console.log('⚠ Sitemap check skipped (SITEMAP_CHECK_SKIP is set)')
    process.exit(0)
}

if (!existsSync(sitemapFile)) {
    console.error(`✗ No sitemap found at ${relative(ROOT, sitemapFile)}. Did \`nuxt generate\` run?`)
    process.exit(1)
}

// Compare paths without trailing slash, so a slash-style change isn't seen as removed pages
const extractPaths = xml => new Set(
    [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname.replace(/\/$/, '') || '/')
)

const generated = extractPaths(await readFile(sitemapFile, 'utf-8'))

let live
try {
    const response = await fetch(liveSitemapUrl, { signal: AbortSignal.timeout(15000) })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    live = extractPaths(await response.text())
} catch (error) {
    console.warn(`⚠ Could not fetch ${liveSitemapUrl} (${error.message}), skipping the sitemap check`)
    process.exit(0)
}

if (live.size === 0) {
    console.warn(`⚠ ${liveSitemapUrl} has no URLs, skipping the sitemap check`)
    process.exit(0)
}

const drop = (live.size - generated.size) / live.size
const removed = [...live].filter(path => !generated.has(path))
const added = [...generated].filter(path => !live.has(path))

console.log(`Sitemap: ${generated.size} URLs generated, ${live.size} live (${added.length} added, ${removed.length} removed)`)

if (drop > maxDrop) {
    console.error(`\n✗ The sitemap would lose ${(drop * 100).toFixed(1)}% of its URLs (limit: ${maxDrop * 100}%).`)
    console.error('  Removed URLs:')
    removed.slice(0, 30).forEach(path => console.error(`    ${path}`))
    if (removed.length > 30) console.error(`    … and ${removed.length - 30} more`)
    console.error('\n  If this is intentional, deploy with SITEMAP_CHECK_SKIP=1.')
    process.exit(1)
}

console.log('✓ Sitemap size check passed')
