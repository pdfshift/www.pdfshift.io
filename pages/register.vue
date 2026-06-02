<template>
    <div>
        <NuxtLayout name="page-bg">
            <PageHeader v-if="step === 1" title="Quickly get started">
                Get started under a minute.<br />
                Fill out the form and we'll send you an email to activate your account.
            </PageHeader>
            <PageHeader v-else-if="step === 2" title="One last thing">
                Help us understand how you discovered PDFShift.
            </PageHeader>

            <div id="content" class="max-w-xl mx-auto my-12">
                <CardLight>
                    <div v-if="step === 3" class="py-4">
                        <div class="flex justify-center">
                            <IconsTickBordered class="text-green w-12 lg:w-20" />
                        </div>
                        <h2 class="my-10 h2 font-normal block text-navy-700 text-center">
                            Thank you! Check your email.
                        </h2>
                        <div class="text-navy-700 text-center">
                            <p class="mt-4">We've sent you an email to activate your account.<br />(If you don't see it, check your spam folder)</p>
                            <p class="mt-4">
                                You can already get started by <NuxtLink :to="`/guides/${form.language}/`" class="font-bold text-purple hover:underline">reading our guides</NuxtLink>
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <!-- Step content with transition -->
                        <Transition name="slide" mode="out-in">
                            <!-- Step 1: Basic Info -->
                            <div v-if="step === 1" key="step-1" class="grid gap-6 md:gap-8">
                                <div>
                                    <label for="register-name" :class="{ 'text-red-500': errors.name }">Your name</label>
                                    <input v-model="form.name" ref="nameField" id="register-name" name="name" type="text" class="field mt-2 w-full" :class="{ '-error': errors.name }" placeholder="Enter your name" />
                                    <span class="block mt-2 text-red-500 font-light" v-if="errors.name">{{ errors.name }}</span>
                                </div>

                                <div>
                                    <label for="register-email" :class="{'text-red-500': errors.email}">Email Address</label>
                                    <input v-model="form.email" id="register-email" name="email" type="email" class="field mt-2 w-full" :class="{'-error': errors.email}" placeholder="Enter your email" />
                                    <span class="block mt-2 text-red-500 font-light" v-if="errors.email">{{ errors.email }}</span>
                                </div>

                                <div>
                                    <label for="register-language">Programming Language</label>
                                    <select v-model="form.language" id="register-language" name="language" class="field mt-2 w-full">
                                        <option v-for="opt in languageOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                                    </select>

                                    <div class="mt-3 font-light flex items-center gap-2">
                                        <span><IconsArrowRight class="text-gray-400" /></span>
                                        <span class="text-sm text-gray-400">We'll adjust our code sample with your favorite code</span>
                                    </div>
                                </div>

                                <div>
                                    <FormsCheckbox name="agree" v-model="form.agree">
                                        I agree with the
                                        <a href="/legal/terms" title="Read our Terms of Service" class="font-bold hover:underline" target="_blank">Terms of service</a> and
                                        <a href="/legal/privacy" title="Read our Privacy Policy" class="font-bold hover:underline" target="_blank">Privacy Policy</a>
                                    </FormsCheckbox>
                                    <span class="block mt-2 text-red-500 font-light" v-if="errors.agree">{{ errors.agree }}</span>

                                    <FormsCheckbox name="newsletter" class="mt-4" v-model="form.newsletter">
                                        Receive some news from us (less than one per month)
                                    </FormsCheckbox>
                                </div>

                                <div class="block text-red-500 font-light" v-if="errors.general">{{ errors.general }}</div>

                                <button type="submit" :disabled="sending || !canSubmitAccount" @click="submitAccount" class="w-full inline-flex border items-center justify-center px-10 py-3 rounded-lg gap-1 group transition-all duration-300 bg-purple border-purple text-white hover:bg-navy-700 hover:text-white hover:border-navy-700 cursor-pointer disabled:pointer-events-none disabled:opacity-75">
                                    Create your free account
                                </button>

                                <div class="text-center">
                                    <span class="h4">Already a member?</span>
                                    <NuxtLink to="https://app.pdfshift.io" class="ml-2 font-medium text-purple hover:underline h4">Login Here</NuxtLink>
                                </div>
                            </div>

                            <!-- Step 2: Referral Source -->
                            <div v-else-if="step === 2" key="step-2" class="grid gap-6 md:gap-8">
                                <div>
                                    <label class="text-navy-700 font-medium text-lg mb-2 block">Where did you hear about us?</label>
                                    <p class="text-sm text-gray-600 mb-4">This helps us understand how people discover PDFShift</p>
                                    <FormsReferralSource v-model="referral" name="referral_source" />
                                </div>

                                <div class="block text-red-500 font-light" v-if="errors.general">{{ errors.general }}</div>

                                <div class="flex gap-3">
                                    <button type="submit" :disabled="!canSubmitReferral" @click="submitReferral" class="flex-[2] inline-flex border items-center justify-center px-10 py-3 rounded-lg gap-1 group transition-all duration-300 bg-purple border-purple text-white hover:bg-navy-700 hover:text-white hover:border-navy-700 cursor-pointer disabled:pointer-events-none disabled:opacity-75">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </CardLight>
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
    { value: 'n8n', label: 'N8n' },
    { value: 'curl', label: 'Other' }
]

const form = ref({
    name: null,
    email: null,
    language: null,
    agree: false,
    newsletter: false
})

const referral = ref({})

const errors = ref({
    name: null,
    email: null,
    agree: null,
    general: null
})

const sending = ref(false)
const step = ref(1)

const nameField = ref(null)

let sessionToken = null

const canSubmitAccount = computed(() => {
    return form.value.name && form.value.email && form.value.agree
})

const canSubmitReferral = computed(() => {
    if (referral.value) {
        if (referral.value.category === 'other' && !referral.value.other) return false
        else if (referral.value.category === 'competitor' && !referral.value.other) return false
        else if (referral.value.subOption === 'other' && !referral.value.other) return false
    }
    return referral.value && referral.value.category
})

onMounted(() => {
    if (process.client && nameField.value) {
        nameField.value.focus()
    }

    const language = useStorage().get('language')
    if (language && languageOptions.find(option => option.value === language)) {
        form.value.language = language
    } else {
        form.value.language = 'php'
    }
})

const submitAccount = async ($event) => {
    $event.preventDefault()
    if (sending.value) {
        return false
    }

    sending.value = true
    errors.value = {
        name: null,
        email: null,
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
        const response = await $fetch(useApiEndpoint('/account'), {
            method: 'POST',
            body
        })
        step.value = 2
        try { window.plausible('Signup') } catch (e) {}
        try { window.signups(form.value.email) } catch (e) { }
        sessionToken = response.token
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

const submitReferral = async ($event) => {
    step.value = 3
    try {
        await $fetch(useApiEndpoint('/account/referrer'), {
            method: 'PATCH',
            body: {
                token: sessionToken,
                referrer: referral.value.other || referral.value.subOption
            }
        })
    } catch (e) {}
}
</script>

<style scoped>
.slide-enter-active {
    transition: all 0.3s ease-out;
}

.slide-leave-active {
    transition: all 0.2s ease-in;
}

.slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>
