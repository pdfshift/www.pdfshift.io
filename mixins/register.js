export default {
    methods: {
        register () {
            if (this.sending) {
                return false
            }

            this.sending = true
            this.errors.name = null
            this.errors.email = null

            const params = Object.assign(
                {}, // Default type
                {
                    language: this.getStorageData('language', null)
                },
                JSON.parse(this.getStorageData('campaign', {})), // Campaign params
                this.form
            )

            this.$axios.post('account/', params).then(
                (response) => {
                    this.sending = false
                    this.registered = true
                    try { window.plausible('Signup') } catch (e) {}
                    try { window.signups(this.form.email) } catch (e) {}
                },
                (error) => {
                    this.sending = false

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
        },
        getStorageData (key, def = null) {
            try {
                return window.localStorage.getItem('pdfshift-' + key) || null
            } catch (e) {}

            return def
        }
    }
}
