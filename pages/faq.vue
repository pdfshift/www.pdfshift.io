<template>
    <div>
        <NuxtLayout name="default">
            <PageHeader title="Our Frequently Asked Question" />

            <div class="mt-8 md:mt-16" itemscope>
                <div v-for="(question, index) in faqs" :key="index" class="py-6">
                    <component :is="'script'" type="application/ld+json">{{ getQuestionSchema(question) }}</component>
                    <h3 class="h3 text-navy-700">{{ question.question }}</h3>
                    <div class="p text-navy-700 pt-2">
                        <div v-html="question.answer"></div>
                    </div>
                </div>
                <div class="py-6">
                    <h3 class="h3 text-navy-700">What if I have other questions?</h3>
                    <div class="p text-navy-700 pt-2">
                        <div>
                            <p>Feel free to <NuxtLink to="/contact" title="Contact us" class="font-medium text-purple hover:underline">reach out to us via email</NuxtLink>, and we'll be happy to answer to all your questions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const faqs = questions()

const getQuestionSchema = (faq) => JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
    }
})

const title = "Our Frequently Asked Questions | PDFShift"
const description = "Find the answers to the most common questions about PDFShift, our service, and our API."

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})
</script>
