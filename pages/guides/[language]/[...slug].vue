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
                    <component :is="'script'" type="application/ld+json">{{ articleSchema }}</component>
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

if (data.value.related?.length > 0) {
    const { data: lookup } = await useAsyncData(`${route.fullPath}-relateds`, () => queryContent('guides', language.value).where({
        draft: { $ne: true },
        library: data.value.library
    }).only(['title', 'language', 'library', '_id', '_path']).find())
    relatedGuides.value = lookup.value.filter((item) => data.value.related.includes(item._path.split('/').pop().replace('_', '')))
}

const articleSchema = ref(JSON.stringify({
    "@type": "BlogPosting",
    "name": `${data.title} in ${data.language} with ${data.library}`,
    "headline": data.value.description,
    "inLanguage": "English",
    "author": {
        "@type": "Person",
        "name": "PDFShift"
    }
}))
</script>
