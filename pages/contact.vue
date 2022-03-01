<template>
    <div id="contact" class="container">
        <h1>Contact Our Sales Team</h1>
        <contact-form :main="true" />
    </div>
</template>

<script>
import ContactForm from '~/components/ContactForm'

const seoTitle = 'Contact our sales team'
const seoDescription = 'Fill out the form to reach out to our sales team and get all the answers you need.'

export default {
    components: { ContactForm },
    head: {
        title: seoTitle + ' — PDFShift',
        bodyAttrs: { class: 'unified' },
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
