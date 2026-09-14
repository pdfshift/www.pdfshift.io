<template>
    <div class="min-w-80 overflow-hidden bg-white text-navy-800">
        <Header />

        <main id="main-content" class="pt-26 md:pt-32 xl:pt-44">
            <section class="agents-hero-artwork marketing-hero-artwork relative mx-auto w-with-gutters max-w-screen-xl overflow-hidden rounded-2xl bg-navy-800 text-white md:h-agent-hero md:rounded-4xl" aria-labelledby="agents-title">
                <div class="absolute left-1/2 top-24 z-1 w-with-gutters max-w-xl -translate-x-1/2 text-center md:top-30">
                    <h1 id="agents-title" class="text-4xl font-normal !leading-display md:text-6xl">
                        PDFSHIFT for <span class="block text-purple-500 md:inline">AI Agents<br />&amp; Automation Tools</span>
                    </h1>
                    <p class="mx-auto mb-8 mt-7 w-full max-w-lg text-lg font-light leading-snug md:mt-6 md:text-xl">
                        Powerful PDF generation for your automated workflows. Convert HTML to PDF seamlessly in your favorite automation tools and AI agents.
                    </p>
                    <Button to="#integrations" :arrow-down="true">Explore Integrations</Button>
                </div>
            </section>

            <section class="py-16 md:pb-20 md:pt-18" aria-labelledby="why-title">
                <h2 id="why-title" class="px-4 text-center text-3xl font-medium !leading-display md:px-0 md:text-4xl">
                    Why Choose <span class="text-purple-500">PDFShift</span> for Automation
                </h2>
                <div class="mx-auto mt-12 grid w-with-gutters max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <article v-for="feature in features" :key="feature.title" class="h-auto rounded-2xl border border-purple-500 bg-agent-card p-3 md:h-72 xl:h-80">
                        <div class="flex h-full flex-col rounded-lg border border-purple-500 bg-white px-6 pb-5 pt-5">
                            <span class="feature-icon block size-10 text-purple-500" aria-hidden="true">
                                <component :is="feature.icon" />
                            </span>
                            <div class="mt-8 md:mt-10 xl:mt-20">
                                <h3 class="text-xl font-medium leading-none">{{ feature.title }}</h3>
                                <p class="mt-3 text-base font-light leading-snug">{{ feature.description }}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section id="integrations" class="integrations-artwork relative h-auto overflow-hidden pb-20 text-white xl:pb-0" aria-labelledby="integrations-title">
                <div class="relative z-1 pt-16 md:pt-20">
                    <h2 id="integrations-title" class="px-4 text-center text-3xl font-medium !leading-display md:px-0 md:text-4xl">
                        Popular <span class="text-purple-500">Integrations</span> for PDFShift
                    </h2>
                    <p class="mt-6 px-6 text-center text-base !font-normal !leading-relaxed md:px-0 md:text-lg">
                        Connect PDFShift with your favorite tools and start automating PDF generation today
                    </p>

                    <div class="mx-auto mt-12 grid w-with-gutters max-w-5xl grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
                        <NuxtLink v-for="integration in integrations" :key="integration.name" class="relative h-auto rounded-xl border border-purple bg-agent-card px-6 py-6 md:h-56" :to="integration.href">
                            <div class="flex items-center gap-4">
                                <div class="flex size-12 flex-none items-center justify-center overflow-hidden rounded" :class="integration.iconClass">
                                    <img v-if="integration.icon" class="size-full object-cover" :class="integration.imageClass" :src="integration.icon" alt="" />
                                    <span v-else>{{ integration.short }}</span>
                                </div>
                                <h3 class="text-2xl font-medium !leading-display">{{ integration.name }}</h3>
                            </div>
                            <p class="mt-4 text-base font-light leading-snug">{{ integration.description }}</p>
                            <span class="static mt-5 flex w-fit items-center gap-1 text-base font-light leading-snug text-purple-400 md:absolute md:bottom-5 md:left-6 md:mt-0 md:inline-flex">
                                Learn more <IconsArrowRight class="size-6" />
                            </span>
                        </NuxtLink>

                        <NuxtLink class="relative flex h-auto flex-col items-center justify-center rounded-xl border-purple px-6 py-6 text-center text-purple-400 md:h-56" to="/contact">
                            <svg class="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true">
                                <rect width="calc(100% - 1px)" height="calc(100% - 1px)" x="0.5" y="0.5" rx="12" fill="none" stroke="currentColor" stroke-dasharray="8 8" stroke-width="1" vector-effect="non-scaling-stroke" />
                            </svg>
                            <h3 class="text-xl font-medium">Suggest an integration</h3>
                            <p class="mt-3.5 w-72 max-w-full text-base font-light leading-snug">Got any interesting integration in mind and can’t find it in the list above? Suggest yours here</p>
                        </NuxtLink>
                    </div>
                </div>
            </section>

            <section class="agents-build-section bg-white" aria-labelledby="build-title">
                <div class="build-shell-artwork relative mx-auto h-auto w-full max-w-screen-xl bg-purple-100 pb-44 xl:pb-0">
                    <div class="mx-auto w-with-gutters max-w-agent-copy pt-20 text-center md:pt-24">
                        <h2 id="build-title" class="px-4 text-center text-3xl font-medium !leading-display md:px-0 md:text-4xl">What you can <span class="text-purple-500">Build</span></h2>
                        <p class="mt-6 px-6 text-center text-base font-normal !leading-relaxed md:px-0 md:text-lg">Real-world use cases for automated PDF generation</p>
                    </div>

                    <div class="mx-auto mt-14 grid w-with-gutters max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
                        <article v-for="useCase in useCases" :key="useCase.title" class="h-auto rounded-2xl border border-purple-500 bg-agent-card p-2 md:h-48">
                            <div class="h-full rounded-xl border border-purple-500 bg-white px-6 py-6">
                                <h3 class="text-xl font-medium leading-none">{{ useCase.title }}</h3>
                                <p class="mt-3 text-base font-light leading-snug">{{ useCase.description }}</p>
                            </div>
                        </article>
                    </div>

                    <div class="mx-auto mt-20 h-auto w-with-gutters max-w-4xl rounded-2xl border border-purple-500 bg-agent-panel py-10 md:mt-28 md:h-agent-panel md:pb-0 md:pt-10">
                        <h2 class="px-4 text-center text-3xl font-medium !leading-display md:px-0 md:text-4xl">How it works</h2>
                        <div class="steps-grid-artwork relative mx-auto mt-10 grid w-with-gutters max-w-agent-content grid-cols-1 gap-6 md:mt-8 md:grid-cols-3 md:gap-16">
                            <article v-for="(step, index) in steps" :key="step.title" class="relative z-1 h-auto rounded-md border border-purple-400 bg-white px-4 pb-4 pt-20 md:h-56">
                                <span class="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-purple-500 text-xl font-normal text-white">{{ index + 1 }}</span>
                                <h3 class="text-xl font-medium leading-none">{{ step.title }}</h3>
                                <p class="mt-3 text-base font-light leading-snug">{{ step.description }}</p>
                            </article>
                        </div>
                    </div>

                    <div class="mt-20 md:mt-24 xl:mt-28">
                        <div class="mx-auto w-with-gutters max-w-agent-copy text-center">
                            <h2 class="px-4 text-center text-3xl font-medium !leading-display md:px-0 md:text-4xl">Developer <span class="text-purple-500">Resources</span></h2>
                            <p class="mt-6 px-6 text-center text-base font-normal !leading-relaxed md:px-0 md:text-lg">
                                Read through our existing documentation and guides to speed-up your installation process with your agents and our integrations with your favorite tools
                            </p>
                        </div>

                        <div class="mx-auto mt-14 grid w-with-gutters max-w-2xl grid-cols-1 gap-8 md:grid-cols-2">
                            <article v-for="resource in resources" :key="resource.title" class="agent-resource-card relative mx-auto h-auto w-72 max-w-full overflow-hidden rounded-2xl bg-purple-100 bg-agent-card-soft px-8 pb-8 pt-6 md:mx-0 md:w-auto md:pb-6">
                                <h3 class="text-2xl font-medium !leading-display">{{ resource.title }}</h3>
                                <p class="mt-3 text-base font-light leading-snug">{{ resource.description }}</p>
                                <div class="agent-resource-preview static mt-6 h-auto w-60 rounded-lg border border-purple-400 bg-purple-100 md:absolute md:left-8 md:top-40 md:mt-0 md:h-40">
                                    <img class="block h-auto w-full" :src="resource.image" :alt="resource.imageAlt" />
                                </div>
                                <Button class="static mt-6 md:absolute md:bottom-8 md:left-8 md:mt-0" :to="resource.href" :arrow="true">{{ resource.cta }}</Button>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <AgentsBottomCta
                bridge
                title="Start"
                highlight="Automating"
                suffix="today"
                description="Get your free API key and start converting HTML to PDF in your workflows"
            />
        </main>

        <AgentsPageFooter />
    </div>
