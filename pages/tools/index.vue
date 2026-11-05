<template>
    <div>
        <NuxtLayout name="default">
            <PageHeader :title="data.title">
                Check your HTML before you turn it into a PDF.
            </PageHeader>

            <div class="max-w-4xl mx-auto px-4 mt-12 md:mt-24 pb-12 md:pb-24">
                <ul class="grid md:grid-cols-2 gap-8">
                    <li v-for="tool in tools" :key="tool.to" class="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 translate-y-0 hover:-translate-y-2">
                        <NuxtLink :to="tool.to" class="block">
                            <h2 class="h3 text-navy-700">{{ tool.name }}</h2>
                            <p class="mt-2 text-gray-600">{{ tool.line }}</p>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const path = '/tools'
const { data } = await useAsyncData(path, () => queryContent().where({ _path: path }).findOne())

// Keep in sync with the list in content/tools/index.md
const tools = [
    { name: 'HTML viewer', line: 'Paste HTML or open a file, and see it at A4 page width with your print CSS applied.', to: '/tools/html-viewer/' }
]

useSeoMeta({
    title: `${data.value.title} | PDFShift`,
    description: data.value.description,
    ogTitle: `${data.value.title} | PDFShift`,
    ogDescription: data.value.description
})

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { name: 'Home', item: 'https://pdfshift.io' },
                    { name: data.value.title, item: siteUrl(path) }
                ].map((crumb, index) => ({ "@type": "ListItem", "position": index + 1, ...crumb }))
            })
        }
    ]
})
</script>
