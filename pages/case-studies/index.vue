<template>
    <div>
        <NuxtLayout name="default">
            <PageHeader title="Our exceptional case studies">
                We reached out to our customers to ask how they integrated PDFShift onto their service.<br />
                You'll find here a collection of their interviews.
            </PageHeader>

            <div class="max-w-4xl mx-auto px-4 mt-12 md:mt-24 pb-12 md:pb-24">
                <p class="em text-center">We are currently in discussion with our customers to craft the best case studies.<br />Come back soon to see them.</p>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = "Our case studies at PDFShift"
const description = "See how our users implemented PDFShift onto their service. Read directly from their interview."

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})
</script>
