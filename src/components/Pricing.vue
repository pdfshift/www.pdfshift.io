<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    Pricing plans
                    <small>Find what you need, we'll manage the rest</small>
                </h1>
            </div>
        </header>
        <div class="container">
            <div>
                <div class="plan">
                    <h3>Free</h3>
                    <div class="plan">
                        <div class="header">
                            <span>$</span>0
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li>250 credits</li>
                            <li>2MB per documents</li>
                        </ul>
                    </div>

                    <div class="price">
                        <a href="#" class="bottom"><p class="cart">Add to cart</p></a>
                    </div>
                </div>
                <div class="plan">
                    <h3>Lite plan</h3>
                    <div class="plan">
                        <div class="header">
                            <span>$</span>9
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li>1.000 credits</li>
                            <li>5MB per documents</li>
                        </ul>
                    </div>

                    <div class="price">
                        <router-link :to="{name: 'Register'}">Get your API key</router-link>
                    </div>
                </div>
                <div class="plan">
                    <h3>Medium plan</h3>
                    <div class="plan">
                        <div class="header">
                            <span>$</span>39
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li>10.000 credits</li>
                            <li>10MB per documents</li>

                        </ul>
                    </div>

                    <div class="price">
                        <router-link :to="{name: 'Register'}">Get your API key</router-link>
                    </div>
                </div>
                <div class="plan">
                    <h3>Full</h3>
                    <div class="plan">
                        <div class="header">
                            <span>$</span>99
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li>50.000 credits</li>
                            <li>25MB per documents</li>
                        </ul>
                    </div>

                    <div class="price">
                        <router-link :to="{name: 'Register'}">Get your API key</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
</style>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>
