<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>Upgrade your account</h1>
            </div>
        </header>
        <div class="container">
            <template v-if="state === 'plans'">
                <div class="plans">
                    <div class="plan">
                        <h3>Starter</h3>
                        <div>
                            <div class="header">
                                <span>$</span>9
                                <p class="month">per month</p>
                            </div>
                            <ul>
                                <li><strong>1.000</strong> conversions</li>
                                <li>Up to <strong>5MB</strong> per documents</li>
                            </ul>
                        </div>

                        <div class="cta">
                            <a href="javascript:;" title="Select this plan" class="button" v-on:click="selectPlan('starter')">Upgrade to our Starter plan</a>
                        </div>
                    </div>
                    <div class="plan">
                        <h3>Growth</h3>
                        <div>
                            <div class="header">
                                <span>$</span>39
                                <p class="month">per month</p>
                            </div>
                            <ul>
                                <li><strong>10.000</strong> conversions</li>
                                <li>Up to <strong>10MB</strong> per documents</li>

                            </ul>
                        </div>

                        <div class="cta">
                            <a href="javascript:;" title="Select this plan" class="button" v-on:click="selectPlan('growth')">Upgrade to our Growth plan</a>
                        </div>
                    </div>
                    <div class="plan">
                        <h3>Business</h3>
                        <div>
                            <div class="header">
                                <span>$</span>99
                                <p class="month">per month</p>
                            </div>
                            <ul>
                                <li><strong>50.000</strong> conversions</li>
                                <li>Up to <strong>25MB</strong> per documents</li>
                            </ul>
                        </div>

                        <div class="cta">
                            <a href="javascript:;" title="Select this plan" class="button" v-on:click="selectPlan('business')">Upgrade to our Business plan</a>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="state === 'details'">
                <div class="row">
                    <div class="one-half column">
                        <div>
                            <label for="">Your name</label>
                            <input type="text" name="" />
                        </div>
                        <div>
                            <label for="">Your company name</label>
                            <input type="text" name="" value="" />
                        </div>
                        <div>
                            <label for="">Your company details</label>
                            <textarea rows="5" cols="50" name="company_details" id="" placeholder="Company name, address"></textarea>
                        </div>
                        <div>
                            <label for="">Your country</label>
                            <select id="company-details-form-country" name="country" required>
                                <optgroup>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                    <option value="IN">India</option>
                                </optgroup>
                                <optgroup label="-----------">
                                    <!-- -->
                                </optgroup>
                            </select>
                        </div>
                        <div>
                            <label for="">Your company VAT number</label>
                            <input type="text" name="company_vat" placeholder="Your company VAT number" />
                        </div>
                        <div>
                            <label for="">Your credit card details</label>
                            <input type="text" name="" placeholder="Stripe Element" />
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
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
            state: 'plans',
            type: null
        }
    },
    methods: {
        selectPlan (type) {
            this.type = type
            this.state = 'details'
        }
    }

}
</script>

<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/plans.less';
</style>
