<template>
    <div
        class="relative min-h-[123px] w-full border px-5 py-[22px] pr-12 md:px-8 md:py-7 md:pr-16"
        :class="dark ? 'rounded border-0 bg-[#011552] text-[#c6b2ff]' : 'border-purple bg-purple-100 text-[#011552]'"
    >
        <pre class="overflow-x-auto whitespace-pre-wrap"><code class="font-['Source_Code_Pro'] text-sm font-medium italic leading-[20px] md:text-[18.432px] md:leading-[26.332px]"><template v-for="(line, index) in codeLines" :key="index"><template v-if="dark"><span v-for="(segment, segmentIndex) in line.segments" :key="segmentIndex" :class="{ 'text-white': segment.type === 'punctuation', 'text-[#b2ffc3]': segment.type === 'string' }">{{ segment.text }}</span></template><span v-else :class="{ 'text-purple': line.raw.trimStart().startsWith('//') }">{{ line.raw }}</span><br v-if="index < codeLines.length - 1" /></template></code></pre>
        <button class="absolute right-[18px] top-6 h-6 w-6 md:right-8 md:top-[34px] [&_svg]:h-[19px] [&_svg]:w-[18px]" type="button" :aria-label="copied ? 'Copied to clipboard' : 'Copy code to clipboard'" @click="copyCode">
            <IconsClipboard />
            <span class="sr-only">{{ copied ? 'Copied' : 'Copy code' }}</span>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    code: {
        type: String,
        required: true,
    },
    dark: {
        type: Boolean,
        default: false,
    },
})

const copied = ref(false)
let copiedTimeout

const highlightDarkLine = (line) => {
    if (/^\s*[{}]\s*$/.test(line)) {
        return [{ text: line, type: 'punctuation' }]
    }

    const propertyLine = line.match(/^(\s*)("[^"]+")(:)(\s*)("[^"]*")(,?)$/)

    if (!propertyLine) {
        return [{ text: line, type: 'default' }]
    }

    return [
        { text: `${propertyLine[1]}${propertyLine[2]}`, type: 'default' },
        { text: propertyLine[3], type: 'punctuation' },
        { text: propertyLine[4], type: 'default' },
        { text: `${propertyLine[5]}${propertyLine[6]}`, type: 'string' },
    ]
}

const codeLines = computed(() => props.code.split('\n').map(raw => ({
    raw,
    segments: highlightDarkLine(raw),
})))

const copyCode = async () => {
    let copiedSuccessfully = false

    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(props.code)
            copiedSuccessfully = true
        } catch {
            copiedSuccessfully = false
        }
    }

    if (!copiedSuccessfully) {
        const textarea = document.createElement('textarea')
        textarea.value = props.code
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        copiedSuccessfully = document.execCommand('copy')
        textarea.remove()
    }

    if (!copiedSuccessfully) return

    copied.value = true
    clearTimeout(copiedTimeout)
    copiedTimeout = setTimeout(() => {
        copied.value = false
    }, 1600)
}

onUnmounted(() => clearTimeout(copiedTimeout))
</script>
