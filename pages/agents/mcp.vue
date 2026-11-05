<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-48 md:-translate-y-11" src="/images/agents/mcp.svg" alt="Model Context Protocol" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift MCP Server</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                PDFShift&rsquo;s MCP server lets Claude, Cursor or any Model Context Protocol client turn HTML or a URL into a PDF with one tool call. We host it at api.pdfshift.io/mcp, so there&rsquo;s no browser to install.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register/" :arrow="true">Get your Free API key</Button>
                <Button to="#connect" :light="true" hover="dark" :arrow-down="true">Connect your client</Button>
            </div>
        </section>

        <div id="agent-nav-anchor" class="relative mx-auto mt-24 w-with-gutters max-w-agent-content">
            <AgentsCustomNav :items="pageSections" anchor-id="agent-nav-anchor" />

            <section id="connect" class="scroll-mt-30" aria-labelledby="connect-title">
                <h2 id="connect-title">Connect the PDF MCP server to <span class="text-purple-500">Claude</span> and other clients</h2>
                <p class="mt-7">All clients need the same three things: the endpoint URL, the HTTP transport, and your API key sent as a header.</p>
                <ContentProsePre class="my-6" :code="connectionDetails" />
                <p>
                    Discovery (listing tools) works without a key; running a tool requires one.
                </p>

                <div class="mt-12">
                    <h3>Listed in the official MCP Registry</h3>
                    <p>
                        Search the <a class="underline" href="https://registry.modelcontextprotocol.io/?q=pdfshift" target="_blank" rel="noopener">registry</a> for pdfshift and you&rsquo;ll find us as <code>io.github.cnicodeme/pdfshift</code>, pointing to the same endpoint.
                    </p>
                </div>

                <div class="mt-12">
                    <h3>Claude Code</h3>
                    <p>Add the server in one command, then restart your session:</p>
                    <ContentProsePre class="my-6" :code="claudeCodeCmd" />
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Cursor & other HTTP-native clients</h3>
                    <p>Add PDFShift to your MCP configuration (for Cursor, <code>~/.cursor/mcp.json</code>):</p>
                    <ContentProsePre class="my-6" :code="httpConfig" />
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Claude Desktop & stdio-only clients</h3>
                    <p>For clients that only speak stdio, bridge to the remote server with <code>mcp-remote</code>:</p>
                    <ContentProsePre class="my-6" :code="stdioConfig" />
                    <p>Restart the client afterwards so it picks up the new server.</p>
                </div>
            </section>

            <section id="tools" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="tools-title">
                <h2 id="tools-title">Tools to convert <span class="text-purple-500">HTML or a URL</span> to PDF, manage templates and check credits</h2>
                <p class="mt-7">The server exposes {{ tools.length }} tools. Your agent picks the right one automatically; you just describe what you want.</p>
                <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2" role="list">
                    <div v-for="tool in tools" :key="tool.name" role="listitem" class="rounded-xl border border-purple-400 bg-white px-6 py-5 shadow-agent-card">
                        <h3 class="font-code text-base font-medium text-purple-600">{{ tool.name }}</h3>
                        <p class="mt-2 text-base font-light leading-6">{{ tool.description }}</p>
                    </div>
                </div>
                <p class="mt-6">The <code>convert</code> and <code>generate_from_template</code> tools accept any documented PDFShift option (margins, headers &amp; footers, watermarks, protection, cookies, and more) as extra parameters.</p>
            </section>

            <section id="usage" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="usage-title">
                <h2 id="usage-title">Example prompts for PDF generation</h2>
                <p class="mt-10">Once connected, just ask your agent in plain language. For example:</p>
                <ContentProsePre class="my-6" :code="examplePrompts" />
                <p>Conversions return a temporary download URL, valid for about 2 days. Add <code>sandbox</code> while experimenting to generate free, watermarked documents that don&rsquo;t consume credits.</p>
            </section>

            <section id="browser-mcp" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="browser-mcp-title">
                <h2 id="browser-mcp-title">A <span class="text-purple-500">hosted PDF server</span> vs Puppeteer or Playwright MCP</h2>
                <p class="mt-7">
                    An agent that needs a PDF doesn&rsquo;t need a browser.
                    We run Chromium on our servers, and your agent hands <code>convert</code> the HTML or URL and gets a download link back.
                </p>
                <p class="mt-6">
                    With a browser MCP server, the browser runs wherever that server runs.
                    Playwright&rsquo;s MCP server saves a page as a PDF only when you start it with <code>--caps=pdf</code>, and its <code>browser_pdf_save</code> tool writes the file to the workspace or output folder on that machine.
                    The reference Puppeteer MCP server is archived, and it has screenshot tools but no PDF tool.
                </p>
            </section>
        </div>
    </NuxtLayout>
</template>

<script setup>
import AgentsCustomNav from '~/components/agents/CustomNav.vue'
import ContentProsePre from '~/components/content/ProsePre.vue'

