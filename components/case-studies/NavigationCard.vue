<template>
    <NuxtLink :to="to">
        <CardLight @click="">
            <img v-if="image" :src="image" />
            <div class="h5 text-purple uppercase mt-6 font-medium flex items-center" :class="{'justify-start':prev,'justify-end':next}">
            <span v-if="prev">&lt; Prev: <slot></slot></span>
            <span v-else-if="next">Next: <slot></slot> &gt;</span>
            </div>

        </CardLight>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        default: '#',
    },
    image: {
        type: String,
        default: '/images/demo/demo-company-logo.png',
    },
    prev: {
        type: Boolean,
        default: false,
    },
    next: {
        type: Boolean,
        default: false,
    }
})
</script>
