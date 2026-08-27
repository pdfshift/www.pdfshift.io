<template>
    <div class="min-w-80 overflow-hidden bg-white text-navy-800">
        <Header />

        <main id="main-content" class="pt-32 md:pt-36 xl:pt-44" aria-label="PDFShift and PDF4.dev comparison">
            <section class="alternative-hero marketing-hero-artwork relative mx-auto flex w-with-gutters max-w-screen-xl items-start justify-center overflow-hidden rounded-2xl bg-navy-800 px-5 text-center text-white md:h-agent-hero md:rounded-4xl" aria-labelledby="alternative-title">
                <div class="relative z-1 mt-30 w-full max-w-3xl md:mt-36">
                    <h1 id="alternative-title" class="text-4xl font-normal !leading-display md:text-6xl">
                        <span class="text-purple-500">PDFShift</span> vs PDF4.dev
                    </h1>
                    <p class="mx-auto mt-7 text-lg font-light leading-snug md:text-xl">
                        Both are HTML-to-PDF APIs powered by Chromium, but PDF4.dev is a complete platform with template editing, variable injection, and generation logs. PDFShift is a lightweight conversion pipe.
                    </p>
                    <Button class="mt-8 h-12" to="#comparison" :arrow-down="true">Explore Comparison</Button>
                </div>
            </section>

            <section class="mx-auto mt-26 w-with-gutters max-w-screen-xl md:mt-32" aria-labelledby="nutshell-title">
                <h2 id="nutshell-title" class="text-center text-3xl font-medium !leading-display md:text-4xl">
                    In a nutshell
                </h2>

                <div class="relative mt-14 grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-20">
                    <article v-for="option in nutshellOptions" :key="option.title" class="comparison-option relative z-1 rounded-xl border border-purple-400 bg-white px-8 pb-10 pt-7 shadow-agent-card md:px-14 xl:px-24">
                        <IconsLogo v-if="option.pdfshift" class="mt-9 h-14 w-36" />
                        <div v-else class="h-14 w-36 bg-purple-100" aria-label="PDF4.dev logo placeholder"></div>
                        <h3 class="text-2xl font-medium !leading-display" :class="option.pdfshift ? 'mt-px' : 'mt-9'">{{ option.title }}</h3>
                        <ul class="mt-3 space-y-1 text-lg font-normal leading-relaxed">
                            <li v-for="point in option.points" :key="point" class="flex items-start gap-3">
                                <span v-if="option.pdfshift" class="mt-1.5 block size-5 shrink-0 text-purple" aria-hidden="true"><IconsTickFull /></span>
                                <span>{{ point }}</span>
                            </li>
                        </ul>
                    </article>

                    <img class="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden size-30 -translate-x-1/2 -translate-y-1/2 xl:block" src="/images/illustrations/vs.png" alt="versus" />
                </div>
            </section>

            <section id="comparison" class="mx-auto mt-28 w-full xl:mt-36" aria-labelledby="comparison-title">
                <div class="mx-auto w-with-gutters max-w-md">
                    <h2 id="comparison-title" class="text-center text-3xl font-medium !leading-display md:text-4xl">
                        How both compare
                    </h2>
                    <p class="mx-auto mt-2 max-w-full text-lg font-light leading-relaxed text-gray-500 text-center">
                        Some text about the competition point goes here but do not make it too long.
                    </p>
                </div>

                <div class="mt-14 px-4 lg:hidden">
                    <article v-for="(row, index) in comparisonRows" :key="`${row.feature}-${index}`" class="border-b border-gray-200 py-5 first:border-t first:border-navy-800">
                        <h3 class="text-base font-medium leading-snug">{{ row.feature }}</h3>

                        <div class="mt-3 grid grid-cols-2 gap-3">
                            <div class="min-w-0 rounded-lg bg-purple-100/50 p-3">
                                <p class="text-xs font-medium uppercase">PDFShift</p>
                                <div class="mt-2 flex items-start gap-2 text-sm font-light leading-snug">
                                    <span v-if="row.pdfshift.available" class="block size-5 shrink-0 text-purple"><IconsTickFull /></span>
                                    <span v-else class="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-purple"><IconsCross class="size-3.5" /></span>
                                    <span class="min-w-0 break-words">{{ row.pdfshift.label }}</span>
                                </div>
                            </div>

                            <div class="min-w-0 rounded-lg border border-gray-200 p-3">
                                <p class="text-xs font-medium uppercase">PDF4.dev</p>
                                <div class="mt-2 flex items-start gap-2 text-sm font-light leading-snug">
                                    <span v-if="row.pdf4.available" class="block size-5 shrink-0 text-purple"><IconsTickFull /></span>
                                    <span v-else class="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple"><IconsCross class="size-3.5" /></span>
                                    <span class="min-w-0 break-words">{{ row.pdf4.label }}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="mt-14 hidden px-4 lg:block">
                    <div class="mx-auto max-w-agent-content">
                        <div class="grid h-7 grid-cols-comparison items-center border-b border-navy-800 text-sm font-medium uppercase">
                            <div>Feature</div>
                            <div>PDFShift</div>
                            <div>PDF4.dev</div>
                        </div>
                        <div v-for="(row, index) in comparisonRows" :key="`${row.feature}-${index}`" class="grid h-11 grid-cols-comparison items-center border-b border-gray-200 font-light leading-snug">
                            <div class="text-base">{{ row.feature }}</div>
                            <div class="flex items-center gap-3 text-sm">
                                <span v-if="row.pdfshift.available" class="block size-5 shrink-0 text-purple"><IconsTickFull /></span>
                                <span v-else class="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple"><IconsCross class="size-3.5" /></span>
                                <span>{{ row.pdfshift.label }}</span>
                            </div>
                            <div class="flex items-center gap-3 text-sm">
                                <span v-if="row.pdf4.available" class="block size-5 shrink-0 text-purple"><IconsTickFull /></span>
                                <span v-else class="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple"><IconsCross class="size-3.5" /></span>
                                <span>{{ row.pdf4.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="mt-12 px-4 text-center text-base font-light leading-snug text-gray-500">
                    If you are the owner of PDF4.dev and find some mistakes on this comparison page, please
                    <NuxtLink class="underline underline-offset-2" to="/contact">contact us</NuxtLink>
                </p>
            </section>

            <AgentsBottomCta
                class="mt-16"
                title="Ready to switch?"
                description="Create your free PDFShift account and start automating PDF generation in no time"
                title-id="switch-title"
                primary-label="Get started now"
                primary-href="/register"
                :show-secondary="false"
            />
        </main>

        <AgentsPageFooter />
    </div>
</template>

<script setup>
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

const title = 'PDFShift vs PDF4.dev'
const description = 'Compare PDFShift and PDF4.dev for HTML-to-PDF conversion, template editing, URL support, generation logs, and workflow automation.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>

<style scoped>
.alternative-hero {
    height: 520px;
}

.comparison-option {
    min-height: 430px;
}
</style>
