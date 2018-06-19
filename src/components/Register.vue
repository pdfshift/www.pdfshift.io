<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>Create your account now!</h1>
            </div>
        </header>
        <div class="container" v-if="!sent">
            <router-link :to="{name: 'Login'}" class="login">Already have an account?</router-link>
            <hr />
            <form method="post" @submit.prevent="send">
                <legend>Fill the form and we will send you your <code>ACCESS_TOKEN</code> by email.</legend>
                <div class="input">
                    <label for="start-now-name">Your name</label>
                    <input type="text" name="name" placeholder="Your name" id="start-now-name" required v-model="form.name" />
                </div>
                <div class="input">
                    <label for="start-now-email">Your email</label>
                    <input type="email" name="email" placeholder="Your email" id="start-now-email" required v-model="form.email" />
                </div>
                <div class="input">
                    <label class="checkbox">
                        <input type="checkbox" name="agree" value="1" required v-model="form.agree" />
                        I agree to the <router-link :to="{name: 'Terms'}" target="_blank">Terms of Service</router-link> and the <router-link :to="{name: 'Privacy'}" target="_blank">Privacy Policy</router-link>.
                    </label>
                </div>
                <input type="submit" name="send" value="Get your API key" class="button" />
            </form>
        </div>
        <div class="container back" v-if="sent">
            <div class="message">
                <h3>Welcome aboard, {{ form.name }}!</h3>
                <p>We just sent you an email to <strong>{{ form.email }}</strong> containing your new token to start playing with PDFShift.</p>
                <p>We are happy to have you as part of the PDFShift family!</p>
                <img height="1" width="1" style="display:none" src="https://alb.reddit.com/snoo.gif?q=CAAHAAABAAoACQAAAAAB4F_gAA==&s=OiMon4vYov5k9ZQV8q1JgTh4VJgFzFql5XKHDBJNmOE="/>
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
                email: null,
                agree: false
            },
            sent: false
        }
    },
    methods: {
        send () {
            let formdata = Object.assign({}, JSON.parse(this.$root.campaign), this.form)
            this.$http.post('accounts/', formdata).then(
                response => {
                    this.$ga.event({
                        eventCategory: 'account',
                        eventAction: 'register',
                        eventLabel: 'Register'
                    })
                },
                this.handleErrorXhr
            )
            this.sent = true
            return false
        },
        handleErrorXhr (response) {
            let error = "An error occured...\nWe're sorry about it, if this continue, please contact us!"
            if ('error' in response.body) {
                error = response.body.error
            }
            alert(error)
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

        &>a.login {
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

            label.checkbox {
                cursor: pointer;

                a {
                    text-decoration: underline;
                    font-weight: bold
                }

                input {
                    width: auto;
                    display: inline-block;
                    margin-right: 10px;
                }
            }

            &>input {
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
