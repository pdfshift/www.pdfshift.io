<template>
    <div v-if="account">
        <header>
            <div>
                <header-component />
                <template v-if="$route.name === 'upgrade-plans'">
                <h1>
                    Upgrade your account
                    <small>Select the plan that fits your needs</small>
                </h1>
                </template>
                <template v-if="$route.name === 'upgrade-stripe'">
                <h1>
                    Upgrade to {{ plans[$route.params.plan].display }} plan.
                    <small>Almost done! Please provide your payment details.</small>
                </h1>
                </template>
            </div>
        </header>
        <div class="container">
            <router-view :plans="plans" :account="account" />
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent},
    data () {
        return {
            account: null,
            plans: {},
            plan: null
        }
    },
    created () {
        this.$http.get('accounts/', {headers: {'authorization': 'Bearer ' + this.$route.params.token}}).then(
            response => {
                this.account = response.body
            },
            response => {
                alert("An error occured...\nWe're sorry about it, if this continue, please contact us!")
            }
        )

        this.$http.get('credits/plans', {headers: {'authorization': 'Bearer ' + this.$route.params.token}}).then(
            response => {
                this.plans = {
                    free: {
                        display: 'Free',
                        name: 'free',
                        position: 0,
                        conversions: 250,
                        limit: 1,
                        price: 0
                    }
                }

                for (let i = 0; i < response.body.plans.length; i++) {
                    let current = response.body.plans[i]
                    this.plans[current.name] = current
                }
            },
            response => {
                alert("An error occured...\nWe're sorry about it, if this continue, please contact us!")
            }
        )
    }
}
</script>
