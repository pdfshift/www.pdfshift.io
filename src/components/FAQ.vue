<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>Frequently Asked Questions</h1>
            </div>
        </header>

        <div class="container">
            <div>
                <h3>What about data privacy?</h3>
                <p>We take privacy very seriously! We do not store the requests nor the generated documents. It's impossible for us to take a look at what you convert.</p>
            </div>
            <div>
                <h3>Which payment methods are supported?</h3>
                <p>We rely on Stripe for the payment, which supports Visa, Mastercad, American Express, Discover, JCB, Diner's Club, 3DS and China Union Pay.</p>
            </div>
            <div>
                <h3>Do you have a free trial?</h3>
                <p>We offer a free version that includes 250 conversion requests per month for free. This covers a great majority of simple case, like generating invoices for your customers.</p>
            </div>
            <div>
                <h3>Do you offer annual plans?</h3>
                <p>Yes absolutely, with a 20% off!</p>
            </div>
            <div>
                <h3>Do I need to make a page publicly available to use PDFShift?</h3>
                <p>No, you can send the HTML instead. You don't need to put the paeg you want to convert publicly on the web.</p>
            </div>
            <div>
                <h3>What happens if I exceed my API request volume?</h3>
                <p>We will automatically notify at 75%, 90% and 100% of your credit usage. Further conversion request will fail.</p>
            </div>
            <div>
                <h3>Can I get additionnal free credits for testing?</h3>
                <p>We will offer you a better solution instead! You can use the <code>sandbox</code> parameter to generate requests for free!</p>
            </div>
            <div>
                <h3>I didn't used the <code>sandbox</code> paramter, what now?</h3>
                <p>You haven't seen it when you started testing? No problem! <a href="mailto:support@pdfshift.io">Contact us</a> and we will give you more credits the first monht!</p>
            </div>
        </div>

        <div class="cta">
            <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .container>div {
        margin-top: 40px;
    }
</style>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>

<style class="lang" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/generals.less';

</style>
