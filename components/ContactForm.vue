<template>
    <div>
        <p class="excerpt">
            Our team is happy to answer your sales questions.<br />
            Fill out the form below and we will be in touch as soon as possible
        </p>

        <form method="post" @submit.prevent="send">
            <template v-if="!isSent">
                <div class="row">
                    <div class="column six">
                        <div class="form-element" :class="{'error': errors.name}">
                            <input ref="firstField" v-model="form.name" type="text" name="name" placeholder="Full name" required />
                            <p v-if="errors.name" class="error">{{ errors.name }}</p>
                        </div>
                    </div>
                    <div class="column six">
                        <div class="form-element" :class="{'error': errors.email}">
                            <input v-model="form.email" type="email" name="email" placeholder="Email address" required />
                            <p v-if="errors.email" class="error">{{ errors.email }}</p>
                        </div>
                    </div>
                </div>
                <div class="form-element" :class="{'error': errors.message}">
                    <textarea v-model="form.message" rows="5" cols="50" name="message" placeholder="Please describe the reason you need to talk to us." minlength="25" required></textarea>
                    <p v-if="errors.message" class="error">{{ errors.message }}</p>
                </div>

                <input type="submit" name="send" value="Send my message" class="button" :class="{'button-primary': main, 'button-secondary': !main, 'button-disabled': isSending}" />
            </template>
            <div v-else class="success">
                Thank you for contacting us.<br />
                We will respond to your inquiry shortly.
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        main: {
            default: false,
            type: Boolean
        }
    },
    data () {
        return {
            isSending: false,
            isSent: false,
            form: {
                name: null,
                email: null,
                message: null
            },
            errors: {
                name: null,
                email: null,
                message: null
            }
        }
    },
    mounted () {
        if (this.main) {
            setTimeout(() => {
                this.$refs.firstField.focus()
            }, 250)
        }
    },
    methods: {
        send () {
            if (this.isSending) {
                return
            }

            this.isSending = true
            this.errors.name = null
            this.errors.email = null
            this.errors.message = null

            this.$axios.post('website/contact', this.form).then(
                (response) => {
                    this.isSending = true
                    this.form.name = null
                    this.form.email = null
                    this.form.message = null
                    this.isSent = true
                },
                (error) => {
                    this.isSending = false

                    try {
                        const errors = error.response.data.errors
                        const first = Object.keys(errors)[0]
                        if (typeof errors[first] === 'object') {
                            this.errors[first] = errors[first][0]
                        } else {
                            this.errors[first] = errors[first]
                        }
                        return null
                    } catch (e) {}

                    this.errors.name = error.response?.data?.error || 'An error occured'
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_common';
form {
    .success {
        text-align: center;
        color: lighten(#155724, 10%);
    }
}

p.excerpt {
    color: $color-white;
}
</style>
