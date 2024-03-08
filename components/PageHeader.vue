<template>
    <header class="text-center mx-auto max-w-4xl">
        <h1 class="h1" v-html="title"></h1>
        <p class="p -lead mt-2 text-gray-600" v-if="!!$slots.default">
            <slot />
        </p>
    </header>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>
