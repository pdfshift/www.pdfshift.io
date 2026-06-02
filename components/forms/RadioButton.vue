<template>
    <div class="flex items-start gap-3">
        <div>
            <input class="hidden peer" type="radio" :name="name" :id="id" :checked="isSelected" />
            <button class="border size-5 rounded-full border-gray-300 mt-0.5 cursor-pointer bg-white hover:shadow flex items-center justify-center" :class="{ 'isSelected': 'peer-checked:border-purple hover:border-purple' }" @click="select">
                <div v-if="isSelected" class="size-2.5 rounded-full bg-purple"></div>
            </button>
        </div>
        <div class="flex-1">
            <label class="font-light text-sm lg:text-base hover:cursor-pointer" :for="id" @click="select"><slot /></label>
            <span class="text-xs font-light text-gray-400 block mt-2" v-if="description">{{ description }}</span>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    name: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    modelValue: {
        type: String,
        default: null
    }
})

const isSelected = computed(() => props.modelValue == props.value)

const select = () => {
    emit('update:modelValue', props.value)
}
</script>
