<template>
    <div>
        <NuxtLayout>
            <PageHeader title="Simple, Transparent Pricing">
                Choose the perfect plan for your conversion needs. Start free with 50 conversions per month, scale up as needed. No hidden fees, no surprises.
            </PageHeader>

            <div class="mt-12 md:mt-16">
                <HomePricing />
            </div>

            <div class="mt-16 lg:mt-24">
                <HomeCompanies />
            </div>

            <div class="mt-16 lg:mt-24">
                <div class="max-w-5xl mx-auto">
                    <h2 class="h2 text-navy-700 text-center mb-8">See what developers say about us</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <HomeReview
                            v-for="(review, index) in reviews"
                            :key="index"
                            :logo="review.logo"
                            :name="review.name"
                            :rating="review.rating"
                            :reviews="review.reviews"
                            :to="review.url"
                        />
                    </div>
                </div>
            </div>

            <div class="mt-16 lg:mt-24">
                <HomeTestimonials />
            </div>

            <div class="mt-16 lg:mt-24 text-center pb-12 md:pb-20">
                <h2 class="h2 text-navy-700 mb-4">Ready to get started?</h2>
                <p class="p text-navy-700 mb-8">Join thousands of developers using PDFShift to convert HTML to PDF</p>
                <Button to="/register" :arrow="true">Start Converting for Free</Button>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = "Pricing Plans | PDFShift - HTML to PDF API"
const description = "Simple, transparent pricing for PDFShift's HTML to PDF conversion API. Start free with 50 conversions per month, scale up as needed. No hidden fees, no surprises."

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})

const reviews = useReviewPlatforms()

// Schema.org structured data
const pricedPlans = usePlans().filter(plan => plan.price !== undefined)

useHead({
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "@id": "https://pdfshift.io/#software",
                "name": "PDFShift",
                "description": "HTML to PDF API for developers",
                "url": "https://pdfshift.io",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web-based",
                "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": String(Math.min(...pricedPlans.map(plan => plan.price))),
                    "highPrice": String(Math.max(...pricedPlans.map(plan => plan.price))),
                    "priceCurrency": "USD",
                    "offerCount": String(pricedPlans.length)
                }
            })
        },
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://pdfshift.io"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Pricing",
                        "item": "https://pdfshift.io/pricing"
                    }
                ]
            })
        }
    ]
})
</script>
