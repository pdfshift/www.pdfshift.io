/**
 * WebMCP integration.
 *
 * Exposes a handful of PDFShift's key actions (pricing lookup, plan estimation,
 * navigation and guide search) as in-page tools that browser AI agents can call
 * through the WebMCP API.
 *
 * The spec is still moving, so we register through a small shim that supports the
 * shapes seen in the wild, in order of preference:
 *   1. navigator.modelContext.provideContext({ tools })   (imperative batch API)
 *   2. navigator.modelContext.registerTool(tool, { signal })
 *   3. document.modelContext.registerTool(tool, { signal }) (current W3C draft)
 *
 * Docs: https://webmachinelearning.github.io/webmcp/
 *       https://developer.chrome.com/blog/webmcp-epp
 */

let registered = false

// Shape a tool result the way MCP clients expect: a human-readable text block,
// plus optional machine-readable structured content.
function toolResult (text, structured) {
    const result = {
        content: [{ type: 'text', text: typeof text === 'string' ? text : JSON.stringify(text) }]
    }
    if (structured !== undefined) {
        result.structuredContent = structured
    }
    return result
}

function toolError (message, structured) {
    return { ...toolResult(message, structured), isError: true }
}

// Key destinations the "navigate" tool can reach. External targets open in a new
// tab; internal ones go through the Vue router so the SPA doesn't do a full reload.
const DESTINATIONS = {
    home: { path: '/', label: 'Home' },
    features: { path: '/#features', label: 'Features' },
    pricing: { path: '/pricing', label: 'Pricing' },
    guides: { path: '/guides', label: 'Guides' },
    samples: { path: '/samples', label: 'Code samples' },
    faq: { path: '/faq', label: 'FAQ' },
    agents: { path: '/agents', label: 'AI agents' },
    contact: { path: '/contact', label: 'Contact' },
    register: { path: '/register', label: 'Register' },
    docs: { path: 'https://docs.pdfshift.io', label: 'API documentation', external: true },
    status: { path: 'https://status.pdfshift.io', label: 'Status page', external: true }
}

// Free tier isn't part of the paid pricing API, so we describe it statically.
const FREE_PLAN = { display: 'Free', name: 'free', credits: 50, price: 0, overage: null }

