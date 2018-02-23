<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>Where did you go?!</h1>
            </div>
        </header>

        <div class="container">
            <div class="message">
                <h3>You tried to search for a page that doesn't exists</h3>
            </div>
            <p><img src="../assets/img/lost.gif" alt="Lost" /></p>
            <p>If this keep showing up, feel free to <a href="mailto:support@pdfshift.io">contact us</a>!</p>
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

.message h3 {margin: 0}

p {text-align: center; color: #333;}
</style>
