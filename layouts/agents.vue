<template>
    <div class="min-w-80 overflow-hidden bg-white text-navy-800">
        <Header />

        <main id="agent-main-content" class="pt-24 md:pt-32">
            <div class="mx-auto w-with-gutters max-w-5xl">
                <NuxtLink class="inline-flex items-center gap-2.5 text-sm font-normal leading-6 text-purple-500 uppercase" to="/agents#integrations">
                    <IconsArrowRight class="size-6 rotate-180" />
                    Back to integrations
                </NuxtLink>
            </div>

            <article>
                <slot />
            </article>

            <section id="security" class="mt-18 scroll-mt-30 md:mt-24" aria-labelledby="security-title">
                <h2 id="security-title" class="mx-auto w-with-gutters max-w-agent-content text-3xl font-medium leading-display text-trim md:text-4xl">Important security note</h2>
                <div class="mx-auto mt-6 w-with-gutters max-w-agent-content rounded-2xl border border-purple-500 bg-agent-panel p-8">
                    <p>Never call PDFShift directly from frontend JavaScript with your secret API key. Frontend code can be inspected by anyone using the application, which would expose the key.</p>
                    <p class="font-bold mt-4">Always store the key in a secret storage/environment.</p>
                </div>
            </section>

            <section id="related-resources" class="mx-auto mt-18 w-with-gutters max-w-agent-content scroll-mt-30 md:mt-26" aria-labelledby="resources-title">
                <h2 id="resources-title" class="text-3xl font-medium leading-display text-trim md:text-4xl">Related Resources</h2>
                <div v-if="props.resources" class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    <div v-for="resource in props.resources" :key="resource.title" class="flex min-h-64 flex-col items-start rounded-xl border border-purple-400 bg-white px-10 py-8 shadow-agent-card md:py-8">
                        <h3 class="text-2xl font-medium leading-7">{{ resource.title }}</h3>
                        <p class="mt-8 text-base font-light leading-6">{{ resource.description }}</p>
                        <Button class="mt-8" :to="resource.href" :arrow="true">{{ resource.cta }}</Button>
                    </div>
                </div>

                <slot name="related-resource" />
            </section>

            <AgentsBottomCta
                class="mt-20 md:mt-18"
                title="Ready to Get Started?"
                description="Create your free PDFShift account and add PDF generation to your Lovable app today"
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
const props = defineProps({
    resources: {
        type: Array,
        default: () => null,
        required: false
    }
})
</script>

<style>
.agent-overview-card {
    box-shadow: 0 8px 18px rgba(108, 71, 255, 0.1);
}

.agent-page-nav {
    left: calc(50% + 27.625rem);
    min-height: 275px;
    box-shadow: 0 8px 12px rgba(108, 71, 255, 0.1);
}

#agent-main-content article h2 {
    @apply text-3xl font-medium leading-display text-trim md:text-4xl mb-6;
}

#agent-main-content article h3 {
    @apply text-lg font-semibold leading-8 mb-2;
}

#agent-main-content article p {
    @apply leading-6;
}

#agent-main-content article p>code {
    @apply rounded bg-purple-100 px-1.5 py-0.5 font-code text-base
}
</style>
