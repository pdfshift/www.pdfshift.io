<template>
    <!-- Figure for article markdown: ::guide-figure{caption="..."} <svg>...</svg> :: -->
    <figure class="my-8">
        <div class="overflow-x-auto rounded-lg border border-purple-400 bg-purple-100 p-4 [&_svg]:w-full [&_svg]:h-auto">
            <slot />
        </div>
        <figcaption v-if="caption" class="mt-2 text-center text-sm text-gray-600">{{ caption }}</figcaption>
    </figure>
</template>

<script setup>
defineProps({
    caption: {
        type: String,
        default: ''
    }
})
</script>

<style>
/* The markdown parser camel-cases SVG attributes (text-anchor becomes textAnchor), which browsers ignore. Map them back with CSS. */
figure svg [textanchor="end"] { text-anchor: end; }
figure svg [textanchor="middle"] { text-anchor: middle; }
figure svg[fontfamily] { font-family: 'DM Sans', sans-serif; }
figure svg [strokewidth="3"] { stroke-width: 3; }
</style>
