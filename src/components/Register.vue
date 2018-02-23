<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>Create your account now!</h1>
            </div>
        </header>
        <div class="container">
            <form method="post" v-if="!sent" @submit.prevent="send">
                <legend>Almost ready, fill the form and we will send you your <code>ACCESS_TOKEN</code> by email.</legend>
                <div class="input">
                    <label for="start-now-name">Your name</label>
                    <input type="text" name="name" placeholder="Your name" id="start-now-name" required v-model="form.name" />
                </div>
                <div class="input">
                    <label for="start-now-email">Your email</label>
                    <input type="email" name="email" placeholder="Your email" id="start-now-email" required v-model="form.email" />
                </div>
                <input type="submit" name="send" value="Get your API key" class="button" />
            </form>
            <div class="back" v-if="sent">
                <div class="message">
                    <h3>Thank you!</h3>
                    <p>We are currently building our service but we were notified of your interest!</p>
                    <p>We will reach out to you once everything is ready, certainly with an offer since you are an early interested party! :)</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent},
    data () {
        return {
            form: {
                name: null,
                email: null
            },
            sent: false
        }
    },
    methods: {
        send () {
            this.$http.post('/', this.form)
            this.sent = true
            return true
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/generals.less';
@import '../assets/styles/colors.less';

    .container {
        width: 600px;
    }

    form {
        color: #495057;

        legend {
            text-align: center;
            font-style: italic;
            margin: 40px 0;
        }

        .input {
            margin: 20px 0 40px;

            label {
                display: block;
                margin-bottom: 10px;
            }

            input {
                padding: 10px 10px;
                border-radius: 5px;
                border: solid 1px @primary_color;
                width: calc(100% - 20px);
                color: #495057;

                &:focus {
                    color: darken(#495057, 20%);
                    background-color: #fff;
                    border: solid 1px fade(@primary_color, 60%);
                    outline: 0;
                    box-shadow: 0 0 0 0.2rem fade(@primary_color, 40%);
                }
            }
        }

        .button {
            width: 100%;
        }
    }
</style>
