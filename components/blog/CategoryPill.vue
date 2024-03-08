<template>
    <div class="inline-block bg-purple-500 uppercase font-light text-sm px-3 text-white rounded-full" :class="{'py-2':!small, 'py-1': small}">
        <slot />
    </div>
</template>

<script setup>
defineProps({
    small: {
        type: Boolean,
        default: false,
    }
});
</script>
