<template>
    <div>
        <!-- Free tool: the browser sends the address to the PDFShift API (no key) and shows the PDF it returns. The text under it lives in content/tools/url-to-pdf.md -->
        <NuxtLayout name="default">
            <div class="max-w-6xl mx-auto">
                <NuxtLink to="/tools/" class="text-navy-700 inline-flex items-center gap-2">
                    <span class="rotate-180 w-4 relative ml-1.5">
                        <IconsArrowRight />
                    </span>
                    <span class="hover:underline">All free tools</span>
                </NuxtLink>

                <h1 class="h1 mt-6">{{ data.title }}</h1>
                <p class="mt-3 text-lg text-gray-600">{{ data.lead }}</p>

                <section class="mt-8 rounded-lg bg-white shadow-lg p-4 md:p-6" aria-label="Webpage to PDF converter">
                    <div v-if="!enabled" class="py-10 text-center text-navy-700">
                        We've paused the converter for now. You can still convert any page with the
                        <NuxtLink to="/register/" class="text-purple hover:underline">PDFShift API</NuxtLink>.
                    </div>

                    <div v-else class="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 lg:gap-0">
                        <!-- Settings -->
                        <form class="flex flex-col min-w-0 lg:pr-6 lg:border-r lg:border-gray-200" novalidate @submit.prevent="convert">
                            <label for="page-url" class="font-bold text-navy-700">Web address</label>
                            <input
                                id="page-url"
                                v-model="url"
                                type="url"
                                inputmode="url"
                                autocomplete="url"
                                autocapitalize="off"
                                spellcheck="false"
                                maxlength="2048"
                                class="mt-2 w-full min-h-[44px] rounded-lg border bg-purple-100/40 px-3 text-navy-700 focus:outline-none"
                                :class="urlError ? 'border-orange' : 'border-gray-200 focus:border-purple'"
                                :aria-invalid="!!urlError"
                                aria-describedby="page-url-error"
                                @input="urlError = ''"
                            />
                            <p id="page-url-error" class="mt-1 min-h-[1.5rem] text-sm text-navy-700" aria-live="polite">{{ urlError }}</p>

                            <span id="format-label" class="mt-2 font-bold text-navy-700">Page size</span>
                            <div class="mt-2 inline-flex self-start rounded-lg border border-gray-200 p-1" role="group" aria-labelledby="format-label">
                                <button
                                    v-for="option in formats"
                                    :key="option"
                                    type="button"
                                    class="min-h-[44px] px-4 rounded-md text-sm transition-colors"
                                    :class="format === option ? 'bg-purple text-white' : 'text-navy-700 hover:bg-purple-100'"
                                    :aria-pressed="format === option"
                                    @click="format = option"
                                >
                                    {{ option }}
                                </button>
                            </div>

                            <fieldset class="mt-4">
                                <legend class="font-bold text-navy-700">Options</legend>
                                <label v-for="option in toggles" :key="option.key" class="mt-1 flex items-center gap-3 min-h-[44px] cursor-pointer text-navy-700">
                                    <input v-model="flags[option.key]" type="checkbox" class="h-4 w-4 accent-purple shrink-0" />
                                    <span>{{ option.label }} <code class="text-sm text-gray-600">{{ option.param }}</code></span>
                                </label>
                            </fieldset>

                            <button
                                type="submit"
                                class="mt-6 min-h-[48px] w-full rounded-lg bg-purple px-6 font-bold text-white transition-colors hover:bg-purple-900 disabled:opacity-60 disabled:cursor-wait"
                                :disabled="state === 'loading'"
                            >
                                {{ state === 'loading' ? 'Converting…' : 'Convert to PDF' }}
                            </button>
                        </form>

                        <!-- Result -->
                        <div class="flex flex-col min-w-0 lg:pl-6">
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <div class="flex items-center gap-3">
                                    <span id="result-label" class="font-bold text-navy-700">Result</span>
                                    <span v-if="badge" class="rounded-full px-2.5 py-0.5 text-xs font-medium" :class="badge.class">{{ badge.text }}</span>
                                </div>
                                <div class="inline-flex rounded-lg border border-gray-200 p-1" role="group" aria-label="Result view">
                                    <button
                                        v-for="option in tabs"
                                        :key="option.id"
                                        type="button"
                                        class="min-h-[44px] px-3 rounded-md text-sm transition-colors"
                                        :class="tab === option.id ? 'bg-purple text-white' : 'text-navy-700 hover:bg-purple-100'"
                                        :aria-pressed="tab === option.id"
                                        @click="tab = option.id"
                                    >
                                        {{ option.label }}
                                    </button>
                                </div>
                            </div>

                            <div v-if="tab === 'pdf'" class="mt-3 flex flex-col">
                                <div class="rounded-lg border border-gray-200 overflow-hidden bg-gray-200/40" :class="pdfUrl ? 'md:h-[32rem]' : 'h-48 md:h-[32rem]'">
                                    <iframe v-if="pdfUrl" :src="pdfUrl" title="PDF preview" aria-labelledby="result-label" class="hidden md:block w-full h-full border-0 bg-white" />
                                    <div v-if="!pdfUrl" class="h-full flex items-center justify-center p-6 text-center text-navy-700" aria-live="polite">
                                        <span v-if="state === 'loading'">Loading {{ host }} in Chromium…</span>
                                        <span v-else-if="state === 'error'">{{ errorText }}</span>
                                        <span v-else>Your PDF will appear here.</span>
                                    </div>
                                    <div v-if="pdfUrl" class="md:hidden p-4 text-navy-700">{{ summary }}</div>
                                </div>
                                <div v-if="pdfUrl" class="mt-3 flex flex-wrap items-center gap-3">
                                    <a :href="pdfUrl" :download="fileName" class="tool-btn inline-flex items-center">Download PDF</a>
                                    <a :href="pdfUrl" target="_blank" rel="noopener" class="tool-btn inline-flex items-center">Open in a new tab</a>
                                    <span class="hidden md:inline text-sm text-gray-600">{{ summary }}</span>
                                </div>
                            </div>

                            <div v-else class="mt-3 flex flex-col">
                                <pre class="rounded-lg bg-navy-700 p-4 text-sm text-white overflow-x-auto"><code>{{ curl }}</code></pre>
                                <div class="mt-3 flex flex-wrap items-center gap-3">
                                    <button type="button" class="tool-btn" @click="copyCurl">{{ copied ? 'Copied' : 'Copy' }}</button>
                                    <NuxtLink to="/register/" class="tool-btn inline-flex items-center">Get a free API key</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <article class="mt-12 max-w-3xl mx-auto articles overflow-x-clip">
                    <ContentRenderer :value="data">
                        <ContentRendererMarkdown :value="data" />
                    </ContentRenderer>
                </article>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const path = '/tools/url-to-pdf'
