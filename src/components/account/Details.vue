<template>
    <div>
        <div class="usage">
            <h2>
                You are on the
                <template v-if="account.plan">
                    &quot;{{ account.plan.name }}&quot; plan ({{ account.plan.price}}$/m).
                </template>
                <template v-else>
                    &quot;Free&quot; plan.
                </template>

                <router-link :to="{name: 'account-edit'}" title="Edit your company credentials and your name.">&raquo; Edit your details</router-link>
            </h2>
            <div class="rows">
                <div class="progression">
                    <p>Conversions used: <strong>{{ account.credits.used }} / {{ account.credits.total }}</strong>.</p>
                    <div class="progress-bar">
                        <div class="bar">
                            <div :style="'width: ' + getUsagePercentage() + '%'"></div>
                        </div>
                    </div>
                </div>
                <div class="upgrade">
                    <router-link :to="{name: 'upgrade-plans', params:{token: $route.params.token}}" title="Change your plan" class="button">Change your plan</router-link>
                </div>
            </div>
        </div>

        <div class="keys">
            <h2>Your API Key</h2>
            <ul>
                <li v-for="(key, index) in account.api_keys" :key="key.created" v-bind:class="{'disabled': key.removed !== null}">
                    <template v-if="key.removed"><code>{{ key.token }}</code> {{ key.name }}</template>
                    <template v-else>
                        <a href="javascript:;" title="Click to copy this API key"><code>{{ key.token }}</code></a>
                    </template>
                    <em v-if="key.name">{{ key.name }}</em>
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
            <p class="create">
                <a href="javascript:;" title="Click here to create a new API token" v-on:click="createNewKey">Create a new key</a>
            </p>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    props: {
        account: Object
    },
    components: {HeaderComponent: HeaderComponent},
    created () {
        this.$parent.header = 'Hi ' + this.account.firstname + '!'
        this.$parent.subheader = 'Here\'s your account breakdown'
    },
    methods: {
        getUsagePercentage () {
            return ((this.account.credits.used / this.account.credits.total) * 100).toFixed(2)
        },
        toggleRemoved (token, position) {
            this.$http.post('accounts/api/' + token, null, {headers: {'authorization': 'Bearer ' + this.$route.params.token}}).then(
                response => {
                    this.$set(this.account.api_keys, position, response.body)
                },
                this.handleErrorXhr
            )
        },
        createNewKey () {
            this.$http.post('accounts/api/', null, {headers: {'authorization': 'Bearer ' + this.$route.params.token}}).then(
                response => {
                    this.account.api_keys.unshift(response.body)
                },
                this.handleErrorXhr
            )
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/colors.less';
h2 {
    border-bottom: solid 1px lighten(@secondary_color, 30%);

    a {
        float: right;
        font-size: 0.6em;
    }
}

.rows {
    display: flex;
    flex-direction: row;

    .progression {
        width: calc(100% / 4 * 3);
        margin-right: 20px;
    }
    .upgrade {
        width: calc(100% / 4 * 1);
        margin: 35px 0 0 20px;
        text-align: right;
    }
}

.progress-bar {
    .bar {
        height: 24px;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        border: solid 1px @secondary_color;

        &>div {
            background-color: @secondary_color;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
        }
    }
}

.keys {
    margin-top: 50px;
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

        em {
            color: #777;

            &:before {
                content: '"'
            }
            &:after {
                content: '"'
            }
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

    p.create {
        text-align: right;
        a {
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
}

div.error {
    color: #721c24;
    background-color: #f8d7da;
    position: relative;
    padding: 10px 20px;
    border: 1px solid #f5c6cb;
    border-radius: .25rem;
    width: 640px;
    margin: 0 auto 40px;
}
</style>
