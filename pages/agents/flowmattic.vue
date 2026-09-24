<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-auto md:-translate-y-11" src="/images/agents/flowmattic.png" alt="FlowMattic" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + FlowMattic</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                Generate PDFs from HTML or webpages directly inside your FlowMattic workflows with PDFShift.
                Connect it in minutes with the API Module, or build a reusable Custom App.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register" :arrow="true">Get your Free API key</Button>
                <Button to="#api-module" :light="true" hover="dark" :arrow-down="true">Build the workflow</Button>
            </div>
        </section>

        <article id="agent-nav-anchor" class="relative mx-auto mt-24 w-with-gutters max-w-agent-content">
            <AgentsCustomNav :items="pageSections" anchor-id="agent-nav-anchor" />

            <section id="api-module" class="scroll-mt-30" aria-labelledby="api-module-title">
                <h2 id="api-module-title">Option 1: Use the <span class="text-purple-500">API Module</span></h2>
                <p class="mt-7">
                    This is the quickest way to get started. FlowMattic&rsquo;s API module can send POST requests to any external REST API,
                    including PDFShift.
                </p>

                <div class="mt-12 md:mt-12">
                    <h3>1. Get your PDFShift API key</h3>
                    <p>
                        Create a PDFShift account and copy your API key from the
                        <a class="underline" href="https://app.pdfshift.io/" target="_blank" rel="noopener">dashboard</a>.
                        PDFShift authenticates requests using the HTTP header:
                    </p>
                    <ContentProsePre class="my-6" code="X-API-Key: YOUR_API_KEY" />
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>2. Add an API action to FlowMattic</h3>
                    <p>Open your FlowMattic workflow, add a new action, and select:</p>
                    <ContentProsePre class="my-6" code="API → POST" />
                    <p>Set the endpoint to:</p>
                    <ContentProsePre class="my-6" code="https://api.pdfshift.io/v3/convert/pdf" />
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>3. Configure the headers</h3>
                    <p>Add:</p>
                    <ContentProsePre class="my-6" :code="headersConfig" />
                    <p>Your PDFShift API key should be treated as a secret and never exposed to visitors on your WordPress site.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>4. Configure the request body</h3>
                    <p>PDFShift requires a <code>source</code>, which can contain either HTML or a URL. For example:</p>
                    <ContentProsePre class="my-6" :code="requestBody" />
                    <p>
                        Using <code>filename</code> tells PDFShift to temporarily store the generated document and return a JSON response
                        containing its URL instead of the raw PDF binary, which makes the response particularly easy to use in FlowMattic.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>5. Use dynamic FlowMattic data</h3>
                    <p>The HTML doesn&rsquo;t need to be static. Map values from previous workflow steps into your HTML. For example, a WooCommerce workflow could generate:</p>
                    <ContentProsePre class="my-6" language="html" :code="dynamicHtml" />
                    <p>The order number, customer name, total, products, address, and other information can all come from previous FlowMattic steps. Your workflow might look like:</p>
                    <ContentProsePre class="my-6" :code="workflowFlow" />
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>6. Get the generated PDF URL</h3>
                    <p>When <code>filename</code> is supplied, PDFShift returns JSON containing information about the conversion, including a URL for the generated document. Map the returned <code>url</code> field into subsequent FlowMattic actions:</p>
                    <ContentProsePre class="my-6" :code="urlFlows" />
                    <p>
                        PDFShift keeps files generated using <code>filename</code> for two days before automatically deleting them. If the document
                        must remain available permanently, copy it to your own storage.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Generate a PDF from a webpage</h3>
                    <p>PDFShift can also convert an existing webpage. Instead of passing HTML, simply pass its URL:</p>
                    <ContentProsePre class="my-6" :code="urlBody" />
                    <p>
                        PDFShift will load the page and convert it to PDF. This is useful for workflows involving WordPress posts, WooCommerce
                        pages, reports, dashboards, or other dynamically generated webpages.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Customize the PDF</h3>
                    <p>You can add PDFShift options directly to the JSON payload. For example:</p>
                    <ContentProsePre class="my-6" :code="customizeBody" />
                    <p>PDFShift also supports options such as page formats, margins, headers and footers, custom CSS, JavaScript, watermarks, cookies, HTTP headers, authentication, delayed rendering, webhooks, and sandbox conversions. These values can also be populated dynamically from previous FlowMattic workflow steps.</p>
                </div>
            </section>

            <section id="custom-app" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="custom-app-title">
                <h2 id="custom-app-title">Option 2: Create a <span class="text-purple-500">Custom App</span></h2>
                <p class="mt-7">
                    If you use PDFShift frequently, a FlowMattic Custom App gives you a cleaner integration. Instead of configuring an API request
                    each time, PDFShift appears as its own app inside the workflow builder. Custom Apps support REST APIs and API-key authentication.
                </p>

                <div class="mt-8 md:mt-10">
                    <p>Create an app named <code>PDFShift</code> and configure authentication as:</p>
                    <ContentProsePre class="my-6" :code="authConfig" />
                    <p>Then create a <code>Generate PDF</code> action using:</p>
                    <ContentProsePre class="my-6" code="POST https://api.pdfshift.io/v3/convert/pdf" />
                    <p>The action can expose fields such as:</p>
                    <ul class="my-6">
                        <li>Source</li>
                        <li>Filename</li>
                        <li>Landscape</li>
                        <li>Use print CSS</li>
                        <li>Delay</li>
                        <li>Page format</li>
                        <li>Margin</li>
                        <li>Header</li>
                        <li>Footer</li>
                        <li>Sandbox</li>
                    </ul>
                    <p>The workflow editor can then display:</p>
                    <ContentProsePre class="my-6" code="PDFShift → Generate PDF" />
                    <p>rather than requiring users to manually configure an HTTP request.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Import PDFShift&rsquo;s OpenAPI specification</h3>
                    <p>
                        FlowMattic can also generate Custom Apps from OpenAPI specifications. PDFShift provides one, so you can import it instead of
                        defining every endpoint manually:
                    </p>
                    <ContentProsePre class="my-6" code="https://api.pdfshift.io/openapi.json" />
                    <p>This can give you actions such as:</p>
                    <ContentProsePre class="my-6" :code="openapiActions" />
                    <p>
                        After importing the specification, review the generated actions and keep only the endpoints and parameters you want to
                        expose. For most users, starting with just <strong>Generate PDF</strong> is sufficient.
                    </p>
                </div>
            </section>

            <section id="examples" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="examples-title">
                <h2 id="examples-title">Example <span class="text-purple-500">Workflows</span></h2>

                <div class="mt-8">
                    <h3>Generate a WooCommerce invoice</h3>
                    <p>A simple FlowMattic workflow could be:</p>
                    <ContentProsePre class="my-6" :code="wooFlow" />
                    <p>The invoice HTML can include dynamic WooCommerce values such as:</p>
                    <ul class="my-6 pl-10">
                        <li>Order number</li>
                        <li>Customer</li>
                        <li>Billing address</li>
                        <li>Products</li>
                        <li>Quantity</li>
                        <li>Price</li>
                        <li>Taxes</li>
                        <li>Total</li>
                    </ul>
                    <p>Every WooCommerce order can therefore generate its own PDF automatically.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Turn form submissions into PDFs</h3>
                    <p>You can also use PDFShift with Gravity Forms, Fluent Forms, Elementor Forms, Contact Form 7, or other form integrations. For example:</p>
                    <ContentProsePre class="my-6" :code="formFlow" />
                    <p>Each form submission produces its own personalized PDF.</p>
                </div>

                <div class="mt-8 rounded-xl border border-purple-400 bg-purple-100 p-6 md:mt-10">
                    <h3 class="!mb-2">PDF URLs are temporary</h3>
                    <p>
                        When using the <code>filename</code> parameter, PDFShift temporarily stores the generated document and returns a URL that
                        is automatically deleted after two days. For permanent storage, save the document to WordPress, Google Drive, Amazon S3, or
                        another service as part of your FlowMattic workflow. If you don&rsquo;t want PDFShift to store the document at all, omit
                        <code>filename</code> and PDFShift returns the PDF directly.
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
    { id: 'api-module', label: 'Option 1: API Module' },
    { id: 'custom-app', label: 'Option 2: Custom App' },
    { id: 'examples', label: 'Example Workflows' },
    { id: 'related-resources', label: 'Related Resources' },
]

