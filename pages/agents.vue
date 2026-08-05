<template>
    <div class="agents-page">
        <Header :fixed="true" />

        <main class="agents-main">
            <section class="agents-hero" aria-labelledby="agents-title">
                <div class="agents-hero-copy">
                    <h1 id="agents-title">
                        PDFSHIFT for <span>AI Agents<br />&amp; Automation Tools</span>
                    </h1>
                    <p>
                        Powerful PDF generation for your automated workflows. Convert HTML to PDF seamlessly in your favorite automation tools and AI agents.
                    </p>
                    <NuxtLink class="agents-button agents-button-primary" to="#integrations">
                        Explore Integrations
                        <IconsArrowRight class="rotate-90" />
                    </NuxtLink>
                </div>
            </section>

            <section class="why-section" aria-labelledby="why-title">
                <h2 id="why-title" class="section-title">
                    Why Choose <span>PDFShift</span> for Automation
                </h2>
                <div class="feature-grid">
                    <article v-for="feature in features" :key="feature.title" class="feature-card">
                        <div class="feature-card-inner">
                            <span class="feature-icon" aria-hidden="true">
                                <component :is="feature.icon" />
                            </span>
                            <div class="feature-copy">
                                <h3>{{ feature.title }}</h3>
                                <p>{{ feature.description }}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section id="integrations" class="integrations-section" aria-labelledby="integrations-title">
                <div class="integrations-inner">
                    <h2 id="integrations-title" class="section-title section-title-light">
                        Popular <span>Integrations</span> for PDFShift
                    </h2>
                    <p class="section-intro section-intro-light">
                        Connect PDFShift with your favorite tools and start automating PDF generation today
                    </p>

                    <div class="integration-grid">
                        <article v-for="integration in integrations" :key="integration.name" class="integration-card">
                            <div class="integration-heading">
                                <div class="integration-icon" :class="integration.iconClass">
                                    <img v-if="integration.icon" :src="integration.icon" alt="" />
                                    <span v-else>{{ integration.short }}</span>
                                </div>
                                <h3>{{ integration.name }}</h3>
                            </div>
                            <p>Create Zaps that automatically generate PDFs from your triggers and data</p>
                            <NuxtLink class="learn-link" :to="integration.href">
                                Learn more <IconsArrowRight />
                            </NuxtLink>
                        </article>

                        <NuxtLink class="integration-card suggestion-card" to="/contact">
                            <svg class="suggestion-card-border" aria-hidden="true">
                                <rect />
                            </svg>
                            <h3>Suggest an integration</h3>
                            <p>Got any interesting integration in mind and can’t find it in the list above? Suggest yours here</p>
                        </NuxtLink>
                    </div>
                </div>
            </section>

            <section class="build-section" aria-labelledby="build-title">
                <div class="build-shell">
                    <div class="title-block build-title-block">
                        <h2 id="build-title" class="section-title">What you can <span>Build</span></h2>
                        <p class="section-intro">Real-world use cases for automated PDF generation</p>
                    </div>

                    <div class="use-case-grid">
                        <article v-for="useCase in useCases" :key="useCase.title" class="small-card">
                            <div>
                                <h3>{{ useCase.title }}</h3>
                                <p>{{ useCase.description }}</p>
                            </div>
                        </article>
                    </div>

                    <div class="how-card">
                        <h2 class="section-title">How it works</h2>
                        <div class="steps-grid">
                            <article v-for="(step, index) in steps" :key="step.title" class="step-card">
                                <span class="step-number">{{ index + 1 }}</span>
                                <h3>{{ step.title }}</h3>
                                <p>{{ step.description }}</p>
                            </article>
                        </div>
                    </div>

                    <div class="resources-block">
                        <div class="title-block resources-title-block">
                            <h2 class="section-title">Developer <span>Resources</span></h2>
                            <p class="section-intro">
                                Read through our existing documentation and guides to speed-up your installation process with your agents and our integrations with your favorite tools
                            </p>
                        </div>

                        <div class="resource-grid">
                            <article v-for="resource in resources" :key="resource.title" class="resource-card">
                                <h3>{{ resource.title }}</h3>
                                <p>{{ resource.description }}</p>
                                <div class="resource-illustration">
                                    <img :src="resource.image" :alt="resource.imageAlt" />
                                </div>
                                <NuxtLink class="agents-button agents-button-primary" :to="resource.href">
                                    {{ resource.cta }} <IconsArrowRight />
                                </NuxtLink>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <div class="cta-bridge" aria-hidden="true"></div>

            <section class="bottom-cta" aria-labelledby="bottom-cta-title">
                <div>
                    <h2 id="bottom-cta-title">Start <span>Automating</span> today</h2>
                    <p>Get your free API key and start converting<br />HTML to PDF in your workflows</p>
                    <div class="bottom-cta-actions">
                        <NuxtLink class="agents-button agents-button-primary" to="/register">
                            Get your Free API key <IconsArrowRight />
                        </NuxtLink>
                        <NuxtLink class="agents-button agents-button-light" to="https://docs.pdfshift.io">
                            Read the Documentation <IconsArrowRight />
                        </NuxtLink>
                    </div>
                </div>
            </section>
        </main>

        <footer class="agents-footer">
            <div class="agents-footer-grid">
                <div class="footer-brand">
                    <NuxtLink to="/" class="footer-logo" title="Go to the home page">
                        <IconsLogo />
                    </NuxtLink>
                    <div class="footer-socials">
                        <NuxtLink to="https://twitter.com/pdfshift" title="View our X profile"><LogosX /></NuxtLink>
                        <NuxtLink to="https://linkedin.com/company/pdfshift" title="View our LinkedIn profile"><LogosLinkedin /></NuxtLink>
                    </div>
                    <p>© 2023 PDFShift.</p>
                </div>

                <div v-for="column in footerColumns" :key="column.title" class="footer-column">
                    <h2>{{ column.title }}</h2>
                    <ul>
                        <li v-for="link in column.links" :key="link.label">
                            <NuxtLink :to="link.href">{{ link.label }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import ApiFirstIcon from '~/components/icons/BarGraphUp.vue'
import NoCodeIcon from '~/components/icons/ClipboardTick.vue'
import AsyncIcon from '~/components/icons/People.vue'
import ReliableIcon from '~/components/icons/TimerPaused.vue'

definePageMeta({ layout: false })

const features = [
    {
        title: 'No Code Required',
        description: 'Use visual builders and drag-and-drop interfaces. No programming knowledge needed.',
        icon: NoCodeIcon,
    },
    {
        title: 'API First',
        description: 'RESTful API that works with any automation tool or AI agent framework.',
        icon: ApiFirstIcon,
    },
    {
        title: 'Always Reliable',
        description: '99.99% uptime guarantee. Your workflows run smoothly without interruptions.',
        icon: ReliableIcon,
    },
    {
        title: 'Async Processing',
        description: 'Webhook support for large jobs. Process documents in the background efficiently.',
        icon: AsyncIcon,
    },
]

const integrations = [
    { name: 'N8N', icon: '/images/agents/n8n.svg', iconClass: 'n8n-icon', href: '/guides/' },
    { name: 'Zapier', icon: '/images/agents/zapier.png', iconClass: 'zapier-icon', href: '/guides/' },
    { name: 'Make', icon: '/images/agents/make.svg', iconClass: 'make-icon', href: '/guides/' },
    { name: 'MCP', short: 'MCP', iconClass: 'mcp-icon', href: 'https://docs.pdfshift.io' },
    { name: 'Clay', icon: '/images/agents/clay.png', iconClass: 'clay-icon', href: '/guides/' },
    { name: 'Bubble', icon: '/images/agents/bubble.svg', iconClass: 'bubble-icon', href: '/guides/' },
    { name: 'FlowMattic', icon: '/images/agents/flowmattic.png', iconClass: 'flowmattic-icon', href: '/guides/' },
]

const useCases = [
    { title: 'Invoice Generation', description: 'Automatically generate invoices from payment webhooks and send them to customers.' },
    { title: 'Report Creation', description: 'Create beautiful reports from spreadsheet data, databases, or APIs automatically.' },
    { title: 'Contract Automation', description: 'Generate personalized contracts and agreements from templates with data from your CRM.' },
    { title: 'E-Commerce Receipts', description: 'Generate and email receipts automatically when orders are placed in your store.' },
    { title: 'Document Archiving', description: 'Archive web pages, emails, or documents as PDFs to cloud storage automatically.' },
    { title: 'Multi-Language Docs', description: 'Generate documents in multiple languages automatically based on user preferences.' },
]

const steps = [
    { title: 'Connect your tool', description: 'Link your automation tool to PDFShift using our REST API with your API key.' },
    { title: 'Configure options', description: 'Set your HTML source, filename, and PDF options like margins, headers, and footers.' },
    { title: 'Receive your PDF', description: 'Get your PDF via direct download, URL, cloud storage, or webhook notification.' },
]

const resources = [
    {
        title: 'API Documentation',
        description: 'Comprehensive API reference with all parameters, options, and examples.',
        image: '/images/agents/api-documentation.svg',
        imageAlt: 'API documentation code preview',
        cta: 'View Docs',
        href: 'https://docs.pdfshift.io',
    },
    {
        title: 'Language Guides',
        description: 'Step-by-step guides for Go, Node, PHP, Python, Java, Ruby, and more.',
        image: '/images/agents/language-guides.svg',
        imageAlt: 'PDFShift language guides preview',
        cta: 'Browse Guides',
        href: '/guides/',
    },
]

const footerColumns = [
    {
        title: 'Company Details',
        links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Term of services', href: '/legal/terms' },
            { label: 'GRPR', href: '/legal/gdpr' },
            { label: 'HIPAA - BAA', href: '/legal/hipaa' },
        ],
    },
    {
        title: 'Product',
        links: [
            { label: 'Features', href: '/#features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Blog', href: '/blog' },
            { label: 'Documentation', href: 'https://docs.pdfshift.io' },
            { label: 'Playground', href: 'https://playground.pdfshift.io' },
            { label: 'Status Page', href: 'https://status.pdfshift.io' },
        ],
    },
    {
        title: 'Guides',
        links: [
            { label: 'Node.js Guide', href: '/guides/node/' },
            { label: 'Node.js Guide', href: '/guides/node/' },
            { label: 'Python Guide', href: '/guides/python/' },
            { label: 'Ruby Guide', href: '/guides/ruby/' },
            { label: 'All our Guide', href: '/guides/' },
        ],
    },
]

