<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-auto md:-translate-y-11" src="/images/agents/make.svg" alt="Make" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + Make</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                Generate PDFs automatically from your Make scenarios with PDFShift.
                Convert raw HTML or an existing URL into a document, then route it anywhere Make connects.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register" :arrow="true">Get your Free API key</Button>
                <Button to="#setup-guide" :light="true" hover="dark" :arrow-down="true">Build the scenario</Button>
            </div>
        </section>

        <article id="agent-nav-anchor" class="relative mx-auto mt-24 w-with-gutters max-w-agent-content">
            <AgentsCustomNav :items="pageSections" anchor-id="agent-nav-anchor" />

            <section id="setup-guide" class="scroll-mt-30" aria-labelledby="setup-title">
                <h2 id="setup-title">Step-by-Step Setup Guide</h2>
                <p class="mt-7">
                    PDFShift lets you generate PDF documents automatically from your Make scenarios, using Make&rsquo;s
                    <strong>HTTP</strong> module to call the PDFShift API.
                </p>

                <div class="mt-12 md:mt-12">
                    <h3>1. Get your PDFShift API key</h3>
                    <p>
                        Create a PDFShift account and retrieve your API key from the
                        <a class="underline" href="https://app.pdfshift.io/" target="_blank" rel="noopener">dashboard</a>.
                        You&rsquo;ll store the key securely in Make rather than adding it directly to your scenario.
                    </p>
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>2. Add the HTTP module</h3>
                    <p>
                        Create or open a scenario in Make, add a new module, and select <strong>HTTP &rarr; Make a request</strong>.
                        Make&rsquo;s HTTP module can connect to APIs that don&rsquo;t yet have their own native Make integration.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>3. Add your PDFShift API key</h3>
                    <p>For <strong>Authentication type</strong>, select <code>API key</code>, then create a new credential with:</p>
                    <ContentProsePre class="my-6" :code="credentialConfig" />
                    <p>
                        Make securely stores the API key in its keychain, so you don&rsquo;t need to manually add <code>X-API-Key</code>
                        to the Headers section.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>4. Configure the PDFShift request</h3>
                    <p>Configure the HTTP request as follows:</p>
                    <ContentProsePre class="my-6" :code="requestConfig" />
                    <p>
                        For the body input method, using a <strong>data structure</strong> is recommended because Make automatically escapes
                        values such as HTML correctly. Add a field named <code>source</code> and map your HTML or URL into it. The resulting
                        request is equivalent to:
                    </p>
                    <ContentProsePre class="my-6" :code="requestExample" />
                    <p>PDFShift will convert the HTML into a PDF.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>5. Return a PDF URL</h3>
                    <p>
                        For many Make workflows, working with a URL is convenient. Add another string field named <code>filename</code> to your
                        request:
                    </p>
                    <ContentProsePre class="my-6" :code="requestWithFilename" />
                    <p>
                        When <code>filename</code> is provided, PDFShift stores the generated file temporarily and returns JSON instead of the
                        PDF itself. The response contains information similar to:
                    </p>
                    <ContentProsePre class="my-6" :code="responseBody" dark />
                    <p>The generated file is stored by PDFShift for two days and then automatically deleted.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>6. Parse the response</h3>
                    <p>Set <strong>Parse response</strong> to <code>Yes</code> and run the module once. Make will detect the PDFShift response fields, including:</p>
                    <ContentProsePre class="my-6" :code="responseFields" />
                    <p>You can then map the <code>url</code> value into any following module. For example:</p>
                    <ContentProsePre class="my-6" :code="emailFlow" />
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>7. Download the PDF as a Make file</h3>
                    <p>
                        If another module requires an actual file rather than a URL, add <strong>HTTP &rarr; Download a file</strong> and map the
                        <code>url</code> returned by PDFShift into the URL field. Your scenario then becomes:
                    </p>
                    <ContentProsePre class="my-6" :code="downloadFlow" />
                    <p>This is useful when you want to attach the generated PDF to an email or save it permanently.</p>
                </div>
            </section>

            <section id="personalize" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="personalize-title">
                <h2 id="personalize-title">Generate <span class="text-purple-500">personalized PDFs</span></h2>
                <p class="mt-7">
                    The <code>source</code> parameter can contain HTML built from data in previous Make modules. Instead of hard-coding values:
                </p>
                <ContentProsePre class="my-6" language="html" :code="htmlSample" />
                <p>Map values from previous modules into the HTML:</p>
                <ContentProsePre class="my-6" language="html" :code="htmlMapped" />
                <p>Make replaces these values on every scenario execution before sending the HTML to PDFShift, giving you completely personalized PDFs.</p>

                <div class="mt-12 md:mt-16">
                    <h3>Generate a PDF from a website</h3>
                    <p>
                        You don&rsquo;t have to generate HTML yourself. If a previous module provides a URL, map it directly into <code>source</code>:
                    </p>
                    <ContentProsePre class="my-6" :code="urlRequestBody" />
                    <p>
                        PDFShift will load the webpage and convert it to PDF. For private pages, you can also use PDFShift&rsquo;s authentication,
                        cookies, or custom HTTP headers options.
                    </p>
                </div>
            </section>

            <section id="customize" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="customize-title">
                <h2 id="customize-title">Customize &amp; <span class="text-purple-500">Automate</span></h2>
                <p class="mt-7">You can add any supported PDFShift option to the JSON request. For example:</p>
                <ContentProsePre class="my-6" :code="customizeBody" />
                <p>PDFShift also supports options including:</p>
                <ul class="mt-2">
                    <li>Page size and margins</li>
                    <li>Headers and footers</li>
                    <li>Custom CSS</li>
                    <li>Custom JavaScript</li>
                    <li>Delayed rendering</li>
                    <li>Cookies and HTTP authentication</li>
                    <li>PDF protection</li>
                    <li>Sandbox mode and webhooks</li>
                </ul>
                <p class="mt-6">All of these values can be mapped dynamically from previous Make modules.</p>

                <div class="mt-12 md:mt-16">
                    <h3>Example: automatically generate invoices</h3>
                    <p>A typical Make scenario could look like:</p>
                    <ContentProsePre class="my-6" :code="invoiceScenario" />
                    <p>Every new payment can automatically generate and send its own personalized PDF invoice.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Example: generate reports from Airtable</h3>
                    <p>Another workflow could be:</p>
                    <ContentProsePre class="my-6" :code="airtableScenario" />
                    <p>The same principle works with Notion, Google Sheets, CRMs, databases, webhooks, or any other Make integration.</p>
                </div>

                <div class="mt-8 rounded-xl border border-purple-400 bg-purple-100 p-6 md:mt-10">
                    <h3 class="!mb-2">PDF URLs are temporary</h3>
                    <p>
                        When you use the <code>filename</code> parameter, the generated document is stored by PDFShift and its URL remains
                        available for two days. To keep it permanently, add a module to download and save it to your own storage. If you
                        don&rsquo;t want PDFShift to store the document at all, omit <code>filename</code> and PDFShift returns the PDF directly.
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