const headersConfig = `X-API-Key: YOUR_PDFSHIFT_API_KEY
Content-Type: application/json`

const requestBody = `{
    "source": "<html><body><h1>Hello from FlowMattic!</h1></body></html>",
    "filename": "flowmattic-document"
}`

const dynamicHtml = `<!doctype html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 40px;
        }
    </style>
</head>

<body>
    <h1>Order #1234</h1>

    <p>Customer: Jane Doe</p>
    <p>Total: $149.00</p>
</body>
</html>`

const workflowFlow = `WooCommerce: New Order
    ↓
Prepare HTML
    ↓
PDFShift Generate PDF
    ↓
PDF URL
    ↓
Email / Google Drive / WordPress / CRM`

const urlFlows = `PDFShift
    ↓
Generated PDF URL
    ↓
Send Email (or save to Google Drive)`

const urlBody = `{
    "source": "https://example.com/report/1234",
    "filename": "customer-report"
}`

const customizeBody = `{
    "source": "<html>...</html>",
    "filename": "customer-report",
    "landscape": true,
    "use_print": true,
    "delay": 1000
}`

const authConfig = `Type: API Key

Header: X-API-Key`

const openapiActions = `PDFShift
├── Generate PDF
├── Generate PNG
├── Generate JPEG
└── List Recent Conversions`

