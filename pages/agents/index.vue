<template>
    <div>
        <NuxtLayout name="default">
            <!-- Hero Section -->
            <div class="bg-navy-900">
                <section class="container px-4 pt-32 pb-16">
                    <div class="max-w-4xl mx-auto text-center">
                        <h1 class="h1 text-white">
                            PDFShift for <span class="text-purple-500">AI Agents & Automation Tools</span>
                        </h1>
                        <p class="p -lead text-white mt-6">
                            Powerful PDF generation for your automated workflows. Convert HTML to PDF seamlessly in your favorite automation tools and AI agents.
                        </p>
                        <div class="flex justify-center mt-8">
                            <Button @click="scrollToIntegrations" :arrow="true">Explore Integrations</Button>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Benefits Section -->
            <section class="bg-white py-16 lg:py-24">
                <div class="container">
                    <div class="max-w-3xl mx-auto text-center mb-12">
                        <h2 class="h2 text-navy-700">
                            Why Choose PDFShift for Automation
                        </h2>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsClipboardTick />
                            </div>
                            <h3 class="h3 text-navy-700">No Code Required</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Use visual builders and drag-and-drop interfaces. No programming knowledge needed.
                            </p>
                        </CardLight>
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsBarGraphUp />
                            </div>
                            <h3 class="h3 text-navy-700">API First</h3>
                            <p class="p -small text-navy-700 mt-3">
                                RESTful API that works with any automation tool or AI agent framework.
                            </p>
                        </CardLight>
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsTimerPaused />
                            </div>
                            <h3 class="h3 text-navy-700">Always Reliable</h3>
                            <p class="p -small text-navy-700 mt-3">
                                99.99% uptime guarantee. Your workflows run smoothly without interruptions.
                            </p>
                        </CardLight>
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsPeople />
                            </div>
                            <h3 class="h3 text-navy-700">Async Processing</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Webhook support for large jobs. Process documents in the background efficiently.
                            </p>
                        </CardLight>
                    </div>
                </div>
            </section>

            <!-- Integrations Grid -->
            <section ref="integrationsSection" class="bg-gradient-to-br from-purple-900 to-navy-700 via-20% via-navy-700 py-16 lg:py-24">
                <div class="container">
                    <div class="max-w-3xl mx-auto text-center mb-12">
                        <h2 class="h2 text-white">
                            Popular <span class="text-purple-500">Integrations</span>
                        </h2>
                        <p class="p text-white mt-4">
                            Connect PDFShift with your favorite tools and start automating PDF generation today
                        </p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <NuxtLink v-for="integration in integrations" :key="integration.name" :to="integration.url" class="block transition-transform hover:-translate-y-2">
                            <CardDark>
                                <div class="flex items-center gap-4 mb-4">
                                    <img :src="integration.logo" :alt="`${integration.name} logo`" class="w-12 h-12 rounded" />
                                    <h3 class="h3 text-white">{{ integration.name }}</h3>
                                </div>
                                <p class="p -small text-white">
                                    {{ integration.description }}
                                </p>
                                <div class="mt-4 text-purple-400 flex items-center gap-2">
                                    <span>Learn more</span>
                                    <IconsArrowRight class="w-4 h-4" />
                                </div>
                            </CardDark>
                        </NuxtLink>
                    </div>
                </div>
            </section>

            <!-- Use Cases Section -->
            <section class="bg-white py-16 lg:py-24">
                <div class="container">
                    <div class="max-w-3xl mx-auto text-center mb-12">
                        <h2 class="h2 text-navy-700">
                            What You Can <span class="text-purple-500">Build</span>
                        </h2>
                        <p class="p text-navy-700 mt-4">
                            Real-world use cases for automated PDF generation
                        </p>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsClipboardTick />
                            </div>
                            <h3 class="h3 text-navy-700">Invoice Generation</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Automatically generate invoices from payment webhooks and send them to customers.
                            </p>
                        </CardLight>
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsBarGraphUp />
                            </div>
                            <h3 class="h3 text-navy-700">Report Creation</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Create beautiful reports from spreadsheet data, databases, or APIs automatically.
                            </p>
                        </CardLight>
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsPeople />
                            </div>
                            <h3 class="h3 text-navy-700">Contract Automation</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Generate personalized contracts and agreements from templates with data from your CRM.
                            </p>
                        </CardLight>
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsClipboardTick />
                            </div>
                            <h3 class="h3 text-navy-700">E-commerce Receipts</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Generate and email receipts automatically when orders are placed in your store.
                            </p>
                        </CardLight>
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsTimerPaused />
                            </div>
                            <h3 class="h3 text-navy-700">Document Archiving</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Archive web pages, emails, or documents as PDFs to cloud storage automatically.
                            </p>
                        </CardLight>
                        <CardLight>
                            <div class="text-purple-500 w-12 h-12 mb-4">
                                <IconsPeople />
                            </div>
                            <h3 class="h3 text-navy-700">Multi-language Docs</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Generate documents in multiple languages automatically based on user preferences.
                            </p>
                        </CardLight>
                    </div>
                </div>
            </section>

            <!-- How It Works -->
            <section class="bg-gradient-to-br from-purple-100 to-purple-100 via-white py-16 lg:py-24">
                <div class="container">
                    <div class="max-w-3xl mx-auto text-center mb-12">
                        <h2 class="h2 text-navy-700">
                            How It <span class="text-purple-500">Works</span>
                        </h2>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div class="text-center">
                            <div class="w-16 h-16 mx-auto bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                1
                            </div>
                            <h3 class="h3 text-navy-700">Connect Your Tool</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Link your automation tool to PDFShift using our REST API with your API key.
                            </p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 mx-auto bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                2
                            </div>
                            <h3 class="h3 text-navy-700">Configure Options</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Set your HTML source, filename, and PDF options like margins, headers, and footers.
                            </p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 mx-auto bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                3
                            </div>
                            <h3 class="h3 text-navy-700">Receive Your PDF</h3>
                            <p class="p -small text-navy-700 mt-3">
                                Get your PDF via direct download, URL, cloud storage, or webhook notification.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Developer Resources -->
            <section class="bg-white py-16 lg:py-24">
                <div class="container">
                    <div class="max-w-3xl mx-auto text-center mb-12">
                        <h2 class="h2 text-navy-700">
                            Developer <span class="text-purple-500">Resources</span>
                        </h2>
                    </div>
                    <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <CardLight>
                            <h3 class="h3 text-navy-700">API Documentation</h3>
                            <p class="p -small text-navy-700 mt-3 mb-4">
                                Comprehensive API reference with all parameters, options, and examples.
                            </p>
                            <Button to="/documentation" :arrow="true">View Docs</Button>
                        </CardLight>
                        <CardLight>
                            <h3 class="h3 text-navy-700">Language Guides</h3>
                            <p class="p -small text-navy-700 mt-3 mb-4">
                                Step-by-step guides for Go, Node, PHP, Python, Java, Ruby, and more.
                            </p>
                            <Button to="/guides" :arrow="true">Browse Guides</Button>
                        </CardLight>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="bg-gradient-to-br from-purple-900 to-purple-950 py-16 lg:py-24">
                <div class="container">
                    <div class="max-w-3xl mx-auto text-center">
                        <h2 class="h2 text-white">
                            Start <span class="text-purple-400">Automating</span> Today
                        </h2>
                        <p class="p text-white mt-4 mb-8">
                            Get your free API key and start converting HTML to PDF in your workflows
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button to="/register" :arrow="true">Get Your Free API Key</Button>
                            <Button to="/documentation" :arrow="true" :light="true">Read the Documentation</Button>
                        </div>
                    </div>
                </div>
            </section>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = 'PDFShift for AI Agents & Automation Tools | No-Code PDF Generation';
