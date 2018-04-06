<template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    <!--
                    An HTML to PDF conversion API that doesn't suck!
                    <small>Converts any HTML document to PDF with just 2 lines of code!</small>
                    -->
                    Converting HTML to PDF, Just. Got. Better.
                    <small>The HTML to PDF API you were waiting for.</small>
                </h1>

                <div class="tabs">
                    <ul>
                        <router-link :to="{name: 'Home', query: {'tab': 'javascript'}}" tag="li" active-class="active" exact replace><a>Javascript</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'python'}}" tag="li" active-class="active" exact replace><a>Python</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'php'}}" tag="li" active-class="active" exact replace><a>PHP</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'curl'}}" tag="li" active-class="active" exact replace><a>cURL</a></router-link>
                    </ul>
                    <div class="tab-content">
                        <code-section lang="javascript" :visible="isTab('javascript')">// Step 1, install PDFShift
npm install pdfshift

// Step 2, import PDFShift
const pdfshift = require('pdfshift')('120d8e8a86d2....................');
const fs = require('fs');

// Step 3, execute
pdfshift.convert('https://www.example.com').then(function (binary_file) {
fs.writeFile('invoice.pdf', binary_file, "binary", function () {})
}).catch(function({message, code, response, errors = null}) {})

// Step 4: Grab a beer and relax. You've won the web today!</code-section>
                        <code-section lang="python" :visible="isTab('python')"># Step 1, install PDFShift
pip install pdfshift

# Step 2, import PDFShift
import pdfshift, env

# Step 3, execute
pdfshift.api_key = '120d8e8a86d2....................'
result = pdfshift.convert(source=data)
with open('invoice.pdf', 'wb') as f:
    f.write(result)

# Step 4: Grab a beer and relax. You've won the web today!</code-section>
                        <code-section lang="php" :visible="isTab('php')">// Step 1, install PDFShift
composer require pdfshift/pdfshift-php

// Step 2, import PDFShift
require_once('vendor/autoload.php');
use \PDFShift\PDFShift;

// Step 3, execute
PDFShift::setApiKey('120d8e8a86d2....................');
PDFShift::convertTo('https://www.example.com', null, 'invoice.pdf');

// Step 4: Grab a beer and relax. You've won the web today!</code-section>
                        <code-section lang="bash" :visible="isTab('curl')">curl \
  -u '120d8e8a86d2....................:' \
  -d source="https://www.google.com" \
  https://api.pdfshift.io/v2/convert/ \
  -O invoice.pdf

# So simple we have this long black space available ...
#
# ...
#
# See ???
#
# Have you thought about grabing that beer? You should! :)</code-section>
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
                            <h3>High-Quality PDF</h3>
                            <p>Generate a fully structured, almost identical to the source, PDF document, in a few seconds only.</p>
                        </li>
                        <li>
                            <h3>Browser Based engine</h3>
                            <p>Our HTML to PDF conversion engine rely on a real browser and thus is capable of rendering HTML5, CSS3, SVG and, Webfonts at ease.</p>
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
                            <p>Our cluster of servers can handle many simultaneous requests, and with large files. Our RESTful endpoint has a quick learning curve.</p>
                        </li>
                        <li>
                            <h3>High Availability</h3>
                            <p>We guarantee a 99.99% uptime. And if our downtime ever causes you any problems, we will refund you!</p>
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
import CodeSection from '@/components/partials/CodeSection.vue'

export default {
    components: {
        HeaderComponent: HeaderComponent,
        CodeSection: CodeSection
    },
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

<style>
header .tabs .tab-content .code-section code {
    min-height: 325px;
}
</style>

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
