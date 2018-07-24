<template>
    <div>
        <template v-if="sent">
            <div class="finished">
            <h2>We are sorry to see yo go ...</h2>
            <p>
                We have successfully downgraded you to the free plan.<br />
                You won't charge your credit card anymore.
            </p>
            <p>Thank you for using PDFShift. We hope to see you back again in the future!</p>
            <p><router-link :to="{name: 'account', params: {token: $route.params.token}}" title="Go back to your account">Return to your account</router-link></p>
        </div>
        </template>
        <template v-else>
            <div class="downgrade">
                <p>
                    In order to cancel your paid subscription, please enter the reason in the field below and hit submit.<br />
                    <strong>Your unsubscription will be immediate.</strong>
                </p>
                <form @submit.prevent="downgrade">
                    <div>
                        <textarea v-model="message" cols="20" rows="5" placeholder="Please leave an honest reason - even harsh! It's the truth that will help us improve PDFShift." required />
                    </div>
                    <input type="submit" value="Downgrade to a free plan." class="button" v-bind:class="{'btn-disabled': sending}" v-bind:disabled="sending" />
                </form>

                <p>
                    Please keep in mind that we do our best to provide the best support ever!
                    Feel free to <a href="mailto:support@pdfshift.io">reach out to us</a> if you need any help!
                </p>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: null,
            sending: false,
            sent: false
        }
    },
    props: {
        account: Object,
        plans: Object
    },
    created () {
        this.$parent.header = 'Downgrading your account'
        this.$parent.subheader = 'You are about to cancel your subscription.'
    },
    methods: {
        downgrade () {
            if (this.sending) {
                return false
            }

            this.sending = true
            this.$http.post('accounts/downgrade', {message: this.message}, {headers: {'authorization': 'Bearer ' + this.$route.params.token}}).then(
                response => {
                    this.sent = true
                },
                response => {
                    this.sending = false
                    let error = 'A fatal error occured!'
                    try {
                        if ('error' in response.body) {
                            this.error = response.body.error
                        }
                    } catch (e) {}

                    alert(error)
                }
            )
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/colors.less';
@import '../../../assets/styles/forms.less';

.downgrade {
    width: 750px;
    margin: 50px auto 50px;

    h2 {
        border-bottom: solid 1px rgb(169, 126, 218);
    }

    form {
        margin: 40px 0;
        width: 100%
    }
}

.finished {
    width: 750px;
    margin: 50px auto 50px;
    background-color: rgba(169, 126, 218, .3);
    padding: 5px 50px;
    border-radius: 3px;
}

</style>
