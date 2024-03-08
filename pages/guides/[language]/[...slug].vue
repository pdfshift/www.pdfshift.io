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
                <article class="mt-8 blog-content" itemprop="blogPost" itemscope itemtype="https://schema.org/BlogPosting">
                    <ContentRenderer :value="data" v-if="data">
                        <h1 class="h1 my-6" itemprop="name headline">{{ data.title }} in {{ data.language }} with {{ data.library }}</h1>
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
                                <NuxtLink :to="`${guide._path}`" class="text-lg hover:underline hover:text-purple" itemprop="name headline">
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
</script>

<style>
.blog-content p {
    @apply mt-4;
}

.blog-content blockquote {
    @apply mt-12 md:mt-20 bg-purple-500 px-8 md:px-16 py-6 md:py-12 rounded-lg md:rounded-xl;
}

.blog-content blockquote p {
    @apply text-white font-light md:text-xl leading-tight m-0;
}

.blog-content blockquote footer {
    @apply mt-4 md:mt-8 text-sm md:text-base flex items-center gap-4 text-white font-light;
}

.blog-content blockquote footer img {
    @apply object-cover size-12 rounded-full overflow-hidden m-0;
}

.blog-content ul {
    @apply ml-4 mt-4 mb-8 list-decimal
}

.blog-content ol {
    @apply ml-4 mt-4 mb-8  list-decimal
}

.blog-content li {
    @apply my-2;
}

.blog-content h2 {
    @apply mt-12 mb-6 font-medium text-2xl lg:text-4xl !leading-tight text-purple;
}

.blog-content h3 {
    @apply mt-8 mb-6 font-medium text-xl lg:text-2xl !leading-tight text-purple;
}

.blog-content h4 {
    @apply my-4 pt-4 p-4 rounded-md bg-gray-100;
}

.blog-content a {
    @apply text-purple underline;
}

.blog-content p>code, .blog-content li>code {
    @apply bg-gray-100 rounded-md px-2 py-1 border-2 border-gray-200 text-red-600;
}

.blog-content h2 a, .blog-content h3 a, .blog-content h4 a {
    @apply no-underline;
}
</style>