const wooFlow = `WooCommerce: Order Created
      ↓
Build invoice HTML
      ↓
PDFShift: Generate PDF
      ↓
Email: Send invoice to customer`

const formFlow = `Gravity Forms
Form Submitted
      ↓
Create HTML report
      ↓
PDFShift Generate PDF
      ↓
Google Drive
Save document
      ↓
Email: Send PDF link`

const resources = [
    {
        title: 'FlowMattic',
        description: 'Learn how FlowMattic connects your WordPress workflows to external APIs.',
        cta: 'Visit FlowMattic',
        href: 'https://support.flowmattic.com/'
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + FlowMattic Integration'
const description = 'Generate PDFs from HTML or webpages inside your FlowMattic workflows with PDFShift — use the API Module or build a reusable Custom App.'
const canonicalUrl = 'https://pdfshift.io/agents/flowmattic'

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
                name: 'How to generate PDFs in FlowMattic with PDFShift',
                description,
                inLanguage: 'en-US',
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
                tool: [{ '@type': 'HowToTool', name: 'FlowMattic API module' }],
                step: [
                    { '@type': 'HowToStep', name: 'Get your PDFShift API key', text: 'Create a PDFShift account and copy your API key from the dashboard.', url: `${canonicalUrl}#api-module` },
                    { '@type': 'HowToStep', name: 'Add an API action to FlowMattic', text: 'Add an action, select API > POST, and set the endpoint to api.pdfshift.io/v3/convert/pdf.', url: `${canonicalUrl}#api-module` },
                    { '@type': 'HowToStep', name: 'Configure the headers', text: 'Add the X-API-Key and Content-Type: application/json headers.', url: `${canonicalUrl}#api-module` },
                    { '@type': 'HowToStep', name: 'Configure the request body', text: 'Send a JSON body with a source (HTML or URL) and a filename.', url: `${canonicalUrl}#api-module` },
                    { '@type': 'HowToStep', name: 'Use dynamic FlowMattic data', text: 'Map values from previous workflow steps into the HTML sent to PDFShift.', url: `${canonicalUrl}#api-module` },
                    { '@type': 'HowToStep', name: 'Get the generated PDF URL', text: 'Map the returned url field into subsequent FlowMattic actions such as email or storage.', url: `${canonicalUrl}#api-module` },
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
                    { '@type': 'ListItem', position: 3, name: 'FlowMattic', item: canonicalUrl },
                ],
            }),
        },
    ],
})
</script>
