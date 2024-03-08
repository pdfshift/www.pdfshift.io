<template>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in slides" :key="slide.link" class="px-4">
            <Quote>
                <p class="text-left">{{ slide.text }}</p>
                <template v-slot:footer>
                    <img class="shrink-0 size-8 md:size-12" :src="slide.author.image" alt="quote author">
                    <span class="text-left">{{  slide.author.name }} from {{ slide.author.company}} </span>
                </template>
            </Quote>
        </Slide>

        <template #addons>
            <Pagination />
        </template>
    </Carousel>
</template>

<script setup>
defineProps({
    slides: {
        type: Array,
        required: true,
    }
});

const settings = {
    itemsToShow: 1.5,
    wrapAround: true
}

const breakpoints = {
    1200: {
        itemsToShow: 2.5,
    },
    1920: {
        itemsToShow: 3.5,
    }
}
</script>

<style>
.carousel__pagination{
    @apply mt-6;
}
.carousel__pagination-button:after{
    @apply size-4 rounded-full bg-purple-400;
}
.carousel__pagination-button--active:after,.carousel__pagination-button:hover:after{
    @apply bg-purple;
}
</style>
