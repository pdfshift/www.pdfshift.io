<template>
    <div>
        <NuxtLayout name="default">
            <article>
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
                    <div id="sections" class="lg:w-2/3 page-content pt-8" :class="{'lg:max-w-4xl mx-auto': sections.length === 0}">
                        <ContentRenderer :value="data" />
                    </div>
                </div>
            </article>
        </NuxtLayout>
    </div>
</template>

<script setup>
const route = useRoute()
const { data } = await useAsyncData(route.fullPath, () => queryContent(route.path).findOne())

useSeoMeta({
    title: data.value.title,
    description: data.value.description,
    ogTitle: data.value.title,
    ogDescription: data.value.description,
    twitterTitle: data.value.title,
    twitterDescription: data.value.description
})

let sections = ref(data.value.body.toc.links.map(x => {
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

<style>
#sections h2 {
    @apply pt-16 font-medium text-2xl lg:text-4xl !leading-tight text-purple;
}

#sections h3 {
    @apply pt-10 font-medium text-xl lg:text-2xl !leading-tight text-purple;
}

#sections pre {
    @apply my-4 pt-4 p-4 rounded-md bg-gray-100 text-gray-600;
}

#sections a {
    @apply underline;
}

#sections h1 a, #sections h2 a, #sections h3 a, #sections h4 a, #sections h5 a {
    @apply no-underline hover:underline;
}

#sections p>code, #sections li>code {
    @apply bg-gray-100 rounded-md px-2 py-1 border-2 border-gray-200 text-red-600;
}

#sections ul {
    @apply ml-4 mt-4 mb-8 list-decimal
}

#sections ol {
    @apply ml-4 mt-4 mb-8  list-decimal
}

#sections li {
    @apply my-2;
}

@media screen and (min-width: 1024px){
    #sections h2 {
        font-size: 2.25rem;
        line-height: 2.5rem;
    }
}
</style>
