<template>
    <header class="w-full max-w-7xl -translate-x-1/2 left-1/2 z-20 pt-4" :class="{
            '': !scrolled,
            '-scrolled px-4 sm:px-16 lg:px-32 xl:px-48': scrolled,
            'fixed transition-all duration-700': !props.fixed,
            'absolute': props.fixed
        }">
        <div class="header-container flex items-center py-2 justify-between w-full lg:max-w-7xl mx-auto"
            :class="{ 'rounded-lg shadow-xl px-8': scrolled, 'bg-navy-900': dark, 'bg-white': !dark && scrolled }">
            <NuxtLink to="/" class="block w-32 md:w-36" title="Go back to our home page">
                <IconsLogo :class="{ 'text-white': dark, 'text-navy-700': !dark }" />
            </NuxtLink>

            <nav role="navigation" class="hidden lg:block" itemscope itemtype="http://schema.org/SiteNavigationElement">
                <ul class="flex items-center gap-8" :class="{ 'text-white': dark, 'text-navy-700': !dark }">
                    <li v-for="item in items" :key="item.path">
                        <NuxtLink :to="item.path" itemprop="url" class="hover:underline inline-flex items-center gap-1">
                            <span itemprop="name">{{ item.title }}</span>
                            <span v-if="item.external" class="inline-block size-4">
                                <IconsExternalLink />
                            </span>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <div class="hidden lg:flex gap-8 items-center" >
                <NuxtLink to="https://app.pdfshift.io" class="hover:underline" :class="{ 'text-white': dark, 'text-navy-700': !dark }">Login</NuxtLink>
                <Button to="/register">Register</Button>
            </div>
            <button aria-label="Menu" class="lg:hidden cursor-pointer" @click="toggleMenu" :class="{ 'text-white': dark, 'text-navy-700': !dark }">
                <IconsHamburger />
            </button>

            <MobileDrawer :open="isMenuOpen" @close="toggleMenu" />
        </div>
    </header>
</template>

<script setup>
const items = navItems()

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    //disable scroll
    document.body.classList.toggle('overflow-hidden');
}

const props = defineProps({
    dark: {
        type: Boolean,
        default: false,
    },
    fixed: {
        type: Boolean,
        default: false
    }
})

const scrolled = ref(false);
if (!props.fixed) {
    const handleScroll = () => {
        scrolled.value = window.scrollY > 0;
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    })
}
</script>
