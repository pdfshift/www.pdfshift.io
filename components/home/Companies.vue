<template>
    <section class="py-8 lg:pt-14 lg:pb-0 bg-white">
        <div class="container">
            <div class="flex flex-col items-center justify-center gap-12">
                <span class="h3 text-center">Trusted By <span class="text-purple">{{ statistics.users }}</span> developers with <span class="text-purple">{{ statistics.conversions }}+ millions</span> of generated documents, including *</span>
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

import Salesforce from '~/components/logos/Salesforce.vue'
import Bosch from '~/components/logos/Bosch.vue'
import Wix from '~/components/logos/Wix.vue'
import DuckDuckGo from '~/components/logos/DuckDuckGo.vue'
import Vivino from '~/components/logos/Vivino.vue'
import Slack from "~/components/logos/Slack.vue"
import Hubspot from "~/components/logos/Hubspot.vue"
import getStatistics from '~/utils/statistics'

const statistics = getStatistics()

const companies = [
    {
        name: 'Slack',
        logo: Slack
    },
    {
        name: 'Salesforce',
        logo: Salesforce
    },
    {
        name: 'DuckDuckGo',
        logo: DuckDuckGo
    },
    {
        name: 'Wix',
        logo: Wix
    },
    {
        name: 'Hubspot',
        logo: Hubspot
    },
    {
        name: 'Bosch',
        logo: Bosch
    }
]
</script>