const credentialConfig = `Name: PDFShift

Key: YOUR_PDFSHIFT_API_KEY

API key placement: Header

API key parameter name: X-API-Key`

const requestConfig = `URL: https://api.pdfshift.io/v3/convert/pdf

Method: POST
Body content type: application/json`

const requestExample = `{
    "source": "<html><body><h1>Hello from Make!</h1></body></html>"
}`

const requestWithFilename = `{
    "source": "<html><body><h1>Hello from Make!</h1></body></html>",
    "filename": "document.pdf"
}`

const responseBody = `{
    "success": true,
    "url": "https://...",
    "filesize": 34980,
    "duration": 1237,
    "pdf_pages": 1
}`

const responseFields = `url
filesize
duration
pdf_pages`

const emailFlow = `Order created
      ↓
Generate HTML
      ↓
PDFShift
      ↓
PDF URL
      ↓
Send email`

const downloadFlow = `Generate HTML
      ↓
PDFShift
      ↓
PDF URL
      ↓
HTTP: Download a file
      ↓
PDF file
      ↓
Google Drive / Email / Dropbox / S3 / etc.`

const htmlSample = `<!doctype html>
<html>
<body>
    <h1>Invoice #1234</h1>

    <p>Customer: Acme Inc.</p>
    <p>Total: €149.00</p>
</body>
</html>`

const htmlMapped = `<h1>Invoice #{{Invoice Number}}</h1>

<p>Customer: {{Customer Name}}</p>
<p>Total: {{Total}}</p>`

const urlRequestBody = `{
    "source": "https://example.com/invoices/1234",
    "filename": "invoice-1234.pdf"
}`

const customizeBody = `{
    "source": "<html>...</html>",
    "filename": "invoice.pdf",
    "landscape": false,
    "use_print": true,
    "margin": "20px"
}`

const invoiceScenario = `Stripe
Watch Payments
      ↓
Create HTML invoice
      ↓
HTTP
PDFShift conversion
      ↓
HTTP
Download PDF
      ↓
Google Drive
Upload PDF
      ↓
Gmail
Send invoice`

const airtableScenario = `Airtable
Watch Records
      ↓
Generate HTML report
      ↓
PDFShift
Generate PDF
      ↓
Download PDF
      ↓
Upload to storage
      ↓
Update Airtable record
with PDF URL`

const resources = [
    {
        title: 'Make HTTP Module',
        description: 'Learn how Make’s HTTP module connects to any API without a native integration.',
        cta: 'View Make Docs',
        href: 'https://apps.make.com/http'
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + Make Integration'
const description = 'Generate PDFs automatically from your Make scenarios with PDFShift — convert raw HTML or a URL to PDF and route it anywhere Make connects.'
const canonicalUrl = 'https://pdfshift.io/agents/make'

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
                name: 'How to generate PDFs in Make with PDFShift',
                description,
                inLanguage: 'en-US',
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
                tool: [{ '@type': 'HowToTool', name: 'Make HTTP module' }],
                step: [
                    { '@type': 'HowToStep', name: 'Get your PDFShift API key', text: 'Create a PDFShift account and retrieve your API key from the dashboard.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Add the HTTP module', text: 'In a Make scenario, add a module and select HTTP > Make a request.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Add your PDFShift API key', text: 'Choose API key authentication and store the X-API-Key header credential in Make.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Configure the PDFShift request', text: 'POST to api.pdfshift.io/v3/convert/pdf with a JSON body containing the source field.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Return a PDF URL', text: 'Add a filename field so PDFShift returns JSON with a hosted PDF URL instead of binary data.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Parse the response', text: 'Set Parse response to Yes and map the url value into the following modules.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Download the PDF as a Make file', text: 'Use HTTP > Download a file with the returned url when a module needs an actual file.', url: `${canonicalUrl}#setup-guide` },
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
                    { '@type': 'ListItem', position: 3, name: 'Make', item: canonicalUrl },
                ],
            }),
        },
    ],
})
</script>
