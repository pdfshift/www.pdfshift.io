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
                    <ul>
                        <li>
                            <h3>High Quality PDF</h3>
                            <p>Generate a fully structured, almost identical to the source, PDF document, in a few seconds only.</p>
                        </li>
                        <li>
                            <h3>Browser Based engine</h3>
                            <p>Our HTML to PDF conversion engine rely on real browser and thus is capable of rendering HTML5, CSS3, SVG and Webfonts at ease.</p>
                        </li>
                        <li>
                            <h3>Advanced Options</h3>
                            <p>Set custom Headers and Footers with pagination, custom injected CSS and Javascript, encryption, watermark and many more!</p>
                        </li>
                        <li>
                            <h3>Raw HTML support</h3>
                            <p>No need to make a private page public for converting it. Simply send us the raw HTML data and we will convert it!</p>
                        </li>
                        <li>
                            <h3>Fast and Simple API</h3>
                            <p>Our cluster of server can handle many simultaneous requests, and with large files. Our RESTful endpoint has a quick learning curve.</p>
                        </li>
                        <li>
                            <h3>High Availability</h3>
                            <p>We guarantee a 99.99% uptime. And if our downtime ever causes you problem, we will refund you!</p>
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
    beforeRouteEnter (to, from, next) {
        next(vm => {
            return vm.redirect(to.query.tab)
        })
    },
    beforeRouteUpdate (to, from, next) {
        next(this.redirect(to.query.tab))
    },
    methods: {
        isTab (tab) {
            return this.$route.query.tab === tab
        },
        redirect (tab) {
            if (tab === undefined) {
                this.$router.replace({name: 'Home', query: {'tab': 'javascript'}})
                return false
            }

            return true
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
                color: @secondary_color;
                text-align: center;

                small {
                    color: #9b9fa1
                }
            }

            ul {
                margin-top: 40px;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: space-between;
                align-items: baseline;

                li {
                    width: 50%;

                    h3 {
                        font-weight: 550;
                        margin: 30px 0 10px;
                        padding: 0;

                        img {
                            vertical-align: middle;
                            margin-right: 20px;
                        }
                    }

                    p {
                        font-size: 0.9em;
                        margin: 0;
                        padding: 0;
                    }
                }
            }

            &>div {
                margin: 80px 0;
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
