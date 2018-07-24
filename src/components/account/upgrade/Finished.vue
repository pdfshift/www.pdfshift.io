<template>
    <div>
        <div class="finished">
            <h2>YEAH! You are now on the {{ plans[$route.params.plan].display }} plan!</h2>
            <p>Thank you for subscribing to our service!</p>
            <p>Your account is now updated and you will receive your invoice by email pretty soon.</p>
            <p>Feel free to <a href="mailto:support@pdfshift.io">reach out to us</a> if you have any questions!</p>
            <p style="text-align: center; margin-top: 40px">
                <router-link :to="{name: 'Account', token: $route.params.token}" class="button" title="Go back to your account">Go back to your account</router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        account: Object,
        plans: Object
    },
    created () {
        this.$parent.header = 'Thank you!'
        this.$parent.subheader = 'Your account has been upgraded :)'
    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/styles/colors.less';

.finished {
    width: 750px;
    margin: 50px auto 50px;
    background-color: rgba(169, 126, 218, .3);
    padding: 5px 50px;
    border-radius: 3px;
}

</style>
