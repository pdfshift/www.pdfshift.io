<template>
    <div>
        <NuxtLayout name="default">
            <div class="max-w-2xl mx-auto">
                <PageHeader :title="title">
                    Feel free to skim over all our guides to generate documents with PDFShift
                    using <strong>{{ language }}</strong> and the <em>{{ library }}</em> library.
                </PageHeader>

                <p class="italic mt-12 text-gray-600">
                    You can't find the guide you are looking for? 
                    <NuxtLink to="/contact" class="text-purple underline">Contact us</NuxtLink> and tell us what you are looking for and we'll write the guide you need.
                </p>

                <div class="max-w-2xl mx-auto px-4 mt-12">
                    <ul class="mt-4 list-disc list-inside">
                        <li v-for="article in articles" :key="article._id" class="my-4">
                            <NuxtLink :to="`${article._path}`" class="mt-4 text-xl hover:underline hover:text-purple" itemprop="name headline">
                                {{ article.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const route = useRoute()

const title = ref(null)
const language = ref(null)
const library = ref(null)
const articles = ref(null)

if (route.params.library) {
    const { data } = await useAsyncData(route.fullPath, () => queryContent('guides', route.params.language, route.params.library).where({
        draft: { $ne: true }
    }).find())

    articles.value = data.value
} else {
    const { data } = await useAsyncData(route.fullPath, () => queryContent('guides', route.params.language).where({
        draft: { $ne: true },
        default: true
    }).find())

    articles.value = data.value
}

if (articles.value?.length > 0) {
    library.value = articles.value[0].library
    language.value = articles.value[0].language

    title.value = `All our guides for ${language.value}<br />with ${library.value}`
    const seoTitle = `All our guides for ${language.value} with ${library.value}`
    const description = `Here are our extensive list of guides to help you get started generating documents with PDFShift in ${language.value} and ${library.value}.`

    useSeoMeta({
        title: seoTitle,
        description,
        ogTitle: seoTitle,
        ogDescription: description,
        twitterTitle: seoTitle,
        twitterDescription: description
    })
}
</script>
