<template>
    <NuxtLayout name="agents" :resources="resources">
        <section class="mx-auto mt-18 flex w-with-gutters max-w-agent-content flex-col items-center text-center" aria-labelledby="agent-title">
            <img class="h-10 w-10 md:-translate-y-11" src="/images/agents/n8n.svg" alt="N8N" />
            <h1 id="agent-title" class="mt-3 text-4xl font-normal leading-display text-trim md:-mt-1.5 md:text-6xl">PDFShift + N8N</h1>
            <p class="mt-8 w-full max-w-3xl text-lg font-light leading-snug text-trim md:text-xl">
                Convert HTML to PDF in your N8N workflows.
            </p>
        </section>

        <div class="relative mx-auto mt-12 w-with-gutters max-w-agent-content">
            <section id="overview" class="agent-overview-card min-h-0 rounded-xl border border-purple-400 bg-white px-6 py-7 md:px-11 md:pb-11 md:pt-12" aria-labelledby="overview-title">
                <h2 id="overview-title">Overview</h2>
                <p class="mt-4 leading-7 md:mt-6">
                    N8N is a powerful workflow automation tool that lets you connect different services and automate tasks without writing code.
                    By integrating PDFShift with N8N, you can automatically generate PDFs from HTML as part of your workflows.
                </p>
                <h3 class="mt-12 text-xl font-medium leading-6 md:text-2xl md:leading-7">Why use PDFShift with N8N?</h3>
                <ul class="mt-2 list-disc pl-5 text-base leading-7 md:text-lg md:leading-8">
                    <li>Automate PDF generation without code</li>
                    <li>Convert HTML, URLs, or dynamic content to PDF</li>
                    <li>Trigger PDF creation from any event in your workflow</li>
                    <li>Save generated PDFs to cloud storage or send via email</li>
                    <li>Handle high-volume document generation reliably</li>
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
                        Create a PDFShift account and get your API key.
                        Keep it private and do not paste it into your Lovable prompt or be added directly to your frontend code.
                    </p>
                    <Button class="mt-3" to="/register" :arrow="true">Register for Free</Button>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Create a New Workflow in N8N</h3>
                    <p>Open N8N and create a new workflow. Add a trigger node (e.g., Manual Trigger, Webhook, Schedule, etc.) to start your workflow.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Add an HTTP Request Node</h3>
                    <p>Click the “+” button and search for “HTTP Request” node. Add it to your workflow after your trigger.</p>
                </div>

                <div class="mt-12 md:mt-16">
                    <h3>Configure the HTTP Request Node</h3>
                    <p>Set up the HTTP Request node with the following configuration:</p>
                    <ContentProsePre class="my-6" :code="configurationCode" />
                </div>

                <div class="mt-12 md:mt-18">
                    <h3>Set the Request Body</h3>
                    <p>In the “Body” section, add your JSON parameters. Here’s a basic example:</p>
                    <ContentProsePre class="my-6" :code="requestCode" />
                </div>
            </section>

            <section id="use-cases" class="mt-24 scroll-mt-30 md:mt-36" aria-labelledby="use-cases-title">
                <h2 id="use-cases-title">Common <span class="text-purple-500">Use Cases</span></h2>
                <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <NuxtLink v-for="useCase in useCases" :key="useCase.title" to="#" class="min-h-60 rounded-2xl border border-purple-500 bg-agent-card p-3 transition-transform duration-300 hover:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500 motion-reduce:transform-none motion-reduce:transition-none">
                        <div class="relative h-full rounded-lg border border-purple-500 bg-white px-6 pb-8 pt-24">
                            <span class="absolute left-6 top-5 block h-10 w-10 text-purple-500" aria-hidden="true">
                                <component :is="useCase.icon" class="size-10" />
                            </span>
                            <h3 class="text-xl font-medium leading-normal text-trim">{{ useCase.title }}</h3>
                            <p class="mt-4 text-base font-light leading-6">{{ useCase.description }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </section>
        </article>

        <section id="advanced-features" class="mt-18 scroll-mt-30 md:mt-36" aria-labelledby="advanced-title">
            <h2 id="advanced-title" class="mx-auto w-with-gutters max-w-agent-content">Advanced Features</h2>
            <div class="mx-auto mt-8 min-h-0 w-with-gutters max-w-5xl rounded-2xl border border-purple-500 bg-agent-panel py-8 md:min-h-agent-panel md:pb-14 md:pt-11">
                <div class="mx-auto w-with-gutters max-w-agent-content">
                    <h3>Webhooks for Async Processing</h3>
                    <p>For large or complex PDFs, use webhooks to process documents asynchronously:</p>
                    <ContentProsePre class="my-6" :code="webhookCode" dark />
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup>
import ApiFirstIcon from '~/components/icons/BarGraphUp.vue'
import NoCodeIcon from '~/components/icons/ClipboardTick.vue'
import ReliableIcon from '~/components/icons/TimerPaused.vue'
import AsyncIcon from '~/components/icons/People.vue'
import AgentsCustomNav from '~/components/agents/CustomNav.vue'
import ContentProsePre from '~/components/content/ProsePre.vue'

const pageSections = [
    { id: 'setup-guide', label: 'Step-by-step Setup Guide' },
    { id: 'use-cases', label: 'Common Use Cases' },
    { id: 'advanced-features', label: 'Advanced Features' },
    { id: 'related-resources', label: 'Related Resources' },
]

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
        title: 'PDFShift API Doc',
        description: 'Complete API reference with every parameter, option, and example.',
        cta: 'View API Docs',
        href: 'https://docs.pdfshift.io',
    },
]

const title = 'PDFShift + N8N Integration'
const description = 'Convert HTML to PDF in your N8N workflows with PDFShift and simple HTTP requests.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>
