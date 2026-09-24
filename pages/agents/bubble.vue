<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-auto md:-translate-y-11" src="/images/agents/bubble.svg" alt="Bubble" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + Bubble</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                Generate PDFs directly from your Bubble application with PDFShift.
                Turn dynamic Bubble data or an existing page into invoices, reports, certificates, and more, all through the API Connector.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register" :arrow="true">Get your Free API key</Button>
                <Button to="#setup-guide" :light="true" hover="dark" :arrow-down="true">Set up the API Connector</Button>
            </div>
        </section>

        <article id="agent-nav-anchor" class="relative mx-auto mt-24 w-with-gutters max-w-agent-content">
            <AgentsCustomNav :items="pageSections" anchor-id="agent-nav-anchor" />

            <section id="setup-guide" class="scroll-mt-30" aria-labelledby="setup-title">
                <h2 id="setup-title">Step-by-Step Setup Guide</h2>
                <p class="mt-7">
                    PDFShift lets you turn dynamic Bubble data into invoices, reports, certificates, contracts, or receipts. It can convert
                    either raw HTML or an existing webpage URL, wired up through Bubble&rsquo;s <strong>API Connector</strong>.
                </p>

                <div class="mt-12 md:mt-12">
                    <h3>1. Get your PDFShift API key</h3>
                    <p>
                        Create a PDFShift account and retrieve your API key from the
                        <a class="underline" href="https://app.pdfshift.io/" target="_blank" rel="noopener">dashboard</a>.
                        Your key should remain private and never be exposed in a page, workflow parameter, Option Set, or client-side JavaScript.
                        Bubble&rsquo;s API Connector supports private API keys stored on Bubble&rsquo;s servers.
                    </p>
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>2. Open the API Connector</h3>
                    <p>In your Bubble application, open the <strong>API Connector</strong> section, create a new API named <code>PDFShift</code>, and for authentication select:</p>
                    <ContentProsePre class="my-6" :code="authType" />
                    <p>Configure the key as:</p>
                    <ContentProsePre class="my-6" :code="keyConfig" />
                    <p>Bubble stores private API keys securely and sends the request through its servers.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>3. Create the PDF conversion call</h3>
                    <p>Add a new API call named <code>Generate PDF</code> and configure it with:</p>
                    <ContentProsePre class="my-6" :code="callConfig" />
                    <p>Add this header:</p>
                    <ContentProsePre class="my-6" :code="contentTypeHeader" />
                    <p>Then use the following JSON body:</p>
                    <ContentProsePre class="my-6" :code="callBody" />
                    <p>
                        Bubble recognizes values surrounded with <code>&lt;</code> and <code>&gt;</code> as dynamic parameters. Make sure the
                        <code>source</code> parameter is <strong>not</strong> marked private, because you&rsquo;ll provide its value dynamically from
                        your Bubble workflows.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>4. Initialize the call</h3>
                    <p>Give <code>source</code> a temporary value such as:</p>
                    <ContentProsePre class="my-6" language="html" :code="initSource" />
                    <p>
                        Then click <strong>Initialize call</strong>. This sends a test request to PDFShift and lets Bubble discover the structure of
                        the response. Because we supplied <code>filename</code>, PDFShift returns JSON instead of the PDF binary:
                    </p>
                    <ContentProsePre class="my-6" :code="responseBody" dark />
                    <p>
                        The <code>url</code> points to the generated PDF. PDFShift keeps files generated this way for two days and then
                        automatically deletes them.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>5. Generate a PDF from a Bubble workflow</h3>
                    <p>You can now use PDFShift from any Bubble workflow. For example, create a <code>Download invoice</code> button, then add a workflow action:</p>
                    <ContentProsePre class="my-6" :code="workflowAction" />
                    <p>For the <code>source</code> parameter, provide the HTML you want PDFShift to convert. For example:</p>
                    <ContentProsePre class="my-6" language="html" :code="invoiceHtml" />
                    <p>In a real Bubble application, these values can come from dynamic Bubble data. Your HTML could contain the equivalent of:</p>
                    <ContentProsePre class="my-6" language="html" :code="dynamicHtml" />
                    <p>Bubble builds the final HTML before sending it to PDFShift.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>6. Let the user download the PDF</h3>
                    <p>The <code>Generate PDF</code> action returns a <code>url</code>. In the next workflow action, use:</p>
                    <ContentProsePre class="my-6" :code="downloadAction" />
                    <p>and use:</p>
                    <ContentProsePre class="my-6" :code="resultUrl" />
                    <p>The browser will open the generated PDF. You can also display the URL in your application, email it to the user, or store it in your database.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>7. Save the PDF permanently in Bubble</h3>
                    <p>
                        PDFShift URLs generated using <code>filename</code> remain available for two days. To keep a PDF permanently, save it into
                        Bubble&rsquo;s own file storage. When assigning the PDF URL to a field of type <strong>file</strong>, use Bubble&rsquo;s:
                    </p>
                    <ContentProsePre class="my-6" :code="savedOperator" />
                    <p>operator. For example:</p>
                    <ContentProsePre class="my-6" :code="savedExample" />
                    <p>
                        Bubble will download the external file and store its own copy. Bubble supports saving files from external APIs this way,
                        with a maximum file size of 50 MB for the <code>:saved to Bubble Storage</code> operator. Your workflow can therefore look like:
                    </p>
                    <ContentProsePre class="my-6" :code="saveFlow" />
                </div>
            </section>

            <section id="from-page" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="from-page-title">
                <h2 id="from-page-title">Generate a PDF from a <span class="text-purple-500">Bubble page</span></h2>
                <p class="mt-7">
                    PDFShift can also generate PDFs from URLs. Instead of sending HTML, set <code>source</code> to the URL of the page:
                </p>
                <ContentProsePre class="my-6" :code="urlBody" />
                <p>
                    PDFShift will load the webpage and convert it to PDF. This is useful when the document already exists as a Bubble page.
                    For pages that require authentication or aren&rsquo;t publicly accessible, sending the HTML directly is usually easier,
                    though PDFShift also supports HTTP headers, cookies, and HTTP authentication when you need to convert protected URLs.
                </p>
            </section>

            <section id="customize" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="customize-title">
                <h2 id="customize-title">Customize the <span class="text-purple-500">generated PDF</span></h2>
                <p class="mt-7">You can add additional PDFShift options to your API Connector request. For example:</p>
                <ContentProsePre class="my-6" :code="customizeBody" />
                <p>You can make any of these values dynamic by turning them into Bubble parameters:</p>
                <ContentProsePre class="my-6" :code="dynamicParamsBody" />
                <p>
                    This lets you control PDFShift from your Bubble workflows. PDFShift also supports page formats, margins, headers and footers,
                    custom CSS, custom JavaScript, delayed rendering, cookies, authentication, PDF protection, and webhooks.
                </p>
            </section>

            <section id="plugin" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="plugin-title">
                <h2 id="plugin-title">Turn it into a <span class="text-purple-500">Bubble plugin</span></h2>
                <p class="mt-7">
                    Once the API Connector version works, you can turn it into a reusable Bubble plugin. Bubble&rsquo;s Plugin Editor supports API
                    connections directly, so the PDFShift plugin can expose actions such as:
                </p>
                <ContentProsePre class="my-6" :code="pluginActions" />
                <p>
                    Users would install <strong>PDFShift</strong> from the Bubble Marketplace, enter their PDFShift API key once, and then see actions
                    such as:
                </p>
                <ContentProsePre class="my-6" :code="pluginWorkflow" />
                <p>
                    in their Bubble workflows. Bubble&rsquo;s documentation also supports converting an existing API Connector setup into a plugin,
                    making it practical to build and test the integration in a normal Bubble application first.
                </p>

                <div class="mt-8 rounded-xl border border-purple-400 bg-purple-100 p-6 md:mt-10">
                    <h3 class="!mb-2">PDF URLs are temporary</h3>
                    <p>
                        When you use the <code>filename</code> parameter, the generated document is stored by PDFShift and its URL remains available
                        for two days. To keep it permanently, save it to Bubble Storage as shown above. If you don&rsquo;t want PDFShift to store the
                        document at all, omit <code>filename</code> and PDFShift returns the PDF directly instead.
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
    { id: 'from-page', label: 'Convert a Bubble Page' },
    { id: 'customize', label: 'Customize the PDF' },
    { id: 'plugin', label: 'Build a Plugin' },
    { id: 'related-resources', label: 'Related Resources' },
]

