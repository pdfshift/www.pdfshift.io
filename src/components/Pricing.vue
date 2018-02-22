<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    Pricing
                </h1>
            </div>
        </header>

        <div class="half">
            <p>You only pay for what you use. The first 250 convertions each month are free. You will only be billed if you convert more than 250 documents.</p>

            <div>
                <div class="header">
                    <span>Documents processed by the API</span>
                    <span>Price per documents</span>
                </div>
                <div class="entry">
                    <span>First <strong>250 documents</strong> per month</span>
                    <span class="success">Free</span>
                </div>
                <div class="entry">
                    <span>Next <strong>9 750 documents</strong> per month</span>
                    <span><strong>$0.01</strong> per document</span>
                </div>
                <div class="entry">
                    <span>After <strong>10 000 documents</strong> per month</span>
                    <span><strong>$0.005</strong> per document</span>
                </div>
            </div>
        </div>
        <div class="half">
            <p>There are no subscription costs, <strong>no file size limits</strong> and no minimum fees. Only successful compressions will be charged.</p>
            <div class="price-calculator">
                <h4>Price calculator</h4>
                <p>Compressed images: <span>250</span></p>
                <div class="progress-bar">
                    <span></span>
                </div>
                <div class="price">
                    <strong>$<span>6 065</span></strong> per month.
                </div>
            </div>
        </div>
        <div class="cta">
            <a href="#start-now" class="button">Get your API key</a>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>
