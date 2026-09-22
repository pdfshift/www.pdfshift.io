<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-10 md:-translate-y-11" src="/images/agents/n8n.svg" alt="n8n" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + n8n</h1>
            <p class="mt-14 w-full max-w-3xl font-light leading-snug text-trim md:text-xl">
                Generate PDFs and screenshots inside your n8n workflows with the official
                <a class="underline" href="https://www.npmjs.com/package/n8n-nodes-pdfshift" target="_blank" rel="noopener">n8n-nodes-pdfshift</a>
                community node &mdash; no HTTP wiring required.
            </p>

            <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Button to="/register" :arrow="true">Get your Free API key</Button>
                <Button to="#setup-guide" :light="true" hover="dark" :arrow-down="true">Install the node</Button>
            </div>
        </section>

        <div class="relative mx-auto mt-12 w-with-gutters max-w-agent-content">
            <section id="overview" class="agent-overview-card min-h-0 rounded-xl border border-purple-400 bg-white px-6 py-7 md:px-11 md:pb-11 md:pt-12" aria-labelledby="overview-title">
                <h2 id="overview-title">Overview</h2>
                <p class="mt-4 leading-7 md:mt-6">
                    <a class="underline" href="https://n8n.io/" target="_blank" rel="noopener">n8n</a> is a powerful, fair-code workflow automation platform that lets you connect different services and automate tasks.
                    The official <code>n8n-nodes-pdfshift</code> community node brings PDFShift straight into your workflows, so you can turn any HTML or URL into a
                    PDF or screenshot with a dedicated node instead of hand-crafting HTTP requests.
                </p>
                <h3 class="mt-12 text-xl font-medium leading-6 md:text-2xl md:leading-7">Why use PDFShift with n8n?</h3>
                <ul class="mt-2 list-disc pl-5 text-base leading-7 md:text-lg md:leading-8">
                    <li>Install once from the n8n community nodes registry &mdash; no code</li>
                    <li>Convert HTML, URLs, or dynamic content to PDF</li>
                    <li>Generate screenshots for OG:images, thumbnails, and previews</li>
                    <li>Trigger PDF creation from any event in your workflow</li>
                    <li>Save generated files to cloud storage or send them via email</li>
                </ul>
            </section>

            <AgentsCustomNav :items="pageSections" />
        </div>

        <article class="mx-auto w-with-gutters max-w-agent-content">
            <section id="setup-guide" class="mt-18 scroll-mt-30 md:mt-12" aria-labelledby="setup-title">
                <h2 id="setup-title">Step-by-Step Setup Guide</h2>

                <div class="mt-12 md:mt-12">
                    <h3>1. Get your PDFShift API key</h3>
                    <p>
                        Create a PDFShift account and grab your API key from the
                        <a class="underline" href="https://app.pdfshift.io/" target="_blank" rel="noopener">dashboard</a>
                        under &ldquo;API Keys&rdquo;. Keep it private &mdash; you&rsquo;ll paste it into n8n&rsquo;s credential store, which encrypts it for you.
                    </p>
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>2. Install the community node</h3>
                    <p>
                        Follow the
                        <a class="underline" href="https://docs.n8n.io/integrations/community-nodes/installation/" target="_blank" rel="noopener">community nodes installation guide</a>
                        from within your n8n instance:
                    </p>
                    <ol class="mt-4 pl-10 list-decimal text-base leading-7 md:text-lg md:leading-8">
                        <li>Go to <strong>Settings</strong> &rsaquo; <strong>Community Nodes</strong>.</li>
                        <li>Select <strong>Install</strong>.</li>
                        <li>Enter <code>n8n-nodes-pdfshift</code> as the npm package name.</li>
                        <li>Agree to the risks of using community nodes.</li>
                        <li>Select <strong>Install</strong>.</li>
                    </ol>
                    <img class="my-6 w-full rounded-xl border border-purple-200 shadow-sm" src="/images/agents/n8n/install.png" alt="Installing the n8n-nodes-pdfshift community node from n8n settings" loading="lazy" />
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>3. Add your PDFShift credentials</h3>
                    <p>Once the node is installed, connect it to your PDFShift account:</p>
                    <ol class="mt-4 list-decimal pl-10 text-base leading-7 md:text-lg md:leading-8">
                        <li>Add and use the <strong>PDFShift</strong> node in your workflow.</li>
                        <li>Under &ldquo;Credential to connect with&rdquo;, click <strong>Create New Credential</strong>.</li>
                        <li>Paste the API key you copied from your dashboard, then test and save.</li>
                    </ol>
                    <img class="my-6 w-full rounded-xl border border-purple-200 shadow-sm" src="/images/agents/n8n/credentials.png" alt="Creating and testing PDFShift credentials in n8n" loading="lazy" />
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>4. Choose an operation</h3>
                    <p>
                        Drop the PDFShift node after any trigger, pick an operation, and provide your source (a URL or raw HTML).
                        The node handles authentication and the API call for you &mdash; see the operations available below.
                    </p>
                </div>
            </section>

            <section id="operations" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="operations-title">
                <h2 id="operations-title">Available <span class="text-purple-500">Operations</span></h2>
                <p class="mt-7">The PDFShift node exposes {{ operations.length }} operations to cover the most common document tasks:</p>
                <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div v-for="operation in operations" :key="operation.title" class="rounded-xl border border-purple-400 bg-white px-6 py-6 shadow-agent-card">
                        <span class="block h-9 w-9 text-purple-500" aria-hidden="true">
                            <component :is="operation.icon" class="size-9" />
                        </span>
                        <h3 class="mt-4 text-lg font-medium leading-normal text-trim">{{ operation.title }}</h3>
                        <p class="mt-3 text-base font-light leading-6">{{ operation.description }}</p>
                    </div>
                </div>
            </section>

            <section id="advanced-features" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="advanced-features-title">
                <h2 id="advanced-features-title">Available <span class="text-purple-500">Response Types</span></h2>
                <p>
                    Depending on the options you set, the PDFShift node returns the result in one of two formats. When you provide a
                    <code>filename</code> or an <code>s3_destination</code>, you get a JSON payload with a hosted URL and metadata:
                </p>
                <ContentProsePre class="my-6" :code="jsonResponseCode" dark />
                <p>Otherwise, the raw file is returned as binary data you can pass straight to the next node:</p>
                <ContentProsePre class="my-6" :code="binaryResponseCode" dark />
            </section>
        </article>
    </NuxtLayout>
