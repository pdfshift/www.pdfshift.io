<template>
    <div class="min-w-[320px] overflow-hidden bg-white text-[#011552]">
        <AlternativeHeader />

        <main id="main-content" class="pt-[128px] md:pt-[150px] xl:pt-[183px]" aria-label="PDFShift and PDF4.dev comparison">
            <section class="alternative-hero relative mx-auto flex h-[520px] w-[min(1281px,calc(100%-32px))] items-start justify-center overflow-hidden rounded-[20px] bg-[#011552] px-5 text-center text-white md:h-[547px] md:rounded-[30px]" aria-labelledby="alternative-title">
                <div class="relative z-[1] mt-[118px] w-[779px] max-w-full md:mt-[147px]">
                    <h1 id="alternative-title" class="text-[38px] font-normal !leading-[1.12] md:text-[48px]">
                        <span class="text-purple-500">PDFShift</span> vs PDF4.dev
                    </h1>
                    <p class="mx-auto mt-7 max-w-[779px] text-lg font-light leading-[1.42] tracking-[-0.21px] md:text-[21px]">
                        Both are HTML-to-PDF APIs powered by Chromium, but PDFShift.dev is a complete platform with template editing, variable injection, and generation logs. PDFShift is a lightweight conversion pipe.
                    </p>
                    <Button class="mt-8 h-12" to="#comparison" :arrow-down="true">Explore Integrations</Button>
                </div>
            </section>

            <section class="mx-auto mt-[106px] w-[min(1280px,calc(100%-32px))] md:mt-[134px]" aria-labelledby="nutshell-title">
                <h2 id="nutshell-title" class="text-center text-[30px] font-medium !leading-[1.12] tracking-[-0.36px] md:text-[36px]">
                    In a nutshell
                </h2>

                <div class="relative mt-[53px] grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-20">
                    <article v-for="option in nutshellOptions" :key="option.title" class="relative min-h-[430px] rounded-xl border border-purple-400 bg-white px-8 pb-10 pt-[29px] shadow-[0_8px_24px_4px_rgba(108,71,255,0.1)] md:px-[60px] xl:px-[89px]">
                        <IconsLogo v-if="option.pdfshift" class="mt-[37px] h-[54px] w-[141px]" />
                        <div v-else class="h-[54px] w-[141px] bg-purple-100" aria-label="PDF4.dev logo placeholder"></div>
                        <h3 class="text-2xl font-medium !leading-[1.12] tracking-[-0.24px]" :class="option.pdfshift ? 'mt-px' : 'mt-[38px]'">{{ option.title }}</h3>
                        <ul class="mt-[11px] text-lg font-normal leading-[1.7] tracking-[-0.18px]">
                            <li v-for="point in option.points" :key="point">{{ point }}</li>
                        </ul>
                    </article>

                    <img class="pointer-events-none absolute left-1/2 top-1/2 z-[2] hidden size-[121px] -translate-x-1/2 -translate-y-1/2 xl:block" src="/images/illustrations/vs.png" alt="versus" />
                </div>
            </section>

            <section id="comparison" class="mx-auto mt-[112px] w-full xl:mt-36" aria-labelledby="comparison-title">
                <div class="mx-auto w-[420px] max-w-[calc(100%-32px)]">
                    <h2 id="comparison-title" class="text-center text-[30px] font-medium !leading-[1.12] tracking-[-0.36px] md:text-[36px]">
                        How both compare
                    </h2>
                    <p class="mx-auto mt-2 w-[320px] max-w-full text-lg font-normal leading-[1.7] tracking-[-0.18px]">
                        Some text about the competition point goes here but do not make it too long.
                    </p>
                </div>

                <div class="mt-[56px] px-4 lg:hidden">
                    <article v-for="(row, index) in comparisonRows" :key="`${row.feature}-${index}`" class="border-b border-gray-200 py-5 first:border-t first:border-[#011552]">
                        <h3 class="text-base font-medium leading-[1.42]">{{ row.feature }}</h3>

                        <div class="mt-3 grid grid-cols-2 gap-3">
                            <div class="min-w-0 rounded-lg bg-purple-100/50 p-3">
                                <p class="text-xs font-medium uppercase tracking-[-0.12px]">PDFShift</p>
                                <div class="mt-2 flex items-start gap-2 text-sm font-light leading-[1.42]">
                                    <span v-if="row.pdfshift.available" class="block size-5 shrink-0 text-purple"><IconsTickFull /></span>
                                    <span v-else class="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-purple"><IconsCross class="size-[14px]" /></span>
                                    <span class="min-w-0 break-words">{{ row.pdfshift.label }}</span>
                                </div>
                            </div>

                            <div class="min-w-0 rounded-lg border border-gray-200 p-3">
                                <p class="text-xs font-medium uppercase tracking-[-0.12px]">PDF4.dev</p>
                                <div class="mt-2 flex items-start gap-2 text-sm font-light leading-[1.42]">
                                    <span v-if="row.pdf4.available" class="block size-5 shrink-0 text-purple"><IconsTickFull /></span>
                                    <span v-else class="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple"><IconsCross class="size-[14px]" /></span>
                                    <span class="min-w-0 break-words">{{ row.pdf4.label }}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="mt-[56px] hidden px-4 lg:block">
                    <div class="mx-auto max-w-[820px]">
                        <div class="grid h-7 grid-cols-[395px_229px_196px] items-center border-b border-[#011552] text-sm font-medium uppercase tracking-[-0.14px]">
                            <div>Feature</div>
                            <div>PDFShift</div>
                            <div>PDF4.dev</div>
                        </div>
                        <div v-for="(row, index) in comparisonRows" :key="`${row.feature}-${index}`" class="grid h-[45px] grid-cols-[395px_229px_196px] items-center border-b border-gray-200 font-light leading-[1.42]">
                            <div class="text-base">{{ row.feature }}</div>
                            <div class="flex items-center gap-3 text-sm">
                                <span v-if="row.pdfshift.available" class="block size-5 shrink-0 text-purple"><IconsTickFull /></span>
                                <span v-else class="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple"><IconsCross class="size-[14px]" /></span>
                                <span>{{ row.pdfshift.label }}</span>
                            </div>
                            <div class="flex items-center gap-3 text-sm">
                                <span v-if="row.pdf4.available" class="block size-5 shrink-0 text-purple"><IconsTickFull /></span>
                                <span v-else class="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple"><IconsCross class="size-[14px]" /></span>
                                <span>{{ row.pdf4.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="mt-[52px] px-4 text-center text-base font-light leading-[1.42] text-black">
                    If you are the owner of PDF4.dev and find some mistakes on this comparison page, please
                    <NuxtLink class="underline underline-offset-2" to="/contact">contact us</NuxtLink>
                </p>
            </section>

            <AgentsBottomCta
                class="mt-[61px]"
                title="Ready to switch?"
                description="Create your free PDFShift account and start automating PDF generation in no time"
                title-id="switch-title"
                primary-label="Get started now"
                primary-href="/register"
                :show-secondary="false"
            />
        </main>

        <footer class="relative z-[2] -mt-16 min-h-[524px] bg-[#011552] px-6 pb-16 pt-[135px] text-center text-white md:text-left">
            <div class="mx-auto grid w-[min(1072px,100%)] grid-cols-1 md:grid-cols-[1.25fr_repeat(3,1fr)] xl:grid-cols-[328px_328px_328px_88px]">
                <div class="footer-brand-divider relative min-h-0 pr-0 md:min-h-[280px] md:pr-[76px]">
                    <NuxtLink to="/" class="mx-auto block w-[141px] md:mx-0" title="Go to the home page">
                        <IconsLogo />
                    </NuxtLink>
                    <div class="mx-auto mt-[22px] flex w-fit justify-center gap-8 text-purple-400 md:mx-0 md:justify-start">
                        <NuxtLink class="size-[30px] p-1" to="https://twitter.com/pdfshift" title="View our X profile"><LogosX /></NuxtLink>
                        <NuxtLink class="size-[30px]" to="https://linkedin.com/company/pdfshift" title="View our LinkedIn profile"><LogosLinkedin /></NuxtLink>
                    </div>
                    <p class="mt-[22px] text-sm font-light text-purple-400">© 2023 PDFShift.</p>
                </div>

                <div v-for="column in footerColumns" :key="column.title" class="mt-12 md:mt-0">
                    <h2 class="text-sm font-normal uppercase">{{ column.title }}</h2>
                    <ul class="mt-7">
                        <li v-for="link in column.links" :key="link.label" class="text-sm font-light text-purple-400 [&+li]:mt-[17px]">
                            <NuxtLink class="hover:underline" :to="link.href">{{ link.label }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import AlternativeHeader from '~/components/AlternativeHeader.vue'
import AgentsBottomCta from '~/components/agents/BottomCta.vue'

definePageMeta({ layout: false })

const nutshellOptions = [
    {
        title: 'Choose PDFShift if you want',
        pdfshift: true,
        points: [
            'A simple API-only approach with no platform overhead',
            'URL-to-PDF support (convert any public URL)',
            'Pay-per-conversion pricing for low volumes',
            'Lightweight integration with minimal setup',
            'Webhooks for async workflows',
        ],
    },
    {
        title: 'Choose PDF4.dev if you want',
        pdfshift: false,
        points: [
            'A template editor + visual editor your whole team can use',
            'Handlebars variables with auto-detection and preview',
            'A dashboard with generation logs and usage stats',
            'Generous included usage',
            'AI agent support via built-in MCP server',
        ],
    },
]

const comparisonRows = [
    { feature: 'Template Editor', pdfshift: { available: true, label: 'Code + Visual Editor' }, pdf4: { available: false, label: 'None' } },
    { feature: 'URL to PDF', pdfshift: { available: false, label: 'Not supported' }, pdf4: { available: true, label: 'Supported' } },
    { feature: 'Feature name', pdfshift: { available: true, label: 'Explanation' }, pdf4: { available: false, label: 'Explanation' } },
    { feature: 'Feature name', pdfshift: { available: true, label: 'Explanation' }, pdf4: { available: false, label: 'Explanation' } },
    { feature: 'Feature name', pdfshift: { available: true, label: 'Explanation' }, pdf4: { available: false, label: 'Explanation' } },
    { feature: 'Feature name', pdfshift: { available: false, label: 'Explanation' }, pdf4: { available: true, label: 'Explanation' } },
    { feature: 'Feature name', pdfshift: { available: false, label: 'Explanation' }, pdf4: { available: true, label: 'Explanation' } },
    { feature: 'Feature name', pdfshift: { available: true, label: 'Explanation' }, pdf4: { available: true, label: 'Explanation' } },
    { feature: 'Feature name', pdfshift: { available: true, label: 'Explanation' }, pdf4: { available: true, label: 'Explanation' } },
    { feature: 'Feature name', pdfshift: { available: true, label: 'Explanation' }, pdf4: { available: false, label: 'Explanation' } },
    { feature: 'Feature name', pdfshift: { available: false, label: 'Explanation' }, pdf4: { available: true, label: 'Explanation' } },
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

const title = 'PDFShift vs PDF4.dev'
const description = 'Compare PDFShift and PDF4.dev for HTML-to-PDF conversion, template editing, URL support, generation logs, and workflow automation.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>

<style scoped>
:global(html) {
    scroll-behavior: smooth;
}

:global(body) {
    overflow-x: hidden;
}

.alternative-hero::before {
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

.footer-brand-divider::after {
    display: none;
}

@media (min-width: 768px) {
    .footer-brand-divider::after {
        position: absolute;
        top: 0;
        right: 96px;
        display: block;
        width: 1px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #444870 53%, transparent 96%);
        content: '';
    }
}
</style>
