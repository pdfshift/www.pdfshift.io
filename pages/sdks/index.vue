<template>
    <div>
        <NuxtLayout name="default">
            <PageHeader title="Our code snippets">
                Since PDFShift is a very simple API, we wrote some code snippets in your favorite language to get you started quickly and easily.
                Select your favorite language and get started. We have code for Go, Node, PHP, Python, Java, CSharp and Ruby.
            </PageHeader>

            <div class="max-w-4xl mx-auto px-4 mt-12 md:mt-24 pb-12 md:pb-24">
                <ul class="grid md:grid-cols-2 gap-8 mt-4">
                    <li v-for="article in languages" :key="article.language" class="rounded-lg bg-white p-4 shadow-lg transition-all duration-300 translate-y-0 hover:-translate-y-2">
                        <NuxtLink :to="article.url" class="text-center" itemprop="mainEntityOfPage url">
                            <div>
                                <img class="rounded-md h-32 m-auto" :src="article.image" alt="`${article.language}'s logo`" itemprop="image" />
                            </div>
                            <h3 class="h3 mt-4" itemprop="name headline">
                                View our library in {{ article.language }}
                            </h3>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = "Our code snippets for your favorite language"
const description = "Since PDFShift is a very simple API, we wrote some code snippets in your favorite language to get you started quickly and easily. We have code for Go, Node, PHP, Python, Java, CSharp, Ruby and cURL."

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})

const languages = ref([
    {
        language: 'GO',
        url: '/sdks/go',
        image: '/images/languages/go.svg'
    },
    {
        language: 'Node',
        url: '/sdks/node',
        image: '/images/languages/node.svg'
    },
    {
        language: 'PHP',
        url: '/sdks/php',
        image: '/images/languages/php.svg'
    },
    {
        language: 'Python',
        url: '/sdks/python',
        image: '/images/languages/python.svg'
    },
    {
        language: 'Java',
        url: '/sdks/java',
        image: '/images/languages/java.svg'
    },
    {
        language: 'CSharp',
        url: '/sdks/csharp',
        image: '/images/languages/csharp.svg'
    },
    {
        language: 'Ruby',
        url: '/sdks/ruby',
        image: '/images/languages/ruby.svg'
    }
])
</script>
