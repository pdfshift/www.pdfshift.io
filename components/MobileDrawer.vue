<template>
    <div class="bg-navy-700 w-screen h-screen px-8 py-6 flex flex-col justify-start absolute top-0 right-0 z-50" v-if="open">
        <div class="flex justify-between items-center">
            <div class="w-32 lg:w-36">
                <IconsLogo class="text-white" />
            </div>
            <button class="text-white w-6 h-6" @click="$emit('close')">
                <IconsClose />
            </button>
        </div>
        <nav class="mt-12">
            <ul class="text-white font-medium">
                <li v-for="item in items" :key="item.path" class="mb-8 last:mb-0 h2">
                    <NuxtLink :to="item.path" @click="$emit('close')" class="inline-flex items-center gap-2">
                        <span>{{ item.title }}</span>
                        <span v-if="item.external" class="inline-block size-6">
                            <IconsExternalLink />
                        </span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
        <div class="mt-auto ">
            <div class="w-56 mx-auto flex flex-col gap-6 items-center justify-center ">
                <NuxtLink to="https://app.pdfshift.io" class="text-white">Login</NuxtLink>
                <Button to="/register" class="w-full">Register</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
const items = navItems()
defineProps({ open: Boolean })
</script>
