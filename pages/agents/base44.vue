<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-10 md:-translate-y-11" src="/images/agents/base44.svg" alt="Base44" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + Base44</h1>
            <p class="mt-8 w-full max-w-3xl text-lg font-light leading-snug text-trim md:text-xl">Generate invoices, reports, certificates, and receipts from your Base44 app. Connect PDFShift through its OpenAPI specification - or a backend function - while keeping your API key safely on the server.</p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register" :arrow="true">Get your Free API key</Button>
                <Button to="https://api.pdfshift.io/openapi.json" :light="true" hover="dark">View the OpenAPI spec</Button>
            </div>
        </section>

        <div class="relative mx-auto mt-12 w-with-gutters max-w-agent-content">
            <section id="overview" class="agent-overview-card min-h-0 rounded-xl border border-purple-400 bg-white px-6 py-7 md:px-11 md:pb-11 md:pt-12" aria-labelledby="overview-title">
                <h2 id="overview-title">Overview</h2>
                <p class="mt-4 leading-7 md:mt-6">
                    Base44 lets you build full applications with AI, and it supports custom API integrations.
                    That means you can connect PDFShift directly from its OpenAPI specification and call the conversion endpoint from your app
                    with your API key stored securely as a sensitive header.
                    For documents that must never be stored, even temporarily, you can instead route requests through a Base44 backend function
                    that returns the PDF as raw binary.
                </p>
                <h3 class="mt-12 text-xl font-medium leading-6 md:text-2xl md:leading-7">Two ways to integrate</h3>
                <ul class="mt-2 list-disc pl-10 text-base leading-7">
                    <li><strong>Custom integration</strong>: Add PDFShift from its OpenAPI URL, the fastest path.</li>
                    <li><strong>Backend function</strong>: Keep the key in a secret and return the PDF as binary, ideal for sensitive data.</li>
                    <li>Convert raw HTML or a public URL to PDF (and PNG, JPEG, or WebP).</li>
                    <li>Full control over page size, margins, headers, footers, and CSS.</li>
                </ul>
            </section>

            <AgentsCustomNav :items="pageSections" />
        </div>

        <div class="mx-auto w-with-gutters max-w-agent-content">
            <section id="integration-setup" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="integration-title">
                <h2 id="integration-title">Option 1: Add PDFShift as a <span class="text-purple-500">Base44 integration</span></h2>
                <p class="mt-7">This is the easiest way to make PDFShift available to your Base44 applications.</p>

                <div class="mt-8 md:mt-10">
                    <h3>1. Get your PDFShift API key</h3>
                    <p>
                        Create a PDFShift account and get your API key.
                        Keep it private and do not paste it into your Lovable prompt or be added directly to your frontend code.
                    </p>
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-8 md:mt-10">
                    <h3>2. Add PDFShift to Base44</h3>
                    <p>
                        Click your workspace name, then open <strong>Settings &rarr; Integrations &rarr; New Integration</strong> and choose <strong>From URL</strong>.<br />
                        Point it at PDFShift&rsquo;s OpenAPI specification:
                    </p>
                    <ContentProsePre class="my-6" :code="openapiUrl" />
                    <p>Base44 reads the specification and lists the PDFShift API endpoints available to your applications.</p>
                </div>

                <div class="mt-8 md:mt-10">
                    <h3>3. Select the PDF conversion endpoint</h3>
                    <p>For PDF generation, enable:</p>
                    <ContentProsePre class="my-6" :code="pdfEndpoint" />
                    <p>You can optionally enable the image conversion endpoints too:</p>
                    <ContentProsePre class="my-6" :code="imageEndpoints" />
                </div>

                <div class="mt-8 md:mt-10">
                    <h3>4. Configure authentication</h3>
                    <p>Configure the integration with:</p>
                    <ContentProsePre class="my-6" :code="integrationConfig" />
                    <p>Then add the following custom header:</p>
                    <ContentProsePre class="my-6" :code="authHeader" />
                    <p>Base44 stores sensitive headers securely and does not expose your PDFShift API key to visitors using your application.</p>
                </div>
            </section>

            <section id="generate" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="generate-title">
                <h2 id="generate-title">Generate PDFs</h2>

                <div class="mt-8">
                    <h3>Ask Base44</h3>
                    <p>With the integration in place, you can ask Base44 to use PDFShift directly. For example:</p>
                    <ContentProsePre class="my-6" :code="askBase44Prompt" />
                    <p>Base44 then generates the necessary frontend logic for you.</p>
                </div>

                <div class="mt-8">
                    <h3>Calling PDFShift from code</h3>
                    <p>If you&rsquo;re editing your Base44 application code directly, the equivalent call looks like this:</p>
                    <ContentProsePre class="my-6" :code="codeExample" />
                    <p>You can then open the resulting URL or provide it as a download link to the user.</p>
                </div>
            </section>

            <section id="filename" class="scroll-mt-30 mt-18" aria-labelledby="filename-title">
                <h2 id="filename-title">Why do we use <code class="font-code text-purple-500">filename</code>?</h2>
                <p>By default, PDFShift returns the generated PDF directly as binary data. Base44 custom integrations are designed around JSON responses, so passing <code>filename</code> is particularly convenient. When it&rsquo;s provided, PDFShift returns JSON like:</p>
                <ContentProsePre class="my-6" :code="filenameResponse" dark />
                <p>The <code>url</code> points to the generated PDF. PDFShift keeps this temporary file for 2 days and then automatically deletes it.</p>
            </section>

            <section id="sensitive-data" class="mt-18 scroll-mt-30" aria-labelledby="sensitive-title">
                <h2 id="sensitive-title">Generating PDFs with <span class="text-purple-500">sensitive data</span></h2>
                <p>If you don&rsquo;t want PDFShift to temporarily store the generated document, use a Base44 backend function instead. This lets PDFShift return the PDF directly as binary data. Ask Base44:</p>
                <ContentProsePre class="my-6" :code="backendPrompt" />
                <p>Base44&rsquo;s <code>functions.fetch()</code> method provides access to the native HTTP response, including binary bodies, making it suitable for PDF downloads. The resulting architecture is:</p>
                <ContentProsePre class="my-6" :code="flowDiagram" />
                <p>With this approach, the generated PDF is returned directly to your Base44 application and is never temporarily stored by PDFShift.</p>
            </section>
        </div>
    </NuxtLayout>
