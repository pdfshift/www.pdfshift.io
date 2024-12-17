<template>
    <div>
        <NuxtLayout name="default">
            <article v-if="data">
                <PageHeader :title="data.title">
                    {{ data.description }}
                </PageHeader>

                <div class="lg:flex lg:items-start lg:gap-24 mt-8 md:mt-16 relative">
                    <nav v-if="sections.length > 0" id="table-of-contents" class="lg:w-1/3 border bg-white px-4 py-4 border-purple rounded-lg top-24 lg:top-32 left-0">
                        <span class="hidden md:inline-block h2 text-purple">Overview</span>
                        <ol class="mt-4 space-y-5 font-light mt-8 lg:block">
                            <li v-for="section in sections" :key="section.slug" class="hover:underline">
                                <a :href="'#'+section.slug" title="`Go to ${section.title}`">{{ section.title }}</a>
                            </li>
                        </ol>
                    </nav>
                    <div class="lg:w-2/3 page-content pt-8 articles" :class="{'lg:max-w-4xl mx-auto': sections.length === 0}">
                        <ContentRenderer :value="data" />
                    </div>
                </div>
            </article>
        </NuxtLayout>
    </div>
</template>

<script setup>
const route = useRoute()
let contentPath = route.path
if (contentPath.endsWith('/')) {
    contentPath = contentPath.slice(0, -1)
}
const { data } = await useAsyncData(route.fullPath, () => queryContent(route.path).findOne())

useSeoMeta({
    title: data.value.title,
    description: data.value.description,
    ogTitle: data.value.title,
    ogDescription: data.value.description,
    twitterTitle: data.value.title,
    twitterDescription: data.value.description
})

const sections = ref(data.value.body.toc.links.map(x => {
    return {
        title: x.text,
        slug: x.id
    }
}))

const copySectionLink = (slug) => {
    // remove current #hash value from url
    const currentUrl = window.location.href.replace(window.location.hash, '');

    const el = document.createElement('textarea');
    el.value = currentUrl + '#' + slug;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
</script>

