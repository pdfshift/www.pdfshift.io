<template>
    <div v-if="!hideMenu">
        <div class="navbar" v-if="showBack">
            <nav style="margin: 20px 0 -28px">
                <ul>
                    <router-link :to="{name: 'account', params: {token: $route.params.token}}" tag="li"><a title="Go back to your account">Return to your account</a></router-link>
                </ul>
            </nav>
        </div>
        <div class="navbar" v-else>
            <router-link :to="{name: 'Home'}" class="brand"><img src="../../../static/img/logo.png" alt="PDFShift" height="36" /></router-link>
            <a href="javascript:;" v-on:click="toggleMenu" class="nav--toggle">☰</a>
            <nav v-bind:class="{'nav--hide': !showMobileMenu}">
                <ul>
                    <!--<router-link :to="{name: 'Features'}" tag="li" active-class="active"><a title="Try PDFShift for free and see for yourself">Demo</a></router-link>-->
                    <router-link :to="{name: 'Features'}" tag="li" active-class="active"><a title="Get a grasp of what you can do with PDFShift!">Features</a></router-link>
                    <router-link :to="{name: 'Documentation'}" tag="li" active-class="active"><a title="Read the documention and all the possibilities">Documentation</a></router-link>
                    <router-link :to="{name: 'Pricing'}" tag="li" active-class="active"><a title="Our pricing HTML to PDF pricing plans will cover all your conversion needs">Pricing</a></router-link>
                    <router-link :to="{name: 'FAQ'}" tag="li" active-class="active"><a title="Have a question? We may have the answer!">FAQ</a></router-link>
                    <router-link :to="{name: 'Register'}" tag="li" active-class="active" class="register"><a title="Register now for free and start converting HTML to PDF!" class="button">Get my free API Key</a></router-link>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'hideMenu': {
            type: Boolean,
            default: false
        },
        'showBack': {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            showMobileMenu: false
        }
    },
    methods: {
        toggleMenu () {
            this.showMobileMenu = !this.showMobileMenu
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/generals.less';
@import '../../assets/styles/colors.less';

.navbar {
    margin: 20px 0;

    .brand {
        color: #fff;
        font-size: 1.2em;
        font-weight: bold;
        text-decoration: none;
        float: left;
        padding: 15px 10px 5px
    }

    nav ul {
        float: right;
        margin: 10px 0 0;

        li {
            display: inline-block;
            position: relative;

            a {
                color: #fff;
                text-decoration: none;
                text-align: center;
            }

            &:not(.register) {
                a {
                    padding: 5px 10px;
                    margin: 0;

                    &:after {
                        background: none repeat scroll 0 0 transparent;
                        bottom: -10px;
                        content: "";
                        display: block;
                        height: 2px;
                        left: 50%;
                        position: absolute;
                        background-color: rgba(255, 255, 255, 0.75);
                        transition: width 0.3s ease 0s, left 0.3s ease 0s;
                        width: 0;
                    }

                    &:hover:after {
                        width: 100%;
                        left: 0px;
                    }
                }

                &.active a:after {
                    width: 100%;
                    left: 0px;
                }
            }

            &.register {
                margin-left: 40px;
            }
        }
    }

    .clearfix()
}
</style>
