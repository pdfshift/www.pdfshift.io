<template>
    <NuxtLink :to="to" class="inline-flex border items-center justify-center px-10 py-3 rounded-lg gap-1 group transition-bg duration-300" :class="cssClass">
        <slot />
        <IconsArrowRight v-if="arrow" class="shrink-0 group-hover:inherit-color" />
        <IconsArrowRight v-if="arrowDown" class="shrink-0 group-hover:inherit-color transform rotate-90" />
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        default: 'javascript:void;',
    },
    arrow: {
        type: Boolean,
        default: false,
    },
    arrowDown: {
        type: Boolean,
        default: false,
    },
    light: {
        type: Boolean,
        default: false,
    },
    hover: {
        type: String,
        default: 'light'
    }
})

const cssClass = ref('')
if (props.light) {
    cssClass.value = 'bg-white text-purple'
} else {
    cssClass.value = 'bg-purple border-purple text-white'
}

if (props.hover === 'light') {
    cssClass.value += ' hover:bg-white hover:border-white hover:text-navy-700'
} else {
    cssClass.value += ' hover:bg-navy-700 hover:text-white hover:border-navy-700'
}
</script>
