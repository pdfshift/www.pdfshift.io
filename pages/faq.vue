<template>
    <div>
        <NuxtLayout name="default">
            <PageHeader title="Our Frequently Asked Question" />

            <div class="mt-8 md:mt-16">
                <div v-for="(question, index) in faqs" :key="index" class="py-6" itemscope itemtype="https://schema.org/Question">
                    <h3 class="h3 text-navy-700" itemprop="name">{{ question.question }}</h3>
                    <div class="p text-navy-700 pt-2" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                        <div v-html="question.answer" itemprop="text"></div>
                    </div>
                </div>
                <div class="py-6" itemscope itemtype="https://schema.org/Question">
                    <h3 class="h3 text-navy-700" itemprop="name">What if I have other questions?</h3>
                    <div class="p text-navy-700 pt-2" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                        <div itemprop="text">
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
