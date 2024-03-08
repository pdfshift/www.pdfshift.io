<template>
    <div>
        <NuxtLayout name="page-bg">
            <PageHeader title="Contact Us">
                We're happy to answer any questions about PDFShift
            </PageHeader>

            <div class="grid gap-8 md:gap-16 md:grid-cols-2 mt-12 md:mt-16 pb-12 md:pb-20">
                <CardLight>
                    <div v-if="success" class="py-4">
                        <div class="flex justify-center">
                            <IconsTickBordered class="text-green w-12 lg:w-20" />
                        </div>
                        <h2 class="my-10 h2 font-normal block text-navy-700 text-center">
                            Thank you for reaching out
                        </h2>
                        <div class="text-navy-700 text-center">
                            <p>
                                We will get in touch very shortly<br />
                                usually between 1-2 business days.
                            </p>
                        </div>
                    </div>
                    <div v-else class="grid gap-6 md:gap-8">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="h5 block" for="contact-name" :class="{ 'text-red-500': errors.name }">What's your name?</label>
                                <input v-model="form.name" ref="nameField" id="contact-name" name="name" type="text" class="field mt-2 w-full" :class="{ '-error': errors.name }" placeholder="Enter your name" />
                                <span class="block mt-2 text-red-500 font-light" v-if="errors.name">{{ errors.name }}</span>
                            </div>
                            <div>
                                <label class="h5 block" for="email" :class="{ 'text-red-500': errors.email }">What's your email?</label>
                                <input v-model="form.email" id="contact-email" name="email" type="text" required class="field mt-2 w-full" :class="{ '-error': errors.email }" placeholder="Enter your email" />
                                <span class="block mt-2 text-red-500 font-light" v-if="errors.email">{{ errors.email }}</span>
                            </div>
                        </div>

                        <div>
                            <label class="h5 block" for="contact-message" :class="{ 'text-red-500': errors.message }">What would you like to ask?</label>
                            <textarea v-model="form.message" name="message" id="contact-message" rows="5" required placeholder="How can we help you?" class="field w-full mt-2"></textarea>
                            <span class="block mt-2 text-red-500 font-light" v-if="errors.message">{{ errors.message }}</span>
                        </div>

                        <div class="block text-red-500 font-light" v-if="errors.general">{{ errors.general }}</div>
                        <input type="submit" name="submit" value="Send us a message!" class="w-full inline-flex border items-center justify-center px-10 py-3 rounded-lg gap-1 group transition-bg duration-300 bg-purple border-purple text-white hover:bg-navy-700 hover:text-white hover:border-navy-700 cursor-pointer disabled:pointer-events-none disabled:opacity-75" :disabled="sending" @click="submit" />
                    </div>
                </CardLight>

                <div class="px-2 pt-8 md:pt-6 md:px-0">
                    <h2 class="h2 text-navy-700">We'd love to talk to you</h2>
                    <p class="p mt-2 md:mt-3 text-navy-700 font-light">We aim to respond to your enquiry within one business day.</p>

                    <address class="not-italic mt-8 md:max-w-sm">
                        <ol class="space-y-6 md:space-y-8">
                            <li class="flex items-center gap-4">
                                <span class="bg-white rounded-lg md:rounded-2xl shadow size-8 p-2 md:size-12 md:p-3 block text-purple flex justify-center items-center">
                                    <IconsEnvelope />
                                </span>
                                <NuxtLink to="mailto:support@pdfshift.io" class="md:text-lg font-light text-navy-700 hover:underline">support@pdfshift.io</NuxtLink>
                            </li>
                            <li class="flex items-center gap-4">
                                <span class="bg-white rounded-lg md:rounded-2xl shadow size-8 p-2 md:size-12 md:p-3 block text-purple">
                                    <LogosX />
                                </span>
                                <NuxtLink to="https://x.com/@pdfshift" class="md:text-lg font-light text-navy-700 hover:underline">@pdfshift</NuxtLink>
                            </li>
                            <li class="flex items-center gap-4">
                                <span class="bg-white rounded-lg md:rounded-2xl shadow size-8 p-2 md:size-12 md:p-3 text-purple flex justify-center items-center">
                                    <IconsPin class="w-5" />
                                </span>
                                <span class="md:text-lg font-light text-navy-700">
                                    SASU PDFShift<br />
                                    128 rue la boétie<br />
                                    75008 PARIS, France
                                </span>
                            </li>
                        </ol>
                    </address>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = "Contact Us | PDFShift"
const description = "Contact us for any questions, feedback, or support. We're here to help you with your PDF needs."

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})

const success = ref(false)
const sending = ref(false)
const nameField = ref(null)

const form = ref({
    name: null,
    email: null,
    message: null
})

const errors = ref({
    name: null,
    email: null,
    message: null,
    general: null
})

onMounted(() => {
    if (process.client) {
        nameField.value.focus()
    }
})

const submit = async () => {
    if (sending.value) return

    sending.value = true
    errors.value = {
        name: null,
        email: null,
        message: null
    }

    try {
        await $fetch(useApiEndpoint('/website/contact'), {
            method: 'POST',
            body: form.value
        })
        success.value = true
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
