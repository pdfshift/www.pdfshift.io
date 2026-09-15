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
        return ctx ? `${base} - ${ctx}` : base
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

/* Integrations & AI agents: these live as Vue pages (not content Markdown), so they're listed explicitly. */
const integrations = [
    {
        path: '/agents',
        title: 'PDFShift for AI Agents & Automation Tools',
        description: 'Overview of PDFShift integrations for automation platforms and AI agents (N8N, Lovable, Base44, MCP, Zapier, Make, Clay, Bubble, FlowMattic).',
        body: 'PDFShift provides PDF generation for automated workflows and AI agents. It exposes a REST API that works with any automation tool or agent framework, a hosted Model Context Protocol (MCP) server for AI agents, supports webhooks for asynchronous jobs, and converts raw HTML or a URL into a PDF. Popular integrations include N8N, Lovable, Base44, and the PDFShift MCP server, with guides available for Zapier, Make, Clay, Bubble, and FlowMattic.',
    },
    {
        path: '/agents/n8n',
        title: 'PDFShift + N8N',
        description: 'Convert HTML to PDF inside N8N workflows using the HTTP Request node. No code required.',
        body: 'Integrate PDFShift with N8N to generate PDFs from HTML as part of a workflow. Add an HTTP Request node with method POST to https://api.pdfshift.io/v3/convert/pdf, authenticate with Basic Auth (username "api", password = your API key), set the body content type to JSON, and pass a "source" (HTML or URL) plus optional "filename". Use the "webhook" parameter for asynchronous processing of large documents.',
    },
    {
        path: '/agents/lovable',
        title: 'PDFShift + Lovable',
        description: 'Add secure, server-side PDF generation to a Lovable app in one prompt, using a Lovable Cloud secret and an Edge Function that calls the PDFShift API. Includes a ready-to-copy one-shot prompt and a "Build with Lovable" link.',
        body: [
            'Lovable lets you build applications from natural-language prompts, and PDFShift turns the HTML those apps produce into PDFs. Because PDFShift requires an API key, the conversion must run server-side. On Lovable this is done with a Lovable Cloud secret (PDFSHIFT_API_KEY) and an Edge Function, so the key never reaches the browser.',
            '',
            'Recommended setup:',
            '1. Get your PDFShift API key from your dashboard. Do not paste it into a prompt, store it as a Lovable Cloud secret named PDFSHIFT_API_KEY (Cloud → Secrets).',
            '2. Create a server-side Edge Function named "generate-pdf" that accepts a JSON body with a "source" field (raw HTML or a URL), calls POST https://api.pdfshift.io/v3/convert/pdf with the header "X-API-Key: <PDFSHIFT_API_KEY>" and "Content-Type: application/json", and returns the binary PDF with Content-Type: application/pdf. It should propagate PDFShift errors with the same HTTP status and enable CORS.',
            '3. Add an "Export as PDF" button that builds a self-contained HTML string (CSS inlined), POSTs it to the generate-pdf function, receives a Blob, and downloads it as document.pdf.',
            '',
            'PDFShift notes: "source" can be raw HTML or a publicly accessible URL; keep "sandbox": true while testing (free, watermarked) and remove it for production; options such as "landscape", "format", "margin", "header", "footer", "css", "filename", and "webhook" can be added to the JSON body. Never call PDFShift directly from frontend JavaScript with your secret key.',
            '',
            'The guide includes a ready-to-copy one-shot prompt and a "Build with Lovable" button that opens Lovable with that prompt pre-filled (Lovable\'s Build with URL feature).',
        ].join('\n'),
    },
    {
        path: '/agents/base44',
        title: 'PDFShift + Base44',
        description: 'Connect PDFShift to a Base44 app from its OpenAPI specification or a backend function, keeping the API key secure on the server.',
        body: [
            'Base44 lets you build applications with AI and supports custom API integrations, so you can connect PDFShift and generate invoices, reports, certificates, and receipts. There are two approaches.',
            '',
            'Option 1 - Custom integration (fastest):',
            '1. Get your PDFShift API key from your dashboard and keep it private (never in frontend code).',
            '2. In Base44, open your workspace Settings → Integrations → New Integration → From URL, and use the PDFShift OpenAPI spec: https://api.pdfshift.io/openapi.json',
            '3. Enable the endpoint POST /convert/pdf (optionally POST /convert/png, /convert/jpeg, /convert/webp).',
            '4. Configure the integration - Slug: pdfshift, Name: PDFShift, Base URL: https://api.pdfshift.io/v3 - and add a custom header "X-API-Key: YOUR_PDFSHIFT_API_KEY". Base44 stores sensitive headers securely.',
            '',
            'Calling from code: const response = await base44.integrations.custom.call(\'pdfshift\', \'post:/convert/pdf\', { payload: { source: html, filename: \'document-export\' } }); then use response.data.url.',
            '',
            'Why use "filename": by default PDFShift returns the PDF as binary, but Base44 custom integrations are built around JSON responses. Passing "filename" makes PDFShift return JSON like { "success": true, "url": "...", "filesize": 259972, "pdf_pages": 5 }. The "url" points to the generated PDF, which PDFShift keeps for 2 days and then deletes.',
            '',
            'Option 2 - Backend function (for sensitive data): to avoid any temporary storage, create a Base44 backend function named "generate-pdf" that reads a PDFSHIFT_API_KEY secret, POSTs the "source" HTML to /v3/convert/pdf with the X-API-Key header, does NOT set "filename" or "webhook" (so PDFShift returns raw binary), and returns the PDF with Content-Type: application/pdf while forwarding PDFShift error status codes. On the frontend, call it with base44.functions.fetch() (which exposes the native binary HTTP response), convert to a Blob, and download as document.pdf. Never expose PDFSHIFT_API_KEY in frontend code.',
        ].join('\n'),
    },
    {
        path: '/agents/mcp',
        title: 'PDFShift MCP Server',
        description: 'Hosted Model Context Protocol (MCP) server that lets any AI agent (Claude, Cursor, and more) convert HTML or URLs to PDF, manage HTML templates, and check credits and logs.',
        body: [
            'PDFShift ships a hosted MCP (Model Context Protocol) server so AI agents can generate documents through natural language. It is a remote Streamable HTTP server, nothing to install locally.',
            '',
            'Connection details:',
            '- Endpoint: https://api.pdfshift.io/mcp (a single POST endpoint speaking JSON-RPC 2.0, stateless JSON mode, no SSE).',
            '- Transport: Streamable HTTP.',
            '- Authentication: send your PDFShift API key as the header "X-API-Key: YOUR_KEY" or "Authorization: Bearer YOUR_KEY". Discovery (initialize and tools/list) works without a key; running a tool requires one. Server identifies as pdfshift-mcp v1.0.0 and supports MCP protocol versions 2025-06-18, 2025-03-26, and 2024-11-05.',
            '',
            'Add to Claude Code: claude mcp add --transport http pdfshift https://api.pdfshift.io/mcp --header "X-API-Key: YOUR_PDFSHIFT_API_KEY"',
            '',
            'Add to Cursor and other HTTP-native clients (mcp.json): { "mcpServers": { "pdfshift": { "type": "http", "url": "https://api.pdfshift.io/mcp", "headers": { "X-API-Key": "YOUR_PDFSHIFT_API_KEY" } } } }',
            '',
            'Add to Claude Desktop and stdio-only clients via the mcp-remote bridge: { "mcpServers": { "pdfshift": { "command": "npx", "args": ["mcp-remote", "https://api.pdfshift.io/mcp", "--header", "X-API-Key:YOUR_PDFSHIFT_API_KEY"] } } }',
            '',
            'Available tools (11): convert (HTML or URL to PDF/PNG/JPEG/WEBP, returns a temporary download URL valid ~2 days); list_templates; get_template; create_template; update_template; delete_template; generate_from_template (render a saved template to HTML/PDF/PNG/JPEG/WEBP with variables); credits_usage; pricing; list_logs; get_log. The convert and generate_from_template tools accept any documented PDFShift option (margins, headers/footers, watermark, protection, cookies, sandbox, landscape, css, wait_for, delay, use_print, ...) as extra parameters.',
            '',
            'Notes: conversions return a temporary download URL valid for about 2 days; pass "sandbox": true to generate free, watermarked documents that do not consume credits. Your API key grants full account access, keep it in your client configuration or environment, never in a public repo or shared chat.',
        ].join('\n'),
    },
].map(i => ({
    section: 'integrations',
    rel: i.path.replace(/^\//, ''),
    path: i.path,
    url: siteUrl + i.path,
    body: i.body,
    fm: { title: i.title, description: i.description },
}))

const line = (label, url, desc) => `- [${label}](${url})${desc ? `: ${desc}` : ''}`
const pick = n => core.find(d => d.rel === n)
const home = pick('index'), pricing = pick('pricing'), faq = pick('faq')

/* ---- llms.txt ---- */
const llms = []
llms.push('# PDFShift', '')
llms.push('> PDFShift is a developer-first REST API that converts HTML, URLs, and raw markup into pixel-perfect PDFs, screenshots, and Open Graph images. Simple credit-based pricing with 50 free credits every month and no credit card required to start.', '')
llms.push('Every page on pdfshift.io is available as clean Markdown: append `.md` to any URL (e.g. `/pricing.md`) or send an `Accept: text/markdown` request header. The companion file [llms-full.txt](' + siteUrl + '/llms-full.txt) contains the full text of every page in a single document.', '')
llms.push('For full, up-to-date pricing details (plans, credits, and per-conversion overage rates), see [' + siteUrl + '/pricing.md](' + siteUrl + '/pricing.md).', '')
llms.push('The complete OpenAPI Specification for the PDFShift API is available at [https://api.pdfshift.io/openapi.json](https://api.pdfshift.io/openapi.json).')

llms.push('## Core pages')
if (home) llms.push(line('HTML to PDF API - Overview', home.mdUrl, 'What PDFShift does, key stats, and headline features.'))
if (pricing) llms.push(line('Pricing', pricing.mdUrl, 'Credit-based plans from Free (50 credits/mo) up to 100k+ conversions per month.'))
if (faq) llms.push(line('FAQ', faq.mdUrl, 'Common questions about trials, billing, security, and usage.'))
llms.push(line('API Documentation', 'https://docs.pdfshift.io', 'Full REST API reference for the /v3 conversion endpoint.'))
llms.push(line('OpenAPI Specification', 'https://api.pdfshift.io/openapi.json', 'Machine-readable OpenAPI (JSON) description of the PDFShift API.'))
llms.push('')

const canonical = guides.filter(d => /^guides\/python\/requests\//.test(d.rel))
const languages = Array.from(new Set(guides.map(d => d.fm.language).filter(Boolean))).sort()
llms.push('## Guides')
llms.push(`> ${guides.length}+ how-to guides covering ${languages.length} languages (${languages.join(', ')}) and their most popular HTTP libraries. Each task below exists for every language/library combination. Full text is in llms-full.txt.`)
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

llms.push('## Integrations & AI agents')
llms.push('> Guides for using PDFShift inside automation tools and AI-app builders. Full text is in llms-full.txt.')
for (const i of integrations) llms.push(line(i.fm.title, i.url, i.fm.description))
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
const ordered = [...core, ...guides, ...samples, ...integrations, ...legal]
const full = []
full.push('# PDFShift — Full Content', '')
full.push('> Complete text of pdfshift.io, generated from the site\'s source Markdown. PDFShift is a developer-first API that converts HTML, URLs, and raw markup into pixel-perfect PDFs, screenshots, and Open Graph images.', '')
full.push(`Source: ${siteUrl} — see also ${siteUrl}/llms.txt for a curated index.`)
full.push(`Pricing details: ${siteUrl}/pricing.md`)
full.push('OpenAPI Specification: https://api.pdfshift.io/openapi.json')
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
