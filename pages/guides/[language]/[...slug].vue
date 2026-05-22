<template>
    <div>
        <NuxtLayout page="default">
            <main class="max-w-3xl mx-auto px-4 pb-12">
                <NuxtLink :to="`/guides/${language}/${library}`" class="text-navy-700 inline-flex items-center gap-2">
                    <span class="rotate-180 w-4 relative ml-1.5">
                        <IconsArrowRight />
                    </span>
                    <span class="hover:underline">
                        View all our articles
                    </span>
                </NuxtLink>
                <article class="mt-8 articles">
                    <ContentRenderer :value="data" v-if="data">
                        <h1 class="h1 my-6">{{ data.title }} in {{ data.language }} with {{ data.library }}</h1>
                        <ContentRendererMarkdown :value="data" />
                        <p>
                            For further details on the <code>{{ data.property }}</code> property and its usage, please refer to <NuxtLink :to="`https://docs.pdfshift.io/#convert-body-${data.property}`">our dedicated documentation</NuxtLink>.
                        </p>
                    </ContentRenderer>
                    <div class="mt-8 italic text-sm text-gray-600">
                        <p>
                            We hope this guide was helpful.
                            If you have any questions or noticed any issues on the code above,<br />
                            feel free to <NuxtLink to="/contact" class="text-purple underline">drop us a line</NuxtLink>.
                        </p>
                    </div>
                </article>
                <template v-if="relatedGuides">
                    <hr class="my-8 lg:my-16" />
                    <aside>
                        <h3 class="h3 text-navy-700">Related guides</h3>
                        <ul class="mt-8 list-disc list-inside">
                            <li v-for="guide in relatedGuides" :key="guide._id" class="my-2">
                                <NuxtLink :to="`${guide._path}`" class="text-lg hover:underline hover:text-purple">
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
const route = useRoute()
const language = ref(route.params.language)
const library = ref(null)
const relatedGuides = ref([])

let data = ref(null)
if (route.params.slug.length === 1) {
    const { data: guide } = await useAsyncData(route.fullPath, () => queryContent('guides', language.value).where({
        draft: { $ne: true },
        default: true,
        _path: { $regex: route.params.slug[route.params.slug.length - 1] + '$' }
    }).findOne())

    data.value = guide.value
} else {
    library.value = route.params.slug[0]
    const { data: guide } = await useAsyncData(route.fullPath, () => queryContent('guides', language.value, library.value).where({
        draft: { $ne: true },
        _path: { $regex: route.params.slug[route.params.slug.length - 1] + '$' }
    }).findOne())

    data.value = guide.value
}

const seoTitle = data.value.title + ' in ' + data.value.language + ' with ' + data.value.library
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
                "headline": `${data.value.title} in ${data.value.language} with ${data.value.library}`,
                "name": `${data.value.title} in ${data.value.language} with ${data.value.library}`,
                "description": data.value.description,
                "author": {
                    "@type": "Organization",
                    "name": "PDFShift",
                    "url": "https://pdfshift.io"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "PDFShift",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://pdfshift.io/images/logo/logo.png"
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://pdfshift.io${route.fullPath}`
                },
                "inLanguage": "en-US",
                "proficiencyLevel": "Beginner"
            })
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": `How to ${data.value.title.toLowerCase()} in ${data.value.language} with ${data.value.library}`,
                "description": data.value.description,
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Install the library",
                        "text": `Install ${data.value.library} library for ${data.value.language}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Set up API credentials",
                        "text": "Get your API key from PDFShift and configure it in your project"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Make the API request",
                        "text": `Use ${data.value.library} to make a conversion request to PDFShift API`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Handle the response",
                        "text": "Process and save the converted document"
                    }
                ]
            })
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://pdfshift.io"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Guides",
                        "item": "https://pdfshift.io/guides"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": data.value.language,
                        "item": `https://pdfshift.io/guides/${language.value}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": data.value.library,
                        "item": `https://pdfshift.io/guides/${language.value}/${library.value || data.value.library.toLowerCase()}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": data.value.title,
                        "item": `https://pdfshift.io${route.fullPath}`
                    }
                ]
            })
        }
    ]
})

if (data.value.related?.length > 0) {
    const { data: lookup } = await useAsyncData(`${route.fullPath}-related`, () => queryContent('guides', language.value).where({
        draft: { $ne: true },
        library: data.value.library
    }).only(['title', 'language', 'library', '_id', '_path']).find())
    relatedGuides.value = lookup.value.filter((item) => data.value.related.includes(item._path.split('/').pop().replace('_', '')))
}
</script>
