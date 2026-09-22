<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-48 md:-translate-y-11" src="/images/agents/mcp.svg" alt="Model Context Protocol" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift MCP Server</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                The PDFShift MCP server exposes conversion, templates, credits, and logs to Claude, Cursor, and any Model Context Protocol client over a single hosted endpoint.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register" :arrow="true">Get your Free API key</Button>
                <Button to="#connect" :light="true" hover="dark" :arrow-down="true">Connect your client</Button>
            </div>
        </section>

        <div class="relative mx-auto mt-12 w-with-gutters max-w-agent-content">
            <section id="overview" class="agent-overview-card min-h-0 rounded-xl border border-purple-400 bg-white px-6 py-7 md:px-11 md:pb-11 md:pt-12" aria-labelledby="overview-title">
                <h2 id="overview-title">Overview</h2>
                <p class="mt-4 leading-7 md:mt-6">
                    The <a class="underline" href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Model Context Protocol</a> (MCP)
                    is an open standard that lets AI agents call external tools.
                    PDFShift ships a hosted MCP server so your agent can turn HTML or a URL into a PDF, PNG, JPEG, or WEBP, manage reusable HTML templates,
                    and check credits and conversion logs &mdash; all through natural language.
                </p>
                <p class="mt-4">
                    It&rsquo;s a remote server (Streamable HTTP), so there&rsquo;s nothing to install or run locally: point your client at the endpoint,
                    add your API key, and the tools appear.
                </p>
                <h3 class="mt-8 text-xl font-medium leading-6 md:text-2xl md:leading-7">What you get</h3>
                <ul class="mt-2 list-disc pl-5 text-base leading-7 md:text-lg md:leading-8">
                    <li>Convert HTML or a URL to PDF, PNG, JPEG, or WEBP</li>
                    <li>Create, read, update, and render reusable HTML templates</li>
                    <li>Check credit usage, plans, and recent conversion logs</li>
                    <li>Works with any MCP client &mdash; Claude, Cursor, and more</li>
                </ul>
            </section>

            <AgentsCustomNav :items="pageSections" />
        </div>

        <div class="mx-auto w-with-gutters max-w-agent-content">
            <section id="connect" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="connect-title">
                <h2 id="connect-title">Connecting your <span class="text-purple-500">client</span></h2>
                <p class="mt-7">All clients need the same three things: the endpoint URL, the HTTP transport, and your API key sent as a header.</p>
                <ContentProsePre class="my-6" :code="connectionDetails" />
                <p>
                    You can send the key as either <code>X-API-Key</code>.
                    Discovery (listing tools) works without a key; running a tool requires one.
                </p>

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
                <h2 id="tools-title">Available <span class="text-purple-500">tools</span></h2>
                <p class="mt-7">The server exposes {{ tools.length }} tools. Your agent picks the right one automatically &mdash; you just describe what you want.</p>
                <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div v-for="tool in tools" :key="tool.name" class="rounded-xl border border-purple-400 bg-white px-6 py-5 shadow-agent-card">
                        <h3 class="font-code text-base font-medium text-purple-600">{{ tool.name }}</h3>
                        <p class="mt-2 text-base font-light leading-6">{{ tool.description }}</p>
                    </div>
                </div>
                <p class="mt-6">The <code>convert</code> and <code>generate_from_template</code> tools accept any documented PDFShift option (margins, headers &amp; footers, watermarks, protection, cookies, and more) as extra parameters.</p>
            </section>

            <section id="usage" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="usage-title">
                <h2 id="usage-title">Example prompts</h2>
                <p class="mt-10">Once connected, just ask your agent in plain language. For example:</p>
                <ContentProsePre class="my-6" :code="examplePrompts" />
                <p>Conversions return a temporary download URL, valid for about 2 days. Add <code>sandbox</code> while experimenting to generate free, watermarked documents that don&rsquo;t consume credits.</p>
            </section>
        </div>
    </NuxtLayout>
</template>

<script setup>
import AgentsCustomNav from '~/components/agents/CustomNav.vue'
import ContentProsePre from '~/components/content/ProsePre.vue'

const pageSections = [
    { id: 'connect', label: 'Connecting your client' },
    { id: 'tools', label: 'Available tools' },
    { id: 'usage', label: 'Example prompts' },
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

const title = 'PDFShift MCP Server - PDFs for AI Agents'
const description = 'Connect any Model Context Protocol client to the hosted PDFShift MCP server at https://api.pdfshift.io/mcp. Convert HTML or URLs to PDF, manage templates, and check credits from Claude, Cursor, and more.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>

<style scoped>
.agent-overview-card {
    box-shadow: 0 8px 18px rgba(108, 71, 255, 0.1);
}

.agent-page-nav {
    left: calc(50% + 27.625rem);
    min-height: 275px;
    box-shadow: 0 8px 12px rgba(108, 71, 255, 0.1);
}

@media (min-width: 768px) {
    .agent-overview-card {
        min-height: 500px;
    }
}
</style>
