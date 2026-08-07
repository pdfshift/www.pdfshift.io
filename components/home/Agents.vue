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

            <img
                class="pointer-events-none mt-7 h-auto max-w-full"
                src="/images/illustrations/home-agents-network.svg"
                alt="PDFShift connected to N8N, Zapier, Make, MCP, Clay, Bubble, and FlowMattic"
                width="536"
                height="535"
            />

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

<style scoped>
@media (min-width: 1024px) {
    .home-agents-card {
        min-height: 832px;
    }
}
</style>
