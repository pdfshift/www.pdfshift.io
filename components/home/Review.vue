<template>
    <NuxtLink :to="to" class="rounded-lg border border-purple flex flex-col items-center justify-center px-3 py-8">
        <div class="h-14 flex justify-center px-16">
            <img :src="logo" :alt="name + ' logo'" />
        </div>
        <StarRating text-size="text-lg" size="w-7" :small="true" class="mt-4 text-navy-700" :rating="rating" :reviews="reviews" />
        <div class="text-navy-700 text-center mt-3 lg:text-lg">Read {{ (reviews>1) ? 'all' : '' }} {{ reviews }} {{ (reviews===1) ? 'review' : 'reviews'}} on {{ name}} </div>
    </NuxtLink>
</template>

<script setup>
defineProps({
    logo: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    to: {
        type: String,
        default: ''
    }
})
</script>
