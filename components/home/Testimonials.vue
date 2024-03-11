<template>
    <section class="rounded-2xl bg-navy-900 p-8 py-12 lg:p-16 lg:py-16">
        <div class="flex flex-col items-center gap-6 text-center">
            <h2 class="h2 text-white text-4xl">
                <span class="text-purple-500">Trusted</span> and loved <br>around the world
            </h2>
            <p class="p text-white">
                Hundred of users shared their love of PDFShift
            </p>
        </div>

        <div class="grid grid-cols-6 gap-8 mt-16">
            <ClientOnly>
                <article v-for="review in allReviews" :key="review.link" class="col-span-full md:col-span-3 lg:col-span-2 border border-purple rounded-lg p-4">
                    <component :is="'script'" type="application/ld+json">{{ getReviewSchema(review) }}</component>
                    <p class="p -small text-purple-400">{{ review.text }}</p>
                    <div class="mt-auto text-white flex flex-row justify-between pt-6">
                        <div class="font-medium">{{ review.name}}</div>
                        <div class="p -small">
                            <NuxtLink :to="review.link" :title="`View ${review.name}'s review at ${review.company}`" class="hover:underline">{{ review.company}}</NuxtLink>
                        </div>
                    </div>
                </article>
            </ClientOnly>
        </div>
        <div class="mt-20 flex justify-center" v-if="seeMore < 3">
            <Button :arrow-down="true" @click="addMoreTestimonials" v-if="seeMore === 0">Load More</Button>
            <Button :arrow-down="true" @click="addMoreTestimonials" v-else-if="seeMore === 1">More !!</Button>
            <Button :arrow-down="true" @click="addMoreTestimonials" v-else-if="seeMore === 2">I SAID MORE !!!!</Button>
        </div>
    </section>
</template>

<script setup>
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function addMoreTestimonials () {
    seeMore.value++
    let limit = 6;
    if (seeMore.value === 3) limit = 9

    for (let i = 0; i < limit; i++) {
        allReviews.value.push(secondaryReviews.pop())
    }
}

const seeMore = ref(0)
const reviews = shuffle(testimonials());

const allReviews = ref(reviews.filter(x => x.company === 'Capterra').splice(0, 6))
const secondaryReviews = reviews.filter(x => allReviews.value.indexOf(x) === -1)

const getReviewSchema = (review) => JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Review",
    "itemReviewed": {
        "@type": "Organization",
        "legalName": "PDFShift"
    },
    "author": {
        "@type": "Person",
        "name": review.name
    },
    "reviewBody": review.text
})
</script>