</template>

<script setup>
import ApiFirstIcon from '~/components/icons/BarGraphUp.vue'
import NoCodeIcon from '~/components/icons/ClipboardTick.vue'
import AsyncIcon from '~/components/icons/People.vue'
import ReliableIcon from '~/components/icons/TimerPaused.vue'

definePageMeta({ layout: false })

const features = [
    {
        title: 'No Code Required',
        description: 'Use visual builders and drag-and-drop interfaces. No programming knowledge needed.',
        icon: NoCodeIcon,
    },
    {
        title: 'API First',
        description: 'RESTful API that works with any automation tool or AI agent framework.',
        icon: ApiFirstIcon,
    },
    {
        title: 'Always Reliable',
        description: '99.99% uptime guarantee. Your workflows run smoothly without interruptions.',
        icon: ReliableIcon,
    },
    {
        title: 'Async Processing',
        description: 'Webhook support for large jobs. Process documents in the background efficiently.',
        icon: AsyncIcon,
    },
]

const integrations = [
    { name: 'N8N', description: 'Generate PDFs automatically from your N8N workflows.', icon: '/images/agents/n8n.svg', href: '/agents/n8n' },
    { name: 'Zapier', description: 'Create Zaps that generate PDFs from your triggers and data.', icon: '/images/agents/zapier.png', href: '/guides/' },
    { name: 'Make', description: 'Generate PDFs automatically from your Make scenarios.', icon: '/images/agents/make.svg', href: '/guides/' },
    { name: 'MCP', description: 'Give AI agents access to PDFShift through the Model Context Protocol.', short: 'MCP', iconClass: 'bg-slate-900 text-xs text-purple-100', href: 'https://docs.pdfshift.io' },
    { name: 'Clay', description: 'Generate personalized PDFs from your Clay workflow data.', icon: '/images/agents/clay.png', iconClass: 'clay-icon', imageClass: '!h-6 !w-7', href: '/guides/' },
    { name: 'Bubble', description: 'Add automated PDF generation to your Bubble applications.', icon: '/images/agents/bubble.svg', href: '/guides/' },
    { name: 'FlowMattic', description: 'Generate PDFs automatically from your WordPress workflows.', icon: '/images/agents/flowmattic.png', href: '/guides/' },
]

