<template>
    <div>
        <NuxtLayout page="default">
            <main class="max-w-3xl mx-auto px-4 pb-12">
                <NuxtLink :to="`${data._path.substring(0, data._path.lastIndexOf('/'))}/`" class="text-navy-700 inline-flex items-center gap-2">
                    <span class="rotate-180 w-4 relative ml-1.5">
                        <IconsArrowRight />
                    </span>
                    <span class="hover:underline">
                        View all our articles
                    </span>
                </NuxtLink>
                <article class="mt-8 articles">
                    <ContentRenderer :value="data" v-if="data">
                        <h1 class="h1 my-6">{{ seoTitle }}</h1>
                        <ContentRendererMarkdown :value="data" />
                        <p>
                            For further details on the <code>{{ data.property }}</code> property and its usage, please refer to <NuxtLink :to="`https://docs.pdfshift.io/#convert-body-${data.property}`">our dedicated documentation</NuxtLink>.
                        </p>
                    </ContentRenderer>
                    <div class="mt-8 italic text-sm text-gray-600">
                        <p>
                            We hope this guide was helpful.
                            If you have any questions or noticed any issues on the code above,<br />
                            feel free to <NuxtLink to="/contact/" class="text-purple underline">drop us a line</NuxtLink>.
                        </p>
                    </div>
                </article>
                <template v-if="relatedGuides">
                    <hr class="my-8 lg:my-16" />
                    <aside>
                        <h3 class="h3 text-navy-700">Related guides</h3>
                        <ul class="mt-8 list-disc list-inside">
                            <li v-for="guide in relatedGuides" :key="guide._id" class="my-2">
                                <NuxtLink :to="`${guide._path}/`" class="text-lg hover:underline hover:text-purple">
                                    {{ guide.title }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </aside>
                </template>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup>
import { hash } from 'ohash'

const route = useRoute()
const language = ref(route.params.language)
const library = ref(null)
const relatedGuides = ref([])

// Trailing-slash URLs end with an empty segment: /guides/node/axios/foo/ gives ['axios', 'foo', '']
const segments = route.params.slug.filter(Boolean)

let data = ref(null)
if (segments.length === 1) {
    // Single-library languages (cURL) store their guides directly in /guides/<language>/;
    // otherwise use the guide from the language's default library.
    const slug = segments[0]
    const { data: guide } = await useAsyncData(route.fullPath, () => queryContent('guides', language.value).where({
        draft: { $ne: true },
        $or: [
            { _path: `/guides/${language.value}/${slug}` },
            { default: true, _path: { $regex: slug + '$' } }
        ]
    }).findOne())

    data.value = guide.value
} else {
    library.value = segments[0]
    const { data: guide } = await useAsyncData(route.fullPath, () => queryContent('guides', language.value, library.value).where({
        draft: { $ne: true },
        _path: { $regex: segments[segments.length - 1] + '$' }
    }).findOne())

    data.value = guide.value
}

// "Using cookies in Python with requests", but just "Using cookies in cUrl" when the language is its own library
const seoTitle = `${data.value.title} in ${data.value.language}` + (data.value.library !== data.value.language ? ` with ${data.value.library}` : '')
useSeoMeta({
    title: seoTitle,
    description: data.value.description,
    ogTitle: seoTitle,
    ogDescription: data.value.description,
    twitterTitle: seoTitle,
    twitterDescription: data.value.description
})

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "TechArticle",
                "headline": seoTitle,
                "name": seoTitle,
                "description": data.value.description,
                "author": {
                    "@type": "Organization",
                    "@id": "https://pdfshift.io/#organization",
                    "name": "PDFShift",
                    "url": "https://pdfshift.io"
                },
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://pdfshift.io/#organization",
                    "name": "PDFShift",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://pdfshift.io/images/logo/logo.png"
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": siteUrl(data.value._path)
                },
                "inLanguage": "en-US",
                "proficiencyLevel": "Beginner"
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
                    { name: data.value.language, item: siteUrl(`/guides/${language.value}`) },
                    // No separate library level when the language is its own library (cURL)
                    ...(data.value.library !== data.value.language
                        ? [{ name: data.value.library, item: siteUrl(data.value._path.substring(0, data.value._path.lastIndexOf('/'))) }]
                        : []),
                    { name: data.value.title, item: siteUrl(data.value._path) }
                ].map((crumb, index) => ({ "@type": "ListItem", "position": index + 1, ...crumb }))
            })
        }
    ]
})

if (data.value.related?.length > 0) {
    const { data: lookup } = await useAsyncData(`related:${hash(route.fullPath)}`, () => queryContent('guides', language.value).where({
        draft: { $ne: true },
        library: data.value.library
    }).only(['title', 'language', 'library', '_id', '_path']).find())
    relatedGuides.value = lookup.value.filter((item) => data.value.related.includes(item._path.split('/').pop().replace('_', '')))
}
</script>
