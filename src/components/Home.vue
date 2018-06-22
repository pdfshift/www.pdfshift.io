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
                    <small>The HTML to PDF API you were waiting for!</small>
                </h1>

                <div class="tabs">
                    <ul>
                        <router-link :to="{name: 'Home', query: {'tab': 'javascript'}}" tag="li" active-class="active" exact replace><a>Javascript</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'python'}}" tag="li" active-class="active" exact replace><a>Python</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'php'}}" tag="li" active-class="active" exact replace><a>PHP</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'ruby'}}" tag="li" active-class="active" exact replace><a>Ruby</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'java'}}" tag="li" active-class="active" exact replace><a>Java</a></router-link>
                        <!--<router-link :to="{name: 'Home', query: {'tab': 'csharp'}}" tag="li" active-class="active" exact replace><a>C#</a></router-link>-->
                        <router-link :to="{name: 'Home', query: {'tab': 'curl'}}" tag="li" active-class="active" exact replace><a>cURL</a></router-link>
                    </ul>
                    <div class="tab-content">
                        <code-section lang="javascript" :visible="isTab('javascript')">// Step 1, install PDFShift
npm install pdfshift

// Step 2, import PDFShift
const pdfshift = require('pdfshift')('YOUR_API_KEY');
const fs = require('fs');

// Step 3, execute
pdfshift.convert('https://pdfshift.io/documentation').then(function (binary_file) {
fs.writeFile('pdfshift-documentation.pdf', binary_file, "binary", function () {})
}).catch(function({message, code, response, errors = null}) {})

// Step 4: Grab a beer and relax. You've won the web today!</code-section>
                        <code-section lang="python" :visible="isTab('python')">import requests

response = requests.post(
    'https://api.pdfshift.io/v2/convert/',
    auth=('YOUR_API_KEY', ''),
    json={'source': 'https://pdfshift.io/documentation'}
)

response.raise_for_status()

with open('pdfshift-documentation.pdf', 'wb') as f:
    f.write(response.content)

# We also have a package to simplify your work:
# https://pypi.org/project/pdfshift/</code-section>
                        <code-section lang="php" :visible="isTab('php')">&lt;?php
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.pdfshift.io/v2/convert/",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode({'source': 'https://pdfshift.io/documentation'}),
    CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
    CURLOPT_USERPWD => 'YOUR_API_KEY:'
));

$response = curl_exec($curl);
file_put_content('pdfhsift-documentation.pdf', $response);

// We also have a package to simplify your work:
// https://packagist.org/packages/pdfshift/pdfshift-php</code-section>
                        <code-section lang="ruby" :visible="isTab('ruby')">require 'uri'
require 'net/http'

url = URI("https://api.pdfshift.io/v2/convert/")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url, 'Content-Type' => 'application/json')
request.basic_auth('YOUR_API_KEY', '')
request.body = {source: 'https://pdfshift.io/documentation'}

response = http.request(request)
puts response.body</code-section>
                        <code-section lang="java" :visible="isTab('java')">String encoding = Base64Encoder.encode ("YOUR_API_KEY:");

HttpPost httppost = new HttpPost("https://api.pdfshift.io/v2/convert/");
httppost.setHeader("Authorization", "Basic " + encoding);
httppost.setHeader("Content-type", "application/json");

StringEntity postingString = new StringEntity("{\"source\":\"https://pdfshift.io/documentation\"}");
httppost.setEntity(postingString);
HttpResponse response = httpclient.execute(httppost);
HttpEntity entity = response.getEntity();</code-section>
                        <code-section lang="csharp" :visible="isTab('csharp')"></code-section>
                        <code-section lang="bash" :visible="isTab('curl')">curl \
  -u 'YOUR_API_KEY:' \
  -d source="https://pdfshift.io/documentation" \
  https://api.pdfshift.io/v2/convert/ \
  -o pdfhsift-documentation.pdf

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
                        padding: 10px 20px 5px;
                        margin: 0;
                        text-decoration: none;
                        color: #fff;
                        font-weight: bold;
                        transition: color .25s ease, background-color 0.25s ease;
                        min-width: 100px;
                        text-align: center;

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

                        &:hover {
                            background-color: rgba(255, 255, 255, 0.1);
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
                margin-top: 0px;
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
