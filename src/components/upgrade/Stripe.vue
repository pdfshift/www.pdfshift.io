<template>
    <div class="row" id="upgrade-credit-card" v-bind:class="{'visible': isMounted}">
        <form @submit.prevent="process">
            <div>
                <label for="stripe-name">Your name</label>
                <input type="text" v-model="form.name" id="stripe-name" disabled />
            </div>
            <div>
                <label for="stripe-country">Your country</label>
                <select id="stripe-country" name="country" required v-model="form.country">
                    <optgroup>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </optgroup>
                    <optgroup label="-----------">
                        <option v-for="(country, key) in countries" :key="key" :value="key">{{ country }}</option>
                    </optgroup>
                </select>
            </div>
            <div v-bind:class="{'error': error}">
                <label>Your credit card details</label>
                <div id="card-element"></div>
                <p class="help-block" v-if="error">{{ error }}</p>
            </div>
            <input type="submit" class="button" name="pay" :value="'Subscribe to our ' + plans[$route.params.plan].name + ' plan (' + plans[$route.params.plan].price + '$/mo)'" v-bind:class="{'btn-disabled': sending}" v-bind:disabled="sending" />
            <div class="back">
                <router-link :to="{name: 'upgrade-plans'}">Choose another plan</router-link>
            </div>
        </form>
    </div>
</template>

<script>
/* global window */
import Countries from '@/data/countries'

// let euCountries = ['DE', 'AT', 'BE', 'BG', 'CY', 'HR', 'DK', 'ES', 'EE', 'FI', 'FR', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'CZ', 'RO', 'GB', 'SK', 'SI', 'SE'];

export default {
    props: {account: Object, plans: Object},
    data () {
        return {
            isMounted: false,
            countries: Countries,
            sending: false,
            error: null,
            card: null,
            form: {
                name: null,
                plan: this.$route.params.plan,
                country: null,
                token: null
            }
        }
    },
    created () {
        this.form.name = this.account.name
        this.form.country = this.account.country
        // this.form.plan = this.$route.params.plan

        if (!this.form.country) {
            this.$http.get('https://ip2c.org/self').then(
                response => {
                    let country = response.body.split(';')[1]
                    this.form.country = country
                },
                response => {}
            )
        }
    },
    mounted () {
        let elements = window.stripe_instance.elements()
        this.card = elements.create('card')
        this.card.mount('#card-element')
        this.isMounted = true

        this.card.addEventListener('change', (event) => {
            if (event.error) {
                this.displayError(event.error.message)
            } else {
                this.displayError(null)
            }
        })
    },
    methods: {
        process () {
            if (this.form.token == null) {
                this.error = null
                if (this.sending) {
                    return false
                }
                this.sending = true

                window.stripe_instance.createToken(this.card).then(result => {
                    if (result.error) {
                        // Inform the customer that there was an error
                        this.displayError(result.error.message)
                    } else {
                        // Send the token to your server
                        this.form.token = result.token.id
                        this.$http.post('credits/' + this.$route.params.token + '/upgrade', this.form).then(
                            response => {
                                this.displayError(null)
                                // TODO 3D Secure: https://stripe.com/docs/sources/three-d-secure
                                this.$router.push({name: 'upgrade-finished', params: {plan: this.form.plan}})
                            },
                            response => {
                                let message = 'A fatal error occured!'
                                if ('error' in response.body) {
                                    message = response.body.error
                                }
                                this.displayError(message)
                            }
                        )
                    }
                })
            }

            return false
        },
        displayError (message) {
            this.sending = false
            this.form.token = null

            if (message) {
                this.error = message
            } else {
                this.error = null
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/colors.less';

#upgrade-credit-card {
    display: none;

    &.visible {
        display: block
    }
}

form {
    width: 640px;
    margin: 0 auto;

    &>div {
        margin: 20px 0;

        &>label {
            display: block;
            color: @primary_color;
            padding-bottom: 5px;
            font-weight: 500
        }

        input, textarea, select {
            width: 100%;
            border: solid 1px #ccc;
            padding: 10px;
            color: #666666;
            display: block;
            border-radius: 4px;
            box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
            transition: all 250ms ease-in-out;
            outline: none;

            &:focus {
                border: solid 1px #bbb;
                color: #444;
                box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);
            }
        }

        select {
            background-color: #fff;
            cursor: pointer;
        }

        #card-element {
            margin-bottom: 10px
        }

        &.error {
            color: #dc3545;
            .help-block {
                margin-top: .25rem;
                font-size: 80%;
            }

            input,select,textarea, #card-element {
                border-color: #dc3545;
                box-shadow: 2px 2px 5px 0 rgba(220,53,69,.25);

                &:focus, &.StripeElement--focus {
                    box-shadow: 5px 5px 5px 0 rgba(220,53,69,.25);
                }
            }
        }
    }

    .button {
        width: 100%;
    }

    .back {
        text-align: right;
        color: #ccc;

        a {
            opacity: 0.5
        }
    }
}

.StripeElement {
    border: solid 1px #ccc;
    padding: 10px;
    color: #444;
    border-radius: 4px;
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
    transition: all 250ms ease-in-out;
}

.StripeElement--focus {
    border: solid 1px #bbb;
    color: #444;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);
}

.StripeElement--invalid {
    border-color: #fa755a;
}

.StripeElement--webkit-autofill {
    background-color: #fff !important;
}
</style>