const { data } = await useAsyncData(path, () => queryContent().where({ _path: path }).findOne())

// Kill switch: build with NUXT_PUBLIC_URL_TO_PDF_TOOL=off and the converter shows a paused message instead
const config = useRuntimeConfig()
const enabled = config.public.urlToPdfTool !== 'off'

const API = 'https://api.pdfshift.io/v3/convert/pdf'
const TIMEOUT_MS = 60_000
const SAMPLE_URL = 'https://en.wikipedia.org/wiki/PDF'
const formats = ['A4', 'Letter', 'Legal']
const toggles = [
    { key: 'use_print', label: 'Print stylesheet', param: 'use_print' },
    { key: 'landscape', label: 'Landscape', param: 'landscape' },
    { key: 'lazy_load_images', label: 'Load lazy images', param: 'lazy_load_images' }
]
const tabs = [
    { id: 'pdf', label: 'PDF' },
    { id: 'code', label: 'API call' }
]

const route = useRoute()
const router = useRouter()

const url = ref(SAMPLE_URL)
const format = ref('A4')
const flags = reactive({ use_print: false, landscape: false, lazy_load_images: false })
const tab = ref('pdf')
const state = ref('idle')
const urlError = ref('')
const errorText = ref('')
const pdfUrl = ref('')
const pages = ref(0)
const bytes = ref(0)
const host = ref('')
const copied = ref(false)

