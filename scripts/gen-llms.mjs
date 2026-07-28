import { readdir, readFile, writeFile } from 'fs/promises'
import { join, relative, basename, sep } from 'path'

const ROOT = process.cwd()
const contentDir = join(ROOT, 'content')
const publicDir = join(ROOT, 'public')
const siteUrl = 'https://pdfshift.io'

async function collectMarkdown(dir, acc = []) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
        if (entry.name.startsWith('_')) continue
        const full = join(dir, entry.name)
        if (entry.isDirectory()) await collectMarkdown(full, acc)
        else if (entry.isFile() && entry.name.endsWith('.md')) acc.push(full)
    }
    return acc
}

function parseDoc(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
    if (!match) return { fm: {}, body: raw.trim() }
    const fm = {}
    for (const l of match[1].split(/\r?\n/)) {
        const kv = l.match(/^(\w+):\s*(.*)$/)
        if (kv) fm[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '')
    }
    return { fm, body: match[2].trim() }
}

const humanize = s => s.replace(/-/g, ' ').replace(/\b\w/, c => c.toUpperCase())
const firstHeading = body => (body.match(/^#\s+(.+)$/m) || [])[1]

function docTitle(doc) {
    const { fm, section } = doc
    if (section === 'guides') {
        const base = fm.title || firstHeading(doc.body) || humanize(basename(doc.rel))
        const ctx = [fm.language, fm.library].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(' / ')
        return ctx ? `${base} — ${ctx}` : base
    }
    if (section === 'samples') {
        const lib = fm.library || humanize(basename(doc.rel))
        return fm.language ? `Code sample: ${lib} in ${fm.language}` : `Code sample: ${lib}`
    }
    return fm.title || firstHeading(doc.body) || humanize(basename(doc.rel))
}

const files = await collectMarkdown(contentDir)
const docs = []
for (const file of files) {
    const raw = await readFile(file, 'utf-8')
    const { fm, body } = parseDoc(raw)
    if (fm.draft === 'true') continue
    const rel = relative(contentDir, file).split(sep).join('/').replace(/\.md$/, '')
    const path = rel === 'index' ? '/' : `/${rel}`
    let section = 'core'
    if (rel.startsWith('guides/')) section = 'guides'
    else if (rel.startsWith('samples/')) section = 'samples'
    else if (rel.startsWith('legal/')) section = 'legal'
    docs.push({
        rel, path, section, fm, body,
        url: siteUrl + path,
        mdUrl: siteUrl + (path === '/' ? '/index.md' : `${path}.md`),
    })
}

const bySection = s => docs.filter(d => d.section === s).sort((a, b) => a.rel.localeCompare(b.rel))
const core = bySection('core'), guides = bySection('guides'), samples = bySection('samples'), legal = bySection('legal')

const line = (label, url, desc) => `- [${label}](${url})${desc ? `: ${desc}` : ''}`
const pick = n => core.find(d => d.rel === n)
const home = pick('index'), pricing = pick('pricing'), faq = pick('faq')

/* ---- llms.txt ---- */
const llms = []
llms.push('# PDFShift', '')
llms.push('> PDFShift is a developer-first REST API that converts HTML, URLs, and raw markup into pixel-perfect PDFs, screenshots, and Open Graph images. Simple credit-based pricing with 50 free credits every month and no credit card required to start.', '')
llms.push('Every page on pdfshift.io is available as clean Markdown: append `.md` to any URL (e.g. `/pricing.md`) or send an `Accept: text/markdown` request header. The companion file [llms-full.txt](' + siteUrl + '/llms-full.txt) contains the full text of every page in a single document.', '')
llms.push('For full, up-to-date pricing details (plans, credits, and per-conversion overage rates), see [' + siteUrl + '/pricing.md](' + siteUrl + '/pricing.md).', '')

llms.push('## Core pages')
if (home) llms.push(line('HTML to PDF API — Overview', home.mdUrl, 'What PDFShift does, key stats, and headline features.'))
if (pricing) llms.push(line('Pricing', pricing.mdUrl, 'Credit-based plans from Free (50 credits/mo) up to 100k+ conversions per month.'))
if (faq) llms.push(line('FAQ', faq.mdUrl, 'Common questions about trials, billing, security, and usage.'))
llms.push(line('API Documentation', 'https://docs.pdfshift.io', 'Full REST API reference for the /v3 conversion endpoint.'))
llms.push('')

const canonical = guides.filter(d => /^guides\/python\/requests\//.test(d.rel))
const languages = Array.from(new Set(guides.map(d => d.fm.language).filter(Boolean))).sort()
llms.push('## Guides')
llms.push(`> ${guides.length}+ how-to guides covering ${languages.length} languages (${languages.join(', ')}) and their most popular HTTP libraries. Each task below exists for every language/library combination — full text is in llms-full.txt.`)
llms.push(line('All guides', siteUrl + '/guides', 'Browse guides by language and HTTP library.'))
for (const g of canonical) llms.push(line(g.fm.title || humanize(basename(g.rel)), g.mdUrl, g.fm.description))
llms.push('')

llms.push('## Code samples')
llms.push('> Ready-to-use HTML-to-PDF conversion code for each supported HTTP client library.')
for (const s of samples) {
    const label = [s.fm.language, s.fm.library].filter(Boolean).join(' — ') || humanize(basename(s.rel))
    llms.push(line(label, s.mdUrl))
}
llms.push('')

llms.push('## Legal')
for (const l of legal) llms.push(line(l.fm.title || humanize(basename(l.rel)), l.mdUrl, l.fm.description))
llms.push('')

llms.push('## Optional')
llms.push(line('Register', siteUrl + '/register', 'Create a free account (50 credits/mo, no credit card).'))
llms.push(line('Contact', siteUrl + '/contact', 'Get in touch with the PDFShift team.'))
llms.push(line('Status', 'https://status.pdfshift.io', 'Live service status and uptime.'))
llms.push('')

await writeFile(join(publicDir, 'llms.txt'), llms.join('\n'), 'utf-8')
console.log('✓ llms.txt')

/* ---- llms-full.txt ---- */
const ordered = [...core, ...guides, ...samples, ...legal]
const full = []
full.push('# PDFShift — Full Content', '')
full.push('> Complete text of pdfshift.io, generated from the site\'s source Markdown. PDFShift is a developer-first API that converts HTML, URLs, and raw markup into pixel-perfect PDFs, screenshots, and Open Graph images.', '')
full.push(`Source: ${siteUrl} — see also ${siteUrl}/llms.txt for a curated index.`)
full.push(`Pricing details: ${siteUrl}/pricing.md`)
full.push(`Documents: ${ordered.length}. Each is delimited by a rule and prefixed with its canonical URL.`, '')
for (const doc of ordered) {
    full.push('---', '')
    full.push(`# ${docTitle(doc)}`, '')
    full.push(`Source: ${doc.url}`)
    if (doc.fm.description) full.push(`Description: ${doc.fm.description}`)
    full.push('')
    full.push(doc.body, '')
}
await writeFile(join(publicDir, 'llms-full.txt'), full.join('\n'), 'utf-8')
console.log(`✓ llms-full.txt (${ordered.length} documents)`)
