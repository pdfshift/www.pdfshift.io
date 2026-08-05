<template>
    <div class="min-w-80 overflow-hidden bg-white text-[#011552]">
        <Header :fixed="true" />

        <main id="main-content" class="pt-[108px] md:pt-44">
            <div class="mx-auto w-[calc(100%-2rem)] max-w-5xl">
                <NuxtLink class="inline-flex items-center gap-2.5 text-sm font-normal leading-6 tracking-[-0.14px] text-purple-500 uppercase [&_svg]:h-6 [&_svg]:w-6" to="/agents#integrations">
                    <IconsArrowRight class="rotate-180" />
                    Back to integrations
                </NuxtLink>
            </div>

            <section class="mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-[820px] flex-col items-center text-center" aria-labelledby="agent-title">
                <img class="h-10 w-10 -translate-y-[46px]" src="/images/agents/n8n.svg" alt="N8N" />
                <h1 id="agent-title" class="-mt-1.5 text-4xl font-normal leading-[1.12] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-6xl">PDFShift + N8N</h1>
                <p class="mt-8 w-full max-w-[750px] text-lg font-light leading-[1.42] tracking-[-0.18px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-[21px] md:tracking-[-0.21px]">Convert HTML to PDF in your N8N workflows with simple HTTP requests. Automate document generation with the power of visual workflow automation.</p>
                <small class="mt-8 text-sm font-light leading-[1.42] text-purple-500 md:text-base">This comparison is published by PDFShift. We aim for accuracy but acknowledge our perspective.</small>
            </section>

            <div class="relative mx-auto mt-12 w-[calc(100%-2rem)] max-w-[820px]">
                <section id="overview" class="min-h-0 rounded-xl border border-purple-400 bg-white px-6 py-7 shadow-[0_8px_18px_rgba(108,71,255,0.1)] md:min-h-[500px] md:px-11 md:pb-11 md:pt-[50px]" aria-labelledby="overview-title">
                    <h2 id="overview-title" class="text-[30px] font-medium leading-[1.12] tracking-[-0.3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-4xl md:tracking-[-0.36px]">Overview</h2>
                    <p class="mt-7 text-base font-normal leading-[27.2px] tracking-[-0.16px] md:mt-[45px] md:text-lg md:leading-[30.6px] md:tracking-[-0.18px]">N8N is a powerful workflow automation tool that lets you connect different services and automate tasks without writing code. By integrating PDFShift with N8N, you can automatically generate PDFs from HTML as part of your workflows.</p>
                    <h3 class="mt-[49px] text-[21px] font-medium leading-[23.52px] tracking-[-0.21px] md:text-2xl md:leading-[26.88px] md:tracking-[-0.24px]">Why use PDFShift with N8N?</h3>
                    <ul class="mt-2 list-disc pl-[22px] text-base leading-[27.2px] tracking-[-0.16px] md:text-lg md:leading-[30.6px] md:tracking-[-0.18px]">
                        <li>Automate PDF generation without code</li>
                        <li>Convert HTML, URLs, or dynamic content to PDF</li>
                        <li>Trigger PDF creation from any event in your workflow</li>
                        <li>Save generated PDFs to cloud storage or send via email</li>
                        <li>Handle high-volume document generation reliably</li>
                    </ul>
                </section>

                <nav class="absolute left-[calc(100%+2rem)] top-0 hidden min-h-[275px] w-[198px] flex-col gap-5 rounded-xl border border-purple-400 bg-white px-[19px] py-[29px] text-base font-light leading-[1.42] shadow-[0_8px_12px_rgba(108,71,255,0.1)] xl:flex" aria-label="On this page">
                    <a class="font-medium text-purple" href="#prerequisites">→ Prerequisites</a>
                    <a href="#setup-guide">Step-by-step Setup Guide</a>
                    <a href="#use-cases">Common Use Cases</a>
                    <a href="#advanced-features">Advanced Features</a>
                    <a href="#related-resources">Related Resources</a>
                </nav>
            </div>

            <div class="mx-auto w-[calc(100%-2rem)] max-w-[820px]">
                <section id="prerequisites" class="mt-[72px] scroll-mt-[120px] md:mt-[98px]" aria-labelledby="prerequisites-title">
                    <h2 id="prerequisites-title" class="text-[30px] font-medium leading-[1.12] tracking-[-0.3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-4xl md:tracking-[-0.36px]">Prerequisites</h2>
                    <ol class="mt-[38px] list-none">
                        <li>
                            <h3 class="text-lg font-normal leading-[30.6px] tracking-[-0.18px]">1. PDFShift API Key</h3>
                            <p class="text-lg font-normal leading-[30.6px] tracking-[-0.18px]">You’ll need an API key from PDFShift. If you don’t have one yet:</p>
                            <NuxtLink class="mt-[13px] inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-purple px-6 py-1 text-base font-medium leading-10 text-white transition duration-200 hover:-translate-y-px hover:bg-[#011552] [&_svg]:h-6 [&_svg]:w-6" to="/register">Register for Free <IconsArrowRight /></NuxtLink>
                        </li>
                        <li class="mt-10">
                            <h3 class="text-lg font-normal leading-[30.6px] tracking-[-0.18px]">2. N8N Account or Installation</h3>
                            <p class="text-lg font-normal leading-[30.6px] tracking-[-0.18px]">You can use N8N Cloud or self-host N8N on your own server. Visit <NuxtLink class="underline" to="https://n8n.io">n8n.io</NuxtLink> to get started.</p>
                        </li>
                        <li class="mt-3">
                            <h3 class="text-lg font-normal leading-[30.6px] tracking-[-0.18px]">3. Basic N8N Knowledge</h3>
                            <p class="text-lg font-normal leading-[30.6px] tracking-[-0.18px]">Familiarity with creating workflows and using the HTTP Request node in N8N is helpful but not required.</p>
                        </li>
                    </ol>
                </section>

                <section id="setup-guide" class="mt-[72px] scroll-mt-[120px] md:mt-[51px]" aria-labelledby="setup-title">
                    <h2 id="setup-title" class="text-[30px] font-medium leading-[1.12] tracking-[-0.3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-4xl md:tracking-[-0.36px]">Step-by-Step Setup Guide</h2>

                    <article class="mt-12 md:mt-[47px]">
                        <h3 class="text-2xl font-medium leading-[26.88px] tracking-[-0.24px]">Get Your PDFShift API Key</h3>
                        <p class="mt-[11px] text-lg font-normal leading-[30.6px] tracking-[-0.18px]">After registering, you’ll find your API key in your dashboard. Copy it – you’ll need it for authentication.</p>
                        <AgentsCodeBlock class="mt-7" :code="apiKeyCode" />
                    </article>

                    <article class="mt-12 md:mt-[65px]">
                        <h3 class="text-2xl font-medium leading-[26.88px] tracking-[-0.24px]">Create a New Workflow in N8N</h3>
                        <p class="mt-[11px] text-lg font-normal leading-[30.6px] tracking-[-0.18px]">Open N8N and create a new workflow. Add a trigger node (e.g., Manual Trigger, Webhook, Schedule, etc.) to start your workflow.</p>
                    </article>

                    <article class="mt-12 md:mt-[65px]">
                        <h3 class="text-2xl font-medium leading-[26.88px] tracking-[-0.24px]">Add an HTTP Request Node</h3>
                        <p class="mt-[11px] text-lg font-normal leading-[30.6px] tracking-[-0.18px]">Click the “+” button and search for “HTTP Request” node. Add it to your workflow after your trigger.</p>
                    </article>

                    <article class="mt-12 md:mt-16">
                        <h3 class="text-2xl font-medium leading-[26.88px] tracking-[-0.24px]">Configure the HTTP Request Node</h3>
                        <p class="mt-[11px] text-lg font-normal leading-[30.6px] tracking-[-0.18px]">Set up the HTTP Request node with the following configuration:</p>
                        <AgentsCodeBlock class="mt-7 !min-h-[228px]" :code="configurationCode" />
                    </article>

                    <article class="mt-12 md:mt-[70px]">
                        <h3 class="text-2xl font-medium leading-[26.88px] tracking-[-0.24px]">Set the Request Body</h3>
                        <p class="mt-[11px] text-lg font-normal leading-[30.6px] tracking-[-0.18px]">In the “Body” section, add your JSON parameters. Here’s a basic example:</p>
                        <AgentsCodeBlock class="mt-7 !min-h-[176px]" :code="requestCode" />
                    </article>
                </section>

                <section id="use-cases" class="mt-24 scroll-mt-[120px] md:mt-[150px]" aria-labelledby="use-cases-title">
                    <h2 id="use-cases-title" class="text-[30px] font-medium leading-[1.12] tracking-[-0.3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-4xl md:tracking-[-0.36px]">Common <span class="text-purple-500">Use Cases</span></h2>
                    <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <article v-for="useCase in useCases" :key="useCase.title" class="h-[244px] rounded-2xl border border-purple-500 bg-[radial-gradient(circle_at_0_0,rgba(214,199,255,0.1),rgba(132,99,255,0.15)_50%,rgba(51,0,255,0.2))] p-[11px]">
                            <div class="relative h-full rounded-lg border border-purple-500 bg-white px-6 pb-[18px] pt-[89px]">
                                <span class="absolute left-6 top-5 block h-[41px] w-[41px] text-purple-500 [&_svg]:h-[41px] [&_svg]:w-[41px]" aria-hidden="true">
                                    <component :is="useCase.icon" />
                                </span>
                                <h3 class="text-[21px] font-medium leading-[normal] tracking-[-0.21px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{{ useCase.title }}</h3>
                                <p class="mt-4 text-base font-light leading-[22.72px]">{{ useCase.description }}</p>
                            </div>
                        </article>
                    </div>
                </section>
            </div>

            <section id="advanced-features" class="mt-[72px] scroll-mt-[120px] md:mt-[137px]" aria-labelledby="advanced-title">
                <h2 id="advanced-title" class="mx-auto w-[calc(100%-2rem)] max-w-[820px] text-[30px] font-medium leading-[1.12] tracking-[-0.3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-4xl md:tracking-[-0.36px]">Advanced Features</h2>
                <div class="mx-auto mt-8 min-h-0 w-[calc(100%-2rem)] max-w-5xl rounded-2xl border border-purple-500 bg-[linear-gradient(159deg,#e8e4ff_0%,#fff_39%,#e8e4ff_98%)] py-8 md:min-h-[367px] md:pb-14 md:pt-11">
                    <div class="mx-auto w-[calc(100%-2rem)] max-w-[820px]">
                        <h3 class="text-2xl font-medium leading-[26.88px] tracking-[-0.24px]">Webhooks for Async Processing</h3>
                        <p class="mt-[11px] text-base font-normal leading-[27.2px] tracking-[-0.16px] md:text-lg md:leading-[30.6px] md:tracking-[-0.18px]">For large or complex PDFs, use webhooks to process documents asynchronously:</p>
                        <AgentsCodeBlock class="mt-7 min-h-[167px]" :code="webhookCode" dark />
                    </div>
                </div>
            </section>

            <section id="related-resources" class="mx-auto mt-[72px] w-[calc(100%-2rem)] max-w-[820px] scroll-mt-[120px] md:mt-[105px]" aria-labelledby="resources-title">
                <h2 id="resources-title" class="text-[30px] font-medium leading-[1.12] tracking-[-0.3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-4xl md:tracking-[-0.36px]">Relate Resources</h2>
                <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[33px]">
                    <article v-for="resource in resources" :key="resource.title" class="flex min-h-[260px] flex-col items-start rounded-xl border border-purple-400 bg-white px-10 py-8 shadow-[0_8px_24px_4px_rgba(108,71,255,0.1)] md:min-h-[249px] md:py-[31px]">
                        <h3 class="text-2xl font-medium leading-[26.88px] tracking-[-0.24px]">{{ resource.title }}</h3>
                        <p class="mt-8 text-base font-light leading-[22.72px]">{{ resource.description }}</p>
                        <NuxtLink class="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-purple px-6 py-1 text-base font-medium leading-10 text-white transition duration-200 hover:-translate-y-px hover:bg-[#011552] [&_svg]:h-6 [&_svg]:w-6" :to="resource.href">
                            {{ resource.cta }} <IconsArrowRight />
                        </NuxtLink>
                    </article>
                </div>
            </section>

            <AgentsBottomCta
                bridge
                class="mt-20 md:mt-[75px]"
                title="Ready to Get Started?"
                description="Create your free PDFShift account and start automating PDF generation in N8N today"
                title-id="details-bottom-cta-title"
                primary-label="Get your Free API key"
                primary-href="/register"
                secondary-label="Read the Documentation"
                secondary-href="https://docs.pdfshift.io"
            />
        </main>

        <AgentsPageFooter />
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
