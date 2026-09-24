<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-auto md:-translate-y-11" src="/images/agents/zapier.png" alt="Zapier" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + Zapier</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                Generate PDF documents automatically inside your Zapier workflows with PDFShift.
                Convert raw HTML, dynamic Zap data, or an existing webpage into a PDF and route it anywhere Zapier connects.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register" :arrow="true">Get your Free API key</Button>
                <Button to="#setup-guide" :light="true" hover="dark" :arrow-down="true">Build the Zap</Button>
            </div>
        </section>

        <article id="agent-nav-anchor" class="relative mx-auto mt-24 w-with-gutters max-w-agent-content">
            <AgentsCustomNav :items="pageSections" anchor-id="agent-nav-anchor" />

            <section id="setup-guide" class="scroll-mt-30" aria-labelledby="setup-title">
                <h2 id="setup-title">Step-by-Step Setup Guide</h2>
                <p class="mt-7">
                    PDFShift accepts either raw HTML or a URL and converts it into a PDF. You&rsquo;ll wire it into Zapier using the
                    <strong>API by Zapier</strong> app.
                </p>

                <div class="mt-12 md:mt-12">
                    <h3>1. Get your PDFShift API key</h3>
                    <p>
                        Create a PDFShift account and retrieve your API key from the
                        <a class="underline" href="https://app.pdfshift.io/" target="_blank" rel="noopener">dashboard</a>.
                        PDFShift authenticates requests using:
                    </p>
                    <ContentProsePre class="my-6" code="X-API-Key: YOUR_PDFSHIFT_API_KEY" />
                    <p>Your API key should be kept private and never stored directly inside normal Zap fields.</p>
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>2. Create an API by Zapier connection</h3>
                    <p>In Zapier, go to <strong>Apps &rarr; Add connection</strong> and search for <code>API by Zapier</code>. Choose:</p>
                    <ContentProsePre class="my-6" code="Static Headers (API key)" />
                    <p>For the authentication header, enter:</p>
                    <ContentProsePre class="my-6" code="X-API-Key: YOUR_PDFSHIFT_API_KEY" />
                    <p>For the domain filter, use:</p>
                    <ContentProsePre class="my-6" code="api.pdfshift.io" />
                    <p>You can optionally test the connection with:</p>
                    <ContentProsePre class="my-6" code="https://api.pdfshift.io/v3/credits/usage" />
                    <p>Once created, Zapier stores your PDFShift API key separately from your Zap and adds it automatically to PDFShift requests.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>3. Add PDFShift to your Zap</h3>
                    <p>Create or open a Zap, add an <strong>Action</strong>, and select <code>API by Zapier</code>, then choose:</p>
                    <ContentProsePre class="my-6" code="API by Zapier → API Request" />
                    <p>Select the PDFShift connection you created previously.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>4. Configure the PDF conversion</h3>
                    <p>Set:</p>
                    <ContentProsePre class="my-6" :code="requestConfig" />
                    <p>Then provide a JSON body such as:</p>
                    <ContentProsePre class="my-6" :code="requestBody" />
                    <p>
                        You don&rsquo;t need to add the <code>X-API-Key</code> header manually because Zapier adds it from your connection. When the
                        request body is valid JSON, Zapier automatically sends it as JSON.
                    </p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>5. Test the PDF generation</h3>
                    <p>
                        Run the Zapier action. Because the request contains <code>filename</code>, PDFShift returns JSON with a URL to the generated
                        document instead of the PDF binary, and you can use that URL in subsequent Zap steps. Your workflow might look like:
                    </p>
                    <ContentProsePre class="my-6" :code="basicFlow" />
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>6. Use data from previous Zap steps</h3>
                    <p>Your HTML can contain dynamic information from any previous Zap step. For example, if a Stripe payment triggered the Zap, your HTML could contain:</p>
                    <ContentProsePre class="my-6" language="html" :code="invoiceHtml" />
                    <p>Instead of hard-coding those values, use Zapier&rsquo;s field picker to insert values from previous steps:</p>
                    <ContentProsePre class="my-6" :code="fieldPicker" />
                    <p>Zapier inserts the values before sending the HTML to PDFShift, so every Zap execution generates its own personalized PDF.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>7. Attach the generated PDF to an email</h3>
                    <p>
                        Many Zapier actions that accept files can use a downloadable file URL. After PDFShift generates the document, map the
                        returned <code>url</code> into the attachment field of your email action:
                    </p>
                    <ContentProsePre class="my-6" :code="attachFlow" />
                    <p>Zapier will retrieve the document from the URL when the following action expects a file.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>8. Save the PDF to cloud storage</h3>
                    <p>You can also send the generated URL to storage applications such as:</p>
                    <ContentProsePre class="my-6" :code="storageApps" />
                    <p>A typical workflow is:</p>
                    <ContentProsePre class="my-6" :code="storageFlow" />
                    <p>Saving the document elsewhere is particularly useful because PDFShift&rsquo;s temporary URL is automatically removed after two days.</p>
                </div>
            </section>

            <section id="from-webpage" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="from-webpage-title">
                <h2 id="from-webpage-title">Generate a PDF from a <span class="text-purple-500">webpage</span></h2>
                <p class="mt-7">PDFShift can also convert an existing webpage. Instead of providing HTML, provide the page URL as <code>source</code>:</p>
                <ContentProsePre class="my-6" :code="urlBody" />
                <p>PDFShift loads the page and generates the PDF. This is useful when a previous Zap step provides a page URL, such as:</p>
                <ContentProsePre class="my-6" :code="webpageSources" />
            </section>

            <section id="customize" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="customize-title">
                <h2 id="customize-title">Customize the <span class="text-purple-500">generated PDF</span></h2>
                <p class="mt-7">You can add any supported PDFShift parameters to the JSON body. For example:</p>
                <ContentProsePre class="my-6" :code="customizeBody" />
                <p>PDFShift supports options including:</p>
                <ul class="mt-2">
                    <li>Page formats and margins</li>
                    <li>Landscape mode</li>
                    <li>Print CSS and custom CSS</li>
                    <li>Headers and footers</li>
                    <li>Custom JavaScript</li>
                    <li>Delayed rendering</li>
                    <li>Cookies, HTTP headers, and authentication</li>
                    <li>Sandbox conversions and webhooks</li>
                </ul>
                <p class="mt-6">Values can also come dynamically from previous Zap steps.</p>
            </section>

            <section id="examples" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="examples-title">
                <h2 id="examples-title">Example <span class="text-purple-500">Workflows</span></h2>

                <div class="mt-8">
                    <h3>Generate an invoice after a Stripe payment</h3>
                    <p>A Zap could look like:</p>
                    <ContentProsePre class="my-6" :code="stripeExample" />
                    <p>Every successful Stripe payment automatically generates its own PDF invoice.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Turn form responses into PDF reports</h3>
                    <p>You could also create:</p>
                    <ContentProsePre class="my-6" :code="typeformExample" />
                    <p>This works with any Zapier trigger that provides data you can include in HTML.</p>
                </div>

                <div class="mt-8 rounded-xl border border-purple-400 bg-purple-100 p-6 md:mt-10">
                    <h3 class="!mb-2">PDF URLs are temporary</h3>
                    <p>
                        When <code>filename</code> is provided, PDFShift temporarily stores the generated document and returns a downloadable URL
                        that is automatically deleted after two days. For permanent storage, use another Zapier action to copy the PDF into Google
                        Drive, Dropbox, S3, or another service. If you don&rsquo;t want PDFShift to store the document at all, omit <code>filename</code>
                        and PDFShift returns the PDF directly.
                    </p>
                </div>
            </section>

            <section id="native" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="native-title">
                <h2 id="native-title">Native PDFShift <span class="text-purple-500">integration</span></h2>
                <p class="mt-7">
                    For an even simpler experience, PDFShift can be used as a native Zapier integration. Users would install <strong>PDFShift</strong>,
                    connect their API key once, and then use actions such as:
                </p>
                <ContentProsePre class="my-6" :code="nativeActions" />
                <p>The main action could expose friendly fields such as:</p>
                <ul class="my-6">
                    <li>HTML or URL</li>
                    <li>Filename</li>
                    <li>Page format</li>
                    <li>Landscape</li>
                    <li>Margins</li>
                    <li>Use print CSS</li>
                    <li>Header</li>
                    <li>Footer</li>
                    <li>Delay</li>
                    <li>Sandbox</li>
                </ul>
                <p>Instead of configuring an API request, users could simply select:</p>
                <ContentProsePre class="my-6" code="PDFShift → Generate PDF" />
                <p>and map data from previous Zap steps into the fields.</p>
            </section>
        </article>
    </NuxtLayout>
