<template>
    <div>
        <NuxtLayout name="404">
            <h1 class="h1">Uh oh! It seems that what you’re looking for isn’t here...</h1>
            <strong class="error-code font-bold leading-none mt-6">
                <span class="inline-block bg-gradient-to-r from-purple via-purple-500 to-white text-transparent bg-clip-text">4</span>
                <span class="inline-block bg-gradient-to-r from-purple via-purple-500 to-white text-transparent bg-clip-text">0</span>
                <span class="inline-block bg-gradient-to-r from-purple via-purple-500 to-white text-transparent bg-clip-text">4</span>
            </strong>
            <div class="mt-8">
                <Button to="/" :light="true" arrow>Go back to the homepage</Button>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})
console.log(props)

const title = "404 - Page not found | PDFShift"
const description = "The page you were looking for was not found."

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})
</script>

<style scoped>
.error-code{
    font-size: 140px;
}
@media screen and (min-width:1024px){
    .error-code{
        font-size: 280px;
    }
}

@media screen and (min-width:768px) and (max-height:740px){
    .error-code{
        font-size: 160px;
    }
    h1.h1{
        font-size: 2rem;
    }
}
</style>
