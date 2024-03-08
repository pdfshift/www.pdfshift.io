<template>
    <article class="relative" itemscope itemtype="https://schema.org/BlogPosting">
        <NuxtLink :to="article.url" class="absolute w-full h-full z-10" itemprop="mainEntityOfPage url"></NuxtLink>
        <div class="relative">
            <img class="rounded-md" :src="article.image" alt="article image" itemprop="image" v-if="article.image" />
            <div :class="{'absolute bottom-2 left-2':article.image}">
                <BlogCategoryPill :small="true">{{ article.category }}</BlogCategoryPill>
            </div>
        </div>
        <h3 class="h3 mt-4" itemprop="name headline">
            {{ article.title }}
        </h3>
        <footer class="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-end mt-4">
            <div class="flex gap-2 justify-start items-center text-sm" itemprop="author" itemscope itemtype="http://schema.org/Person">
                <img class="size-10 rounded-full" src="/images/demo/reviewer.png" alt="Nomad WebDesign" itemprop="image" />
                <div>
                    <div class="font-medium" itemprop="name">Nomad WebDesign</div>
                    <div class="h5 uppercase">AlternativeTo</div>
                </div>
            </div>
            <div class="ml-auto">
                <time :datetime="$dayjs(article.date).toISOString()" class="h5 uppercase" itemprop="datePublished">
                    {{ $dayjs(article.date).format('MMM D, YYYY') }}
                </time>
            </div>
        </footer>
    </article>
</template>

<script setup>
defineProps({
    article: {
        type: Object,
        required: true,
    }
})
</script>