</template>

<script setup>
import AgentsCustomNav from '~/components/agents/CustomNav.vue'
import ContentProsePre from '~/components/content/ProsePre.vue'

const pageSections = [
    { id: 'setup-guide', label: 'Step-by-step Setup Guide' },
    { id: 'from-webpage', label: 'Convert a Webpage' },
    { id: 'customize', label: 'Customize the PDF' },
    { id: 'examples', label: 'Example Workflows' },
    { id: 'native', label: 'Native Integration' },
    { id: 'related-resources', label: 'Related Resources' },
]

const requestConfig = `Method: POST
URL: https://api.pdfshift.io/v3/convert/pdf`

const requestBody = `{
    "source": "<html><body><h1>Hello from Zapier!</h1></body></html>",
    "filename": "zapier-document"
}`

const basicFlow = `New order
    ↓
Create HTML
    ↓
PDFShift: Generate PDF
    ↓
PDF URL
    ↓
Send Email`

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
    <p>Total: $149.00</p>
</body>
</html>`

const fieldPicker = `Invoice # [Stripe → Invoice Number]

Customer: [Stripe → Customer Name]

Total: [Stripe → Amount]`

const attachFlow = `Stripe
Payment received
      ↓
PDFShift
Generate invoice
      ↓
Gmail
Send email
Attachment: PDFShift URL`

const storageApps = `Google Drive
Dropbox
OneDrive
Amazon S3`

const storageFlow = `Form submitted
      ↓
