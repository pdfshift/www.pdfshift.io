<template>
    <div class="w-full h-full">
        <svg width="1600" height="692" viewBox="0 0 1600 692" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#hero-grid-clip)">
                <rect width="1600" height="692" fill="url(#hero-grid-radial)" fill-opacity="0.2" mask="url(#hero-grid-lines)" />
                <rect width="1600" height="692" fill="url(#hero-grid-highlight)" mask="url(#hero-grid-lines)" />
            </g>
            <defs>
                <pattern id="hero-grid-pattern" width="160" height="92.2168" patternUnits="userSpaceOnUse">
                    <path d="M0 0L160 92.2168M0 92.2168L160 0" stroke="white" stroke-width="1.5" />
                </pattern>
                <mask id="hero-grid-lines" x="0" y="0" width="1600" height="692" maskUnits="userSpaceOnUse">
                    <rect width="1600" height="692" fill="url(#hero-grid-pattern)" />
                </mask>
                <radialGradient id="hero-grid-radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" :gradientTransform="`translate(799.69 ${483.216 + fadeOffsetY}) rotate(90) scale(445.099 891.074)`">
                    <stop stop-color="white" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                </radialGradient>
                <linearGradient id="hero-grid-highlight" x1="800" y1="-33.7625" x2="800" y2="-7.45917" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#BEF972" stop-opacity="0" />
                    <stop offset="0.453125" stop-color="#BEF972" />
                    <stop offset="1" stop-color="#BEF972" stop-opacity="0" />
                </linearGradient>
                <clipPath id="hero-grid-clip">
                    <rect width="1600" height="691.626" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
</template>

<script setup>
defineProps({
    fadeOffsetY: {
        type: Number,
        default: 0,
    },
})
</script>
