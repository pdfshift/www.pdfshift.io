<template>
    <div v-if="account">
        <header>
            <div>
                <header-component />
                <h1>Hi {{ account.firstname}}!</h1>
            </div>
        </header>
        <div class="container">
            <div class="usage">
                <h2>Your monthly usage ({{ getUsagePercentage()}}%)</h2>
                <p>
                    This month, you did <strong>{{ account.credits.used }}</strong> conversions over a total of <strong>{{ account.credits.credits }}</strong>.
                    You still have <strong>{{ account.credits.remaining }}</strong> conversions remaining left.
                </p>
                <div class="upgrade">
                    <a href="javascript:;" title="Upgrade to a bigger plan" class="button">Upgrade to a bigger plan</a>
                </div>
            </div>

            <div class="keys">
                <h2>Your API Key</h2>
                <ul>
                    <li v-for="(key, index) in account.api_keys" :key="key.created" v-bind:class="{'disabled': key.removed !== null}">
                        <template v-if="key.removed"><code>{{ key.token }}</code></template>
                        <template v-else><a href="javascript:;" title="Click to copy this API key"><code>{{ key.token }}</code></a></template>
                        <div v-if="key.removed">
                            <span class="created">
                                Disabled <time itemprop="releaseDate" :datetime="key.removed|datetime" class="time-relative">{{ key.removed|datetime }}</time>
                            </span>
                            <a href="javascript:;" title="Re-enable this API Key" class="disable" v-on:click="toggleRemoved(key.token, index)">re-enable</a>
                        </div>
                        <div v-else>
                            <span class="created">
                                Created <time itemprop="releaseDate" :datetime="key.created|datetime" class="time-relative">{{ key.created|datetime }}</time>
                            </span>
                            <a href="javascript:;" title="Disable this API Key" class="disable" v-on:click="toggleRemoved(key.token, index)">disable</a>
                        </div>
                    </li>
                </ul>
                <p>
                    <a href="javascript:;" title="Click here to create a new API token" class="create" v-on:click="createNewKey">Create a new key</a>
                </p>
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
            account: null
        }
    },
    created () {
        this.$http.get('accounts/' + this.$route.params.token).then(
            response => {
                this.account = response.body
            },
            response => {

            }
        )
    },
    methods: {
        getUsagePercentage () {
            return ((this.account.credits.used / this.account.credits.credits) * 100).toFixed(2)
        },
        toggleRemoved (token, position) {
            this.$http.post('accounts/' + this.$route.params.token + '/api/' + token).then(
                response => {
                    this.$set(this.account.api_keys, position, response.body)
                },
                response => {
                    alert('An error occured.')
                }
            )
        },
        createNewKey () {
            this.$http.post('accounts/' + this.$route.params.token + '/api/').then(
                response => {
                    this.account.api_keys.unshift(response.body)
                },
                response => {
                    alert('An error occured.')
                }
            )
        }
    }
}
</script>

<style lang="less" scoped>
.usage {

}

.keys {
    ul>li {
        margin: 5px 0;
        padding: 5px 0;
        border-top: solid 1px #eee;

        &:first-child {
            border-top: none
        }

        &.disabled {
            opacity: 0.6
        }

        div {
            float: right;

            .created {
                color: #777;
                margin-right: 20px;
            }

            .disable {
                color: #721c24
            }

        }
    }

    a.create {
        background-color: #eee;
        border: solid 1px #bbb;
        color: #333;
        padding: 10px 20px;
        margin-top: 10px;
        display: inline-block;
        text-decoration: none;

        &:hover {
            background-color: #ddd;
            color: #222
        }
    }
}
</style>
