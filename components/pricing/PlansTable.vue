<template>
    <section class="max-w-5xl mx-auto" id="all-plans">
        <h2 class="h2 text-navy-700 text-center">Compare all plans</h2>
        <p class="p text-navy-700 text-center mt-4">
            Every paid plan includes all features. Pay yearly and get two months for free.
        </p>
        <div class="mt-8 overflow-x-auto border border-purple rounded-lg bg-white">
            <table class="w-full text-left text-navy-700 whitespace-nowrap">
                <thead class="bg-purple text-white">
                    <tr>
                        <th scope="col" class="px-4 py-3 font-medium">Plan</th>
                        <th scope="col" class="px-4 py-3 font-medium text-right">Credits per month*</th>
                        <th scope="col" class="px-4 py-3 font-medium text-right">Monthly</th>
                        <th scope="col" class="px-4 py-3 font-medium text-right">Yearly</th>
                        <th scope="col" class="px-4 py-3 font-medium text-right">Extra credit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="plan in pricedPlans" :key="plan.name" class="border-t border-purple-100">
                        <th scope="row" class="px-4 py-3 font-medium">{{ plan.name }}</th>
                        <td class="px-4 py-3 text-right">{{ plan.credits.toLocaleString('en-US') }}</td>
                        <td class="px-4 py-3 text-right">{{ formatPrice(plan.price) }}<span v-if="plan.price" class="font-light">/month</span></td>
                        <td class="px-4 py-3 text-right">{{ formatPrice(plan.price * 10) }}<span v-if="plan.price" class="font-light">/year</span></td>
                        <td class="px-4 py-3 text-right">{{ plan.overage === 'N/A' ? 'Not available' : `$${plan.overage}` }}</td>
                    </tr>
                    <tr v-if="customPlan" class="border-t border-purple-100">
                        <th scope="row" class="px-4 py-3 font-medium">{{ customPlan.name }}</th>
                        <td class="px-4 py-3 text-right">Custom</td>
                        <td colspan="3" class="px-4 py-3 text-right">
                            <NuxtLink to="/contact/" class="text-purple font-medium hover:underline">Contact us for a custom quote</NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="p -small text-gray-600 mt-4">
            * We count 1 credit per 5Mb of generated document. For example, a 14Mb PDF consumes 3 credits.
        </p>
    </section>
</template>

<script setup>
const plans = usePlans()
const pricedPlans = plans.filter(plan => plan.price !== undefined)
const customPlan = plans.find(plan => plan.price === undefined)

const formatPrice = (price) => price === 0 ? 'Free' : `$${price.toLocaleString('en-US')}`
</script>
