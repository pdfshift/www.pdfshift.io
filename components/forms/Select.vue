<template>
    <div class="relative">
        <select :name="name" :id="id || name" class="hidden">
            <option v-for="option in options" :key="option.value" :value="option.value" :checked="option.value === model">{{ option.label }}</option>
        </select>
        <button class="field w-full text-left" @click="toggle">
            <span v-if="model">{{ selectedLabel }}</span>
            <span v-else class="text-navy-700/50">Select a programming language</span>
        </button>
        <ul v-show="isOpen" class="absolute top-px left-px right-px bg-purple-100 rounded-lg z-10 py-2">
            <li v-for="option in options" :key="option.value" @click="selectOption(option)" class="flex items-center px-2 py-3 hover:bg-purple hover:text-white cursor-pointer" :class="{'text-purple font-medium': model === option.value, 'font-light text-navy-700': model !== option.value }">
                <span>{{ option.label }}</span>
                <span class="w-8" v-if="model === option.value">
                    <IconsTick />
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
let isOpen = ref(false)
const model = defineModel()

const props = defineProps({
    id: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null,
    },
    options: {
        type: Array,
        default: () => [],
    }
})

const selectOption = (option) => {
    model.value = option.value
    isOpen.value = false
}

const toggle = () => {
    isOpen.value = !isOpen.value
}

const selectedLabel = computed(() => {
    return props.options.find(option => option.value === model.value).label
})
</script>
