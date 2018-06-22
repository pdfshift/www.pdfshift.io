<template>
    <div class="row" v-if="account">
        <form @submit.prevent="process">
            <div>
                <label for="edit-name">Your name</label>
                <input type="text" v-model="account.name" id="edit-name" />
            </div>
            <div>
                <label for="edit-email">Your email</label>
                <input type="email" v-model="account.email" id="edit-email" />
            </div>
            <div>
                <label for="edit-company_details">Your company details</label>
                <textarea rows="5" cols="50" v-model="account.company_details" id="edit-company_details" placeholder="Company name, address"></textarea>
            </div>
            <div>
                <label for="edit-country">Your country</label>
                <select id="edit-country" name="country" required v-model="account.country">
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
                <label for="edit-company_vat">Your company VAT number</label>
                <input type="text" placeholder="Your company VAT number" v-model="account.company_vat" id="edit-company_vat" />
            </div>
            <input type="submit" class="button" name="update" :value="submit" v-bind:class="{'btn-disabled': sending}" v-bind:disabled="sending" />
        </form>
    </div>
</template>

<script>
import Countries from '@/data/countries'

export default {
    props: {account: Object},
    data () {
        return {
            countries: Countries,
            sending: false,
            error: null,
            submit: 'Update your account',
            form: {
                name: null,
                country: null,
                token: null
            }
        }
    },
    created () {
        this.$parent.header = 'Edit your account.'
        this.$parent.subheader = ''
    },
    methods: {
        process () {
            if (this.sending) {
                return false
            }

            this.sending = true
            let formData = {
                'name': this.account.name,
                'email': this.account.email,
                'company_details': this.account.company_details,
                'company_vat': this.account.company_vat,
                'country': this.account.country
            }
            this.$http.put('accounts/', formData, {headers: {'authorization': 'Bearer ' + this.$route.params.token}}).then(
                response => {
                    this.submit = 'Profile updated! 👌'
                    setTimeout(() => {
                        this.submit = 'Update your account'
                        this.sending = false
                    }, 2500)
                },
                response => {
                    this.sending = false
                    try {
                        this.error = 'A fatal error occured!'
                        if ('error' in response.body) {
                            this.error = response.body.error
                        }
                    } catch (e) {
                        this.error = 'A fatal error occured!'
                    }
                }
            )
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/forms.less';
</style>
