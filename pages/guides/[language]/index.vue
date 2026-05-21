<template>
    <div>
        <NuxtLayout name="default">
            <div class="max-w-2xl mx-auto">
                <PageHeader :title="title">
                    Feel free to skim over all our guides to generate documents with PDFShift
                    using <strong>{{ language }}</strong><template v-if="language !== library"> and the <em>{{ library }}</em> library</template>.
                </PageHeader>

                <p class="italic mt-12 text-gray-600">
                    You can't find the guide you are looking for?
                    <NuxtLink to="/contact" class="text-purple underline">Contact us</NuxtLink> and tell us what you are looking for and we'll write the guide you need.
                </p>

                <div class="max-w-2xl mx-auto px-4 mt-12">
                    <ul class="mt-4 list-disc list-inside marker:text-purple">
                        <li v-for="article in articles" :key="article._id" class="my-4">
                            <NuxtLink :to="`${article._path}`" class="mt-4 text-xl text-purple hover:underline">
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

// Query all guides for this language
const { data } = await useAsyncData(route.fullPath, () => queryContent('guides', route.params.language).where({
    draft: { $ne: true }
}).find())

articles.value = data.value

if (articles.value?.length > 0) {
    language.value = articles.value[0].language
    library.value = articles.value[0].library

    // Check if all articles have the same library (single library case like curl)
    const allSameLibrary = articles.value.every(article => article.library === library.value)

    if (allSameLibrary) {
        // Single library - show all guides
        title.value = `All our guides for ${language.value}`
        let seoTitle = `All our guides for ${language.value}`
        let description = `Here are our extensive list of guides to help you get started generating documents with PDFShift in ${language.value}`

        if (language.value !== library.value) {
            title.value += `<br />with ${library.value}`
            seoTitle += ` with ${library.value}`
            description += ` and ${library.value}.`
        } else {
            description += '.'
        }

        useSeoMeta({
            title: seoTitle,
            description,
            ogTitle: seoTitle,
            ogDescription: description,
            twitterTitle: seoTitle,
            twitterDescription: description
        })
    } else {
        // Multiple libraries - filter to only show default library's guides
        const defaultLibrary = articles.value.find(article => article.default)?.library || library.value
        articles.value = articles.value.filter(article => article.library === defaultLibrary)
        library.value = defaultLibrary

        title.value = `All our guides for ${language.value}`
        let seoTitle = `All our guides for ${language.value}`
        let description = `Here are our extensive list of guides to help you get started generating documents with PDFShift in ${language.value}`

        if (language.value !== library.value) {
            title.value += `<br />with ${library.value}`
            seoTitle += ` with ${library.value}`
            description += ` and ${library.value}.`
        } else {
            description += '.'
        }

        useSeoMeta({
            title: seoTitle,
            description,
            ogTitle: seoTitle,
            ogDescription: description,
            twitterTitle: seoTitle,
            twitterDescription: description
        })
    }
}
</script>
