<template>
    <section class="px-4 pb-24 pt-32 lg:pb-24 lg:pt-36" aria-labelledby="home-agents-title">
        <div class="relative mx-auto flex max-w-[993px] flex-col items-center rounded-2xl border border-purple-500 bg-purple-100 px-4 pb-[29px] pt-[55px] lg:min-h-[832px]">
            <img
                class="pointer-events-none absolute left-1/2 top-[-31px] w-[60px] -translate-x-1/2"
                src="/images/illustrations/home-agents-icon.svg"
                alt=""
                width="60"
                height="60"
            />

            <div class="w-[491px] max-w-full text-center text-navy-700">
                <h2 id="home-agents-title" class="home-agents-heading text-[28px] font-medium leading-[1.12] tracking-[-0.36px] lg:text-[36px]">
                    Power PDFShift with<br />
                    AI Agents and Automation
                </h2>
                <p class="mt-6 text-base leading-[1.7] tracking-[-0.18px] lg:text-lg">
                    Give N8N, Zapier, Make, Bubble, Clay, FlowMattic and your own agents ways to take PDFShift to the next level by integrating PDF generation in your very own workflows
                </p>
            </div>

            <img
                class="pointer-events-none mt-[30px] h-auto w-[536px] max-w-full"
                src="/images/illustrations/home-agents-network.svg"
                alt="PDFShift connected to N8N, Zapier, Make, MCP, Clay, Bubble, and FlowMattic"
                width="536"
                height="535"
            />

            <NuxtLink
                to="/agents"
                class="absolute -bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-purple px-6 py-3 text-base font-medium leading-6 text-white transition-colors duration-300 hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
            >
                Explore all Integrations
                <IconsArrowRight class="shrink-0" />
            </NuxtLink>
        </div>
    </section>
</template>

<style scoped>
@media (min-width: 1024px) {
    .home-agents-heading {
        text-box-edge: cap alphabetic;
        text-box-trim: trim-both;
    }
}
</style>
