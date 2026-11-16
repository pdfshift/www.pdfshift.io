<template>
    <!-- Two document pages side by side for article markdown: put the two images in the slot, ours first, and their labels in "names". The first page gets the brand-color frame. -->
    <div class="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-x-6 text-navy-700 [&>p]:!m-0 [&_img]:m-0 [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:border-2 [&_img]:border-gray-200 [&_img]:bg-white [&>p:first-of-type_img]:border-purple">
        <div v-for="{ text, css } in labels" :key="text" :class="css">{{ text }}</div>
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    names: { type: Array, default: () => [] }
})

// The first label is ours: brand color, like the frame on its page
const labels = computed(() => props.names.map((text, i) => ({
    text,
    css: ['self-end text-center', i === 0 ? 'font-semibold text-purple' : 'font-medium']
})))
</script>
