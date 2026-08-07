<template>
    <div
        class="relative min-h-30 w-full border px-5 py-5 pr-12 md:px-8 md:py-7 md:pr-16"
        :class="dark ? 'rounded border-0 bg-navy-800 text-purple-400' : 'border-purple bg-purple-100 text-navy-800'"
    >
        <pre class="overflow-x-auto whitespace-pre-wrap"><code class="font-code text-sm font-medium italic leading-5 md:text-lg md:leading-7"><template v-for="(line, index) in codeLines" :key="index"><template v-if="dark"><span v-for="(segment, segmentIndex) in line.segments" :key="segmentIndex" :class="{ 'text-white': segment.type === 'punctuation', 'text-code-string': segment.type === 'string' }">{{ segment.text }}</span></template><span v-else :class="{ 'text-purple': line.raw.trimStart().startsWith('//') }">{{ line.raw }}</span><br v-if="index < codeLines.length - 1" /></template></code></pre>
        <button class="code-copy-button absolute right-4 top-6 h-6 w-6 md:right-8 md:top-8" type="button" :aria-label="copied ? 'Copied to clipboard' : 'Copy code to clipboard'" @click="copyCode">
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

<style scoped>
.code-copy-button :deep(svg) {
    width: 1rem;
    height: 1.25rem;
}
</style>