const authType = `Private key in header`

const keyConfig = `Key name: X-API-Key
Key value: YOUR_PDFSHIFT_API_KEY`

const callConfig = `Use as: Action

Method: POST
URL: https://api.pdfshift.io/v3/convert/pdf`

const contentTypeHeader = `Content-Type: application/json`

const callBody = `{
    "source": "<source>",
    "filename": "bubble-document"
}`

const initSource = `<html>
    <body>
        <h1>Hello from Bubble!</h1>
    </body>
</html>`

const responseBody = `{
    "success": true,
    "url": "https://...",
    "filesize": 34980,
    "duration": 1237,
    "pdf_pages": 1
}`

const workflowAction = `Plugins → PDFShift - Generate PDF`

const invoiceHtml = `<!doctype html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 40px;
        }

        h1 {
            margin-bottom: 30px;
        }
    </style>
</head>

<body>
    <h1>Invoice #1234</h1>

    <p>Customer: Acme Inc.</p>
    <p>Total: €149.00</p>
</body>
</html>`

const dynamicHtml = `<h1>Invoice #Current Invoice's Number</h1>

<p>
    Customer: Current Invoice's Customer's Name
</p>

<p>
    Total: Current Invoice's Total
</p>`

const downloadAction = `Navigation → Open an external website`