const useCases = [
    { title: 'Invoice Generation', description: 'Automatically generate invoices from payment webhooks and send them to customers.' },
    { title: 'Report Creation', description: 'Create beautiful reports from spreadsheet data, databases, or APIs automatically.' },
    { title: 'Contract Automation', description: 'Generate personalized contracts and agreements from templates with data from your CRM.' },
    { title: 'E-Commerce Receipts', description: 'Generate and email receipts automatically when orders are placed in your store.' },
    { title: 'Document Archiving', description: 'Archive web pages, emails, or documents as PDFs to cloud storage automatically.' },
    { title: 'Multi-Language Docs', description: 'Generate documents in multiple languages automatically based on user preferences.' },
]

const steps = [
    { title: 'Connect your tool', description: 'Link your automation tool to PDFShift using our REST API with your API key.' },
    { title: 'Configure options', description: 'Set your HTML source, filename, and PDF options like margins, headers, and footers.' },
    { title: 'Receive your PDF', description: 'Get your PDF via direct download, URL, cloud storage, or webhook notification.' },
]

const resources = [
    {
        title: 'API Documentation',
        description: 'Comprehensive API reference with all parameters, options, and examples.',
        image: '/images/agents/api-documentation.svg',
        imageAlt: 'API documentation code preview',
        cta: 'View Docs',
        href: 'https://docs.pdfshift.io',
    },
    {
        title: 'Language Guides',
        description: 'Step-by-step guides for Go, Node, PHP, Python, Java, Ruby, and more.',
        image: '/images/agents/language-guides.svg',
        imageAlt: 'PDFShift language guides preview',
        cta: 'Browse Guides',
        href: '/guides/',
    },
]

const title = 'PDFShift for AI Agents & Automation Tools'
const description = 'Generate PDFs from N8N, Zapier, Make, MCP, Clay, Bubble, FlowMattic, and your own AI agents with PDFShift.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>

<style scoped>
.agents-hero-artwork {
    height: 560px;
}

.integrations-artwork {
    background:
        radial-gradient(ellipse 65% 80% at 0 0, rgba(108, 71, 255, 0.32) 0%, rgba(108, 71, 255, 0.16) 52%, transparent 100%),
        linear-gradient(110deg, #1a0e49 18%, #0c0129 97%);
}


.build-shell-artwork::after {
    position: absolute;
    bottom: -70px;
    left: 0;
    width: 100%;
    height: 70px;
    background: linear-gradient(183deg, #d5ccfd 0%, #f4f2ff 100%);
    clip-path: polygon(0 0, 100% 0, 82% 100%, 18% 100%);
    content: '';
}

.agents-build-section {
    padding-bottom: 70px;
}

.steps-grid-artwork::before {
    display: none;
}

.feature-icon :deep(svg) {
    width: 100%;
    height: 100%;
}

.clay-icon {
    background-color: #191a1a;
}

.agent-resource-card {
    box-shadow: 2px -2px 8px rgba(146, 119, 255, 0.15);
}

.agent-resource-preview {
    aspect-ratio: 236 / 162;
}

@media (min-width: 768px) {
    .agent-resource-card {
        height: 436px;
    }

    .steps-grid-artwork::before {
        position: absolute;
        top: 109px;
        right: 0;
        left: 0;
        display: block;
        height: 2px;
        background: repeating-linear-gradient(90deg, #c6b2ff 0 5px, transparent 5px 10px);
        content: '';
    }
}

@media (min-width: 1280px) {
    .integrations-artwork {
        height: 1026px;
    }

    .build-shell-artwork {
        height: 2052px;
    }
}
</style>
