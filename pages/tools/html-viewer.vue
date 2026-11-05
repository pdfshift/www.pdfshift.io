<template>
    <div>
        <!-- Free tool: the viewer runs entirely in the browser. The text under it lives in content/tools/html-viewer.md -->
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

                <section class="mt-8 rounded-lg bg-white shadow-lg p-4 md:p-6" aria-label="HTML viewer">
                    <div class="grid lg:grid-cols-2 gap-6">
                        <!-- Editor -->
                        <div class="flex flex-col min-w-0">
                            <label for="html-input" class="font-bold text-navy-700">HTML</label>
                            <textarea
                                id="html-input"
                                v-model="html"
                                class="mt-2 w-full h-80 lg:h-[34rem] rounded-lg border border-gray-200 bg-purple-100/40 p-3 font-code text-sm text-navy-700 resize-y focus:outline-none focus:border-purple"
                                spellcheck="false"
                                autocapitalize="off"
                                autocomplete="off"
                                aria-describedby="html-status"
                                @input="markUsed"
                            />
                            <div class="mt-3 flex flex-wrap gap-2">
                                <button type="button" class="tool-btn" @click="pickFile">Open file</button>
                                <button type="button" class="tool-btn" @click="loadSample">Load sample</button>
                                <button type="button" class="tool-btn" @click="clearInput">Clear</button>
                                <input ref="fileInput" type="file" accept=".html,.htm,.txt,text/html,text/plain" class="hidden" @change="openFile" />
                            </div>
                            <p id="html-status" class="mt-2 min-h-[1.5rem] text-sm text-gray-600" aria-live="polite">{{ status }}</p>
                        </div>

                        <!-- Preview -->
                        <div class="flex flex-col min-w-0">
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <span id="preview-label" class="font-bold text-navy-700">Preview</span>
                                <div class="inline-flex rounded-lg border border-gray-200 p-1" role="group" aria-label="Preview width">
                                    <button
                                        v-for="option in views"
                                        :key="option.id"
                                        type="button"
                                        class="min-h-[44px] px-3 rounded-md text-sm transition-colors"
                                        :class="view === option.id ? 'bg-purple text-white' : 'text-navy-700 hover:bg-purple-100'"
                                        :aria-pressed="view === option.id"
                                        @click="view = option.id"
                                    >
                                        {{ option.label }}
                                    </button>
                                </div>
                            </div>
                            <div class="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-navy-700">
                                <label class="inline-flex items-center gap-2 min-h-[44px] cursor-pointer">
                                    <input v-model="runScripts" type="checkbox" class="h-4 w-4 accent-purple" />
                                    Run JavaScript
                                </label>
                                <label class="inline-flex items-center gap-2 min-h-[44px] cursor-pointer">
                                    <input v-model="printCss" type="checkbox" class="h-4 w-4 accent-purple" />
                                    Print CSS
                                </label>
                            </div>

                            <div
                                ref="stage"
                                class="mt-2 rounded-lg border border-gray-200 overflow-hidden"
                                :class="view === 'desktop' ? 'bg-white' : 'bg-gray-200/60 py-4'"
                                :style="{ height: `${stageHeight}px` }"
                            >
                                <div
                                    v-if="hasContent"
                                    class="mx-auto origin-top-left bg-white"
                                    :class="view === 'desktop' ? '' : 'shadow-lg'"
                                    :style="frameBoxStyle"
                                >
                                    <iframe
                                        :key="sandbox"
                                        :srcdoc="renderedHtml"
                                        :sandbox="sandbox"
                                        title="Rendered HTML preview"
                                        aria-labelledby="preview-label"
                                        class="block w-full h-full border-0 bg-white"
                                    />
                                </div>
                                <div v-else class="h-full flex items-center justify-center p-6 text-center text-gray-600">
                                    Paste or open HTML to see it here.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <article class="mt-12 max-w-3xl mx-auto articles">
                    <ContentRenderer :value="data">
                        <ContentRendererMarkdown :value="data" />
                    </ContentRenderer>
                </article>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const path = '/tools/html-viewer'
const { data } = await useAsyncData(path, () => queryContent().where({ _path: path }).findOne())

// Above this the preview stops updating, so a huge paste can't freeze the tab. The text is kept.
const MAX_CHARS = 2_000_000
// A4 is 210 mm wide; 1in = 25.4 mm = 96 CSS px, so 210 mm = 793.7 px
const views = [
    { id: 'desktop', label: 'Desktop', width: null },
    { id: 'phone', label: 'Phone', width: 390 },
    { id: 'a4', label: 'A4 page', width: 794 }
]