Generate HTML
      ↓
PDFShift Generate PDF
      ↓
Google Drive: Upload PDF
      ↓
Gmail: Send confirmation`

const urlBody = `{
    "source": "https://example.com/report/1234",
    "filename": "customer-report"
}`

const webpageSources = `WordPress post
Customer portal page
Invoice URL
Report URL
Order summary`

const customizeBody = `{
    "source": "<html>...</html>",
    "filename": "customer-report",
    "landscape": true,
    "use_print": true,
    "delay": 1000
}`

const stripeExample = `Stripe
New Payment
      ↓
Formatter / Template
Create invoice HTML
      ↓
PDFShift
Generate PDF
      ↓
Google Drive
Store invoice
      ↓
Gmail
Email invoice to customer`

const typeformExample = `Typeform
New Response
      ↓
OpenAI
Generate report content
      ↓
PDFShift
Generate PDF
      ↓
Google Drive
Upload PDF
      ↓
Slack
Notify team`

const nativeActions = `PDFShift
├── Generate PDF
├── Generate PNG
├── Generate JPEG
└── List Recent Conversions`

const nativeFields = ``

const resources = [
    {
        title: 'API by Zapier',
        description: 'Learn how the API by Zapier app calls external services from your Zaps.',
        cta: 'Visit Zapier',
        href: 'https://help.zapier.com/hc/en-us/sections/44386003111693-API',
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + Zapier Integration'
const description = 'Generate PDFs automatically inside your Zapier workflows with PDFShift — convert HTML, dynamic Zap data, or webpages to PDF and route them anywhere.'
const canonicalUrl = 'https://pdfshift.io/agents/zapier'

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
                name: 'How to generate PDFs in Zapier with PDFShift',
                description,
                inLanguage: 'en-US',
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
                tool: [{ '@type': 'HowToTool', name: 'API by Zapier' }],
                step: [
                    { '@type': 'HowToStep', name: 'Get your PDFShift API key', text: 'Create a PDFShift account and retrieve your API key from the dashboard.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Create an API by Zapier connection', text: 'Add an API by Zapier connection using Static Headers with the X-API-Key header and the api.pdfshift.io domain.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Add PDFShift to your Zap', text: 'Add an API by Zapier action, choose API Request, and select your PDFShift connection.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Configure the PDF conversion', text: 'POST to api.pdfshift.io/v3/convert/pdf with a JSON body containing source and filename.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Test the PDF generation', text: 'Run the action so PDFShift returns JSON with a URL to the generated document.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Use data from previous Zap steps', text: 'Insert values from earlier steps into the HTML with Zapier field picker for personalized PDFs.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Attach the generated PDF to an email', text: 'Map the returned url into the attachment field of your email action.', url: `${canonicalUrl}#setup-guide` },
                    { '@type': 'HowToStep', name: 'Save the PDF to cloud storage', text: 'Send the generated URL to Google Drive, Dropbox, OneDrive, or Amazon S3 for permanent storage.', url: `${canonicalUrl}#setup-guide` },
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
                    { '@type': 'ListItem', position: 3, name: 'Zapier', item: canonicalUrl },
                ],
            }),
        },
    ],
})
</script>
