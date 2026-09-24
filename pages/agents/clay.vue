<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-auto md:-translate-y-11" src="/images/agents/clay.png" alt="Clay" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + Clay</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                Generate a PDF for every row in your Clay tables with PDFShift&rsquo;s HTTP API enrichment.
                Turn reports, proposals, invoices, and more into documents, straight from your data.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register" :arrow="true">Get your Free API key</Button>
                <Button to="#setup-guide" :light="true" hover="dark" :arrow-down="true">Set up the enrichment</Button>
            </div>
        </section>

        <article id="agent-nav-anchor" class="relative mx-auto mt-24 w-with-gutters max-w-agent-content">
            <AgentsCustomNav :items="pageSections" anchor-id="agent-nav-anchor" />

            <section id="setup-guide" class="scroll-mt-30" aria-labelledby="setup-title">
                <h2 id="setup-title">Step-by-Step Setup Guide</h2>
                <p class="mt-7">
                    PDFShift lets you generate PDF documents directly from your Clay tables.<br />
                    Each row can generate its own PDF using data from that row, wired up through Clay&rsquo;s <strong>HTTP API</strong> enrichment.
                </p>

                <div class="mt-12 md:mt-12">
                    <h3>1. Get your PDFShift API key</h3>
                    <p>
                        Create a PDFShift account and retrieve your API key from the
                        <a class="underline" href="https://app.pdfshift.io/" target="_blank" rel="noopener">dashboard</a>.
                        You&rsquo;ll add this key securely to Clay rather than putting it directly inside your HTTP request.
                    </p>
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>2. Add an HTTP API enrichment</h3>
                    <p>In your Clay table:</p>
                    <ol class="my-4 list-decimal pl-10 text-base leading-7 md:text-lg md:leading-8">
                        <li>Click <strong>Add enrichment</strong>.</li>
                        <li>Search for <strong>HTTP API</strong>.</li>
                        <li>Select <strong>HTTP API</strong>.</li>
                    </ol>
                    <p>Clay&rsquo;s HTTP API integration can connect to any service that exposes an HTTP API, including PDFShift.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>3. Add your PDFShift API key</h3>
                    <p>
                        In the HTTP API configuration, open <strong>Select header account</strong> and click <strong>Add account</strong>.<br />
                        Add the following header:
                    </p>
                    <ContentProsePre class="my-6" code="X-API-Key: YOUR_PDFSHIFT_API_KEY" />
                    <p>Give the connection a name such as:</p>
                    <ContentProsePre class="my-6" code="PDFShift" />
                    <p>Clay stores the credentials at the workspace level, so your API key never appears directly in the table configuration.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>4. Configure the PDFShift request</h3>
                    <p>Configure the HTTP API enrichment with:</p>
                    <ContentProsePre class="my-6" :code="requestConfig" />
                    <p>
                        PDFShift accepts either a URL or raw HTML through the <code>source</code> property. If your Clay table has a column
                        named <strong>HTML</strong>, use a JSON body similar to:
                    </p>
                    <ContentProsePre class="my-6" :code="requestBody" />
                    <p>
                        When editing the request in Clay, select your <strong>HTML</strong> column using Clay&rsquo;s column picker rather than
                        typing the column reference manually.
                    </p>
                    <p class="mt-4">
                        The <code>filename</code> option matters here. Without it, PDFShift returns the PDF as binary data. With <code>filename</code>,
                        PDFShift stores the generated document temporarily and returns a JSON response containing the PDF URL instead, which is
                        much easier to work with in Clay.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>5. Store the generated PDF URL</h3>
                    <p>A successful PDFShift response contains information similar to:</p>
                    <ContentProsePre class="my-6" :code="responseBody" dark />
                    <p>In Clay&rsquo;s <strong>Field paths to return</strong> setting, select:</p>
                    <ContentProsePre class="my-6" code="url" />
                    <p>Clay will then create a column containing the generated PDF URL for every row. Your workflow becomes:</p>
                    <ContentProsePre class="my-6" :code="flowDiagram" />
                </div>
            </section>

            <section id="personalize" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="personalize-title">
                <h2 id="personalize-title">Generate <span class="text-purple-500">personalized PDFs</span></h2>
                <p class="mt-7">
                    The HTML sent to PDFShift can contain any information from your Clay table. Create an HTML column that assembles the
                    document, for example:
                </p>
                <ContentProsePre class="my-6" language="html" :code="htmlSample" />
                <p>
                    Use Clay formulas or AI columns to generate this HTML dynamically for every row, and PDFShift converts each version
                    into its own PDF.
                </p>

                <div class="mt-12 md:mt-16">
                    <h3>Generate PDFs from URLs</h3>
                    <p>
                        PDFShift can also convert an existing web page. If your Clay table contains a column named <strong>Website</strong>,
                        your request can simply use that URL:
                    </p>
                    <ContentProsePre class="my-6" :code="urlRequestBody" />
                    <p>PDFShift will load the page and return its PDF version.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Use Clay AI to configure PDFShift</h3>
                    <p>Clay&rsquo;s HTTP API integration includes an AI-assisted configuration mode. You can ask it something similar to:</p>
                    <ContentProsePre class="my-6" :code="aiPrompt" />
                    <p>Review the generated configuration and test it on one row before running it across the entire table.</p>
                </div>
            </section>

            <section id="customize" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="customize-title">
                <h2 id="customize-title">Customize &amp; <span class="text-purple-500">Automate</span></h2>
                <p class="mt-7">You can pass additional PDFShift parameters in the request body. For example:</p>
                <ContentProsePre class="my-6" :code="customizeBody" />
                <p>PDFShift also supports features such as:</p>
                <ul class="mt-2">
                    <li>Custom page formats</li>
                    <li>Margins</li>
                    <li>Headers and footers</li>
                    <li>Custom CSS</li>
                    <li>Custom JavaScript</li>
                    <li>Delayed rendering</li>
                    <li>Authentication and cookies</li>
                    <li>Webhooks</li>
                </ul>
                <p class="mt-6">These parameters can also be populated dynamically from Clay columns.</p>

                <div class="mt-12 md:mt-16">
                    <h3>Automatically generate PDFs for new rows</h3>
                    <p>
                        Once your HTTP API enrichment works correctly, enable Clay&rsquo;s <strong>Auto-update</strong> option. Clay can then
                        automatically call PDFShift whenever the input data for a row changes.
                    </p>
                    <p class="mt-4">
                        Use <strong>Only run if</strong> to control which rows should generate a PDF, which prevents unnecessary conversions.
                        For example, generate the PDF only when:
                    </p>
                    <ContentProsePre class="my-6" code="Status = Ready" />
                </div>

                <div class="mt-8 rounded-xl border border-purple-400 bg-purple-100 p-6 md:mt-10">
                    <h3 class="!mb-2">PDF URLs are temporary</h3>
                    <p>
                        When using the <code>filename</code> parameter, PDFShift stores the generated PDF temporarily and returns its URL.
                        The file is automatically deleted after two days. If the PDF needs to remain available permanently, download it or
                        copy it to your own storage as part of your workflow.
                    </p>
                </div>
            </section>
        </article>
    </NuxtLayout>
