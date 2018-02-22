<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    An HTML to PDF conversion API that doesn't suck!
                    <small>Converts any HTML document to PDF with just 2 lines of code!</small>
                </h1>

                <div class="tabs">
                    <ul>
                        <router-link :to="{name: 'Home', query: {'tab': 'javascript'}}" tag="li" active-class="active" exact replace><a>Javascript</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'python'}}" tag="li" active-class="active" exact replace><a>Python</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'php'}}" tag="li" active-class="active" exact replace><a>PHP</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'ruby'}}" tag="li" active-class="active" exact replace><a>Ruby</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'curl'}}" tag="li" active-class="active" exact replace><a>cURL</a></router-link>
                    </ul>
                    <div class="tab-content">
                        <div v-bind:class="{'visible': isTab('javascript')}">
                            <pre><code class="javascript" v-hljs>// Step 1, install PDFShift
npm install pdfshift

// Step 2, import PDFShift
let pdfshift = require('pdfshift')

// Step 3, execute
result = pdfshift.convert(source=data)
with open('invoice.pdf', 'wb') as f:
f.write(result)

// Step 4: Grab a beer and relax. You've won the web today!</code></pre>
                        </div>
                        <div v-bind:class="{'visible': isTab('python')}">
                            <pre><code class="python" v-hljs># Step 1, install PDFShift
pip install pdfshift

# Step 2, import PDFShift
import pdfshift

# Step 3, execute
result = pdfshift(env.getenv('PDFSHIFT_KEY')).convert(source=data)
with open('invoice.pdf', 'wb') as f:
    f.write(result)

# Step 4: Grab a beer and relax. You've won the web today!</code></pre>
                        </div>
                        <div v-bind:class="{'visible': isTab('php')}">
                            <pre><code class="php" v-hljs>// Code for PHP</code></pre>
                        </div>
                        <div v-bind:class="{'visible': isTab('ruby')}">
                            <pre><code class="ruby" v-hljs>Code for Ruby</code></pre>
                        </div>
                        <div v-bind:class="{'visible': isTab('curl')}">
                            <pre><code class="bash" v-hljs>curl https://api.pdfshift.io/convert \
-u super_secret_api_key: \
-d source=html_data_base64</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="container">
            <div class="cta">
                <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
                <p>It's free and only takes 1 minute to get started!</p>
            </div>
        </div>
        <div class="alternate">
            <div class="container">
                <div class="features">
                    <h2>Why using PDFShift?</h2>
<!--
High Quality Structured PDF
Generate fully structured PDF documents with selectable / editable text and images.

Browser Based PDF Engine
Our HTML to PDF conversion engine is based on real browsers and faithfully renders HTML5/CSS3/SVG and Webfonts.

Advanced Options
Set dimensions, margins, page numbers, custom CSS, encryption, viewport, delay, and much more.

Raw HTML Support
There is no need to make your HTML publically on the web. You can pass raw HTML with POST method.

Fast & Simple HTML to PDF API
Based on a single lighning fast RestFUL HTTP url, all options are easy to pass and reason about.

Refund Guaranteed Service
We guarantee 99.99% uptime. And if our downtime ever causes you problems, we'll refund you!
-->
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
                    <div>
                        <router-link :to="{name: 'Features'}" class="button">Take a look at all the features!</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'

export default {
    components: {HeaderComponent: HeaderComponent},
    created () {
        this.$router.replace({name: 'Home', query: {'tab': 'javascript'}})
    },
    methods: {
        isTab (tab) {
            return this.$route.query.tab === tab
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import '../assets/styles/generals.less';
    @import '../assets/styles/colors.less';

    /* Website */
    header {
        .tabs {
            margin-bottom: -180px;

            &>ul {
                text-align: center;

                li {
                    display: inline-block;
                    position: relative;

                    a {
                        display: block;
                        padding: 10px 40px;
                        margin: 0;
                        text-decoration: none;
                        color: #fff;
                        font-weight: bold;
                        transition: color .25s ease, background-color 0.25s ease;
                        width: 120px;

                        &:after {
                            background: none repeat scroll 0 0 transparent;
                            bottom: 0;
                            content: "";
                            display: block;
                            height: 2px;
                            left: 50%;
                            position: absolute;
                            background-color: rgba(255, 255, 255, 0.6);
                            transition: width 0.3s ease 0s, left 0.3s ease 0s;
                            width: 0;
                        }
                    }

                    &.active>a {
                        background-color: rgba(255, 255, 255, 0.2);

                        &:after {
                            width: 100%;
                            left: 0px;
                        }
                    }
                }
            }
            .tab-content {
                margin-top: 20px;
                border: solid 2px fadeout(@primary_color, 40%);
                box-shadow: 10px 10px 10px fadeout(@primary_color, 60%);

                &>div {
                    display: none;
                    transition: 0.25s all;

                    &.visible {
                        display: block;
                    }

                    pre,code {margin: 0; padding: 0}
                    code {
                        padding: 20px;
                        min-height: 325px;
                        font-size: 18px;
                        line-height: 1.5em;
                        letter-spacing: 0.0625em;
                        word-spacing: 0.0625em;
                    }
                }
            }
        }
    }

    .container {
        .cta {
            margin-top: 240px;
            margin-bottom: 100px;
            text-align: center;

            .button {
                padding: 20px 60px;
                width: 300px;
                font-size: 1.25em;
            }

            p {

                color: #666;
            }
        }

        .features {
            margin-bottom: 0;

            h2 {
                color: @second_color;
                text-align: center;

                small {
                    color: #9b9fa1
                }
            }

            ul {
                margin-top: 40px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: baseline;

                li {
                    width: 22%;

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

            &>div {
                margin-top: 40px;
                text-align: center;
                a {
                    text-decoration: none;
                    border-radius: 0px;
                }
            }
        }
    }

    .alternate {
        background-color: @grey;
        border-top: solid 1px #c5c5c5;
        padding: 20px 0;
    }
</style>
