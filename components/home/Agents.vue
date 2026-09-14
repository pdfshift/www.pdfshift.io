<template>
    <section class="px-4 pb-24 pt-32 lg:pb-24 lg:pt-36" aria-labelledby="home-agents-title">
        <div class="home-agents-card relative mx-auto flex max-w-5xl flex-col items-center rounded-2xl border border-purple-500 bg-purple-100 px-4 pb-7 pt-14">
            <img
                class="pointer-events-none absolute left-1/2 -top-8 w-14 -translate-x-1/2"
                src="/images/illustrations/home-agents-icon.svg"
                alt=""
                width="60"
                height="60"
            />

            <div class="w-full max-w-agent-copy text-center text-navy-700">
                <h2 id="home-agents-title" class="text-3xl font-medium leading-display lg:text-4xl lg:text-trim">
                    Power PDFShift with<br />
                    AI Agents and Automation
                </h2>
                <p class="mt-6 text-base leading-relaxed lg:text-lg">
                    Give N8N, Zapier, Make, Bubble, Clay, FlowMattic and your own agents ways to take PDFShift to the next level by integrating PDF generation in your very own workflows
                </p>
            </div>

            <div class="relative mt-7 aspect-square w-full max-w-[536px]">
                <img
                    class="pointer-events-none absolute inset-0 z-0 size-full"
                    src="/images/agents/network.svg"
                    alt=""
                    width="536"
                    height="536"
                />

                <NuxtLink
                    v-for="integration in integrations"
                    :key="integration.name"
                    class="absolute z-10 aspect-square w-[13.4328%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full transition-transform duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
                    :class="integration.linkClass"
                    :style="{ left: integration.left, top: integration.top }"
                    :to="integration.href"
                    :aria-label="integration.name"
                >
                    <img class="block" :class="integration.imageClass ?? 'size-full'" :src="integration.logo" alt="" width="72" height="72" />
                </NuxtLink>
            </div>

            <Button
                to="/agents"
                class="absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap"
                :arrow="true"
            >
                Explore all Integrations
            </Button>
        </div>
    </section>
</template>

<script setup>
const integrations = [
    { name: 'N8N', logo: '/images/agents/n8n.svg', href: '/agents/n8n', left: '28.2067%', top: '81.8131%', imageClass: 'size-full scale-105' },
    { name: 'Zapier', logo: '/images/agents/zapier.png', href: '/agents/zapier', left: '11.6675%', top: '49.4052%' },
    { name: 'Make', logo: '/images/agents/make.svg', href: '/agents/make', left: '25.9716%', top: '21.4675%', imageClass: 'size-full scale-105' },
    {
        name: 'Clay',
        logo: '/images/agents/clay.png',
        href: '/agents/clay',
        left: '86.3172%',
        top: '60.8039%',
        linkClass: 'bg-neutral-900',
        imageClass: 'absolute left-1/2 top-1/2 h-auto w-7/12 -translate-x-1/2 -translate-y-1/2',
    },
    { name: 'Bubble', logo: '/images/agents/bubble.svg', href: '/agents/bubble', left: '66.8726%', top: '83.1541%', imageClass: 'size-full scale-105' },
    { name: 'FlowMattic', logo: '/images/agents/flowmattic.png', href: '/agents/flowmattic', left: '86.3172%', top: '26.8315%' },
    { name: 'MCP', logo: '/images/agents/mcp.svg', href: '/agents/mcp', left: '57.0384%', top: '13.4215%' },
]
</script>

<style scoped>
@media (min-width: 1024px) {
    .home-agents-card {
        min-height: 832px;
    }
}
</style>