const title = 'PDFShift for AI Agents & Automation Tools'
const description = 'Generate PDFs from N8N, Zapier, Make, MCP, Clay, Bubble, FlowMattic, and your own AI agents with PDFShift.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
</script>

<style scoped>
:global(html) {
    scroll-behavior: smooth;
}

:global(body) {
    overflow-x: hidden;
}

.agents-page {
    --dark: #011552;
    --purple: #6c47ff;
    --purple-secondary: #9277ff;
    --purple-mid: #c6b2ff;
    --purple-light: #f3efff;
    --cta-shelf-wedge: linear-gradient(183deg, #d5ccfd 0%, #f4f2ff 100%);
    --cta-shelf-bridge: linear-gradient(183deg, #dacfff 0%, #fbfaff 100%);
    min-width: 320px;
    overflow: hidden;
    background: #fff;
    color: var(--dark);
}

.agents-main {
    padding-top: 183px;
}

.agents-hero {
    position: relative;
    width: min(1281px, calc(100% - 32px));
    height: 547px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 30px;
    background-color: var(--dark);
    color: white;
}

.agents-hero::before {
    position: absolute;
    inset: 0;
    background-image: url('/images/agents/hero-grid.svg');
    background-position: -7px 35px;
    background-repeat: no-repeat;
    background-size: auto 125%;
    content: '';
    -webkit-mask-image:
        linear-gradient(to bottom, transparent 0%, #000 18%, #000 80%, transparent 100%),
        linear-gradient(to right, #000 0%, #000 35%, rgba(0, 0, 0, 0.55) 65%, transparent 100%);
    -webkit-mask-composite: source-in;
    mask-image:
        linear-gradient(to bottom, transparent 0%, #000 18%, #000 80%, transparent 100%),
        linear-gradient(to right, #000 0%, #000 35%, rgba(0, 0, 0, 0.55) 65%, transparent 100%);
    mask-composite: intersect;
    opacity: 0.34;
}

.agents-hero-copy {
    position: absolute;
    top: 122px;
    left: 50%;
    width: 552px;
    max-width: calc(100% - 32px);
    transform: translateX(-50%);
    text-align: center;
    z-index: 1;
}

.agents-hero h1 {
    font-size: 48px;
    font-weight: 400;
    line-height: 1.12;
}

.agents-hero h1 span,
.section-title span,
.bottom-cta h2 span {
    color: var(--purple-secondary);
}

.agents-hero-copy > p {
    width: 475px;
    max-width: 100%;
    margin: 25px auto 32px;
    font-size: 21px;
    font-weight: 300;
    line-height: 1.42;
    letter-spacing: -0.21px;
}

.agents-button {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    padding: 4px 24px;
    font-size: 16px;
    font-weight: 500;
    line-height: 40px;
    transition: color 180ms ease, background-color 180ms ease, transform 180ms ease;
}

.agents-button:hover {
    transform: translateY(-1px);
}

.agents-button :deep(svg),
.learn-link :deep(svg) {
    width: 24px;
    height: 24px;
}

.agents-button-primary {
    background: var(--purple);
    color: white;
}

.agents-button-light {
    background: white;
    color: var(--purple);
}

.section-title {
    font-size: 36px;
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.36px;
    text-align: center;
}

.why-section {
    padding-top: 73px;
    padding-bottom: 80px;
}

.feature-grid {
    display: grid;
    width: min(1192px, calc(100% - 32px));
    margin: 48px auto 0;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
}

.feature-card,
.small-card {
    padding: 11px;
    border: 1px solid var(--purple-secondary);
    border-radius: 16px;
    background: radial-gradient(circle at 0 0, rgba(214, 199, 255, 0.1), rgba(132, 99, 255, 0.15) 50%, rgba(51, 0, 255, 0.2));
}

.feature-card {
    height: 320px;
}

.feature-card-inner,
.small-card > div {
    height: 100%;
    border: 1px solid var(--purple-secondary);
    border-radius: 8px;
    background: white;
}

.feature-card-inner {
    display: flex;
    flex-direction: column;
    padding: 22px 23px 20px;
}

.feature-icon {
    display: block;
    width: 41px;
    height: 41px;
    color: var(--purple-secondary);
}

.feature-icon :deep(svg) {
    width: 41px;
    height: 41px;
}

.feature-copy {
    margin-top: 84px;
}

.feature-copy h3,
.small-card h3,
.step-card h3 {
    font-size: 21px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.21px;
}

.feature-copy p,
.small-card p,
.step-card p {
    margin-top: 13px;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.42;
}

.integrations-section {
    position: relative;
    height: 1026px;
    overflow: hidden;
    background:
        radial-gradient(ellipse 65% 80% at 0 0, rgba(108, 71, 255, 0.32) 0%, rgba(108, 71, 255, 0.16) 52%, transparent 100%),
        linear-gradient(110deg, #1a0e49 18%, #0c0129 97%);
    color: white;
}

.integrations-section::before {
    position: absolute;
    inset: 0;
    background-image: url('/images/agents/integrations-grid.svg');
    background-position: center;
    background-size: cover;
    content: '';
    pointer-events: none;
}

.integrations-inner {
    position: relative;
    z-index: 1;
    padding-top: 79px;
}

.section-title-light,
.section-intro-light {
    color: white;
}

.section-intro {
    margin-top: 24px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: -0.18px;
    text-align: center;
}

.integrations-section .section-intro {
    margin-top: 24px;
}

.integration-grid {
    display: grid;
    width: min(1004px, calc(100% - 32px));
    margin: 49px auto 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

.integration-card {
    position: relative;
    height: 221px;
    border: 1px solid var(--purple);
    border-radius: 12px;
    padding: 23px 24px;
    background: radial-gradient(circle at 0 0, rgba(214, 199, 255, 0.1), rgba(132, 99, 255, 0.15) 50%, rgba(51, 0, 255, 0.2));
}

.integration-heading {
    display: flex;
    align-items: center;
    gap: 16px;
}

.integration-heading h3 {
    font-size: 24px;
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.24px;
}

.integration-icon {
    display: flex;
    width: 50px;
    height: 50px;
    flex: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
}

.integration-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.clay-icon {
    background: #191a1a;
}

.clay-icon img {
    width: 30px;
    height: 23px;
}

.mcp-icon {
    background: #0f172a;
    color: var(--purple-light);
    font-size: 13px;
    letter-spacing: -0.13px;
}

.integration-card > p {
    margin-top: 18px;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.42;
}

.learn-link {
    position: absolute;
    bottom: 20px;
    left: 24px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--purple-mid);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.42;
}

.suggestion-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    color: var(--purple-mid);
    text-align: center;
}

.suggestion-card-border {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
}

.suggestion-card-border rect {
    width: calc(100% - 1px);
    height: calc(100% - 1px);
    x: 0.5px;
    y: 0.5px;
    rx: 12px;
    fill: none;
    stroke: currentColor;
    stroke-dasharray: 8 8;
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
}

.suggestion-card h3 {
    font-size: 21px;
    font-weight: 500;
}

.suggestion-card > p {
    width: 275px;
    max-width: 100%;
    margin-top: 14px;
}

.build-section {
    --cta-shelf-height: 70px;

    padding-bottom: var(--cta-shelf-height);
    background: white;
}

.build-shell {
    position: relative;
    width: min(1280px, 100%);
    height: 2052px;
    margin: 0 auto;
    background: var(--purple-light);
}

.build-shell::after {
    position: absolute;
    bottom: calc(0px - var(--cta-shelf-height));
    left: 0;
    width: 100%;
    height: var(--cta-shelf-height);
    background: var(--cta-shelf-wedge);
    clip-path: polygon(0 0, 100% 0, 82% 100%, 18% 100%);
    content: '';
}

.title-block {
    width: 491px;
    max-width: calc(100% - 32px);
    margin-right: auto;
    margin-left: auto;
    text-align: center;
}

.build-title-block {
    padding-top: 95px;
}

.use-case-grid {
    display: grid;
    width: min(900px, calc(100% - 32px));
    margin: 54px auto 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
}

.small-card {
    height: 190px;
    padding: 9px;
}

.small-card > div {
    border-radius: 12px;
    padding: 26px 25px;
}

.small-card p {
    margin-top: 12px;
}

.how-card {
    width: min(927px, calc(100% - 32px));
    height: 367px;
    margin: 113px auto 0;
    border: 1px solid var(--purple-secondary);
    border-radius: 16px;
    padding-top: 41px;
    background: linear-gradient(159deg, #e8e4ff 0%, #fff 39%, #e8e4ff 98%);
}

.steps-grid {
    position: relative;
    display: grid;
    width: 819px;
    max-width: calc(100% - 32px);
    margin: 33px auto 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 63px;
}

.steps-grid::before {
    position: absolute;
    top: 109px;
    right: 0;
    left: 0;
    height: 2px;
    background: repeating-linear-gradient(90deg, var(--purple-mid) 0 5px, transparent 5px 10px);
    content: '';
}

.step-card {
    position: relative;
    z-index: 1;
    height: 221px;
    border: 1px solid var(--purple-mid);
    border-radius: 5px;
    padding: 80px 16px 18px;
    background: white;
}

.step-number {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: var(--purple-secondary);
    color: white;
    font-size: 21px;
    font-weight: 400;
}

.step-card p {
    margin-top: 13px;
}

.resources-block {
    margin-top: 112px;
}

.resources-title-block .section-intro {
    margin-top: 24px;
}

.resource-grid {
    display: grid;
    width: 636px;
    max-width: calc(100% - 32px);
    margin: 58px auto 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
}

.resource-card {
    position: relative;
    height: 436px;
    overflow: hidden;
    border-radius: 16px;
    padding: 26px 32px;
    background: radial-gradient(circle at 0 0, rgba(214, 199, 255, 0.1), rgba(132, 99, 255, 0.18) 50%, rgba(51, 0, 255, 0.16)), var(--purple-light);
    box-shadow: 2px -2px 8px rgba(146, 119, 255, 0.15);
}

.resource-card h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.24px;
}

.resource-card > p {
    margin-top: 11px;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.42;
}

.resource-illustration {
    position: absolute;
    top: 161px;
    left: 32px;
    width: 236px;
    height: 162px;
    border: 1px solid var(--purple-mid);
    border-radius: 8px;
    background: var(--purple-light);
}

.resource-illustration > img {
    width: 100%;
    height: auto;
    display: block;
}

.resource-card .agents-button {
    position: absolute;
    bottom: 33px;
    left: 32px;
}

.cta-bridge {
    position: relative;
    z-index: 1;
    width: min(820px, 64vw);
    height: 40px;
    margin: 0 auto;
    background: var(--cta-shelf-bridge);
}

.bottom-cta {
    position: relative;
    z-index: 3;
    display: flex;
    width: min(1029px, calc(100% - 32px));
    height: 358px;
    margin: 0 auto;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
    border-radius: 30px;
    padding-top: 82px;
    background-color: #4b2b9c;
    background-image:
        linear-gradient(110deg, rgba(108, 71, 255, 0.78) 0%, rgba(92, 57, 209, 0.78) 58%, rgba(60, 38, 142, 0.9) 100%),
        url('/images/agents/hero-grid.svg');
    background-position: center;
    background-size: cover, 111.76% 168.34%;
    color: white;
    text-align: center;
}

.bottom-cta::before {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, #6541e9 0%, #5836c5 58%, #3e278f 100%);
    content: '';
    pointer-events: none;
    -webkit-mask-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 4%, transparent 16%),
        linear-gradient(to right, transparent 56%, rgba(0, 0, 0, 0.2) 68%, rgba(0, 0, 0, 0.72) 88%, #000 100%),
        radial-gradient(ellipse 34% 42% at 0% 100%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 100%);
    mask-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 4%, transparent 16%),
        linear-gradient(to right, transparent 56%, rgba(0, 0, 0, 0.2) 68%, rgba(0, 0, 0, 0.72) 88%, #000 100%),
        radial-gradient(ellipse 34% 42% at 0% 100%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 100%);
}

.bottom-cta > div {
    position: relative;
    z-index: 1;
}

.bottom-cta h2 {
    font-size: 36px;
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.36px;
}

.bottom-cta h2 span {
    color: var(--purple-mid);
}

.bottom-cta p {
    margin-top: 9px;
    font-size: 21px;
    font-weight: 300;
    line-height: 1.42;
}

.bottom-cta-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 36px;
}

.agents-footer {
    position: relative;
    z-index: 2;
    min-height: 524px;
    margin-top: -94px;
    padding: 140px 24px 64px;
    background: var(--dark);
    color: white;
}

.agents-footer-grid {
    display: grid;
    width: min(1080px, 100%);
    margin: 0 auto;
    grid-template-columns: 1.25fr repeat(3, 1fr);
}

.footer-brand {
    position: relative;
    min-height: 280px;
    padding-right: 76px;
}

.footer-brand::after {
    position: absolute;
    top: 0;
    right: 34px;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #444870 53%, transparent 96%);
    content: '';
}

.footer-logo {
    display: block;
    width: 141px;
}

.footer-socials {
    display: flex;
    gap: 24px;
    margin-top: 22px;
    color: var(--purple-mid);
}

.footer-socials a:first-child {
    width: 24px;
    height: 24px;
    padding: 4px;
}

.footer-socials a:last-child {
    width: 24px;
    height: 24px;
}

.footer-brand p,
.footer-column li {
    color: var(--purple-mid);
    font-size: 14px;
    font-weight: 300;
}

.footer-brand p {
    margin-top: 22px;
}

.footer-column h2 {
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
}

.footer-column ul {
    margin-top: 28px;
}

.footer-column li + li {
    margin-top: 17px;
}

.footer-column a:hover {
    text-decoration: underline;
}

@media (max-width: 1279px) {
    .agents-main {
        padding-top: 132px;
    }

    .feature-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .feature-card {
        height: 280px;
    }

    .feature-copy {
        margin-top: 42px;
    }

    .integrations-section,
    .build-shell {
        height: auto;
    }

    .integrations-section {
        padding-bottom: 80px;
    }

    .integration-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .build-shell {
        padding-bottom: 180px;
    }

    .resources-block {
        margin-top: 96px;
    }
}

@media (max-width: 767px) {
    .agents-main {
        padding-top: 104px;
    }

    .agents-hero {
        height: 560px;
        border-radius: 20px;
    }

    .agents-hero-copy {
        top: 92px;
    }

    .agents-hero h1 {
        font-size: 36px;
    }

    .agents-hero h1 span {
        display: block;
    }

    .agents-hero-copy > p {
        margin-top: 28px;
        font-size: 18px;
    }

    .section-title {
        padding: 0 16px;
        font-size: 30px;
    }

    .why-section {
        padding-top: 64px;
        padding-bottom: 64px;
    }

    .feature-grid,
    .integration-grid,
    .use-case-grid,
    .resource-grid,
    .agents-footer-grid {
        grid-template-columns: 1fr;
    }

    .feature-card,
    .integration-card,
    .small-card,
    .step-card,
    .resource-card {
        height: auto;
    }

    .feature-copy {
        margin-top: 32px;
    }

    .integrations-inner {
        padding-top: 64px;
    }

    .integrations-section .section-intro,
    .section-intro {
        padding: 0 24px;
        font-size: 16px;
    }

    .integration-grid {
        margin-top: 48px;
    }

    .integration-card .learn-link {
        position: static;
        display: flex;
        width: fit-content;
        margin-top: 20px;
    }

    .build-title-block {
        padding-top: 80px;
    }

    .how-card {
        height: auto;
        margin-top: 80px;
        padding: 40px 0;
    }

    .steps-grid {
        grid-template-columns: 1fr;
        gap: 24px;
        margin-top: 40px;
    }

    .steps-grid::before {
        display: none;
    }

    .resources-block {
        margin-top: 80px;
    }

    .resource-card {
        width: 302px;
        max-width: 100%;
        margin: 0 auto;
        padding-bottom: 32px;
    }

    .resource-illustration {
        position: static;
        height: auto;
        margin-top: 24px;
        aspect-ratio: 236 / 162;
    }

    .resource-card .agents-button {
        position: static;
        margin-top: 24px;
    }

    .bottom-cta {
        height: auto;
        min-height: 390px;
        border-radius: 20px;
        padding: 64px 24px;
    }

    .bottom-cta h2 {
        font-size: 30px;
    }

    .bottom-cta-actions {
        flex-direction: column;
        align-items: center;
    }

    .agents-footer {
        margin-top: -56px;
        padding-top: 112px;
        text-align: center;
    }

    .footer-brand {
        min-height: auto;
        padding-right: 0;
    }

    .footer-brand::after {
        display: none;
    }

    .footer-logo,
    .footer-socials {
        justify-content: center;
        margin-right: auto;
        margin-left: auto;
    }

    .footer-column {
        margin-top: 48px;
    }
}
</style>