</template>

<script setup>
import AgentsCustomNav from '~/components/agents/CustomNav.vue'
import ContentProsePre from '~/components/content/ProsePre.vue'

const pageSections = [
    { id: 'setup-guide', label: 'Step-by-step Setup Guide' },
    { id: 'use-cases', label: 'What You Can Generate' },
    { id: 'personalize', label: 'Personalized PDFs' },
    { id: 'customize', label: 'Customize & Automate' },
    { id: 'related-resources', label: 'Related Resources' },
]

const requestConfig = `Method: POST

Endpoint:
api.pdfshift.io/v3/convert/pdf`

const requestBody = `{
    "source": "/HTML",
    "filename": "document.pdf"
}`

const responseBody = `{
    "success": true,
    "url": "PDF_URL",
    "filesize": 34980,
    "duration": 1237,
    "pdf_pages": 1
}`

const flowDiagram = `Clay row
   ↓
HTML or URL
   ↓
PDFShift
   ↓
PDF generated
   ↓
PDF URL added to Clay`

const htmlSample = `<!doctype html>
<html>
<body>
    <h1>Company Report</h1>

    <h2>Acme Inc.</h2>

    <p>Industry: SaaS</p>
    <p>Employees: 125</p>

    <p>
        This report was automatically generated
        using Clay and PDFShift.
    </p>
</body>
</html>`

const urlRequestBody = `{
    "source": "/Website",
    "filename": "website.pdf"
}`

const aiPrompt = `Configure an API call to PDFShift that converts the HTML
from my HTML column into a PDF.

Send a POST request to the PDFShift PDF conversion endpoint.

Authenticate using the X-API-Key header from my
PDFShift connection.

Send the HTML column as the "source" parameter and use
"document.pdf" as the filename.

Return the "url" property from the JSON response.`

const customizeBody = `{
    "source": "/HTML",
    "filename": "document.pdf",
    "landscape": true,
    "use_print": true
}`

const resources = [
    {
        title: 'Clay HTTP API',
        description: 'Learn how Clay’s HTTP API enrichment connects to any external service.',
        cta: 'Visit Clay',
        href: 'https://www.clay.com'
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + Clay Integration'
const description = 'Generate a PDF for every row in your Clay tables with the PDFShift HTTP API enrichment — reports, proposals, invoices, and more.'
const canonicalUrl = 'https://pdfshift.io/agents/clay'

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
                '@type': 'HowTo',
                name: 'How to generate PDFs in Clay with PDFShift',
                description,
                inLanguage: 'en-US',
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
                tool: [{ '@type': 'HowToTool', name: 'Clay HTTP API enrichment' }],
                step: [
                    { '@type': 'HowToStep', name: 'Get your PDFShift API key', text: 'Create a PDFShift account and retrieve your API key from the dashboard.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Add an HTTP API enrichment', text: 'In your Clay table, click Add enrichment, search for HTTP API, and select HTTP API.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Add your PDFShift API key', text: 'Open Select header account, add an account, and store the X-API-Key header with your PDFShift API key.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Configure the PDFShift request', text: 'Send a POST request to api.pdfshift.io/v3/convert/pdf with the source column and a filename in the JSON body.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Store the generated PDF URL', text: 'Return the url field so Clay creates a column with the generated PDF URL for every row.', url: `${canonicalUrl}#setup-guide` },
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
                    { '@type': 'ListItem', position: 2, name: 'Integrations', item: 'https://pdfshift.io/agents' },
                    { '@type': 'ListItem', position: 3, name: 'Clay', item: canonicalUrl },
                ],
            }),
        },
    ],
})
</script>