const SAMPLE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Invoice INV-2026-014</title>
<style>
  body { font-family: Helvetica, Arial, sans-serif; color: #1f2937; margin: 0; padding: 32px; }
  nav { display: flex; gap: 16px; padding: 12px 16px; background: #0A0C3D; border-radius: 8px; margin-bottom: 24px; }
  nav a { color: #fff; text-decoration: none; font-size: 14px; }
  header { display: flex; justify-content: space-between; align-items: flex-start; }
  h1 { font-size: 28px; margin: 0 0 4px; }
  .muted { color: #6b7280; font-size: 14px; }
  table { width: 100%; border-collapse: collapse; margin-top: 24px; }
  th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
  th:last-child, td:last-child { text-align: right; }
  .total td { font-weight: bold; border-bottom: none; }
  .pay { display: inline-block; margin-top: 24px; padding: 12px 20px; background: #6C47FF; color: #fff; border-radius: 8px; text-decoration: none; }
  @media print {
    nav, .pay { display: none; }
    body { padding: 0; }
  }
</style>
</head>
<body>
<nav><a href="#">Dashboard</a><a href="#">Invoices</a><a href="#">Settings</a></nav>
<header>
  <div>
    <h1>Invoice</h1>
    <div class="muted">INV-2026-014 · Due December 5, 2026</div>
  </div>
  <div class="muted" style="text-align:right">Acme Studio<br>12 Rue Example, Paris</div>
</header>
<table>
  <thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead>
  <tbody>
    <tr><td>Website redesign</td><td>1</td><td>$2,400.00</td></tr>
    <tr><td>Hosting, 12 months</td><td>1</td><td>$240.00</td></tr>
    <tr><td>Support hours</td><td>6</td><td>$540.00</td></tr>
    <tr class="total"><td>Total</td><td></td><td>$3,180.00</td></tr>
  </tbody>
</table>
<a class="pay" href="#">Pay online</a>
</body>
</html>`

const html = ref(SAMPLE)
const view = ref('desktop')
const runScripts = ref(false)
const printCss = ref(false)
const status = ref('')
const fileInput = ref(null)
const stage = ref(null)
const stageWidth = ref(0)
const debouncedHtml = ref(SAMPLE)

const stageHeight = 560
const hasContent = computed(() => debouncedHtml.value.trim().length > 0)
const tooLarge = computed(() => html.value.length > MAX_CHARS)

// Update the preview shortly after typing stops, and never for input over the size limit
let timer = null
watch(html, (value) => {
    clearTimeout(timer)
    if (value.length > MAX_CHARS) {
        status.value = 'This HTML is over 2 MB, too large to preview here. Your text is kept; shorten it to see the preview.'
        return
    }
    if (status.value.startsWith('This HTML is over 2 MB')) status.value = ''
    timer = setTimeout(() => { debouncedHtml.value = value }, 250)
})

// With Print CSS on, the HTML's print rules apply and its screen-only rules don't, as when a browser prints it
const applyPrintCss = (source) => source
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, block => block.replace(/@media\s+(only\s+)?(print|screen)\b/gi, (_m, _only, media) => media.toLowerCase() === 'print' ? '@media all' : '@media print'))
    .replace(/<(link|style)\b[^>]*>/gi, tag => tag.replace(/\bmedia\s*=\s*(["'])\s*(print|screen)\s*\1/gi, (_m, quote, media) => `media=${quote}${media.toLowerCase() === 'print' ? 'all' : 'print'}${quote}`))

const renderedHtml = computed(() => printCss.value ? applyPrintCss(debouncedHtml.value) : debouncedHtml.value)

// Empty sandbox: no scripts, no forms, no popups, no top navigation, and a unique origin with no access to this site
const sandbox = computed(() => runScripts.value ? 'allow-scripts' : '')

const frameWidth = computed(() => views.find(option => option.id === view.value).width)
const frameBoxStyle = computed(() => {
    if (!frameWidth.value) return { width: '100%', height: '100%' }
    const available = Math.max(stageWidth.value - 32, 1)
    const scale = Math.min(1, available / frameWidth.value)
    const innerHeight = (stageHeight - 32) / scale
    return {
        width: `${frameWidth.value}px`,
        height: `${innerHeight}px`,
        transform: `scale(${scale})`,
        marginLeft: `${Math.max((stageWidth.value - frameWidth.value * scale) / 2, 0)}px`,
        marginRight: 0
    }
})

// One tool_run event per page view, the first time a visitor renders their own HTML. No input or result is sent.
let tracked = false
const markUsed = () => {
    if (tracked) return
    tracked = true
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
        window.plausible('tool_run', { props: { slug: 'html-viewer' } })
    }
}

const pickFile = () => fileInput.value?.click()

const openFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > MAX_CHARS) {
        status.value = `${file.name} is over 2 MB, too large to preview here. Pick a smaller .html file.`
        return
    }
    let text
    try {
        text = await file.text()
    } catch {
        status.value = `Couldn't read ${file.name}. Try opening it again.`
        return
    }
    if (text.includes('\u0000')) {
        status.value = `${file.name} isn't a text file. Pick an .html or .htm file.`
        return
    }
    html.value = text
    status.value = `Opened ${file.name}.`
    markUsed()
}

const loadSample = () => {
    html.value = SAMPLE
    status.value = ''
}

const clearInput = () => {
    html.value = ''
    status.value = ''
}

let observer = null
onMounted(() => {
    stageWidth.value = stage.value?.clientWidth || 0
    observer = new ResizeObserver(entries => { stageWidth.value = entries[0].contentRect.width })
    if (stage.value) observer.observe(stage.value)
})
onBeforeUnmount(() => {
    observer?.disconnect()
    clearTimeout(timer)
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
        }
    ]
})
</script>

<style scoped>
.tool-btn {
    @apply min-h-[44px] px-4 rounded-lg border border-purple text-purple text-sm font-medium transition-colors hover:bg-purple hover:text-white;
}
</style>