// Turns what was typed into an absolute http(s) URL, or returns an error message that says how to fix it
const PRIVATE_V4 = [/^0\./, /^10\./, /^127\./, /^169\.254\./, /^172\.(1[6-9]|2\d|3[01])\./, /^192\.168\./, /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./]
const checkUrl = (raw) => {
    const text = raw.trim()
    if (!text) return { error: 'Enter the address of the page, like https://example.com/pricing.' }
    const malformed = { error: 'That isn\'t a full web address. Check it and include the domain, like https://example.com.' }
    if (/\s/.test(text)) return malformed
    let parsed
    try {
        parsed = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(text) ? text : `https://${text}`)
    } catch {
        return malformed
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) return { error: 'Use an address that starts with https:// or http://.' }
    const name = parsed.hostname.toLowerCase()
    const isPrivate = name === 'localhost' || /\.(localhost|local|internal|lan|home)$/.test(name) ||
        name.startsWith('[') || PRIVATE_V4.some(range => range.test(name))
    if (!isPrivate && !name.includes('.')) return malformed
    if (isPrivate) return { error: 'This address only works on your own network. Use a page anyone on the internet can open.' }
    return { url: parsed.href, host: name }
}

const options = computed(() => {
    const body = {}
    if (format.value !== 'A4') body.format = format.value
    for (const option of toggles) if (flags[option.key]) body[option.key] = true
    return body
})

