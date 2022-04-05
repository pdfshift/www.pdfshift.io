<template>
    <div class="container">
        <h1>Create your account and get started</h1>
        <p class="excerpt">
            Fill out the form and you will quickly receive an email<br />
            containing your API key to start converting your documents.
        </p>
        <div class="row">
            <div class="column six centered">
                <form id="register">
                    <div class="form-element">
                        <input type="text" name="name" placeholder="Full Name" required autofocus />
                    </div>
                    <div class="form-element">
                        <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                    <div class="form-element">
                        <small>By signing up, you agree to the <a href="/terms/" title="Read our Terms of Service">Terms of Service</a> and <a href="/privacy/" title="Read our Privacy Policy">Privacy Policy</a>.</small>
                    </div>

                    <input type="submit" name="submit" value="Create your free account" class="button button-primary" />
                </form>
                <p>Already have an account? <a href="https://app.pdfshift.io" title="Click here to switch to the login form">Click here to login</a>.</p>
            </div>
        </div>
    </div>
</template>

<script>
const seoTitle = 'Create an account'
const seoDescription = 'Fill out the form by indicating your email address and start converting in a minute.'

export default {
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
