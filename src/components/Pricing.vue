<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    PDFShift is free to get started!
                    <small>Get up and running for free with <strong>250 conversions</strong> per month<br />and <strong>up to 1Mb per documents.</strong></small>
                    <div class="cta">
                        <router-link :to="{name: 'Register'}" class="button">Get your free API key</router-link>
                        <small>
                            Instant access to your API key, no credit cards required.<br />
                            Start generating PDFs in a minute!
                        </small>
                    </div>
                </h1>
            </div>
        </header>
        <div class="container">
            <div class="plans-inline">
                <div class="options">
                    <h3>Want to get more conversions for free?</h3>
                    <p>We offer two possibilities to increase your monthly usage for free, maybe it would interest you?</p>

                    <ul>
                        <li>
                            <h4>Get +50 credits by sharing PDFShift on Twitter</h4>
                            <p>Tweet about PDFShift, let us know and we will add 50 credits to your monthly usage.</p>
                        </li>
                        <li>
                            <h4>Get +250 credits by writing a blog post about PDFShift</h4>
                            <p>Write a blog post talking about PDFShift. It can be technical or not.<br />
                                We will happily add +250 credits to your monthly usage.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <h2>Need more? Upgrade to bigger volumes!</h2>
            <div class="plans">
                <p class="description">
                    Each plan comes with a defined number of conversions. A conversion represents one document converted.<br />
                    We recommend you to start with the Free plan and upgrade depending on your needs. It's free, why not? ;)
                </p>
                <div class="plan">
                    <h3>Starter</h3>
                    <div>
                        <div class="header">
                            <span>$</span>9
                            <p class="month">per month</p>
                        </div>
                        <ul>
                            <li><strong>1,000</strong> conversions</li>
                            <li>Up to <strong>5MB</strong> per documents</li>
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
                            <li><strong>10,000</strong> conversions</li>
                            <li>Up to <strong>10MB</strong> per documents</li>

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
                            <li><strong>50,000</strong> conversions</li>
                            <li>Up to <strong>25MB</strong> per documents</li>
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
                    <p>We rely on a cluster of servers to deliver the results in a breeze.</p>
                </li>
                <li>
                    <h4>
                        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/thumb_up-64.png" />
                        Easy
                    </h4>
                    <p>Our API has been built for developer specifically.<br />Simple, complete, elegant.</p>
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

    header {
        h1 {
            margin-bottom: 20px;

            &>small {
                margin-top: 20px;
                font-weight: normal;
                opacity: 0.85;
                line-height: 1.5em;

                strong {
                    font-style: italic;
                }
            }
        }

        .cta {
            margin-top: 20px;
            font-size: 16px;
            line-height: 1em;

            .button {
                background-color: #eee;
                color: #333;
                margin: 20px 0;
                padding: 20px 80px;
                transition: all 0.25s ease-in-out;

                &:hover {
                    background-color: #fff;
                    color: #555;
                    box-shadow: 0 0 20px #fff;
                }
            }

            small {
                font-size: 0.8em;
                font-weight: normal;
                letter-spacing: 1px;
            }
        }
    }

    .container {
        text-align: center;
        letter-spacing: 0.05em;
    }

    .container>p {
        text-align: center;
        margin: 60px 0;
        color: #333;
        font-style: italic;
    }

    .container>.plans-inline {
        margin: 40px 0;

        .cta {
            margin: 25px 0;

            &>a {
                margin-bottom: 25px;
                padding: 25px 100px;
            }
        }

        small {
            display: block;
        }

        .options {
            margin: 60px 0;
            background-color: #eee;
            padding: 20px;

            h3 {
                margin-bottom: 10px
            }

            h4 {
                margin: 40px 0 5px;
                padding: 0;
            }

            p {
                margin: 0;
                padding: 0;
            }

            ul {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: baseline;

                &>li {
                    flex-grow: 1;
                    flex-shrink: 1;
                    flex-basis: 0;
                    line-height: 1.5em;

                    &:first-child {
                        margin-right: 100px
                    }
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

    .plans {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: baseline;

        .description {
            flex-basis: 100%;
            text-align: center;
            margin-bottom: 40px;
        }

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
</style>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent}
}
</script>