function buildTools (router) {
    return [
        {
            name: 'get_pricing',
            description: "Get PDFShift's current subscription plans and pricing (included credits, monthly/yearly price and per-credit overage rate). Data is fetched live from the public pricing API.",
            inputSchema: {
                type: 'object',
                properties: {
                    billing: {
                        type: 'string',
                        enum: ['monthly', 'yearly', 'all'],
                        description: 'Filter plans by billing period. Defaults to "monthly".'
                    }
                },
                additionalProperties: false
            },
            annotations: { readOnlyHint: true },
            async execute (input) {
                try {
                    const billing = (input && input.billing) || 'monthly'
                    const res = await $fetch(useApiEndpoint('/credits/pricing'))
                    let prices = (res && res.prices) || []
                    if (billing === 'monthly') prices = prices.filter(p => !p.yearly)
                    else if (billing === 'yearly') prices = prices.filter(p => p.yearly)

                    const lines = prices.map(p => `${p.display}: $${p.price}/${p.yearly ? 'year' : 'month'} — ${p.credits.toLocaleString('en-US')} credits, $${((p.overage || 0) / 100).toFixed(3)}/credit overage.`)
                    const text = lines.length
                        ? `PDFShift plans (${billing}):\n${lines.join('\n')}`
                        : 'No plans matched the requested billing period.'
                    return toolResult(text, { prices })
                } catch (e) {
                    return toolError('Unable to fetch pricing right now: ' + (e && e.message ? e.message : String(e)))
                }
            }
        },
        {
            name: 'estimate_plan',
            description: 'Recommend the most cost-effective PDFShift plan for a given number of documents (conversions) per month, and estimate the monthly and yearly cost. One credit is consumed per 5 MB of generated data.',
            inputSchema: {
                type: 'object',
                properties: {
                    documents: {
                        type: 'integer',
                        minimum: 1,
                        description: 'Estimated number of documents (credits) to convert per month.'
                    }
                },
                required: ['documents'],
                additionalProperties: false
            },
            annotations: { readOnlyHint: true },
            async execute (input) {
                try {
                    const documents = Number(input && input.documents)
                    if (!documents || documents < 1) {
                        return toolError('Please provide a positive "documents" count.')
                    }

                    if (documents <= FREE_PLAN.credits) {
                        return toolResult(
                            `The Free plan covers ${documents.toLocaleString('en-US')} documents/month (50 free credits, no credit card required).`,
                            { recommended: FREE_PLAN, documents }
                        )
                    }

                    const res = await $fetch(useApiEndpoint('/credits/pricing'))
                    const monthly = ((res && res.prices) || [])
                        .filter(p => !p.yearly)
                        .sort((a, b) => a.credits - b.credits)

                    const plan = monthly.find(p => p.credits >= documents)
                    if (!plan) {
                        return toolResult(
                            `For ${documents.toLocaleString('en-US')} documents/month you're above our standard plans — please contact us for a custom high-volume quote at https://pdfshift.io/contact.`,
                            { recommended: 'custom', documents }
                        )
                    }

                    const yearly = plan.price * 10 // Annual billing = 10 months for the price of 12.
                    const text = `For ${documents.toLocaleString('en-US')} documents/month we recommend the ${plan.display} plan: $${plan.price}/month (or $${yearly}/year, two months free), including ${plan.credits.toLocaleString('en-US')} credits with $${((plan.overage || 0) / 100).toFixed(3)}/credit overage beyond that.`
                    return toolResult(text, { recommended: plan, yearlyPrice: yearly, documents })
                } catch (e) {
                    return toolError('Unable to estimate a plan right now: ' + (e && e.message ? e.message : String(e)))
                }
            }
        },
        {
            name: 'navigate',
            description: 'Navigate the browser to a key PDFShift page (pricing, guides, docs, register, contact, ...).',
            inputSchema: {
                type: 'object',
                properties: {
                    destination: {
                        type: 'string',
                        enum: Object.keys(DESTINATIONS),
                        description: 'The page to open.'
                    }
                },
                required: ['destination'],
                additionalProperties: false
            },
            async execute (input) {
                const dest = input && input.destination
                const target = DESTINATIONS[dest]
                if (!target) {
                    return toolError(`Unknown destination "${dest}". Available: ${Object.keys(DESTINATIONS).join(', ')}.`)
                }
                if (target.external) {
                    window.open(target.path, '_blank', 'noopener')
                    return toolResult(`Opened ${target.label}: ${target.path}`)
                }
                router.push(target.path)
                return toolResult(`Navigated to ${target.label} (${target.path}).`)
            }
        },
        {
            name: 'search_guides',
            description: 'Search PDFShift how-to guides by keyword, optionally filtered by programming language. Returns matching guide titles and URLs.',
            inputSchema: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'Keywords to match against guide titles and descriptions.'
                    },
                    language: {
                        type: 'string',
                        description: 'Optional language filter: curl, python, node, php, ruby, go, java or csharp.'
                    },
                    limit: {
                        type: 'integer',
                        minimum: 1,
                        maximum: 25,
                        description: 'Maximum number of results to return (default 10).'
                    }
                },
                additionalProperties: false
            },
            annotations: { readOnlyHint: true },
            async execute (input) {
                try {
                    const query = ((input && input.query) || '').toLowerCase().trim()
                    const language = ((input && input.language) || '').toLowerCase().trim()
                    const limit = Math.min(Math.max(parseInt(input && input.limit) || 10, 1), 25)

                    let items = await queryContent('guides')
                        .only(['title', 'description', 'language', 'library', '_path'])
                        .find()

                    if (language) {
                        items = items.filter(i => (i.language || '').toLowerCase() === language || (i._path || '').toLowerCase().includes('/guides/' + language + '/'))
                    }
                    if (query) {
                        items = items.filter((i) => {
                            const haystack = `${i.title || ''} ${i.description || ''}`.toLowerCase()
                            return query.split(/\s+/).every(word => haystack.includes(word))
                        })
                    }

                    // Collapse the same topic across languages/libraries into one entry.
                    const seen = new Set()
                    const results = []
                    for (const i of items) {
                        const key = language ? i._path : (i.title || i._path)
                        if (seen.has(key)) continue
                        seen.add(key)
                        results.push({
                            title: i.title,
                            language: i.language,
                            url: 'https://pdfshift.io' + i._path,
                            description: i.description
                        })
                        if (results.length >= limit) break
                    }

                    if (!results.length) {
                        return toolResult('No guides matched your search.', { results: [] })
                    }
                    const lines = results.map(r => `- ${r.title}${r.language ? ` (${r.language})` : ''}: ${r.url}`)
                    return toolResult(`Found ${results.length} guide(s):\n${lines.join('\n')}`, { results })
                } catch (e) {
                    return toolError('Unable to search guides right now: ' + (e && e.message ? e.message : String(e)))
                }
            }
        }
    ]
}

// Register the tools against whichever WebMCP surface the browser exposes.
function provideTools (tools) {
    const ctx = (typeof navigator !== 'undefined' && navigator.modelContext) ||
                (typeof document !== 'undefined' && document.modelContext) ||
                null
    if (!ctx) return false

    // Preferred: batch imperative API (Chrome EPP / WebMCP polyfill).
    if (typeof ctx.provideContext === 'function') {
        ctx.provideContext({ tools })
        return true
    }

    // Fallback: per-tool registration (current W3C draft). The abort signal lets
    // the tools be torn down together if we ever need to.
    if (typeof ctx.registerTool === 'function') {
        const controller = new AbortController()
        for (const tool of tools) {
            try {
                ctx.registerTool(tool, { signal: controller.signal })
            } catch (e) {
                console.error('[webmcp] Failed to register tool "' + tool.name + '":', e)
            }
        }
        return true
    }

    return false
}

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()

    nuxtApp.hook('app:mounted', () => {
        if (registered) return
        try {
            if (provideTools(buildTools(router))) {
                registered = true
            }
        } catch (e) {
            // Never let the WebMCP integration break the page.
            console.error('[webmcp] Setup failed:', e)
        }
    })
})
