<template>
    <div class="flex items-start gap-3">
        <div @click="toggle" >
            <input class="hidden peer" type="checkbox" :name="name" :id="name" :checked="checked" />
            <button class="border size-5 rounded-sm border-gray-300 mt-0.5 cursor-pointer bg-white peer-checked:bg-purple peer-checked:border-purple hover:border-purple hover:shadow">
                <IconsTick class="cursor-pointer scale-150 text-white" v-if="checked" />
            </button>
        </div>
        <div>
            <label class="font-light text-sm lg:text-base hover:cursor-pointer" :for="name"><slot /></label>
            <span class="text-xs font-light text-gray-400 block mt-2" v-if="description">{{ description }}</span>
        </div>
    </div>
</template>

<script setup>
const checked = ref(false)

defineProps({
    label: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: null,
    },
})

const toggle = () => {
    checked.value = !checked.value
}
</script>