<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    Pricing plans
                    <small>Find what you need, we'll manage the rest</small>
                </h1>
            </div>
        </header>
        <div class="container">
            <p>
                Each plans comes with a defined number of credits. A credits represent one conversion.<br />
                We recommend you to start with the Free plan and upgrade depending on your needs. It's free, why not? ;)
            </p>
            <div>
                <div class="plan">
                    <h3>Free</h3>
                    <div>
                        <div class="header">
                            <span>$</span>0
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li><strong>250</strong> credits</li>
                            <li><strong>2MB</strong> per documents</li>
                        </ul>
                    </div>

                    <div class="cta">
                        <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
                    </div>
                </div>
                <div class="plan">
                    <h3>Starter</h3>
                    <div>
                        <div class="header">
                            <span>$</span>9
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li><strong>1.000</strong> credits</li>
                            <li><strong>5MB</strong> per documents</li>
                        </ul>
                    </div>

                    <div class="cta">
                        <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
                    </div>
                </div>
                <div class="plan">
                    <h3>Growth</h3>
                    <div>
                        <div class="header">
                            <span>$</span>39
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li><strong>10.000</strong> credits</li>
                            <li><strong>10MB</strong> per documents</li>

                        </ul>
                    </div>

                    <div class="cta">
                        <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
                    </div>
                </div>
                <div class="plan">
                    <h3>Business</h3>
                    <div>
                        <div class="header">
                            <span>$</span>99
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li><strong>50.000</strong> credits</li>
                            <li><strong>25MB</strong> per documents</li>
                        </ul>
                    </div>

                    <div class="cta">
                        <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
                    </div>
                </div>
            </div>

            <ul>
                <li>
                    <h4>
                        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/money_box-64.png" />
                        Free to start
                    </h4>
                    <p>Convert up to 250 documents per month for free. Start to pay after.</p>
                </li>
                <li>
                    <h4>
                        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/speedometer-64.png" />
                        Reliable
                    </h4>
                    <p>We rely on a cluster of servers to deliver the results in a breathe.</p>
                </li>
                <li>
                    <h4>
                        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/thumb_up-64.png" />
                        Easy
                    </h4>
                    <p>Our API has been build with developer set in mind.<br />Simple, complete, elegant.</p>
                </li>
                <li>
                    <h4>
                        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/key-64.png" height="54"/>
                        Secure
                    </h4>
                    <p>Requests are made over SSL and the documents generated are never stored.</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '../assets/styles/generals.less';
@import '../assets/styles/colors.less';

    .container>p {
        text-align: center;
        margin: 60px 0;
        color: #333;
        font-style: italic;
    }

    .container>div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;

        .plan {
            &:first-child {
                margin-left: 0;
            }

            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0;
            margin-left: 20px;
            text-align: center;
            background-color: fadeout(#5c62cd, 80%);
            border: solid 1px @primary_color;
            border-radius: 5px 5px 0 0;

            h3 {
                margin: 0;
                background-color: @secondary_color;
                border-bottom: solid 5px darken(@primary_color, 10%);

                padding: 20px;
                color: #fff;
                font-weight: 600;
                text-transform: uppercase;
            }

            .header {
                font-size: 90px;
                border-bottom: 1px solid #bbb;
                padding: 10px 0 40px;
                color: #555;

                span {
                    font-size: 32px;
                }

                .month {
                    font-size: 14px;
                    color: #575757;
                    padding: 0px;
                    margin: -10px;
                }
            }

            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                li {
                    margin: 0;
                    padding: 10px;
                    border-bottom: solid 1px #bbb;
                    color: #444;
                }
            }

            .cta {
                margin: 40px 0;
                a {
                    text-decoration: none;
                    color: #fff;
                    text-transform: uppercase;
                    font-weight: bold;
                    padding: 10px 30px;
                }
            }
        }
    }

    .container>ul {
        margin-top: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;

        li {
            &:first-child {
                margin-left: 0;
            }

            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0;
            margin-left: 20px;
            padding: 0 10px;

            h4 {
                font-size: 1.2em;
                font-weight: normal;
                margin: 20px 0 10px;
                padding: 0;

                img {
                    vertical-align: middle;
                    margin-right: 20px;
                }
            }

            p {
                font-size: 0.9em;
            }
        }
    }
</style>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>