</template>

<script setup>
import ApiFirstIcon from '~/components/icons/BarGraphUp.vue'
import NoCodeIcon from '~/components/icons/ClipboardTick.vue'
import ReliableIcon from '~/components/icons/TimerPaused.vue'
import AgentsCustomNav from '~/components/agents/CustomNav.vue'
import ContentProsePre from '~/components/content/ProsePre.vue'

const pageSections = [
    { id: 'setup-guide', label: 'Step-by-step Setup Guide' },
    { id: 'operations', label: 'Available Operations' },
    { id: 'advanced-features', label: 'Response Types' },
    { id: 'related-resources', label: 'Related Resources' },
]

const jsonResponseCode = `{
  "data": {
    "success": true,
    "url": "https://s3.amazonaws.com/pdfshift/.../generated.pdf",
    "filesize": 259972,
    "duration": 1500,
    "executed": "2025-12-02T12:34:56.789Z",
    "pdf_pages": 5
  },
  "filename": "generated.pdf",
  "mimetype": "application/pdf"
}`

const binaryResponseCode = `{
  "binary": "... raw pdf data ..."
}`

const operations = [
    {
        title: 'Convert to PDF',
        description: 'Turn any HTML source — a URL or raw HTML — into a polished PDF document.',
        icon: NoCodeIcon,
    },
    {
        title: 'Generate a Screenshot',
        description: 'Capture any website or HTML as an image, perfect for OG:images, thumbnails, and previews.',
        icon: ApiFirstIcon,
    },
    {
        title: 'View Credits Usage',
        description: 'Check your remaining credits to manage your account and plan ahead.',
        icon: ReliableIcon,
    },
]

const resources = [
    {
        title: 'n8n-nodes-pdfshift',
        description: 'The official community node on npm, with installation and usage details.',
        cta: 'View on npm',
        href: 'https://www.npmjs.com/package/n8n-nodes-pdfshift',
    },
    {
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + n8n Integration'
const description = 'Generate PDFs and screenshots in your n8n workflows with the official n8n-nodes-pdfshift community node.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>