const resultUrl = `Result of step 1's url`

const savedOperator = `:saved to Bubble Storage`

const savedExample = `Result of step 1's url :saved to Bubble Storage`

const saveFlow = `User clicks "Generate invoice"
          ↓
Bubble builds HTML
          ↓
PDFShift generates PDF
          ↓
PDFShift returns URL
          ↓
Bubble saves PDF to Bubble Storage
          ↓
Invoice's PDF field is updated`

const urlBody = `{
    "source": "https://myapp.com/report/1234",
    "filename": "bubble-report"
}`

const customizeBody = `{
    "source": "<source>",
    "filename": "bubble-document",
    "landscape": false,
    "use_print": true,
    "margin": "20px"
}`

const dynamicParamsBody = `{
    "source": "<source>",
    "filename": "<filename>",
    "landscape": <landscape>
}`

const pluginActions = `Generate PDF
Generate PNG
Generate JPEG
Get recent conversions`

const pluginWorkflow = `Plugins → PDFShift - Generate PDF`

const resources = [
    {
        title: 'Bubble API Connector',
        description: 'Learn how Bubble’s API Connector calls external APIs securely.',
        cta: 'View Bubble Docs',
        href: 'https://manual.bubble.io'
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + Bubble Integration'
const description = 'Generate PDFs directly from your Bubble app with PDFShift. Turn dynamic Bubble data or an existing page into invoices, reports, and more through the API Connector.'
const canonicalUrl = 'https://pdfshift.io/agents/bubble'

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
                name: 'How to generate PDFs in Bubble with PDFShift',
                description,
                inLanguage: 'en-US',
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
                tool: [{ '@type': 'HowToTool', name: 'Bubble API Connector' }],
                step: [
                    { '@type': 'HowToStep', name: 'Get your PDFShift API key', text: 'Create a PDFShift account and retrieve your API key from the dashboard.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Open the API Connector', text: 'Create a new API named PDFShift and authenticate with a private key in the X-API-Key header.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Create the PDF conversion call', text: 'Add a Generate PDF action that POSTs to api.pdfshift.io/v3/convert/pdf with a source and filename body.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Initialize the call', text: 'Give source a temporary HTML value and click Initialize call so Bubble learns the JSON response structure.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Generate a PDF from a Bubble workflow', text: 'Add the PDFShift Generate PDF action to a workflow and provide dynamic HTML for the source parameter.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Let the user download the PDF', text: 'Open the returned url with Open an external website, or display, email, or store it.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Save the PDF permanently in Bubble', text: 'Use the :saved to Bubble Storage operator to store the generated PDF in Bubble file storage.', url: `${canonicalUrl}#setup-guide` },
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
                    { '@type': 'ListItem', position: 3, name: 'Bubble', item: canonicalUrl },
                ],
            }),
        },
    ],
})
</script>
