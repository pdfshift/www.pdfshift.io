<template>
    <div class="min-w-80 overflow-hidden bg-white text-navy-800">
        <Header :fixed="true" />

        <main id="main-content" class="pt-28 md:pt-44">
            <div class="mx-auto w-with-gutters max-w-5xl">
                <NuxtLink class="inline-flex items-center gap-2.5 text-sm font-normal leading-6 text-purple-500 uppercase" to="/agents#integrations">
                    <IconsArrowRight class="size-6 rotate-180" />
                    Back to integrations
                </NuxtLink>
            </div>

            <section class="mx-auto mt-3 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
                <img class="h-10 w-10 md:-translate-y-11" src="/images/agents/n8n.svg" alt="N8N" />
                <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + N8N</h1>
                <p class="mt-8 w-full max-w-3xl text-lg font-light leading-snug text-trim md:text-xl">Convert HTML to PDF in your N8N workflows with simple HTTP requests. Automate document generation with the power of visual workflow automation.</p>
                <small class="mt-8 text-sm font-light leading-snug text-purple-500 md:text-base">This comparison is published by PDFShift. We aim for accuracy but acknowledge our perspective.</small>
            </section>

            <div class="relative mx-auto mt-12 w-with-gutters max-w-agent-content">
                <section id="overview" class="agent-overview-card min-h-0 rounded-xl border border-purple-400 bg-white px-6 py-7 md:px-11 md:pb-11 md:pt-12" aria-labelledby="overview-title">
                    <h2 id="overview-title" class="text-3xl font-medium leading-display text-trim md:text-4xl">Overview</h2>
                    <p class="mt-7 text-base font-normal leading-7 md:mt-11 md:text-lg md:leading-8">N8N is a powerful workflow automation tool that lets you connect different services and automate tasks without writing code. By integrating PDFShift with N8N, you can automatically generate PDFs from HTML as part of your workflows.</p>
                    <h3 class="mt-12 text-xl font-medium leading-6 md:text-2xl md:leading-7">Why use PDFShift with N8N?</h3>
                    <ul class="mt-2 list-disc pl-5 text-base leading-7 md:text-lg md:leading-8">
                        <li>Automate PDF generation without code</li>
                        <li>Convert HTML, URLs, or dynamic content to PDF</li>
                        <li>Trigger PDF creation from any event in your workflow</li>
                        <li>Save generated PDFs to cloud storage or send via email</li>
                        <li>Handle high-volume document generation reliably</li>
                    </ul>
                </section>

                <nav class="agent-page-nav absolute top-0 hidden w-48 flex-col gap-5 rounded-xl border border-purple-400 bg-white px-5 py-7 text-base font-light leading-snug xl:flex" aria-label="On this page">
                    <a class="font-medium text-purple" href="#prerequisites">→ Prerequisites</a>
                    <a href="#setup-guide">Step-by-step Setup Guide</a>
                    <a href="#use-cases">Common Use Cases</a>
                    <a href="#advanced-features">Advanced Features</a>
                    <a href="#related-resources">Related Resources</a>
                </nav>
            </div>

            <div class="mx-auto w-with-gutters max-w-agent-content">
                <section id="prerequisites" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="prerequisites-title">
                    <h2 id="prerequisites-title" class="text-3xl font-medium leading-display text-trim md:text-4xl">Prerequisites</h2>
                    <ol class="mt-9 list-none">
                        <li>
                            <h3 class="text-lg font-normal leading-8">1. PDFShift API Key</h3>
                            <p class="text-lg font-normal leading-8">You’ll need an API key from PDFShift. If you don’t have one yet:</p>
                            <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                        </li>
                        <li class="mt-10">
                            <h3 class="text-lg font-normal leading-8">2. N8N Account or Installation</h3>
                            <p class="text-lg font-normal leading-8">You can use N8N Cloud or self-host N8N on your own server. Visit <NuxtLink class="underline" to="https://n8n.io">n8n.io</NuxtLink> to get started.</p>
                        </li>
                        <li class="mt-3">
                            <h3 class="text-lg font-normal leading-8">3. Basic N8N Knowledge</h3>
                            <p class="text-lg font-normal leading-8">Familiarity with creating workflows and using the HTTP Request node in N8N is helpful but not required.</p>
                        </li>
                    </ol>
                </section>

                <section id="setup-guide" class="mt-18 scroll-mt-30 md:mt-12" aria-labelledby="setup-title">
                    <h2 id="setup-title" class="text-3xl font-medium leading-display text-trim md:text-4xl">Step-by-Step Setup Guide</h2>

                    <article class="mt-12 md:mt-12">
                        <h3 class="text-2xl font-medium leading-7">Get Your PDFShift API Key</h3>
                        <p class="mt-3 text-lg font-normal leading-8">After registering, you’ll find your API key in your dashboard. Copy it – you’ll need it for authentication.</p>
                        <AgentsCodeBlock class="mt-7" :code="apiKeyCode" />
                    </article>

                    <article class="mt-12 md:mt-16">
                        <h3 class="text-2xl font-medium leading-7">Create a New Workflow in N8N</h3>
                        <p class="mt-3 text-lg font-normal leading-8">Open N8N and create a new workflow. Add a trigger node (e.g., Manual Trigger, Webhook, Schedule, etc.) to start your workflow.</p>
                    </article>

                    <article class="mt-12 md:mt-16">
                        <h3 class="text-2xl font-medium leading-7">Add an HTTP Request Node</h3>
                        <p class="mt-3 text-lg font-normal leading-8">Click the “+” button and search for “HTTP Request” node. Add it to your workflow after your trigger.</p>
                    </article>

                    <article class="mt-12 md:mt-16">
                        <h3 class="text-2xl font-medium leading-7">Configure the HTTP Request Node</h3>
                        <p class="mt-3 text-lg font-normal leading-8">Set up the HTTP Request node with the following configuration:</p>
                        <AgentsCodeBlock class="mt-7 !min-h-56" :code="configurationCode" />
                    </article>

                    <article class="mt-12 md:mt-18">
                        <h3 class="text-2xl font-medium leading-7">Set the Request Body</h3>
                        <p class="mt-3 text-lg font-normal leading-8">In the “Body” section, add your JSON parameters. Here’s a basic example:</p>
                        <AgentsCodeBlock class="mt-7 !min-h-44" :code="requestCode" />
                    </article>
                </section>

                <section id="use-cases" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="use-cases-title">
                    <h2 id="use-cases-title" class="text-3xl font-medium leading-display text-trim md:text-4xl">Common <span class="text-purple-500">Use Cases</span></h2>
                    <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <article v-for="useCase in useCases" :key="useCase.title" class="h-60 rounded-2xl border border-purple-500 bg-agent-card p-3">
                            <div class="relative h-full rounded-lg border border-purple-500 bg-white px-6 pb-4 pt-24">
                                <span class="absolute left-6 top-5 block h-10 w-10 text-purple-500" aria-hidden="true">
                                    <component :is="useCase.icon" class="size-10" />
                                </span>
                                <h3 class="text-xl font-medium leading-normal text-trim">{{ useCase.title }}</h3>
                                <p class="mt-4 text-base font-light leading-6">{{ useCase.description }}</p>
                            </div>
                        </article>
                    </div>
                </section>
            </div>

            <section id="advanced-features" class="mt-18 scroll-mt-30 md:mt-36" aria-labelledby="advanced-title">
                <h2 id="advanced-title" class="mx-auto w-with-gutters max-w-agent-content text-3xl font-medium leading-display text-trim md:text-4xl">Advanced Features</h2>
                <div class="mx-auto mt-8 min-h-0 w-with-gutters max-w-5xl rounded-2xl border border-purple-500 bg-agent-panel py-8 md:min-h-agent-panel md:pb-14 md:pt-11">
                    <div class="mx-auto w-with-gutters max-w-agent-content">
                        <h3 class="text-2xl font-medium leading-7">Webhooks for Async Processing</h3>
                        <p class="mt-3 text-base font-normal leading-7 md:text-lg md:leading-8">For large or complex PDFs, use webhooks to process documents asynchronously:</p>
                        <AgentsCodeBlock class="mt-7 min-h-40" :code="webhookCode" dark />
                    </div>
                </div>
            </section>

            <section id="related-resources" class="mx-auto mt-18 w-with-gutters max-w-agent-content scroll-mt-30 md:mt-26" aria-labelledby="resources-title">
                <h2 id="resources-title" class="text-3xl font-medium leading-display text-trim md:text-4xl">Related Resources</h2>
                <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    <article v-for="resource in resources" :key="resource.title" class="flex min-h-64 flex-col items-start rounded-xl border border-purple-400 bg-white px-10 py-8 shadow-agent-card md:py-8">
                        <h3 class="text-2xl font-medium leading-7">{{ resource.title }}</h3>
                        <p class="mt-8 text-base font-light leading-6">{{ resource.description }}</p>
                        <Button class="mt-8" :to="resource.href" :arrow="true">{{ resource.cta }}</Button>
                    </article>
                </div>
            </section>

            <AgentsBottomCta
                class="mt-20 md:mt-18"
                title="Ready to Get Started?"
                description="Create your free PDFShift account and start automating PDF generation in N8N today"
                title-id="details-bottom-cta-title"
                primary-label="Get your Free API key"
                primary-href="/register"
                secondary-label="Read the Documentation"
                secondary-href="https://docs.pdfshift.io"
            />
        </main>

        <Footer />
    </div>
