<template>
    <div class="bg-navy-700 relative min-h-screen">
        <div class="fixed left-0 top-40 w-full h-full flex z-0 opacity-50">
            <div class="w-1/2 bg-diamond-net-hero bg-no-repeat"></div>
            <div class="w-1/2 bg-diamond-net-hero bg-no-repeat -scale-x-100"></div>
        </div>
        <div>
            <header class="flex justify-center py-12 relative ">
                <NuxtLink to="/"><IconsLogo class="text-white w-36" /></NuxtLink>
            </header>
            <main class="relative max-w-2xl mx-auto text-white text-center mt-12 pb-12">
                <slot />
            </main>
        </div>
    </div>
</template>

<style>
html, body, #__nuxt{
    @apply h-full;
}


@media screen and (min-width:768px) and (max-height:520px){
    .scroll-container{
        overflow-y: scroll;
    }
}
</style>
