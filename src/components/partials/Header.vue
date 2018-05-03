<template>
    <div class="navbar" v-if="hideMenu">
        <a class="brand"><img src="../../../static/img/logo.png" alt="PDFShift" height="48" /></a>
        <nav>
            <ul>
                <router-link :to="{name: 'Account', token: $route.params.token}" tag="li"><a title="Go back to your account">Go back</a></router-link>
            </ul>
        </nav>
    </div>
    <div class="navbar" v-else>
        <router-link :to="{name: 'Home'}" class="brand"><img src="../../../static/img/logo.png" alt="PDFShift" height="48" /></router-link>
        <nav>
            <ul>
                <!--<router-link :to="{name: 'Features'}" tag="li" active-class="active"><a title="Try PDFShift for free and see for yourself">Demo</a></router-link>-->
                <router-link :to="{name: 'Features'}" tag="li" active-class="active"><a title="Get a grasp of what you can do with PDFShift!">Features</a></router-link>
                <router-link :to="{name: 'Documentation'}" tag="li" active-class="active"><a title="Read the documention and all the possibilities">Documentation</a></router-link>
                <router-link :to="{name: 'Pricing'}" tag="li" active-class="active"><a title="Our pricing plans will cover all your needs">Pricing</a></router-link>
                <router-link :to="{name: 'FAQ'}" tag="li" active-class="active"><a title="Have a question? We may have the answer!">FAQ</a></router-link>
                <router-link :to="{name: 'Register'}" tag="li" active-class="active" class="register"><a title="Register now for free and start converting your documents!" class="button">Get your free API Key</a></router-link>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data () {
        return {
            hideMenu: false
        }
    },
    created () {
        if (this.$route.meta.hideMenu) {
            this.hideMenu = true
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
        padding: 5px 10px
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