const pageSections = [
    { id: 'connect', label: 'Connect your client' },
    { id: 'tools', label: 'Tools' },
    { id: 'usage', label: 'Example prompts' },
    { id: 'browser-mcp', label: 'Hosted vs browser MCP' },
    { id: 'security', label: 'Security' },
    { id: 'related-resources', label: 'Related Resources' },
]

const connectionDetails = `Endpoint: https://api.pdfshift.io/mcp
Transport: Streamable HTTP
Auth header: X-API-Key: YOUR_PDFSHIFT_API_KEY`

const claudeCodeCmd = `claude mcp add --transport http pdfshift https://api.pdfshift.io/mcp \\
  --header "X-API-Key: YOUR_PDFSHIFT_API_KEY"`

const httpConfig = `{
  "mcpServers": {
    "pdfshift": {
      "type": "http",
      "url": "https://api.pdfshift.io/mcp",
      "headers": {
        "X-API-Key": "YOUR_PDFSHIFT_API_KEY"
      }
    }
  }
}`

const stdioConfig = `{
  "mcpServers": {
    "pdfshift": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://api.pdfshift.io/mcp",
        "--header",
        "X-API-Key:YOUR_PDFSHIFT_API_KEY"
      ]
    }
  }
}`

const examplePrompts = `"Convert https://example.com to a PDF in landscape."

"Turn this HTML into a PNG: <h1>Hello</h1>"

"Create a template called invoice, then render it to
 PDF with customer 'Acme Inc.' and total '$149.00'."

"How many PDFShift credits do I have left?"

"Show my last 10 failed conversions."`

const tools = [
    { name: 'convert', description: 'Convert an HTML document or a URL to PDF, PNG, JPEG, or WEBP. Returns a temporary download URL.' },
    { name: 'list_templates', description: 'List all saved HTML templates for the account.' },
    { name: 'get_template', description: 'Get the raw HTML content of a template by its slug.' },
    { name: 'create_template', description: 'Create a new reusable HTML template.' },
    { name: 'update_template', description: 'Update the name and/or HTML content of an existing template.' },
    { name: 'delete_template', description: 'Delete a template by its slug.' },
    { name: 'generate_from_template', description: 'Render a saved template to HTML, PDF, PNG, JPEG, or WEBP with template variables.' },
    { name: 'credits_usage', description: 'Get current credit usage for the account (remaining, total, used).' },
    { name: 'pricing', description: 'List available PDFShift plans and their pricing.' },
    { name: 'list_logs', description: 'List recent conversion logs, with optional status and key filters.' },
    { name: 'get_log', description: 'Get a single conversion log by its request id.' },
]

const resources = [
    {
        title: 'Model Context Protocol',
        description: 'Learn how MCP works and which clients support remote servers.',
        cta: 'Visit the MCP Protocol',
        href: 'https://modelcontextprotocol.io',
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift MCP Server: Generate PDFs from HTML or a URL'
const description = 'Claude, Cursor or any MCP client can turn HTML or a URL into a PDF with one tool call. PDFShift\'s MCP server is hosted and listed in the official MCP Registry.'
const canonicalUrl = 'https://pdfshift.io/agents/mcp/'

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonicalUrl,
    ogType: 'article',
    twitterTitle: title,
    twitterDescription: description,
})

useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'PDFShift MCP Server',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Any (remote Streamable HTTP endpoint)',
                description,
                url: canonicalUrl,
                featureList: tools.map(tool => tool.name),
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                publisher: { '@type': 'Organization', '@id': 'https://pdfshift.io/#organization', name: 'PDFShift', url: 'https://pdfshift.io' },
            }),
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                name: 'How to connect a client to the PDFShift MCP server',
                description,
                inLanguage: 'en-US',
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
                step: [
                    { '@type': 'HowToStep', name: 'Get the connection details', text: 'Point your client at the endpoint https://api.pdfshift.io/mcp using the Streamable HTTP transport.', url: `${canonicalUrl}#connect` },
                    { '@type': 'HowToStep', name: 'Add the server to your client', text: 'Add PDFShift to your MCP configuration in Claude Code, Cursor, Claude Desktop, or any MCP client.', url: `${canonicalUrl}#connect` },
                    { '@type': 'HowToStep', name: 'Authenticate with your API key', text: 'Send your PDFShift API key as an X-API-Key header or as Authorization: Bearer.', url: `${canonicalUrl}#connect` },
                    { '@type': 'HowToStep', name: 'Ask your agent', text: 'Describe what you want in plain language and the agent picks the right tool automatically.', url: `${canonicalUrl}#usage` },
                ],
            }),
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pdfshift.io' },
                    { '@type': 'ListItem', position: 2, name: 'Integrations', item: 'https://pdfshift.io/agents/' },
                    { '@type': 'ListItem', position: 3, name: 'MCP Server', item: canonicalUrl },
                ],
            }),
        },
    ],
})
</script>

<style scoped>
.agent-page-nav {
    left: calc(50% + 27.625rem);
    min-height: 275px;
    box-shadow: 0 8px 12px rgba(108, 71, 255, 0.1);
}
</style>
