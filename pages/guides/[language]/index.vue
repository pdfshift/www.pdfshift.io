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

                <!-- Library selector cards when multiple libraries exist -->
                <div v-if="availableLibraries.length > 1" class="max-w-2xl mx-auto px-4 mt-12">
                    <h2 class="text-2xl font-bold mb-6">Available libraries</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <NuxtLink
                            v-for="lib in availableLibraries"
                            :key="lib.name"
                            :to="lib.path"
                            class="border-2 rounded-lg p-4 transition-all hover:border-purple hover:shadow-lg"
                            :class="lib.name === library ? 'border-purple bg-purple-50' : 'border-gray-200'"
                        >
                            <h3 class="text-lg font-semibold" :class="lib.name === library ? 'text-purple' : 'text-gray-800'">
                                {{ lib.name }}
                            </h3>
                            <p class="text-sm text-gray-600 mt-1">{{ lib.count }} guides</p>
                        </NuxtLink>
                    </div>
                </div>

                <div class="max-w-2xl mx-auto px-4 mt-12">
                    <h2 v-if="availableLibraries.length > 1" class="text-2xl font-bold mb-6">All our guides:</h2>
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
const availableLibraries = ref([])

// Query all guides for this language
const { data } = await useAsyncData(route.fullPath, () => queryContent('guides', route.params.language).where({
    draft: { $ne: true }
}).find())

articles.value = data.value

if (articles.value?.length > 0) {
    language.value = articles.value[0].language
    library.value = articles.value[0].library

    // Extract all unique libraries with their article counts
    const librariesMap = new Map()
    data.value.forEach(article => {
        const libName = article.library
        if (!librariesMap.has(libName)) {
            librariesMap.set(libName, {
                name: libName,
                path: article._path.substring(0, article._path.lastIndexOf('/')),
                count: 0
            })
        }
        librariesMap.get(libName).count++
    })

    const allLibraries = Array.from(librariesMap.values())

    // Check if all articles have the same library (single library case like curl)
    const allSameLibrary = allLibraries.length === 1

    if (allSameLibrary) {
        // Single library - show all guides
        availableLibraries.value = []
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
        // Check if a specific library is requested via query parameter
        const requestedLibrary = route.params.library
        console.log('requested lib', route)

        // Multiple libraries - show library cards and filter guides
        availableLibraries.value = allLibraries.sort((a, b) => a.name.localeCompare(b.name))

        // Use requested library from query param, or default to the default library
        const selectedLibrary = requestedLibrary || articles.value.find(article => article.default)?.library || library.value
        articles.value = articles.value.filter(article => article.library === selectedLibrary)
        library.value = selectedLibrary

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
