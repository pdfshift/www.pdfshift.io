<template>
    <blockquote class="quote bg-purple-500 px-8 md:px-16 py-6 md:py-12 rounded-lg md:rounded-xl">
        <slot />
        <footer class="mt-4 md:mt-8 text-sm md:text-base flex items-center gap-4 text-white font-light">
            <slot name="footer"></slot>
        </footer>
        <div class="mt-6">
            <slot name="cta"></slot>
        </div>
    </blockquote>
</template>

<style>
.quote p{
    @apply text-white font-light md:text-lg lg:text-xl leading-tight m-0;
}

.quote footer img{
    @apply object-cover size-12 rounded-full overflow-hidden m-0;
}
</style>