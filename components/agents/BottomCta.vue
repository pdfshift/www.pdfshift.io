<template>
    <div>
        <div v-if="bridge" class="relative z-[1] mx-auto h-10 w-[55%] bg-[linear-gradient(183deg,#dacfff_0%,#fbfaff_100%)] md:w-[min(820px,64vw)]" aria-hidden="true"></div>
        <section
            class="relative z-[3] mx-auto flex min-h-[390px] w-[calc(100%-2rem)] max-w-[1029px] items-start justify-center overflow-hidden rounded-[20px] bg-[#4b2b9c] bg-cover bg-center px-6 py-16 text-center text-white md:h-[358px] md:min-h-0 md:rounded-[30px] md:px-0 md:pb-0 md:pt-[84px]"
            style="background-image: linear-gradient(110deg, rgba(108, 71, 255, 0.78) 0%, rgba(92, 57, 209, 0.78) 58%, rgba(60, 38, 142, 0.9) 100%), url('/images/agents/hero-grid.svg'); background-size: cover, 111.76% 168.34%"
            :aria-labelledby="titleId"
        >
            <div
                class="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,#6541e9_0%,#5836c5_58%,#3e278f_100%)]"
                style="-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 4%, transparent 16%), linear-gradient(to right, transparent 56%, rgba(0, 0, 0, 0.2) 68%, rgba(0, 0, 0, 0.72) 88%, #000 100%), radial-gradient(ellipse 34% 42% at 0% 100%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 100%); mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 4%, transparent 16%), linear-gradient(to right, transparent 56%, rgba(0, 0, 0, 0.2) 68%, rgba(0, 0, 0, 0.72) 88%, #000 100%), radial-gradient(ellipse 34% 42% at 0% 100%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 100%)"
                aria-hidden="true"
            ></div>
            <div class="relative z-[1]">
                <h2 :id="titleId" class="text-[30px] font-medium leading-[1.12] tracking-[-0.3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-4xl md:tracking-[-0.36px] [&_span]:text-purple-400">
                    {{ title }}<template v-if="highlight">&nbsp;<span>{{ highlight }}</span></template><template v-if="suffix">&nbsp;{{ suffix }}</template>
                </h2>
                <p class="mx-auto mt-6 w-[439px] max-w-[calc(100vw-4rem)] text-lg font-light leading-[1.42] tracking-[-0.18px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] md:text-[21px] md:tracking-[-0.21px]">{{ description }}</p>
                <div class="mt-12 flex flex-col items-center justify-center gap-3 md:flex-row">
                    <Button :to="primaryHref" :arrow="true">{{ primaryLabel }}</Button>
                    <Button v-if="showSecondary" :to="secondaryHref" :light="true" :arrow="true">{{ secondaryLabel }}</Button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    highlight: {
        type: String,
        default: '',
    },
    suffix: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        required: true,
    },
    titleId: {
        type: String,
        default: 'agents-bottom-cta-title',
    },
    bridge: {
        type: Boolean,
        default: false,
    },
    primaryLabel: {
        type: String,
        default: 'Get your Free API key',
    },
    primaryHref: {
        type: String,
        default: '/register',
    },
    showSecondary: {
        type: Boolean,
        default: true,
    },
    secondaryLabel: {
        type: String,
        default: 'Read the Documentation',
    },
    secondaryHref: {
        type: String,
        default: 'https://docs.pdfshift.io',
    },
})
</script>
