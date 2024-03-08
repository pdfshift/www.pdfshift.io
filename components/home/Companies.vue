<template>
    <section class="py-8 lg:pt-14 lg:pb-0 bg-white">
        <div class="container">
            <div class="flex flex-col items-center justify-center gap-12">
                <span class="h3 text-center">Trusted By <span class="text-purple">18,000+</span> users with <span class="text-purple">millions</span> of generated documents *</span>
                <ul class="flex w-full items-center justify-center gap-8 flex-wrap">
                    <li v-for="company in companies" :key="company.name" class="w-24 lg:w-40 text-gray-600">
                        <component :is="company.logo" />
                    </li>
                </ul>
                <span class="text-sm text-center text-gray-400">* Companies that validated their email and successfully generated PDF documents</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import Vercel from '~/components/logos/Vercel.vue'
import Salesforce from '~/components/logos/Salesforce.vue'
import Zoho from '~/components/logos/Zoho.vue'
import Vivino from '~/components/logos/Vivino.vue'
import Wix from '~/components/logos/Wix.vue'

const companies = [
    {
        name: 'Salesforce',
        logo: Salesforce
    },
    {
        name: 'Zoho',
        logo: Zoho
    },
    {
        name: 'Vercel',
        logo: Vercel
    },
    {
        name: 'Wix',
        logo: Wix
    },
    {
        name: 'Vivino',
        logo: Vivino
    }
]
</script>
