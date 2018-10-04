<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    Get more free conversions
                    <small>You can do these points to get more free credits</small>
                </h1>
            </div>
        </header>

        <div class="container">
            <div class="description">
                <p>
                    You can do the following options to get more free credits.<br />
                    For each actions, please <strong>send us either a screenshot or a link</strong> and we will update your account accordingly.
                </p>
            </div>
            <ul class="options">
                <li>
                    <div>
                        Talk about us on Twitter (<a href="http://bit.ly/pdfshift-on-twitter" target="_blank">Here's a quick tweet if you like</a>)
                        <strong>+50 credits</strong>
                    </div>
                </li>
                <li>
                    <div>
                        Review us on <a href="https://alternativeto.net/software/pdfshift/" target="_blank">AlternativeTo</a>
                        <strong>+100 credits</strong>
                    </div>
                </li>
                <li>
                    <div>
                        Add your review on <a href="https://www.g2crowd.com/products/pdfshift/reviews" target="_blank">G2Crowd</a>
                        <strong>+100 credits</strong>
                    </div>
                </li>
                <li>
                    <div>
                        Write a blog post talking about PDFShift
                        <strong>+350 credits</strong>
                    </div>
                </li>
                <li>
                    <div>
                        Mention PDFShift in the footer of your website
                        <strong>+150 credits</strong>
                    </div>
                </li>
            </ul>
            <div class="cta">
                <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>

<style lang="less" scoped>
    @import '../assets/styles/generals.less';
    @import '../assets/styles/colors.less';
    .container {
        max-width: 640px;
    }

    .container>div {
        margin-top: 40px;
    }

    .container>div.cta {
        margin: 80px 0;
        text-align: center;
        a {
            padding: 20px 150px;
        }
    }

    .description {
        color: #444;
        font-style: italic
    }

    ul.options {
        padding-left: 20px;
        list-style-type: disclosure-closed;
        >li {
            margin: 10px 0;
            color: #222
        }
    }

</style>
