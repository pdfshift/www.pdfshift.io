<template>
    <div v-if="account">
        <header>
            <div>
                <header-component :hide-menu="$route.name === 'account'" :show-back="$route.name !== 'account'" />
                <template v-if="header">
                    <h1>
                        {{ header }}
                        <small v-if="subheader">{{ subheader }}</small>
                    </h1>
                </template>
                <template v-else-if="header == ''"></template>
                <template v-else>
                    <h1>&nbsp;<small>&nbsp;</small></h1>
                </template>
            </div>
        </header>
        <div class="container">
            <template v-if="account">
                <router-view :plans="plans" :account="account" />
            </template>
            <template v-else-if="error">
                <div class="error">
                    <h3>An error occcured</h3>
                    <p v-html="error"></p>
                </div>
            </template>
            <template v-else>
                <div class="loading" style="text-align: center; font-style: italic;">Loading ...</div>
            </template>
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
            plan: null,
            header: null,
            subheader: null,
            error: null
        }
    },
    created () {
        this.$http.get('accounts/', {headers: {'authorization': 'Bearer ' + this.$route.params.token}}).then(
            response => {
                this.account = response.body

                let heroku = document.location.search.indexOf('heroku=1') > -1
                if (heroku) {
                    let appName = null
                    for (let i = 0; i < this.account.api_keys.length; i++) {
                        if (this.account.api_keys[i].name) {
                            appName = this.account.api_keys[i].name
                            break
                        }
                    }

                    if (appName) {
                        let s = document.createElement('script')
                        s.src = 'https://s3.amazonaws.com/assets.heroku.com/boomerang/boomerang.js'
                        s.async = true
                        s.onload = () => {
                            window.Boomerang.init({app: appName, addon: 'pdfshift'})
                        }
                        document.querySelector('body').appendChild(s)
                    }
                }

                try {
                    if (this.account.api_keys.length > 0) {
                        if (!this.$storage.getItem('api_key')) {
                            this.$storage.setItem('api_key', this.account.api_keys[0].token)
                        }
                    }
                } catch (e) {}
            },
            response => {
                try {
                    if ('error' in response.body) {
                        this.error = response.body.error.split('\n').join('<br />')
                    }
                } catch (e) {
                    this.error = "An error occured...<br />We're sorry about it, if this continue, please contact us!"
                }
            }
        )

        this.$http.get('credits/plans', {headers: {'authorization': 'Bearer ' + this.$route.params.token}}).then(
            response => {
                this.plans = {
                    free: {
                        display: 'Free',
                        name: 'free',
                        position: 0,
                        credits: 250,
                        filesize: 1,
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
