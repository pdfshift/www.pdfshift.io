<template>
    <nav :class="isNavFixed ? 'fixed top-28' : 'absolute top-0'" class="agent-page-nav z-10 hidden w-48 flex-col gap-5 rounded-xl border border-purple-400 bg-white px-5 py-7 text-base font-light leading-snug xl:flex" aria-label="On this page">
        <a v-for="item in props.items" :key="item.id" :class="item.id === activeSection ? 'font-medium text-purple' : 'text-navy-800'" :href="`#${item.id}`" :aria-current="item.id === activeSection ? 'true' : undefined" @click="setActiveSection(item.id)">
            <span v-if="item.id === activeSection" aria-hidden="true">&rarr; </span>{{ item.label }}
        </a>
    </nav>
</template>

<script setup>
const props = defineProps({
    items: {
        type: Array
    },
    anchorId: {
        type: String,
        default: 'overview'
    }
})

const activeSection = ref(props.items[0].id)
const isNavFixed = ref(false)

const navOffset = 112

const updateActiveSection = () => {
    const activationLine = window.innerHeight * 0.35

    activeSection.value = props.items.reduce((currentSection, section) => {
        const element = document.getElementById(section.id)

        return element && element.getBoundingClientRect().top <= activationLine ? section.id : currentSection
    }, props.items[0].id)
}

const updateNavPosition = () => {
    const anchor = document.getElementById(props.anchorId)

    isNavFixed.value = Boolean(anchor && anchor.getBoundingClientRect().top <= navOffset)
}

const setActiveSection = (sectionId) => {
    activeSection.value = sectionId
}

let sectionObserver

onMounted(() => {
    sectionObserver = new IntersectionObserver(updateActiveSection, {
        rootMargin: '-35% 0px -55% 0px',
    })

    props.items.forEach(({ id }) => {
        const element = document.getElementById(id)

        if (element) sectionObserver.observe(element)
    })

    updateActiveSection()
    updateNavPosition()

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('scroll', updateNavPosition, { passive: true })
})

onBeforeUnmount(() => {
    sectionObserver?.disconnect()
    window.removeEventListener('scroll', updateActiveSection)
    window.removeEventListener('scroll', updateNavPosition)
})
</script>
