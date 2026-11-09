<template>
    <div>
        <!-- Landing page in article form: all copy lives in content/pdf-generator-api.md, this page only renders it -->
        <NuxtLayout name="default">
            <main class="max-w-3xl mx-auto px-4 pb-12 overflow-x-clip">
                <article class="mt-8 articles">
                    <h1 class="h1 my-6">{{ data.title }}</h1>
                    <p class="text-sm text-gray-600">
                        Updated <time :datetime="data.dateModified">{{ formatDate(data.dateModified) }}</time> by {{ data.author }}
                    </p>
                    <ContentRenderer :value="data">
                        <ContentRendererMarkdown :value="data" />
                    </ContentRenderer>
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
                "@type": "SoftwareApplication",
                "name": "PDFShift",
                "url": "https://pdfshift.io/",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web",
                "description": "PDF generator API: send HTML or a URL in one POST request and get the PDF back, rendered by Chromium.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free plan: 50 credits a month, no credit card" },
                "publisher": { "@id": "https://pdfshift.io/#organization" }
            })
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                // Same questions and answers as the "Frequently asked questions" section of the markdown, kept in its frontmatter
                "mainEntity": (data.value.faq || []).map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
                }))
            })
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { name: 'Home', item: 'https://pdfshift.io' },
                    { name: 'PDF generator API', item: siteUrl(path) }
                ].map((crumb, index) => ({ "@type": "ListItem", "position": index + 1, ...crumb }))
            })
        }
    ]
})
</script>
