<template>
    <div class="row">
        <form @submit.prevent>
            <div>
                <label for="stripe-name">Your name</label>
                <input type="text" v-model="form.name" id="stripe-name" required />
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
            <div>
                <label for="">Your credit card details</label>
                <div id="card-element"></div>
                <div id="card-errors" role="alert"></div>
            </div>
            <input type="submit" class="button" name="pay" value="Subscribe to our Growth plan (39$/mo)" />
            <div class="back">
                <router-link :to="{name: 'upgrade-plans'}">Choose another plan</router-link>
            </div>
        </form>
    </div>
</template>

<script>
/* global window */
import Countries from '@/data/countries'

export default {
    props: {account: Object},
    data () {
        return {
            countries: Countries,
            form: {
                name: null,
                country: null,
                stripe: null
            }
        }
    },
    created () {
        this.form.name = this.account.name
        this.form.country = this.account.country

        if (!this.form.country) {
            this.$http.get('https://ip2c.org/self').then(
                response => {
                    let country = response.body.split(';')[1]
                    this.form.country = country
                    console.log(this.form.country)
                },
                response => {}
            )
            console.log('null')
        }
    },
    mounted () {
        let elements = window.stripe_instance.elements()
        let card = elements.create('card')
        card.mount('#card-element')
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
// @import '../../assets/styles/forms.less';

@import '../../assets/styles/colors.less';

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
