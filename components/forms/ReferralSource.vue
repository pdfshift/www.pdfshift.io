<template>
    <div class="space-y-6">
        <!-- Step 1: Main Categories -->
        <div v-if="!selectedCategory" class="space-y-4">
            <div v-for="category in categories" :key="category.value">
                <FormsRadioButton @change="selectCategory(category)" :name="name" :id="`${name}-${category.value}`" :value="category.value">
                    <div>
                        <div class="font-semibold">{{ category.title }}</div>
                        <div v-if="category.examples" class="text-sm text-gray-500 font-normal mt-1">{{ category.examples }}</div>
                    </div>
                </FormsRadioButton>
            </div>
        </div>

        <!-- Step 2: Sub-options with transition -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-x-4"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-4"
            mode="out-in"
        >
            <div v-if="selectedCategory && !isRootOther" class="space-y-6">
                <!-- Back button -->
                <button @click="goBack" class="flex items-center gap-2 text-purple hover:text-navy-700 transition-colors duration-200 font-medium text-sm">
                    <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    Go back
                </button>

                <!-- Selected category display -->
                <div class="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div class="text-sm font-medium text-purple">Selected category:</div>
                    <div class="text-navy-700 font-medium mt-1">{{ selectedCategory.title }}</div>
                </div>

                <!-- Sub-options -->
                <div v-if="selectedCategory.options" class="space-y-3">
                    <div class="text-sm font-medium text-navy-700 mb-3">
                        {{ selectedCategory.subLabel || 'Please select an option:' }}
                    </div>
                    <div v-for="option in selectedCategory.options" :key="option.value">
                        <FormsRadioButton
                            v-model="tempSubOption"
                            :name="`${props.name}-sub`"
                            :id="`${props.name}-sub-${option.value}`"
                            :value="option.value"
                            @click="selectSubOption(option)"
                        >
                            {{ option.label }}
                        </FormsRadioButton>
                    </div>
                </div>

                <!-- Other text field for sub-option -->
                <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 max-h-0"
                    enter-to-class="opacity-100 max-h-24"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100 max-h-24"
                    leave-to-class="opacity-0 max-h-0"
                >
                    <div v-if="showSubOtherInput" class="overflow-hidden">
                        <input
                            v-model="otherText"
                            ref="subOtherInput"
                            type="text"
                            class="field w-full mt-2"
                            :placeholder="selectedCategory.otherPlaceholder || 'Please specify...'"
                            @input="updateOtherValue"
                        />
                    </div>
                </Transition>
            </div>

            <!-- Root "Other" text field -->
            <div v-else-if="isRootOther" class="space-y-4">
                <!-- Back button -->
                <button @click="goBack" class="flex items-center gap-2 text-purple hover:text-navy-700 transition-colors duration-200 font-medium text-sm">
                    <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    Go back
                </button>

                <div class="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div class="text-sm font-medium text-purple">Selected category:</div>
                    <div class="text-navy-700 font-medium mt-1">{{ selectedCategory.title }}</div>
                </div>

                <input
                    v-model="otherText"
                    ref="rootOtherInput"
                    type="text"
                    class="field w-full"
                    :placeholder="selectedCategory.otherPlaceholder || 'Please specify...'"
                    @input="updateOtherValue"
                />
            </div>
        </Transition>
    </div>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
    name: {
        type: String,
        default: 'referral_source',
    },
})