const description = 'Seamlessly integrate PDFShift with N8N, Zapier, Make, Clay, Bubble, and other automation tools. Convert HTML to PDF in your automated workflows with our reliable API.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
});

const integrations = ref([
    {
        name: 'N8N',
        url: '/agents/n8n',
        logo: '/images/integrations/n8n.svg',
        description: 'Convert HTML to PDF in your N8N workflows with simple HTTP requests'
    },
    {
        name: 'Zapier',
        url: '/agents/zapier',
        logo: '/images/integrations/zapier.svg',
        description: 'Create Zaps that automatically generate PDFs from your triggers and data'
    },
    {
        name: 'Make',
        url: '/agents/make',
        logo: '/images/integrations/make.svg',
        description: 'Build visual scenarios that include PDF generation with drag-and-drop'
    },
    {
        name: 'MCP',
        url: '/agents/mcp',
        logo: '/images/integrations/mcp.svg',
        description: 'Integrate PDF generation into Claude Desktop and AI agent workflows'
    },
    {
        name: 'Clay',
        url: '/agents/clay',
        logo: '/images/integrations/clay.svg',
        description: 'Generate PDFs from your Clay spreadsheet data and enrichment workflows'
    },
    {
        name: 'Bubble',
        url: '/agents/bubble',
        logo: '/images/integrations/bubble.svg',
        description: 'Add PDF generation capabilities to your Bubble no-code applications'
    },
    {
        name: 'FlowMattic',
        url: '/agents/flowmatic',
        logo: '/images/integrations/flowmatic.svg',
        description: 'Automate PDF creation in WordPress with FlowMattic automation workflows'
    }
]);

const integrationsSection = ref(null);

const scrollToIntegrations = () => {
    if (integrationsSection.value) {
        integrationsSection.value.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>
