<template>
    <div class="agents-bottom-cta-wrapper">
        <div v-if="bridge" class="agents-bottom-cta-bridge relative z-1 mx-auto h-10 md:max-w-agent-content" aria-hidden="true"></div>
        <section
            class="agents-bottom-cta relative z-3 mx-auto flex min-h-96 w-with-gutters max-w-5xl items-start justify-center overflow-hidden rounded-2xl bg-cover bg-center px-6 py-16 text-center text-white md:min-h-0 md:rounded-4xl md:px-0 md:pb-0 md:pt-20"
            :aria-labelledby="titleId"
        >
            <div
                class="agents-bottom-cta-overlay pointer-events-none absolute inset-0"
                aria-hidden="true"
            ></div>
            <div class="relative z-1 w-full">
                <h2 :id="titleId" class="agents-bottom-cta-title text-3xl font-medium leading-display text-trim md:text-4xl">
                    {{ title }}<template v-if="highlight">&nbsp;<span>{{ highlight }}</span></template><template v-if="suffix">&nbsp;{{ suffix }}</template>
                </h2>
                <p class="mx-auto mt-6 w-full max-w-md text-lg font-light leading-snug text-trim md:text-xl">{{ description }}</p>
                <div class="mt-12 flex flex-col items-center justify-center gap-3 md:flex-row">
                    <Button :to="primaryHref" :arrow="true">{{ primaryLabel }}</Button>
                    <Button v-if="showSecondary" :to="secondaryHref" :light="true" hover="dark" :arrow="true">{{ secondaryLabel }}</Button>
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

<style scoped>
.agents-bottom-cta-bridge {
    width: 55%;
    background: linear-gradient(183deg, #dacfff 0%, #fbfaff 100%);
}

.agents-bottom-cta {
    background-color: #4b2b9c;
    background-image:
        linear-gradient(110deg, rgba(108, 71, 255, 0.78) 0%, rgba(92, 57, 209, 0.78) 58%, rgba(60, 38, 142, 0.9) 100%),
        url('/images/agents/hero-grid.svg');
    background-size: cover, 111.76% 168.34%;
}

.agents-bottom-cta-overlay {
    background: linear-gradient(110deg, #6541e9 0%, #5836c5 58%, #3e278f 100%);
    -webkit-mask-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 4%, transparent 16%),
        linear-gradient(to right, transparent 56%, rgba(0, 0, 0, 0.2) 68%, rgba(0, 0, 0, 0.72) 88%, #000 100%),
        radial-gradient(ellipse 34% 42% at 0% 100%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 100%);
    mask-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 4%, transparent 16%),
        linear-gradient(to right, transparent 56%, rgba(0, 0, 0, 0.2) 68%, rgba(0, 0, 0, 0.72) 88%, #000 100%),
        radial-gradient(ellipse 34% 42% at 0% 100%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 100%);
}

.agents-bottom-cta-title span {
    color: #c6b2ff;
}

@media (min-width: 768px) {
    .agents-bottom-cta-bridge {
        width: 64vw;
    }

    .agents-bottom-cta {
        height: 358px;
    }

}
</style>
