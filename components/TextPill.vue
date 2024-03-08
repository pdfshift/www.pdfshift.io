<template>
    <div class="inline-flex rounded-full items-center gap-2 border border-gray-600 bg-white px-5 py-3.5 shadow-lg text-lg h5 text-gray-400">
        <IconsClock v-if="icon === 'Clock'" />
        <IconsClipboardCode v-if="icon === 'ClipboardCode'" />
        <IconsLock v-if="icon === 'Lock'" />
        <IconsClipboard v-if="icon === 'Clipboard'" />
        <span class="space-x-1">
            <slot></slot>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: String,
        default: null,
    }
})
</script>
