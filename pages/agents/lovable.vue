<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-48 md:-translate-y-11" src="/images/agents/lovable.svg" alt="Lovable" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + Lovable</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                Add PDF generation to any application built with Lovable.<br />
                Generate invoices, reports, receipts, or certificates directly from the HTML your app produces with your API key kept safely server-side.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <a :href="buildWithLovableUrl" target="_blank" rel="noopener" class="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-navy-800 bg-navy-800 px-8 py-3 text-white transition-colors duration-300 hover:bg-white hover:text-navy-800">
                    <img class="size-5" src="/images/agents/lovable.svg" alt="" aria-hidden="true" />
                    Add PDFShift to my Lovable app
                </a>
                <Button to="/register" :light="true" hover="dark" :arrow="true">Get your Free API key</Button>
            </div>
            <p class="mt-4 max-w-md text-sm font-light leading-snug text-navy-500 italic">
                Opens Lovable with the full integration prompt pre-filled.<br />
                Review it, add your project, and hit send.
            </p>
        </section>

        <div class="relative mx-auto mt-12 w-with-gutters max-w-agent-content">
            <section id="overview" class="agent-overview-card min-h-0 rounded-xl border border-purple-400 bg-white px-6 py-7 md:px-11 md:pb-11 md:pt-12" aria-labelledby="overview-title">
                <h2 id="overview-title">Overview</h2>
                <p class="mt-4 leading-7 md:mt-6">
                    Lovable lets you build full applications from natural-language prompts.
                    PDFShift turns the HTML your app generates into pixel-perfect PDFs.
                    Because PDFShift is authenticated with an API key, the conversion call must happen on server-side, and Lovable Cloud makes that effortless with a secret and an Edge Function, so your key never reaches the browser.
                </p>
                <h3 class="mt-8 text-xl font-medium leading-6 md:text-2xl md:leading-7">Why use PDFShift with Lovable?</h3>
                <ul class="mt-2 list-disc pl-10 text-base leading-7">
                    <li>Generate invoices, reports, receipts, and certificates from your app</li>
                    <li>Convert raw HTML or a public URL to PDF</li>
                    <li>Keep your API key secret with Lovable Cloud and an Edge Function</li>
                    <li>Full control over page size, margins, headers, footers, and CSS</li>
                    <li>One prompt sets up the whole integration end-to-end</li>
                </ul>
            </section>

            <AgentsCustomNav :items="pageSections" />
        </div>

        <div class="mx-auto w-with-gutters max-w-agent-content">
            <section id="quick-start" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="quick-start-title">
                <h2 id="quick-start-title">Quick Start: the <span class="text-purple-500">one-shot prompt</span></h2>
                <p class="mt-7 font-normal">
                    The fastest way to integrate PDFShift into your Lovable app is to paste the prompt below into your Lovable project,
                    or click <strong>Build with Lovable</strong> to open Lovable with it pre-filled.<br />
                    It sets up the secret, the server-side Edge Function, and the &ldquo;Export as PDF&rdquo; button in a single pass.
                </p>
                <ContentProsePre class="mt-7" :code="lovablePrompt" />
                <div class="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <a :href="buildWithLovableUrl" target="_blank" rel="noopener" class="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-navy-800 bg-navy-800 px-8 py-3 text-white transition-colors duration-300 hover:bg-white hover:text-navy-800">
                        <img class="size-5" src="/images/agents/lovable.svg" alt="" aria-hidden="true" />
                        Add PDFShift to my Lovable app
                    </a>
                    <p class="max-w-md text-sm font-light leading-snug text-navy-500">
                        Lovable pre-fills the prompt but never sends it automatically.<br />
                        You review it and click send. Add your own project details first if you have any.
                    </p>
                </div>
            </section>

            <section id="setup-guide" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="setup-title">
                <h2 id="setup-title">Step-by-Step Guide</h2>

                <div class="mt-8 md:mt-10">
                    <h3>1. Get your PDFShift API key</h3>
                    <p>
                        Create a PDFShift account and copy your API key.
                        Do not paste it into your Lovable prompt.
                    </p>
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-8 md:mt-10">
                    <h3>2. Ask Lovable to integrate PDFShift</h3>
                    <p>
                        Open your Lovable project and enter the one-shot prompt from the <a class="underline" href="#quick-start">Quick Start</a> section above.
                        Lovable will detect that PDFShift is an authenticated third-party API and prompt you to configure a secret.
                    </p>
                </div>

                <div class="mt-8 md:mt-10">
                    <h3>3. Add your PDFShift API key as a secret</h3>
                    <p>
                        In your Lovable project, open <strong>Cloud &rarr; Secrets</strong> and create a secret named: <code>PDFSHIFT_API_KEY</code>
                    </p>
                    <p>
                        Set its value to your PDFShift API key.
                        The key is then available to the server-side function without being exposed to visitors using your application.
                    </p>
                </div>

                <div class="mt-8 md:mt-10">
                    <h3>4. Generate the HTML</h3>
                    <p>
                        PDFShift accepts either a publicly accessible URL or raw HTML through the <code>source</code> parameter.<br />
                        For dynamically generated documents, sending raw HTML is usually best as it also lets you convert content that isn't public.
                    </p>
                    <p class="mt-4">
                        Your app might build something like this:
                    </p>
                    <ContentProsePre class="mt-6" language="html" :code="htmlSample" />
                    <p>
                        That HTML becomes the <code>source</code> passed to PDFShift.<br />
                        Inline your CSS so the document renders exactly as you expect.
                    </p>
                </div>

                <div class="mt-8 md:mt-10">
                    <h3>5. Download the PDF</h3>
                    <p>
                        Your Lovable frontend calls the <code>generate-pdf</code> function rather than PDFShift directly.<br />
                        The flow looks like this:
                    </p>
                    <ContentProsePre class="mt-6" :code="flowDiagram" />
                    <p class="mt-6">This separation matters because the browser never receives your PDFShift API key.</p>
                </div>
            </section>

            <section id="customizing" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="customizing-title">
                <h2 id="customizing-title">Customizing the generated PDF</h2>
                <p class="mt-6">Once the basic integration works, ask Lovable to expose more PDFShift options. For example:</p>
                <ContentProsePre class="mt-6" :code="customizePrompt" />
                <p class="mt-6">PDFShift supports a wide range of options you can wire into your app:</p>
                <ul class="mt-2 grid list-disc grid-cols-1 gap-x-10 pl-5 text-base leading-7 md:grid-cols-2 md:leading-8">
                    <li>Headers and footers</li>
                    <li>Custom CSS</li>
                    <li>Page margins and formats</li>
                    <li>Landscape documents</li>
                    <li>Custom JavaScript</li>
                    <li>Delayed rendering</li>
                    <li>Saving generated files</li>
                    <li>Webhooks for async jobs</li>
                </ul>
                <p class="mt-6">Just tell Lovable which options you want the application to use.</p>
            </section>

            <section id="from-url" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="from-url-title">
                <h2 id="from-url-title">Generating a PDF from an existing page</h2>
                <p class="mt-6">PDFShift can also convert a publicly accessible URL. Ask Lovable:</p>
                <ContentProsePre class="mt-6" :code="fromUrlPrompt" />
                <p class="mt-6">
                    PDFShift will load the page and convert it.
                    For authenticated or private pages, sending raw HTML is usually preferable as
                    PDFShift can't reach a page that requires a login without additional configuration.
                </p>
            </section>
        </div>

        <template #related-resource>
            <div class="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-purple-400 bg-purple-100 px-8 py-10 text-center md:mt-16">
                <h3 class="text-2xl font-medium leading-7">Ready to build?</h3>
                <p class="max-w-md text-base font-light leading-6">Open Lovable with the complete PDFShift integration prompt pre-filled and ship your PDF export in minutes.</p>
                <a :href="buildWithLovableUrl" target="_blank" rel="noopener" class="group mt-2 inline-flex items-center justify-center gap-2.5 rounded-lg border border-navy-800 bg-navy-800 px-8 py-3 text-white transition-colors duration-300 hover:bg-white hover:text-navy-800">
                    <img class="size-5" src="/images/agents/lovable.svg" alt="" aria-hidden="true" />
                    Add PDFShift to my Lovable app
                </a>
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup>
import AgentsCustomNav from '~/components/agents/CustomNav.vue'
import ContentProsePre from '~/components/content/ProsePre.vue'

