<template>
    <NuxtPage />
</template>

<script setup>
const route = useRoute()
const canonical = computed(() => siteUrl(route.path))

useSeoMeta({
    ogImage: '/images/banner/slogan.png',
    twitterImage: '/images/banner/slogan.png',
    ogUrl: canonical
})

// Self-referencing canonical on every page. Pages can override it by declaring their own
// `link: [{ rel: 'canonical' }]` in useHead (the later declaration wins).
useHead({
    link: [{ rel: 'canonical', href: canonical }]
})
</script>
