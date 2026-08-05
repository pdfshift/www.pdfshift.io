<template>
    <div class="min-w-[320px] overflow-hidden bg-white text-[#011552]">
        <Header :fixed="true" />

        <main class="pt-[104px] md:pt-[132px] xl:pt-[183px]">
            <section class="agents-hero-artwork relative mx-auto h-[560px] w-[min(1281px,calc(100%-32px))] overflow-hidden rounded-[20px] bg-[#011552] text-white md:h-[547px] md:rounded-[30px]" aria-labelledby="agents-title">
                <div class="absolute left-1/2 top-[92px] z-[1] w-[552px] max-w-[calc(100%-32px)] -translate-x-1/2 text-center md:top-[122px]">
                    <h1 id="agents-title" class="text-4xl font-normal !leading-[1.12] md:text-[48px]">
                        PDFSHIFT for <span class="block text-purple-500 md:inline">AI Agents<br />&amp; Automation Tools</span>
                    </h1>
                    <p class="mx-auto mb-8 mt-7 w-[475px] max-w-full text-lg font-light leading-[1.42] tracking-[-0.21px] md:mt-[25px] md:text-[21px]">
                        Powerful PDF generation for your automated workflows. Convert HTML to PDF seamlessly in your favorite automation tools and AI agents.
                    </p>
                    <NuxtLink class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-purple px-6 py-1 text-base font-medium leading-10 text-white transition-[color,background-color,transform] duration-[180ms] ease-[ease] hover:-translate-y-px [&_svg]:size-6" to="#integrations">
                        Explore Integrations
                        <IconsArrowRight class="rotate-90" />
                    </NuxtLink>
                </div>
            </section>

            <section class="py-16 md:pb-20 md:pt-[73px]" aria-labelledby="why-title">
                <h2 id="why-title" class="px-4 text-center text-[30px] font-medium !leading-[1.12] tracking-[-0.36px] md:px-0 md:text-[36px]">
                    Why Choose <span class="text-purple-500">PDFShift</span> for Automation
                </h2>
                <div class="mx-auto mt-12 grid w-[min(1192px,calc(100%-32px))] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <article v-for="feature in features" :key="feature.title" class="h-auto rounded-2xl border border-purple-500 bg-[radial-gradient(circle_at_0_0,rgba(214,199,255,0.1),rgba(132,99,255,0.15)_50%,rgba(51,0,255,0.2))] p-[11px] md:h-[280px] xl:h-80">
                        <div class="flex h-full flex-col rounded-lg border border-purple-500 bg-white px-[23px] pb-5 pt-[22px]">
                            <span class="block size-[41px] text-purple-500 [&_svg]:size-[41px]" aria-hidden="true">
                                <component :is="feature.icon" />
                            </span>
                            <div class="mt-8 md:mt-[42px] xl:mt-[84px]">
                                <h3 class="text-[21px] font-medium leading-none tracking-[-0.21px]">{{ feature.title }}</h3>
                                <p class="mt-[13px] text-base font-light leading-[1.42]">{{ feature.description }}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section id="integrations" class="integrations-artwork relative h-auto overflow-hidden pb-20 text-white xl:h-[1026px] xl:pb-0" aria-labelledby="integrations-title">
                <div class="relative z-[1] pt-16 md:pt-[79px]">
                    <h2 id="integrations-title" class="px-4 text-center text-[30px] font-medium !leading-[1.12] tracking-[-0.36px] md:px-0 md:text-[36px]">
                        Popular <span class="text-purple-500">Integrations</span> for PDFShift
                    </h2>
                    <p class="mt-6 px-6 text-center text-base !font-normal !leading-[1.7] tracking-[-0.18px] md:px-0 md:text-lg">
                        Connect PDFShift with your favorite tools and start automating PDF generation today
                    </p>

                    <div class="mx-auto mt-12 grid w-[min(1004px,calc(100%-32px))] grid-cols-1 gap-4 md:mt-[49px] md:grid-cols-2 xl:grid-cols-3">
                        <article v-for="integration in integrations" :key="integration.name" class="relative h-auto rounded-xl border border-purple bg-[radial-gradient(circle_at_0_0,rgba(214,199,255,0.1),rgba(132,99,255,0.15)_50%,rgba(51,0,255,0.2))] px-6 py-[23px] md:h-[221px]">
                            <div class="flex items-center gap-4">
                                <div class="flex size-[50px] flex-none items-center justify-center overflow-hidden rounded" :class="integration.iconClass">
                                    <img v-if="integration.icon" class="size-full object-cover" :src="integration.icon" alt="" />
                                    <span v-else>{{ integration.short }}</span>
                                </div>
                                <h3 class="text-2xl font-medium !leading-[1.12] tracking-[-0.24px]">{{ integration.name }}</h3>
                            </div>
                            <p class="mt-[18px] text-base font-light leading-[1.42]">Create Zaps that automatically generate PDFs from your triggers and data</p>
                            <NuxtLink class="static mt-5 flex w-fit items-center gap-1 text-base font-light leading-[1.42] text-purple-400 md:absolute md:bottom-5 md:left-6 md:mt-0 md:inline-flex [&_svg]:size-6" :to="integration.href">
                                Learn more <IconsArrowRight />
                            </NuxtLink>
                        </article>

                        <NuxtLink class="relative flex h-auto flex-col items-center justify-center rounded-xl border-purple px-6 py-[23px] text-center text-purple-400 md:h-[221px]" to="/contact">
                            <svg class="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true">
                                <rect width="calc(100% - 1px)" height="calc(100% - 1px)" x="0.5" y="0.5" rx="12" fill="none" stroke="currentColor" stroke-dasharray="8 8" stroke-width="1" vector-effect="non-scaling-stroke" />
                            </svg>
                            <h3 class="text-[21px] font-medium">Suggest an integration</h3>
                            <p class="mt-[14px] w-[275px] max-w-full text-base font-light leading-[1.42]">Got any interesting integration in mind and can’t find it in the list above? Suggest yours here</p>
                        </NuxtLink>
                    </div>
                </div>
            </section>

            <section class="bg-white pb-[70px]" aria-labelledby="build-title">
                <div class="build-shell-artwork relative mx-auto h-auto w-[min(1280px,100%)] bg-purple-100 pb-[180px] xl:h-[2052px] xl:pb-0">
                    <div class="mx-auto w-[491px] max-w-[calc(100%-32px)] pt-20 text-center md:pt-[95px]">
                        <h2 id="build-title" class="px-4 text-center text-[30px] font-medium !leading-[1.12] tracking-[-0.36px] md:px-0 md:text-[36px]">What you can <span class="text-purple-500">Build</span></h2>
                        <p class="mt-6 px-6 text-center text-base font-normal !leading-[1.7] tracking-[-0.18px] md:px-0 md:text-lg">Real-world use cases for automated PDF generation</p>
                    </div>

                    <div class="mx-auto mt-[54px] grid w-[min(900px,calc(100%-32px))] grid-cols-1 gap-6 md:grid-cols-3">
                        <article v-for="useCase in useCases" :key="useCase.title" class="h-auto rounded-2xl border border-purple-500 bg-[radial-gradient(circle_at_0_0,rgba(214,199,255,0.1),rgba(132,99,255,0.15)_50%,rgba(51,0,255,0.2))] p-[9px] md:h-[190px]">
                            <div class="h-full rounded-xl border border-purple-500 bg-white px-[25px] py-[26px]">
                                <h3 class="text-[21px] font-medium leading-none tracking-[-0.21px]">{{ useCase.title }}</h3>
                                <p class="mt-3 text-base font-light leading-[1.42]">{{ useCase.description }}</p>
                            </div>
                        </article>
                    </div>

                    <div class="mx-auto mt-20 h-auto w-[min(927px,calc(100%-32px))] rounded-2xl border border-purple-500 bg-[linear-gradient(159deg,#e8e4ff_0%,#fff_39%,#e8e4ff_98%)] py-10 md:mt-[113px] md:h-[367px] md:pb-0 md:pt-[41px]">
                        <h2 class="px-4 text-center text-[30px] font-medium !leading-[1.12] tracking-[-0.36px] md:px-0 md:text-[36px]">How it works</h2>
                        <div class="steps-grid-artwork relative mx-auto mt-10 grid w-[819px] max-w-[calc(100%-32px)] grid-cols-1 gap-6 md:mt-[33px] md:grid-cols-3 md:gap-[63px]">
                            <article v-for="(step, index) in steps" :key="step.title" class="relative z-[1] h-auto rounded-[5px] border border-purple-400 bg-white px-4 pb-[18px] pt-20 md:h-[221px]">
                                <span class="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-purple-500 text-[21px] font-normal text-white">{{ index + 1 }}</span>
                                <h3 class="text-[21px] font-medium leading-none tracking-[-0.21px]">{{ step.title }}</h3>
                                <p class="mt-[13px] text-base font-light leading-[1.42]">{{ step.description }}</p>
                            </article>
                        </div>
                    </div>

                    <div class="mt-20 md:mt-24 xl:mt-28">
                        <div class="mx-auto w-[491px] max-w-[calc(100%-32px)] text-center">
                            <h2 class="px-4 text-center text-[30px] font-medium !leading-[1.12] tracking-[-0.36px] md:px-0 md:text-[36px]">Developer <span class="text-purple-500">Resources</span></h2>
                            <p class="mt-6 px-6 text-center text-base font-normal !leading-[1.7] tracking-[-0.18px] md:px-0 md:text-lg">
                                Read through our existing documentation and guides to speed-up your installation process with your agents and our integrations with your favorite tools
                            </p>
                        </div>

                        <div class="mx-auto mt-[58px] grid w-[636px] max-w-[calc(100%-32px)] grid-cols-1 gap-8 md:grid-cols-2">
                            <article v-for="resource in resources" :key="resource.title" class="relative mx-auto h-auto w-[302px] max-w-full overflow-hidden rounded-2xl bg-purple-100 bg-[radial-gradient(circle_at_0_0,rgba(214,199,255,0.1),rgba(132,99,255,0.18)_50%,rgba(51,0,255,0.16))] px-8 pb-8 pt-[26px] shadow-[2px_-2px_8px_rgba(146,119,255,0.15)] md:mx-0 md:h-[436px] md:w-auto md:pb-[26px]">
                                <h3 class="text-2xl font-medium !leading-[1.12] tracking-[-0.24px]">{{ resource.title }}</h3>
                                <p class="mt-[11px] text-base font-light leading-[1.42]">{{ resource.description }}</p>
                                <div class="static mt-6 aspect-[236/162] h-auto w-[236px] rounded-lg border border-purple-400 bg-purple-100 md:absolute md:left-8 md:top-[161px] md:mt-0 md:h-[162px]">
                                    <img class="block h-auto w-full" :src="resource.image" :alt="resource.imageAlt" />
                                </div>
                                <NuxtLink class="static mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-purple px-6 py-1 text-base font-medium leading-10 text-white transition-[color,background-color,transform] duration-[180ms] ease-[ease] hover:-translate-y-px md:absolute md:bottom-[33px] md:left-8 md:mt-0 [&_svg]:size-6" :to="resource.href">
                                    {{ resource.cta }} <IconsArrowRight />
                                </NuxtLink>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <div class="relative z-[1] mx-auto h-10 w-[min(820px,64vw)] bg-[linear-gradient(183deg,#dacfff_0%,#fbfaff_100%)]" aria-hidden="true"></div>

            <section class="bottom-cta-artwork relative z-[3] mx-auto flex h-auto min-h-[390px] w-[min(1029px,calc(100%-32px))] items-start justify-center overflow-hidden rounded-[20px] px-6 py-16 text-center text-white md:h-[358px] md:min-h-0 md:rounded-[30px] md:px-0 md:pb-0 md:pt-[82px]" aria-labelledby="bottom-cta-title">
                <div class="relative z-[1]">
                    <h2 id="bottom-cta-title" class="text-[30px] font-medium !leading-[1.12] tracking-[-0.36px] md:text-[36px]">Start <span class="text-purple-400">Automating</span> today</h2>
                    <p class="mt-[9px] text-[21px] font-light leading-[1.42]">Get your free API key and start converting<br />HTML to PDF in your workflows</p>
                    <div class="mt-9 flex flex-col items-center justify-center gap-3 md:flex-row">
                        <NuxtLink class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-purple px-6 py-1 text-base font-medium leading-10 text-white transition-[color,background-color,transform] duration-[180ms] ease-[ease] hover:-translate-y-px [&_svg]:size-6" to="/register">
                            Get your Free API key <IconsArrowRight />
                        </NuxtLink>
                        <NuxtLink class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-1 text-base font-medium leading-10 text-purple transition-[color,background-color,transform] duration-[180ms] ease-[ease] hover:-translate-y-px [&_svg]:size-6" to="https://docs.pdfshift.io">
                            Read the Documentation <IconsArrowRight />
                        </NuxtLink>
                    </div>
                </div>
            </section>
        </main>

        <footer class="relative z-[2] -mt-14 min-h-[524px] bg-[#011552] px-6 pb-16 pt-28 text-center text-white md:-mt-[94px] md:pt-[140px] md:text-left">
            <div class="mx-auto grid w-[min(1080px,100%)] grid-cols-1 md:grid-cols-[1.25fr_repeat(3,1fr)]">
                <div class="footer-brand-divider relative min-h-0 pr-0 md:min-h-[280px] md:pr-[76px]">
                    <NuxtLink to="/" class="mx-auto block w-[141px] md:mx-0" title="Go to the home page">
                        <IconsLogo />
                    </NuxtLink>
                    <div class="mx-auto mt-[22px] flex justify-center gap-6 text-purple-400 md:mx-0 md:justify-start">
                        <NuxtLink class="size-6 p-1" to="https://twitter.com/pdfshift" title="View our X profile"><LogosX /></NuxtLink>
                        <NuxtLink class="size-6" to="https://linkedin.com/company/pdfshift" title="View our LinkedIn profile"><LogosLinkedin /></NuxtLink>
                    </div>
                    <p class="mt-[22px] text-[14px] font-light text-purple-400">© 2023 PDFShift.</p>
                </div>

                <div v-for="column in footerColumns" :key="column.title" class="mt-12 md:mt-0">
                    <h2 class="text-[14px] font-normal uppercase">{{ column.title }}</h2>
                    <ul class="mt-7">
                        <li v-for="link in column.links" :key="link.label" class="text-[14px] font-light text-purple-400 [&+li]:mt-[17px]">
                            <NuxtLink class="hover:underline" :to="link.href">{{ link.label }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
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
    { name: 'N8N', icon: '/images/agents/n8n.svg', href: '/guides/' },
    { name: 'Zapier', icon: '/images/agents/zapier.png', href: '/guides/' },
    { name: 'Make', icon: '/images/agents/make.svg', href: '/guides/' },
    { name: 'MCP', short: 'MCP', iconClass: 'bg-[#0f172a] text-[13px] tracking-[-0.13px] text-purple-100', href: 'https://docs.pdfshift.io' },
    { name: 'Clay', icon: '/images/agents/clay.png', iconClass: 'bg-[#191a1a] [&>img]:!h-[23px] [&>img]:!w-[30px]', href: '/guides/' },
    { name: 'Bubble', icon: '/images/agents/bubble.svg', href: '/guides/' },
    { name: 'FlowMattic', icon: '/images/agents/flowmattic.png', href: '/guides/' },
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

const footerColumns = [
    {
        title: 'Company Details',
        links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Term of services', href: '/legal/terms' },
            { label: 'GRPR', href: '/legal/gdpr' },
            { label: 'HIPAA - BAA', href: '/legal/hipaa' },
        ],
    },
    {
        title: 'Product',
        links: [
            { label: 'Features', href: '/#features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Blog', href: '/blog' },
            { label: 'Documentation', href: 'https://docs.pdfshift.io' },
            { label: 'Playground', href: 'https://playground.pdfshift.io' },
            { label: 'Status Page', href: 'https://status.pdfshift.io' },
        ],
    },
    {
        title: 'Guides',
        links: [
            { label: 'Node.js Guide', href: '/guides/node/' },
            { label: 'Node.js Guide', href: '/guides/node/' },
            { label: 'Python Guide', href: '/guides/python/' },
            { label: 'Ruby Guide', href: '/guides/ruby/' },
            { label: 'All our Guide', href: '/guides/' },
        ],
    },
]

