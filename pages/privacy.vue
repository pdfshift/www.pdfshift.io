<template>
    <div class="container-small">
        <div class="page">
            <nuxt-content :document="privacy" />
        </div>
    </div>
</template>

<script>
const seoTitle = 'Privacy Policy'
const seoDescription = 'Our Privacy Policy is designed to help you understand what information we collect and how we use and share that information.'

export default {
    async asyncData ({ $content }) {
        return {
            privacy: await $content('privacy').fetch()
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
