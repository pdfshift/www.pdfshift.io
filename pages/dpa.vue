<template>
    <div class="container-small">
        <div class="page">
            <nuxt-content :document="dpa" />
        </div>
    </div>
</template>

<script>
const seoTitle = 'Data Processing Agreement'
const seoDescription = 'PDFShift is GDPR compliant. Here is our Data Processing Agreement.'

export default {
    async asyncData ({ $content }) {
        const dpa = await $content('dpa').fetch()

        return { dpa }
    },
    head: {
        title: seoTitle + ' | PDFShift',
        meta: [
            { hid: 'description', name: 'description', content: seoDescription },
            { hid: 'twitter:title', name: 'twitter:title', content: seoTitle },
            { hid: 'og:title', name: 'og:title', content: seoTitle },
            { hid: 'twitter:description', name: 'twitter:description', content: seoDescription },
            { hid: 'og:description', name: 'og:description', content: seoDescription }
        ]
    }
}
</script>