const categories = [
    {
        value: 'search_engine',
        title: 'Search engine',
        examples: 'Google, Bing, Duck, Qwant, Kagi, Yahoo, ...',
        subLabel: 'Which search engine?',
        options: [
            { value: 'google', label: 'Google' },
            { value: 'bing', label: 'Bing' },
            { value: 'duckduckgo', label: 'DuckDuckGo' },
            { value: 'kagi', label: 'Kagi' },
            { value: 'qwant', label: 'Qwant' },
            { value: 'brave', label: 'Brave' },
            { value: 'yahoo', label: 'Yahoo' },
            { value: 'baidu', label: 'Baidu' },
            { value: 'yandex', label: 'Yandex' },
            { value: 'other', label: 'Other' },
        ],
        otherPlaceholder: 'Which search engine?',
    },
    {
        value: 'no_code_platform',
        title: 'No code platform',
        examples: 'Webflow, Lovable, Bubble, Replit, Base44, ...',
        subLabel: 'Which platform?',
        options: [
            { value: 'webflow', label: 'Webflow' },
            { value: 'lovable', label: 'Lovable' },
            { value: 'bubble', label: 'Bubble' },
            { value: 'replit', label: 'Replit' },
            { value: 'base44', label: 'Base44' },
            { value: 'clay', label: 'Clay' },
            { value: 'other', label: 'Other' },
        ],
        otherPlaceholder: 'Which platform?',
    },
    {
        value: 'social_network',
        title: 'Social Network',
        examples: 'Facebook, Youtube, Reddit, X/Twitter, ...',
        subLabel: 'Which social network?',
        options: [
            { value: 'facebook', label: 'Facebook' },
            { value: 'youtube', label: 'Youtube' },
            { value: 'reddit', label: 'Reddit' },
            { value: 'x_twitter', label: 'X/Twitter' },
            { value: 'linkedin', label: 'LinkedIn' },
            { value: 'other', label: 'Other' },
        ],
        otherPlaceholder: 'Which social network?',
    },
    {
        value: 'ai_agents',
        title: 'AI Agents',
        examples: 'ChatGPT, Claude, Gemini, Codex, ...',
        subLabel: 'Which AI agent?',
        options: [
            { value: 'chatgpt', label: 'ChatGPT' },
            { value: 'claude', label: 'Claude' },
            { value: 'copilot', label: 'Copilot' },
            { value: 'mistral', label: 'Mistral' },
            { value: 'qwen', label: 'Qwen' },
            { value: 'perplexity', label: 'Perplexity' },
            { value: 'blackbox', label: 'Blackbox' },
            { value: 'other', label: 'Other' },
        ],
        otherPlaceholder: 'Which AI agent?',
    },
    {
        value: 'general_websites',
        title: 'General websites',
        examples: 'ProductHunt, IndieHackers, Quora, Substack',
        subLabel: 'Which website?',
        options: [
            { value: 'producthunt', label: 'ProductHunt' },
            { value: 'indiehackers', label: 'IndieHackers' },
            { value: 'quora', label: 'Quora' },
            { value: 'substack', label: 'Substack' },
            { value: 'alternativeto', label: 'AlternativeTo' },
            { value: 'g2', label: 'G2' },
            { value: 'capterra', label: 'Capterra' },
            { value: 'other', label: 'Other' },
        ],
        otherPlaceholder: 'Which website?',
    },
    {
        value: 'competitor',
        title: 'Competitor',
        otherPlaceholder: 'Who?',
    },
    {
        value: 'other',
        title: 'Other',
        otherPlaceholder: 'Where?',
    },
]

const selectedCategory = ref(null)
const tempSubOption = ref(null)
const otherText = ref('')
const subOtherInput = ref(null)
const rootOtherInput = ref(null)

const isRootOther = computed(() => {
    return selectedCategory.value && (selectedCategory.value.value === 'competitor' || selectedCategory.value.value === 'other')
})

const showSubOtherInput = computed(() => {
    return tempSubOption.value === 'other'
})

const selectCategory = (category) => {
    selectedCategory.value = category
    tempSubOption.value = null
    otherText.value = ''

    // If it's a root "other" category, auto-focus the input
    if (isRootOther.value) {
        nextTick(() => {
            if (rootOtherInput.value) {
                rootOtherInput.value.focus()
            }
        })
    }

    // Update model for root-level "other" categories
    if (category.value === 'competitor' || category.value === 'other') {
        updateModelValue(category.value, null, '')
    }
}

const selectSubOption = (option) => {
    if (option.value === 'other') {
        nextTick(() => {
            if (subOtherInput.value) {
                subOtherInput.value.focus()
            }
        })
        updateModelValue(selectedCategory.value.value, 'other', '')
    } else {
        updateModelValue(selectedCategory.value.value, option.value, null)
    }
}

const updateOtherValue = () => {
    if (isRootOther.value) {
        updateModelValue(selectedCategory.value.value, null, otherText.value)
    } else if (showSubOtherInput.value) {
        updateModelValue(selectedCategory.value.value, 'other', otherText.value)
    }
}

const updateModelValue = (category, subOption, otherValue) => {
    model.value = {
        category,
        subOption,
        other: otherValue,
    }
}

const goBack = () => {
    selectedCategory.value = null
    tempSubOption.value = null
    otherText.value = ''
    model.value = null
}

// Watch for external model changes
watch(() => model.value, (newValue) => {
    if (!newValue) {
        goBack()
    }
}, { deep: true })
</script>
