<template>
    <!-- Horizontal bar chart for article markdown. Each row: a base segment (gray) and an optional extra segment (orange), on one 0 to max scale. The row marked "ours" gets the highlighted card. -->
    <div role="img" :aria-label="label" class="text-navy-700">
        <div class="mb-4 font-medium">{{ title }}</div>
        <div class="space-y-3">
            <div v-for="row in rows" :key="row.name" :class="row.ours ? 'rounded-lg border-2 border-purple bg-white px-4 py-3' : 'px-4 py-1'">
                <div :class="row.ours ? 'font-semibold text-purple' : 'font-medium'">{{ row.name }}</div>
                <div class="mt-2 flex h-7 items-stretch">
                    <div v-if="row.ours && !row.base" class="w-0.5 bg-purple"></div>
                    <div v-if="row.base" class="rounded-l bg-gray-600" :class="row.extra ? '' : 'rounded-r'" :style="{ width: pct(row.base), minWidth: '3px' }"></div>
                    <div v-if="row.extra" class="flex items-center whitespace-nowrap rounded-r bg-orange pl-2 text-sm font-medium" :style="{ width: pct(row.extra) }">{{ row.extraLabel }}</div>
                    <div v-if="row.barLabel" class="flex items-center whitespace-nowrap pl-2 text-sm font-medium">{{ row.barLabel }}</div>
                </div>
                <div class="mt-1 text-sm">{{ row.note }}</div>
            </div>
        </div>
        <div class="relative mx-4 mt-2 h-5 border-t border-gray-200 text-sm text-gray-600">
            <span class="absolute left-0 top-1">0</span>
            <span class="absolute top-1 -translate-x-1/2" style="left: 50%">{{ max / 2 }}</span>
            <span class="absolute right-0 top-1">{{ max }} {{ unit }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: { type: String, default: '' },
    label: { type: String, default: '' },
    max: { type: Number, required: true },
    unit: { type: String, default: '' },
    rows: { type: Array, default: () => [] }
})

const pct = (value) => `${(value / props.max) * 100}%`
</script>
