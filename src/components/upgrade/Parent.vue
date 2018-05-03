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
                    Upgrade to {{ plans[$route.params.plan].name }} plan.
                    <small>Select the plan that fits your needs</small>
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
            account: this.loadAccount(),
            plans: {
                free: {
                    name: 'Free',
                    position: 0,
                    conversions: 250,
                    limit: 1,
                    price: 0
                },
                starter: {
                    name: 'Starter',
                    position: 1,
                    conversions: '1k',
                    limit: 5,
                    price: 9
                },
                growth: {
                    name: 'Growth',
                    position: 2,
                    conversions: '10k',
                    limit: 10,
                    price: 39
                },
                business: {
                    name: 'Business',
                    position: 3,
                    conversions: '50k',
                    limit: 25,
                    price: 99
                }
            },
            plan: null
        }
    },
    created () {
        this.$http.get('accounts/' + this.$route.params.token).then(
            response => {
                this.account = response.body
            },
            response => {
                console.log(response.body)
                alert("An error occured...\nWe're sorry about it, if this continue, please contact us!")
            }
        )
    }
}
</script>