const title = 'PDFShift for AI Agents & Automation Tools'
const description = 'Generate PDFs from N8N, Zapier, Make, MCP, Clay, Bubble, FlowMattic, and your own AI agents with PDFShift.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>

<style scoped>
:global(html) {
    scroll-behavior: smooth;
}

:global(body) {
    overflow-x: hidden;
}

.agents-hero-artwork::before {
    position: absolute;
    inset: 0;
    background-image: url('/images/agents/hero-grid.svg');
    background-position: -7px 35px;
    background-repeat: no-repeat;
    background-size: auto 125%;
    content: '';
    -webkit-mask-image:
        linear-gradient(to bottom, transparent 0%, #000 18%, #000 80%, transparent 100%),
        linear-gradient(to right, #000 0%, #000 35%, rgba(0, 0, 0, 0.55) 65%, transparent 100%);
    -webkit-mask-composite: source-in;
    mask-image:
        linear-gradient(to bottom, transparent 0%, #000 18%, #000 80%, transparent 100%),
        linear-gradient(to right, #000 0%, #000 35%, rgba(0, 0, 0, 0.55) 65%, transparent 100%);
    mask-composite: intersect;
    opacity: 0.34;
}

.integrations-artwork {
    background:
        radial-gradient(ellipse 65% 80% at 0 0, rgba(108, 71, 255, 0.32) 0%, rgba(108, 71, 255, 0.16) 52%, transparent 100%),
        linear-gradient(110deg, #1a0e49 18%, #0c0129 97%);
}

.integrations-artwork::before {
    position: absolute;
    inset: 0;
    background-image: url('/images/agents/integrations-grid.svg');
    background-position: center;
    background-size: cover;
    content: '';
    pointer-events: none;
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

.steps-grid-artwork::before {
    display: none;
}

.bottom-cta-artwork {
    background-color: #4b2b9c;
    background-image:
        linear-gradient(110deg, rgba(108, 71, 255, 0.78) 0%, rgba(92, 57, 209, 0.78) 58%, rgba(60, 38, 142, 0.9) 100%),
        url('/images/agents/hero-grid.svg');
    background-position: center;
    background-size: cover, 111.76% 168.34%;
}

.bottom-cta-artwork::before {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, #6541e9 0%, #5836c5 58%, #3e278f 100%);
    content: '';
    pointer-events: none;
    -webkit-mask-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 4%, transparent 16%),
        linear-gradient(to right, transparent 56%, rgba(0, 0, 0, 0.2) 68%, rgba(0, 0, 0, 0.72) 88%, #000 100%),
        radial-gradient(ellipse 34% 42% at 0% 100%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 100%);
    mask-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 4%, transparent 16%),
        linear-gradient(to right, transparent 56%, rgba(0, 0, 0, 0.2) 68%, rgba(0, 0, 0, 0.72) 88%, #000 100%),
        radial-gradient(ellipse 34% 42% at 0% 100%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 100%);
}

.footer-brand-divider::after {
    display: none;
}

@media (min-width: 768px) {
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

    .footer-brand-divider::after {
        position: absolute;
        top: 0;
        right: 34px;
        display: block;
        width: 1px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #444870 53%, transparent 96%);
        content: '';
    }
}
</style>
