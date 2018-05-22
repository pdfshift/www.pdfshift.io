<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    General Data Protection Regulation
                    <small>Last Edited on 2018-05-22</small>
                </h1>
            </div>
        </header>

        <div class="container">
            <div class="page">
                <!--
                List of cookies:
                    Stripe
                    Hotjar
                    Google Analytics
                Right to access
            -->

                <p>If you are a resident of the EEA, you have the following data protection rights:</p>
                    <p>
                        <ul>
                            <li>If you wish to <strong>access, correct, update, or request deletion</strong> of your personal information, you can do so at any time by emailing <a href="mailto:support@pdfshift.io" target="_blank">support@pdfshift.io</a>.</li>
                            <li>In addition, you can <strong>object to the processing</strong> of your personal information, ask us to <strong>restrict the processing</strong> of your personal information, or <strong>request portability</strong> of your personal information. Again, you can exercise these rights by emailing <a href="mailto:support@pdfshift.io" target="_blank">support@pdfshift.io</a>.</li>
                            <li>You have the right to <strong>opt-out of marketing communications</strong> we send you at any time. You can exercise this right by clicking on the "unsubscribe" or "opt-out" link in the marketing emails we send you. To opt-out of other forms of marketing, please contact us by emailing <a href="mailto:support@pdfshift.io" target="_blank">support@pdfshift.io</a>.</li>
                            <li>Similarly, if we have collected and process your personal information with your consent, then you can <strong>withdraw your consent</strong> at any time.  Withdrawing your consent will not affect the lawfulness of any processing we conducted prior to your withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</li>
                            <li>You have <strong>the right to complain to a data protection authority</strong> about our collection and use of your personal information. For more information, please contact your local data protection authority.</li>
                        </ul>
                    </p>
                    <p>
                        We use cookies to:
                        <ul>
                            <li>Help remember you.</li>
                            <li>Understand and save user's preferences for future visits.</li>
                            <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.</li>
                        </ul>
                    </p>
            </div>
        </div>

    </div>
</template>

<style lang="less" scoped>
    .container {
        max-width: 640px;
    }

    .container>div {
        margin-top: 40px;
    }

    ul {
        margin: 20px;
        li {
            list-style-type: disc;
        }
    }

    h2 {
        margin: 40px 0 20px;
    }

    p {
        line-height: 1.75em;
    }
</style>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>
