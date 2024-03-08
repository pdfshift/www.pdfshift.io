
<template>
    <div class="relative">
        <pre :class="classes"><code v-html="encoded" /></pre>
        <div class="copy-action" @click="copyCode">
            <a href="javascript:;" title="Copy this code" class="tooltip" aria-label="Copied!" :class="{'tooltip--active': isCopied}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    code: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: null
    },
    filename: {
        type: String,
        default: null
    },
    highlights: {
        type: Array,
        default: () => []
    },
    meta: {
        type: String,
        default: null
    },
    class: {
        type: String,
        default: null
    }
})

const isCopied = ref(false)

function copyToClipboard (text) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text).then(
                () => {
                    resolve()
                },
                reject
            )
        }

        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            if (successful) {
                resolve()
            }
            else reject('Unable to copy the text')
        } catch (err) {
            reject(err)
        }

        document.body.removeChild(textArea);
        return
    })
}

const copyCode = async () => {
    await copyToClipboard(props.code)
    isCopied.value = true
    setTimeout(() => isCopied.value = false, 2000)
}

const classes = computed(() => {
    return [
        'hljs',
        props.language ? `language-${props.language}` : ''
    ]
})

const encoded = computed(() => {
    if (props.language) return hljs(props.code, props.language)
    return props.code
})
</script>

<style>
pre code .line { display: block }

.copy-action {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    padding: 0.5rem;
    transition: top 0.2s ease-in-out;
    cursor: pointer
}

.copy-action:hover {
    top: 0.25rem;
}

.tooltip {
    cursor: pointer;
    position: relative;
}

.tooltip::before {
    position: absolute;
    top: -80px;
    left: -80px;
    background-color: #2B222A;
    border-radius: 5px;
    color: #fff;
    content: attr(aria-label);
    padding: 1rem;
    text-transform: none;
    transition: all 0.5s ease;
    width: 160px;
}

.tooltip::after {
    position: absolute;
    top: -12px;
    left: 9px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #2B222A;
    content: " ";
    font-size: 0;
    line-height: 0;
    margin-left: -5px;
    width: 0;
}

.tooltip::before,
.tooltip::after {
    color: #efefef;
    font-family: monospace;
    font-size: 16px;
    opacity: 0;
    pointer-events: none;
    text-align: center;
}

.tooltip--active::before,
.tooltip--active::after,
.tooltip--active::before,
.tooltip--active::after {
    opacity: 1;
    transition: all 0.75s ease;
}
</style>
