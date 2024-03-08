<template>
    <div class="flex items-center gap-3">
        <div class="relative">
            <div class="relative text-white flex items-center gap-1.5">
                <IconsStar class="shrink-0" :class="size" />
                <IconsStar class="shrink-0" :class="size" />
                <IconsStar class="shrink-0" :class="size" />
                <IconsStar class="shrink-0" :class="size" />
                <IconsStar class="shrink-0" :class="size" />
            </div>
            <div class="absolute left-0 top-0 text-orange flex items-center gap-1.5 overflow-hidden" :style="{width: (rating * 20) + '%'}">
                <IconsStar class="shrink-0" :class="size" />
                <IconsStar class="shrink-0" :class="size" />
                <IconsStar class="shrink-0" :class="size" />
                <IconsStar class="shrink-0" :class="size" />
                <IconsStar class="shrink-0" :class="size" />
            </div>
        </div>
        <div class="flex items-center gap-1.5 font-light relative top-0.5" :class="textSize">
            <template v-if="small">
                <span>{{ rating }}</span>
            </template>
            <template v-else>
                <span>{{ rating }} stars </span>
                <span v-if="reviews">({{ reviews }} {{ reviews === 1 ? 'review' : 'reviews' }})</span>
            </template>
        </div>
    </div>
</template>

<script setup>
defineProps({
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    small: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'w-5'
    },
    textSize: {
        type: String,
        default: 'text-base'
    }
})
</script>
