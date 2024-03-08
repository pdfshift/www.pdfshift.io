<template>
    <div class="flex flex-col lg:flex-row justify-center items-center gap-4 ">
        <div class="relative size-16 lg:size-18 flex justify-center items-center shrink-0">
            <div class="absolute left-0 top-0 w-full h-full text-purple-700">
                <IconsBackground />
            </div>
            <div class="text-white relative">
                <slot name="icon"></slot>
            </div>
        </div>
        <div class="text-center lg:text-left">
            <div class="h4 text-white text-xl font-medium">
                <slot name="title"></slot>
            </div>
            <div class="p -small text-white xl:whitespace-nowrap">
                <slot name="description"></slot>
            </div>
        </div>
    </div>
</template>

<style>
.hero-feature-icon {
    background-image: url('/images/textures/cross.svg');
}
</style>
