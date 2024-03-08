<template>
<li class="flex items-center gap-3">
    <span class="text-purple w-4 md:w-6 ">
        <IconsTickFull v-if="tick" />
        <span v-else class="block bg-purple-100 rounded-full p-1">
            <IconsCross />
        </span>
    </span>
    <span class="md:text-lg">Feature description</span>
</li>
</template>

<script setup>
defineProps({
    feature: {
        type: String,
        required: true
    },
    tick: {
        type: Boolean,
        default: true
    }
})
</script>