const pageSections = [
    { id: 'quick-start', label: 'Quick Start' },
    { id: 'setup-guide', label: 'Step-by-Step Guide' },
    { id: 'customizing', label: 'Customizing PDFs' },
    { id: 'from-url', label: 'Convert a URL' },
    { id: 'security', label: 'Security' },
    { id: 'related-resources', label: 'Related Resources' },
]

const lovablePrompt = `Add PDF export to my app using PDFShift (an HTML-to-PDF API).
Keep my PDFShift API key secret and make every PDFShift call from the server, never from the browser.

1. Secret
Add a secret in Lovable Cloud named PDFSHIFT_API_KEY. Never expose it in frontend code or return it to the client.

2. Edge Function "generate-pdf"
Create a server-side Edge Function named "generate-pdf" that:
- Accepts a POST request with a JSON body: { "source": "<raw HTML string>", "options": { ...optional PDFShift options } }.
- Calls the PDFShift API:
  - URL: https://api.pdfshift.io/v3/convert/pdf
  - Method: POST
  - Headers: "X-API-Key: <PDFSHIFT_API_KEY>" and "Content-Type: application/json"
  - JSON body: { "source": <source>, "sandbox": true, ...options }
- When no "filename" or "webhook" is set, PDFShift returns the binary PDF in the response body.
- Return that binary PDF to the client with "Content-Type: application/pdf".
- If PDFShift returns a non-2xx status, read its JSON error and return the same status code and message to the client. Never leak the API key.
- Enable CORS so the frontend can call the function.

3. "Export as PDF" button
Add an "Export as PDF" button to the main document view. When clicked, it:
- Builds a complete, self-contained HTML string for the current document, with all CSS inlined so the PDF renders correctly.
- POSTs { "source": html } to the generate-pdf function.
- Receives the response as a Blob and triggers a browser download named "document.pdf".
- Shows a loading state while generating and a friendly error message if it fails.

PDFShift notes:
- "source" can be raw HTML or a publicly accessible URL.
- Keep "sandbox": true while testing (free, watermarked). Remove it for production.
- Options you can add to the JSON body later: "landscape", "format" (e.g. "A4"), "margin", "header", "footer", "css", "filename", "webhook".`

const buildWithLovableUrl = computed(() => `https://lovable.dev/#prompt=${encodeURIComponent(lovablePrompt)}`)

const htmlSample = `<!doctype html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { margin-bottom: 30px; }
    </style>
</head>
<body>
    <h1>Invoice #1234</h1>
    <p>Customer: Acme Inc.</p>
    <p>Total: $149.00</p>
</body>
</html>`

const flowDiagram = `Lovable application
       |
generate-pdf Edge Function
       |
PDFShift API
       |
PDF document
       |
Browser download`

const customizePrompt = `Update the PDFShift integration so generated PDFs\nuse A4 pages and include our custom header and footer.`

const fromUrlPrompt = `Change the PDF export feature so it sends the URL of the\ncurrent document page to PDFShift instead of building the HTML manually.`

const resources = [
    {
        title: 'Lovable Documentation',
        description: 'Learn about Lovable Cloud, secrets, and Edge Functions to power your integration.',
        cta: 'View Lovable Docs',
        href: 'https://docs.lovable.dev',
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + Lovable Integration'
const description = 'Add PDF generation to your Lovable app with PDFShift. Copy the one-shot prompt or click Build with Lovable to set up a secure server-side PDF export in minutes.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>
