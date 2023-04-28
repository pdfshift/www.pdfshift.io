<template>
    <div class="container-small">
        <div class="page">
            <h1>List of Subprocessors</h1>
            <p class="excerpt">We use the following 3rd party services to improve, understand troubleshoot, report bugs and provide support for you:</p>

            <nuxt-content :document="subprocessors" />

            <p><strong>REMEMBER</strong>: We use these services only to provide you with a fantastic product that gives you easy access to things you like and to improve our general look and feel. If you choose to block, global opt out from some of the services that we use to deliver our product, you may run into errors, product bugs and other failures that influence your general experience and quality of our service. We are ok with that and respect your choice.</p>
        </div>
    </div>
</template>

<script>
const seoTitle = 'PDFShift\'s subprocessors'
const seoDescription = 'PDFShift is relying on other third party services to provide a full experience. These are the list of subprocessors we work with.'

export default {
    async asyncData ({ $content }) {
        const subprocessors = await $content('subprocessors').fetch()

        return { subprocessors }
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
