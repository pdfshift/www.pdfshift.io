<template>
    <div>
        <!-- Article-style guide: all copy lives in content/guides/best-pdf-api-for-ai-agents.md, this page only renders it -->
        <NuxtLayout name="default">
            <main class="max-w-3xl mx-auto px-4 pb-12 overflow-x-clip">
                <NuxtLink to="/guides/" class="text-navy-700 inline-flex items-center gap-2">
                    <span class="rotate-180 w-4 relative ml-1.5">
                        <IconsArrowRight />
                    </span>
                    <span class="hover:underline">
                        View all our articles
                    </span>
                </NuxtLink>
                <article class="mt-8 articles">
                    <h1 class="h1 my-6">{{ data.title }}</h1>
                    <p class="text-sm text-gray-600">
                        Updated <time :datetime="data.dateModified">{{ formatDate(data.dateModified) }}</time> by {{ data.author }}
                    </p>
                    <ContentRenderer :value="data">
                        <ContentRendererMarkdown :value="data" />
                    </ContentRenderer>
                    <div class="mt-8 italic text-sm text-gray-600">
                        <p>
                            We hope this guide was helpful.
                            If you have any questions or noticed any issues on the code above,<br />
                            feel free to <NuxtLink to="/contact/" class="text-purple underline">drop us a line</NuxtLink>.
                        </p>
                    </div>
                </article>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup>
const route = useRoute()
const path = route.path.replace(/\/$/, '')

const { data } = await useAsyncData(path, () => queryContent().where({ _path: path }).findOne())

// Frontmatter dates are "YYYY-MM-DD" strings, format them in UTC so the day never shifts
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

useSeoMeta({
    title: data.value.title,
    description: data.value.description,
    ogTitle: data.value.title,
    ogDescription: data.value.description,
    ogType: 'article',
    twitterTitle: data.value.title,
    twitterDescription: data.value.description
})

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": data.value.title,
                "description": data.value.description,
                "author": { "@type": "Person", "name": data.value.author },
                "datePublished": data.value.date,
                "dateModified": data.value.dateModified,
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://pdfshift.io/#organization",
                    "name": "PDFShift",
                    "logo": { "@type": "ImageObject", "url": "https://pdfshift.io/images/logo/logo.png" }
                },
                "mainEntityOfPage": { "@type": "WebPage", "@id": siteUrl(path) },
                "inLanguage": "en-US"
            })
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": data.value.title,
                "itemListOrder": "https://schema.org/ItemListOrderAscending",
                "itemListElement": ['PDFShift', 'Nutrient DWS API', 'Api2Pdf', 'PDF Generator API', 'PDFMonkey', 'APITemplate.io', 'DocRaptor', 'Adobe PDF Services', 'Gotenberg']
                    .map((name, index) => ({ "@type": "ListItem", "position": index + 1, "name": name }))
            })
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { name: 'Home', item: 'https://pdfshift.io' },
                    { name: 'Guides', item: siteUrl('/guides') },
                    { name: data.value.title, item: siteUrl(path) }
                ].map((crumb, index) => ({ "@type": "ListItem", "position": index + 1, ...crumb }))
            })
        }
    ]
})
</script>