</template>

<script setup>
import ApiFirstIcon from '~/components/icons/BarGraphUp.vue'
import NoCodeIcon from '~/components/icons/ClipboardTick.vue'
import ReliableIcon from '~/components/icons/TimerPaused.vue'
import AsyncIcon from '~/components/icons/People.vue'

definePageMeta({ layout: false })

const apiKeyCode = `// Your API key format:
api:your_api_key_here`

const configurationCode = `Method: POST
URL: https://api.pdfshift.io/v3/convert/pdf
Authentication: Basic Auth
Username: api
Password: [Your API Key]
Body Content Type: JSON`

const requestCode = `{
  "source": "https://example.com",
  "filename": "document.pdf"
}`

const webhookCode = `{
  "source": "https://example.com/large-document",
  "webhook": "https://your-n8n-webhook-url"
}`

const useCases = [
    {
        title: 'Invoice Generation',
        description: 'Trigger PDF invoice generation when a payment is received via webhook, then email it to the customer.',
        icon: NoCodeIcon,
    },
    {
        title: 'Automated Reports',
        description: 'Schedule daily/weekly reports by fetching data from your database and converting it to PDF.',
        icon: ApiFirstIcon,
    },
    {
        title: 'Contract Generation',
        description: 'Create personalized contracts from templates when new deals are created in your CRM.',
        icon: ReliableIcon,
    },
    {
        title: 'Receipt Generation',
        description: 'Automatically generate and send receipts when orders are placed in your e-commerce system.',
        icon: AsyncIcon,
    },
]

const resources = [
    {
        title: 'N8N Guides',
        description: 'Comprehensive guides for specific use cases and advanced techniques.',
        cta: 'View N8N Guides',
        href: 'https://docs.n8n.io/',
    },
    {
        title: 'API Documentation',
        description: 'Comprehensive API reference with all parameters, options, and examples.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + N8N Integration'
const description = 'Convert HTML to PDF in your N8N workflows with PDFShift and simple HTTP requests.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>

<style scoped>
.agent-overview-card {
    box-shadow: 0 8px 18px rgba(108, 71, 255, 0.1);
}

.agent-page-nav {
    left: calc(100% + 2rem);
    min-height: 275px;
    box-shadow: 0 8px 12px rgba(108, 71, 255, 0.1);
}

@media (min-width: 768px) {
    .agent-overview-card {
        min-height: 500px;
    }
}
</style>
