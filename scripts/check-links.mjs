// Checks the generated site for internal link problems. Run after `nuxt generate`:
//
//   npm run check:links
//
// Reports:
// - internal links without a trailing slash (Netlify 301-redirects /path to /path/)
// - internal links containing "null" or "undefined" (broken template values)
// - internal links to pages that were not generated (and aren't a _redirects rule)
// - sitemap URLs without a trailing slash or without a generated page
//
// Exits with code 1 when a problem is found.

import { existsSync } from 'fs'
import { readdir, readFile } from 'fs/promises'
import { join, relative, resolve } from 'path'

const ROOT = process.cwd()
const outputDir = resolve(ROOT, process.argv[2] || '.output/public')
const siteUrl = 'https://pdfshift.io'

if (!existsSync(join(outputDir, 'index.html'))) {
    console.error(`No generated site found in ${relative(ROOT, outputDir)}. Run \`nuxt generate\` first.`)
    process.exit(2)
}

async function collectPages(dir, acc = []) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) await collectPages(full, acc)
        else if (entry.name === 'index.html') acc.push(full)
    }
    return acc
}

const pageExists = path => existsSync(join(outputDir, path, 'index.html'))

// Paths handled by Netlify rules (e.g. /login, /dpa) are valid targets even without a page
const redirectSources = new Set(
    (await readFile(join(ROOT, 'public/_redirects'), 'utf-8'))
        .split('\n')
        .map(line => line.trim().split(/\s+/)[0])
        .filter(source => source?.startsWith('/'))
        .map(source => source.replace(/\/$/, '') || '/')
)

const isFile = path => /\.[a-z0-9]+$/i.test(path.split('/').pop())

const noSlash = new Map()   // href -> Set of pages
const broken = new Map()
const dead = new Map()
const record = (map, href, page) => {
    if (!map.has(href)) map.set(href, new Set())
    map.get(href).add(page)
}

const pages = await collectPages(outputDir)
for (const file of pages) {
    const page = '/' + relative(outputDir, file).replace(/index\.html$/, '')
    const html = await readFile(file, 'utf-8')

    for (const [, raw] of html.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
        const href = raw.replace(/&amp;/g, '&')
        if (!href.startsWith('/') || href.startsWith('//')) continue // external, mailto:, #anchor

        const path = href.split(/[?#]/)[0]
        if (/\b(null|undefined)\b/.test(href)) record(broken, href, page)
        else if (isFile(path) || redirectSources.has(path.replace(/\/$/, '') || '/')) continue
        else if (!path.endsWith('/')) record(noSlash, href, page)
        else if (!pageExists(path)) record(dead, href, page)
    }
}

const sitemapProblems = []
const sitemapFile = join(outputDir, 'sitemap.xml')
if (existsSync(sitemapFile)) {
    const sitemap = await readFile(sitemapFile, 'utf-8')
    for (const [, loc] of sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)) {
        const path = loc.replace(siteUrl, '') || '/'
        if (!path.endsWith('/')) sitemapProblems.push(`${loc} (no trailing slash)`)
        else if (!pageExists(path)) sitemapProblems.push(`${loc} (no generated page)`)
    }
} else {
    sitemapProblems.push('sitemap.xml was not generated')
}

function report(title, map) {
    if (map.size === 0) return
    console.log(`\n${title} (${map.size}):`)
    for (const [href, onPages] of [...map].sort((a, b) => b[1].size - a[1].size)) {
        const examples = [...onPages].slice(0, 3).join(', ')
        console.log(`  ${href}  -> on ${onPages.size} page(s), e.g. ${examples}${onPages.size > 3 ? ', …' : ''}`)
    }
}

console.log(`Checked ${pages.length} pages in ${relative(ROOT, outputDir)}`)
report('Internal links without a trailing slash', noSlash)
report('Internal links with "null" or "undefined"', broken)
report('Internal links to pages that were not generated', dead)
if (sitemapProblems.length) {
    console.log(`\nSitemap problems (${sitemapProblems.length}):`)
    sitemapProblems.slice(0, 50).forEach(problem => console.log(`  ${problem}`))
}

const total = noSlash.size + broken.size + dead.size + sitemapProblems.length
console.log(total ? `\n✗ ${total} problem(s) found` : '\n✓ No link problems found')
process.exit(total ? 1 : 0)
