<template>
    <div>
        <NuxtLayout name="default">
            <PageHeader :title="title">
                We wrote a few code samples in the major libraries for {{ language }}.<br />
                Select your favorite and start implementing PDFShift in a few seconds.
            </PageHeader>

            <div class="max-w-2xl mx-auto px-4 mt-12 pb-12 md:pb-24">
                <ul class="mt-4 list-disc list-inside">
                    <li v-for="article in articles" :key="article._id" class="my-4">
                        <NuxtLink :to="`/samples/${article.language.toLowerCase()}/${clearUrl(article.library)}`" class="mt-4 text-xl hover:underline hover:text-purple" itemprop="name headline">
                            With the {{ article.library }} library
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const route = useRoute()
const title = ref(null)
const language = ref(null)
const { data: articles } = await useAsyncData(route.fullPath, () => queryContent('samples', route.params.language).find())

if (articles && articles.value && articles.value.length > 0) {
    language.value = articles.value[0].language

    title.value = `All our code samples in ${language.value}`
    const description = `We wrote a few code samples in the major libraries for ${language.value}. You can find them here.`

    useSeoMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description
    })
}
</script>