const shellQuote = (value) => `'${value.replace(/'/g, `'\\''`)}'`
const curl = computed(() => {
    const checked = checkUrl(url.value)
    const body = JSON.stringify({ source: checked.url || url.value.trim() || SAMPLE_URL, ...options.value }, null, 2).replace(/\n/g, '\n  ')
    return [
        `curl ${API} \\`,
        '  -H "X-API-Key: YOUR_API_KEY" \\',
        '  -H "Content-Type: application/json" \\',
        `  -d ${shellQuote(body)} \\`,
        '  -o page.pdf'
    ].join('\n')
})

const badge = computed(() => ({
    loading: { text: 'Converting', class: 'bg-purple-100 text-purple' },
    done: { text: 'Ready', class: 'bg-green/20 text-navy-700' },
    error: { text: 'Not converted', class: 'bg-gray-200 text-navy-700' }
})[state.value])

const summary = computed(() => {
    const size = bytes.value >= 1_000_000 ? `${(bytes.value / 1_000_000).toFixed(2)} MB` : `${Math.max(1, Math.round(bytes.value / 1000))} KB`
    return `${pages.value} ${pages.value === 1 ? 'page' : 'pages'}, ${size}, ${format.value}${flags.landscape ? ' landscape' : ''}`
})
const fileName = computed(() => `${(host.value || 'page').replace(/[^a-z0-9.-]/gi, '-')}.pdf`)

// One tool_run event per result. Only the slug is sent, never the address or the file.
const track = () => {
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
        window.plausible('tool_run', { props: { slug: 'url-to-pdf' } })
    }
}

const setPdf = (blob) => {
    if (pdfUrl.value) URL.revokeObjectURL(pdfUrl.value)
    pdfUrl.value = blob ? URL.createObjectURL(blob) : ''
}

const errorFrom = async (response) => {
    let message = ''
    try {
        const body = await response.json()
        message = typeof body.error === 'string' ? body.error : (body.errors ? Object.values(body.errors).flat().join(' ') : '')
    } catch { /* not JSON */ }
    if (response.status === 429) return 'Too many conversions for now. Try again later, or copy the API call and run it with your own key.'
    return message ? `PDFShift couldn't convert this page: ${message}` : `PDFShift couldn't convert this page (error ${response.status}). Check that it opens in a browser, then try again.`
}

let controller = null
const convert = async () => {
    if (state.value === 'loading') return
    const checked = checkUrl(url.value)
    if (checked.error) {
        urlError.value = checked.error
        return
    }
    urlError.value = ''
    url.value = checked.url
    host.value = checked.host
    tab.value = 'pdf'
    state.value = 'loading'
    setPdf(null)

    controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: checked.url, ...options.value }),
            signal: controller.signal
        })
        if (!response.ok) {
            errorText.value = await errorFrom(response)
            state.value = 'error'
            return
        }
        const buffer = await response.arrayBuffer()
        const head = new TextDecoder().decode(buffer.slice(0, 5))
        if (head !== '%PDF-') {
            errorText.value = 'PDFShift answered, but not with a PDF. Try again in a moment.'
            state.value = 'error'
            return
        }
        bytes.value = buffer.byteLength
        pages.value = (new TextDecoder('latin1').decode(buffer).match(/\/Type\s*\/Page[^s]/g) || []).length
        setPdf(new Blob([buffer], { type: 'application/pdf' }))
        state.value = 'done'
        track()
        router.replace({ path: '/tools/url-to-pdf/', query: { url: checked.url, ...Object.fromEntries(Object.entries(options.value).map(([key, value]) => [key, String(value)])) } })
    } catch (error) {
        errorText.value = error?.name === 'AbortError'
            ? 'No PDF after a minute, so we stopped waiting. Try again, or try a lighter page.'
            : 'Couldn\'t reach PDFShift. Check your connection and try again.'
        state.value = 'error'
    } finally {
        clearTimeout(timer)
        controller = null
    }
}

const copyCurl = async () => {
    try {
        await navigator.clipboard.writeText(curl.value)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch { /* clipboard blocked: the text stays selectable */ }
}

// A shared link (?url=...&use_print=true) fills the form; it doesn't convert until the visitor clicks
onMounted(() => {
    if (typeof route.query.url === 'string') url.value = route.query.url.slice(0, 2048)
    if (formats.includes(route.query.format)) format.value = route.query.format
    for (const option of toggles) flags[option.key] = route.query[option.key] === 'true'
})
onBeforeUnmount(() => {
    controller?.abort()
    setPdf(null)
})

useSeoMeta({
    title: data.value.seoTitle,
    description: data.value.description,
    ogTitle: data.value.seoTitle,
    ogDescription: data.value.description,
    twitterTitle: data.value.seoTitle,
    twitterDescription: data.value.description
})

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": data.value.title,
                "description": data.value.description,
                "url": siteUrl(path),
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Any (runs in the browser)",
                "browserRequirements": "Requires JavaScript",
                "isAccessibleForFree": true,
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "publisher": { "@type": "Organization", "@id": "https://pdfshift.io/#organization", "name": "PDFShift" },
                "dateModified": data.value.dateModified,
                "inLanguage": "en-US"
            })
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { name: 'Home', item: 'https://pdfshift.io' },
                    { name: 'Free tools', item: siteUrl('/tools') },
                    { name: data.value.title, item: siteUrl(path) }
                ].map((crumb, index) => ({ "@type": "ListItem", "position": index + 1, ...crumb }))
            })
        },
        ...(data.value.faq?.length ? [{
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": data.value.faq.map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
                }))
            })
        }] : [])
    ]
})
</script>

<style scoped>
.tool-btn {
    @apply min-h-[44px] px-4 rounded-lg border border-purple text-purple text-sm font-medium transition-colors hover:bg-purple hover:text-white;
}
</style>
