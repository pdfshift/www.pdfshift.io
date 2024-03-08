<template>
    <div>
        <NuxtLayout name="default">
            <PageHeader title="All our guides">
                We have a lot of content to help you get started with PDFShift.<br />
                If you have any questions, feel free to reach out to us.
            </PageHeader>

            <div class="max-w-4xl mx-auto px-4 mt-12 md:mt-24 pb-12 md:pb-24">
                <ul class="grid md:grid-cols-2 gap-8 mt-4">
                    <li v-for="article in languages" :key="article.language" class="rounded-lg bg-white p-4 shadow-lg transition-all duration-300 translate-y-0 hover:-translate-y-2">
                        <NuxtLink :to="article.url" class="text-center" itemprop="mainEntityOfPage url">
                            <div>
                                <img class="rounded-md h-32 m-auto" :src="article.image" alt="`${article.language}'s logo`" itemprop="image" />
                            </div>
                            <h3 class="h3 mt-4" itemprop="name headline">
                                All our guides in {{ article.language }}
                            </h3>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = "All our guides to convert HTML documents"
const description = "Select your favorite language and get started. We have guides for Go, Node, PHP, Python, Java, CSharp, Ruby and cURL."

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
        url: '/guides/go',
        image: '/images/languages/go.svg'
    },
    {
        language: 'Node',
        url: '/guides/node',
        image: '/images/languages/node.svg'
    },
    {
        language: 'PHP',
        url: '/guides/php',
        image: '/images/languages/php.svg'
    },
    {
        language: 'Python',
        url: '/guides/python',
        image: '/images/languages/python.svg'
    },
    {
        language: 'Java',
        url: '/guides/java',
        image: '/images/languages/java.svg'
    },
    {
        language: 'CSharp',
        url: '/guides/csharp',
        image: '/images/languages/csharp.svg'
    },
    {
        language: 'Ruby',
        url: '/guides/ruby',
        image: '/images/languages/ruby.svg'
    },
    {
        language: 'cURL',
        url: '/guides/curl',
        image: '/images/languages/curl.svg'
    }
])
</script>