</template>

<script setup>
import AgentsCustomNav from '~/components/agents/CustomNav.vue'
import ContentProsePre from '~/components/content/ProsePre.vue'

const pageSections = [
    { id: 'integration-setup', label: 'Add the Integration' },
    { id: 'generate', label: 'Generate PDFs' },
    { id: 'filename', label: 'The filename option' },
    { id: 'sensitive-data', label: 'Sensitive Data' },
    { id: 'related-resources', label: 'Related Resources' },
]

const openapiUrl = `https://api.pdfshift.io/openapi.json`

const pdfEndpoint = `POST /convert/pdf`

const imageEndpoints = `POST /convert/png
POST /convert/jpeg
POST /convert/webp`

const integrationConfig = `Slug: pdfshift
Name: PDFShift
Base URL: https://api.pdfshift.io/v3`

const authHeader = `X-API-Key: YOUR_PDFSHIFT_API_KEY`

const askBase44Prompt = `Add an "Export as PDF" button to this page.

Use the PDFShift integration to generate the PDF.

Generate an HTML document containing the information currently displayed on the page.

Call:

POST /convert/pdf

with:

{
    "source": "<the generated HTML>",
    "filename": "document-export"
}

When PDFShift returns the result, download the file from the returned "url".`

const codeExample = `const response = await base44.integrations.custom.call(
    'pdfshift',
    'post:/convert/pdf',
    {
        payload: {
            source: html,
            filename: 'document-export'
        }
    }
);

const pdfUrl = response.data.url;`

const filenameResponse = `{
    "success": true,
    "url": "...",
    "filesize": 259972,
    "pdf_pages": 5
}`

const backendPrompt = `Integrate PDFShift using a server-side backend function called "generate-pdf".

Ask me to configure a secret called PDFSHIFT_API_KEY.

The function must:

1. Accept an HTML string in a "source" parameter.
2. POST it to the PDFShift API at /v3/convert/pdf.
3. Send PDFSHIFT_API_KEY using the X-API-Key header.
4. Do not provide "filename" or "webhook".
5. Receive the PDF directly as binary data.
6. Return the binary PDF response to the frontend using Content-Type: application/pdf.
7. Forward PDFShift errors and their HTTP status codes.

Then add an "Export as PDF" button.

Use base44.functions.fetch() to call the function so that the binary response can be accessed directly.

Convert the response to a Blob and download it as document.pdf.

Never expose PDFSHIFT_API_KEY in frontend code.`

const flowDiagram = `Base44 application
       |
generate-pdf backend function
       |
PDFShift API
       |
PDF binary
       |
Browser download`

const resources = [
    {
        title: 'Base44 Documentation',
        description: 'Learn about Base44 custom integrations, backend functions, and secrets.',
        cta: 'View Base44 Docs',
        href: 'https://docs.base44.com',
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + Base44 Integration'
const description = 'Add PDF generation to your Base44 app with PDFShift. Connect it from the OpenAPI spec or a backend function, and keep your API key secure on the server.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>
