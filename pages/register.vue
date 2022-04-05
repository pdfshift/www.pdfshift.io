<template>
    <div class="container">
        <h1>Create your account and get started</h1>
        <p class="excerpt">
            Fill out the form and you will quickly receive an email<br />
            containing your API key to start converting your documents.
        </p>
        <div class="row">
            <div class="column six centered">
                <template v-if="registered">
                    <div class="white-block success">
                        <svg class="animated checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle cx="26" cy="26" r="25" fill="none" />
                            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                        <h3>All good! Check your emails.</h3>
                        <p>We just sent you an email containing your API key to start implementing PDFShift.</p>
                        <p>You'll be converting web documents to PDF in a few minutes now!</p>
                    </div>
                </template>
                <template v-else>
                    <form @submit.prevent="register">
                        <div class="form-element" :class="{'error': errors.name}">
                            <input v-model="form.name" type="text" name="name" placeholder="Full Name" required autofocus />
                            <p v-if="errors.name" class="error">{{ errors.name }}</p>
                        </div>
                        <div class="form-element" :class="{'error': errors.email}">
                            <input v-model="form.email" type="email" name="email" placeholder="Email Address" required />
                            <p v-if="errors.email" class="error">{{ errors.email }}</p>
                        </div>
                        <div class="form-element">
                            <small>By signing up, you agree to the <a href="/terms/" title="Read our Terms of Service">Terms of Service</a> and <a href="/privacy/" title="Read our Privacy Policy">Privacy Policy</a>.</small>
                        </div>

                        <input type="submit" name="submit" value="Create your free account" class="button button-primary" :class="{'button-disabled': sending}" />
                    </form>
                    <p>Already have an account? <a href="https://app.pdfshift.io" title="Click here to switch to the login form">Click here to login</a>.</p>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import register from '@/mixins/register'

const seoTitle = 'Create an account'
const seoDescription = 'Fill out the form by indicating your email address and start converting in a minute.'

export default {
    mixins: [register],
    data () {
        return {
            form: {
                name: null,
                email: null
            },
            errors: {
                name: null,
                email: null
            },
            sending: false,
            registered: false
        }
    },
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
