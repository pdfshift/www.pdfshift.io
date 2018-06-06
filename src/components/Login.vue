<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>Login to your account</h1>
            </div>
        </header>
        <div class="container" v-if="!sent">
            <router-link :to="{name: 'Register'}" class="register">New here? Create your account.</router-link>
            <hr />
            <form method="post" @submit.prevent="send">
                <legend>Indicate the email you used to create your account<br />we will send you a one-time login link.</legend>
                <div class="input">
                    <label for="login-email">Your email</label>
                    <input type="email" name="email" placeholder="Your email" id="login-email" required v-model="form.email" />
                </div>
                <input type="submit" name="send" value="Log in to your account" class="button" v-bind="{'disabled': sending}"/>
            </form>
        </div>
        <div class="container back" v-if="sent">
            <div class="message">
                <h3>Welcome back, {{ form.name }}!</h3>
                <p>We just sent you an email at <strong>{{ form.email }}</strong> to access your accounts details.</p>
                <p>If you don't receive anything, feel free to contact us at <a href="mailto:support@pdfshift.io">support@pdfshift.io</a>.</p>
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
                email: null
            },
            sent: false,
            sending: false
        }
    },
    methods: {
        send () {
            if (this.sending) {
                return
            }
            this.sending = true
            this.$http.post('accounts/login', this.form).then(
                response => {
                    this.form.name = response.body.name
                    this.sending = false
                    this.sent = true
                    this.$ga.event({
                        eventCategory: 'account',
                        eventAction: 'login',
                        eventLabel: 'Login'
                    })
                },
                this.handleErrorXhr
            )

            return false
        },
        handleErrorXhr (response) {
            try {
                if ('error' in response.body) {
                    alert(response.body.error[Object.keys(response.body.error)[0]])
                }
            } catch (e) {
                alert("An error occured...\nWe're sorry about it, if this continue, please contact us!")
            }
            this.sent = false
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/generals.less';
@import '../assets/styles/colors.less';

    .container {
        width: 600px;

        &>a.register {
            text-align: center;
            display: block;
            margin: 20px 0
        }
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
