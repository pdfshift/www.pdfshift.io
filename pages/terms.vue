<template>
    <div class="container-small">
        <div class="page">
            <nuxt-content :document="terms" />
        </div>
    </div>
</template>

<script>
const seoTitle = 'Terms of Service Agreement'
const seoDescription = 'Please read these Terms of Service carefully before using the https://www.pdfshift.io website.'

export default {
    async asyncData ({ $content }) {
        return {
            terms: await $content('terms').fetch()
        }
    },
    head: {
        title: seoTitle + ' — PDFShift',
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
