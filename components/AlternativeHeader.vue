<template>
    <header class="absolute left-1/2 top-4 z-20 h-[54px] w-[min(1280px,calc(100%-32px))] -translate-x-1/2 md:top-6">
        <NuxtLink to="/" class="block h-[54px] w-32 text-[#011552] md:w-[141px]" title="Go back to our home page">
            <IconsLogo />
        </NuxtLink>

        <nav class="absolute left-[464px] top-[15px] hidden lg:block" aria-label="Main navigation">
            <ul class="flex items-center gap-[39px] whitespace-nowrap text-base tracking-[-0.16px]">
                <li v-for="item in items" :key="item.path">
                    <NuxtLink class="hover:underline" :to="item.path">{{ item.title }}</NuxtLink>
                </li>
            </ul>
        </nav>

        <div class="absolute right-0 top-[3px] hidden h-12 items-center gap-[34px] lg:flex">
            <NuxtLink class="hover:underline" to="https://app.pdfshift.io">Login</NuxtLink>
            <NuxtLink class="flex h-12 w-[145px] items-center justify-center rounded-lg bg-purple text-base font-medium text-white transition-transform duration-200 hover:-translate-y-px" to="/register">Register</NuxtLink>
        </div>

        <button class="absolute right-0 top-[15px] size-6 cursor-pointer text-[#011552] lg:hidden" type="button" aria-label="Menu" @click="toggleMenu">
            <IconsHamburger />
        </button>

        <MobileDrawer :open="isMenuOpen" @close="toggleMenu" />
    </header>
</template>

<script setup>
const items = navItems()
const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    document.body.classList.toggle('overflow-hidden', isMenuOpen.value)
}

onUnmounted(() => {
    document.body.classList.remove('overflow-hidden')
})
</script>
