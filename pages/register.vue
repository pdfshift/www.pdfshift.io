<template>
    <div>
        <NuxtLayout name="page-bg">
            <PageHeader title="Quickly get started">
                Get started under a minute.<br />
                Fill out the form and we'll send you an email to activate your account.
            </PageHeader>
            <div class="max-w-xl mx-auto">
                <div class="mb-12 md:py-12 ">
                    <CardLight>
                        <div v-if="success" class="py-4">
                            <div class="flex justify-center">
                                <IconsTickBordered class="text-green w-12 lg:w-20" />
                            </div>
                            <h2 class="my-10 h2 font-normal block text-navy-700 text-center">
                                Thank you! Check your email.
                            </h2>
                            <div class="text-navy-700 text-center">
                                <p>We've sent you an email to activate your account.<br />(If you don't see it, check your spam folder)</p>
                                <p>You'll be converting web documents to PDF in a few minutes now!</p>
                            </div>
                        </div>
                        <div v-else class="grid gap-6 md:gap-8">
                            <div>
                                <label for="register-name" :class="{ 'text-red-500': errors.name }">Your name</label>
                                <input v-model="form.name" ref="nameField" id="register-name" name="name" type="text" class="field mt-2 w-full" :class="{ '-error': errors.name }" placeholder="Enter your name" />
                                <span class="block mt-2 text-red-500 font-light" v-if="errors.name">{{ errors.name }}</span>
                            </div>

                            <div>
                                <label for="register-email" :class="{'text-red-500': errors.email}">Email Address</label>
                                <input v-model="form.email" ref="emailField" id="register-email" name="email" type="email" class="field mt-2 w-full" :class="{'-error': errors.email}" placeholder="Enter your email" />
                                <span class="block mt-2 text-red-500 font-light" v-if="errors.email">{{ errors.email }}</span>
                            </div>

                            <div>
                                <label for="register-password" :class="{'text-red-500': errors.password}">Password</label>
                                <input v-model="form.password" id="register-password" name="password" type="password" class="field mt-2 w-full" :class="{'-error': errors.password}" placeholder="Enter your password" />
                                <span class="block mt-2 text-red-500 font-light" v-if="errors.password">{{ errors.password }}</span>
                            </div>

                            <div>
                                <label for="register-language">Programming Language</label>
                                <FormsSelect class="w-full mt-2" v-model="form.language" id="register-language" name="language" :options="languageOptions" />
                                <div class="mt-3 font-light flex items-center gap-2">
                                    <span><IconsArrowRight class="text-gray-400" /></span>
                                    <span class="text-sm text-gray-400">We'll adjust our code sample with your favorite code</span>
                                </div>
                            </div>

                            <div>
                                <FormsCheckbox name="agree" v-model="form.agree">
                                    I agree with the
                                    <strong>Terms of service</strong> (<NuxtLink to="/legal/terms" title="Read our Terms of Service" class="font-bold hover:underline">here</NuxtLink>) and
                                    <strong>Privacy Policy</strong> (<NuxtLink to="/legal/privacy" title="Read our Privacy Policy" class="font-bold hover:underline">here</NuxtLink>)
                                </FormsCheckbox>
                                <span class="block mt-2 text-red-500 font-light" v-if="errors.agree">{{ errors.agree }}</span>

                                <FormsCheckbox name="newsletter" class="mt-4" v-model="form.newsletter">
                                    Receive some news from us (less than one per month)
                                </FormsCheckbox>
                            </div>

                            <div class="block text-red-500 font-light" v-if="errors.general">{{ errors.general }}</div>
                            <input type="submit" name="register" value="Create your free account" class="w-full inline-flex border items-center justify-center px-10 py-3 rounded-lg gap-1 group transition-bg duration-300 bg-purple border-purple text-white hover:bg-navy-700 hover:text-white hover:border-navy-700 cursor-pointerdisabled:pointer-events-none disabled:opacity-75" :disabled="sending" @click="submit" />

                            <div class="text-center">
                                <span class="h4">Already a member?</span>
                                <NuxtLink to="https://app.pdfshift.io" class="ml-2 font-medium text-purple hover:underline h4">Login Here</NuxtLink>
                            </div>
                        </div>
                    </CardLight>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = "Register for free | PDFShift"
const description = "Register for free and start converting your HTML to PDF in seconds. No credit card required."

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})

const languageOptions = [
    { value: 'go', label: 'GoLang' },
    { value: 'java', label: 'Java' },
    { value: 'node', label: 'Node' },
    { value: 'php', label: 'PHP' },
    { value: 'python', label: 'Python' },
    { value: 'csharp', label: 'C#' },
    { value: 'ruby', label: 'Ruby' },
    { value: null, label: 'Other' }
]

const form = ref({
    name: null,
    email: null,
    password: null,
    language: null,
    agree: false,
    newsletter: false,
})

const errors = ref({
    name: null,
    email: null,
    password: null,
    agree: null,
    general: null
})

const success = ref(false)
const sending = ref(false)

const emailField = ref(null)
onMounted(() => {
    if (process.client) {
        emailField.value.focus()
    }

    const language = useStorage().get('language')
    if (language) {
        form.value.language = language
    } else {
        form.value.language = 'PHP'
    }
})

const submit = async ($event) => {
    $event.preventDefault()
    if (sending.value) {
        return false
    }

    sending.value = true
    errors.value = {
        name: null,
        email: null,
        password: null,
        agree: null,
        general: null
    }

    const storage = useStorage()
    const body = Object.assign(
        {}, // Default type
        {
            language: storage.get('language', null)
        },
        storage.get('campaign', {}), // Campaign params
        form.value
    )

    try {
        await $fetch(useApiEndpoint('/account'), {
            method: 'POST',
            body
        })
        success.value = true
        try { window.plausible('Signup') } catch (e) {}
        try { window.signups(form.value.email) } catch (e) {}
    } catch (error) {
        try {
            if ('errors' in error.data) {
                Object.entries(error.data.errors).forEach(([key, value]) => {
                    errors.value[key] = value[0]
                })
                return
            } else if ('error' in error.data) {
                errors.value.general = error.data.error
                return
            }
        } catch (e) {}

        errors.value.general = error.data?.error || 'An error occured'
    } finally {
        sending.value = false
    }
}
</script>
