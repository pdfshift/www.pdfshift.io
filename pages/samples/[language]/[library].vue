<template>
    <div>
        <NuxtLayout page="default">
            <main class="max-w-3xl mx-auto px-4 pb-12">
                <NuxtLink :to="`/samples/${language}`" class="text-navy-700 inline-flex items-center gap-2">
                    <span class="rotate-180 w-4 relative ml-1.5">
                        <IconsArrowRight />
                    </span>
                    <span class="hover:underline">
                        View all our code samples
                    </span>
                </NuxtLink>
                <article id="code-sample" class="mt-8" itemprop="blogPost" itemscope itemtype="https://schema.org/BlogPosting">
                    <ContentRenderer :value="data" v-if="data">
                        <h1 class="h1 my-6" itemprop="name headline">Using {{ data.library }} in {{ data.language }}</h1>
                        <div class="my-8">
                            <ContentRenderer v-if="excerpt" :document="data">
                                <ContentRendererMarkdown :value="excerpt" />
                            </ContentRenderer>
                            <div v-else>
                                <p><NuxtLink :to="data.link">{{ data.library }}</NuxtLink> is a popular HTTP client/server library for {{ data.language }}.</p>
                            </div>

                            <p class="mt-8">We've implemented a code sample that you can re-use to convert your HTML documents to PDF, JPG, PNG or WEBP using PDFShift and {{ language }}:</p>
                        </div>

                        <div class="mb-16 mt-4">
                            <ContentRendererMarkdown :value="compiledCode" />
                        </div>

                        <template v-if="exampleCode">
                            <p>Here's how you can use the above code:</p>
                            <div class="mb-8 mt-2">
                                <ContentRendererMarkdown :value="exampleCode" />
                            </div>
                        </template>

                        <p>We've tested this code with the latest version of {{ data.library }} and it's ready to be used in your project.</p>
                        <p>
                            But if you were to encounter any bugs or issues while running it (or if you want to suggest changes to improve the code), please <NuxtLink to="/contact" class="text-purple-600 hover:underline">contact us</NuxtLink> and we'll be happy to help you out.
                        </p>

                        <div class="mb-8 mt-16">
                            <h3 class="h3">We also have guides!</h3>
                            <p>
                                We also wrote a ton of articles to help you convert HTML documents in {{ data.language }} and {{ data.library }}.<br />
                                <NuxtLink :to="`/guides/${language}/${library}`" class="text-purple-600 hover:underline">Check them out</NuxtLink> and let us know if you have any questions!
                            </p>
                        </div>
                    </ContentRenderer>
                </article>
                <aside class="mt-8 lg:mt-16 pb-16 lg:pb-32" v-if="related.length > 0">
                    <h3 class="h3 text-navy-700">Related libraries</h3>
                    <ul class="mt-4 list-disc list-inside">
                        <li v-for="article in related" :key="article._id" class="my-4">
                            <NuxtLink :to="`/samples/${language.toLowerCase()}/${clearUrl(article.library)}`" class="mt-4 text-xl hover:underline hover:text-purple" itemprop="name headline">
                                With the {{ article.library }} library
                            </NuxtLink>
                        </li>
                    </ul>
                </aside>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup>
const route = useRoute()
const language = ref(route.params.language)
const library = ref(route.params.library)
const excerpt = ref(null)
const related = ref([])

const { data } = await useAsyncData(route.fullPath, () => queryContent('samples', language.value, library.value).findOne())

let index = 0
if (data.value.body.children.length > 2) {
    index = 1
    excerpt.value = data.value.body.children[0]
}

const compiledCode = ref({ type: 'root', children: [data.value.body.children[index]] })

const { data: relatedEntries } = await useAsyncData(`${route.fullPath}-related`, () => queryContent('samples', language.value).only(['_id', '_path', 'language', 'library']).find())
related.value = relatedEntries.value.filter(x => x.library.toLowerCase() !== data.value.library.toLowerCase())

let exampleCode = ref(null)
if (data.value.body.children.length > 1) {
    exampleCode.value = { type: 'root', children: [data.value.body.children[index + 1]] }
}

const title = `Convert any HTML documents to PDF using ${language.value} and ${library.value}`
const description = `Use the following code sample to quickly convert any HTML documents to PDF using ${language.value} and ${library.value}.`

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})
</script>

<style>
#code-sample p { @apply mt-4 }
#code-sample a { @apply text-purple hover:underline }
</style>
