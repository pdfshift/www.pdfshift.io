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
            </div>
        </header>
        <div class="container">
            <div class="showcase">
                <div class="form">
                    <form @submit.prevent="convertDocument">
                        <div>
                            <input type="text" placeholder="Insert the URL to convert" v-model="form.source" />
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="landscape" value="false" v-model="form.landscape" > Portrait
                            </label>
                            <label>
                                <input type="radio" name="landscape" value="true" v-model="form.landscape" > Landscape
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="use_print" value="false" v-model="form.use_print" > Screen
                            </label>
                            <label>
                                <input type="radio" name="use_print" value="true" v-model="form.use_print" > Print
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="custom_css" value="true" v-model="form.custom_css" > Custom CSS
                            </label>
                            <textarea rows="3" cols="25" name="css" placeholder="body {background-color: #8E56CF !important}" v-model="form.css" v-if="form.custom_css"></textarea>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="custom_header" value="true" v-model="form.custom_header" > Custom header
                            </label>
                            <textarea rows="3" cols="25" name="header" v-model="form.header" v-if="form.custom_header"></textarea>
                        </div>
                        <div class="buttons">
                            <input type="submit" name="send" value="Try it!" :disabled="processing" />
                        </div>
                        <template v-if="finished">
                            <div class="close"><a href="javascript:;" title="Reset the form" v-on:click.prevent="closePreview">Close the preview</a></div>
                        </template>
                    </form>
                </div>
                <div class="tabs">
                    <ul>
                        <router-link :to="{name: 'Home', query: {'tab': 'javascript'}}" tag="li" active-class="active" exact replace><a>Javascript</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'python'}}" tag="li" active-class="active" exact replace><a>Python</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'php'}}" tag="li" active-class="active" exact replace><a>PHP</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'ruby'}}" tag="li" active-class="active" exact replace><a>Ruby</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'java'}}" tag="li" active-class="active" exact replace><a>Java</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'csharp'}}" tag="li" active-class="active" exact replace><a>C#</a></router-link>
                        <router-link :to="{name: 'Home', query: {'tab': 'curl'}}" tag="li" active-class="active" exact replace><a>cURL</a></router-link>
                    </ul>
                    <div class="tab-content">
                        <code-section lang="javascript" :visible="isTab('javascript')">// Step 1, install PDFShift
npm install pdfshift

// Step 2, import PDFShift
const pdfshift = require('pdfshift')('YOUR_API_KEY');
const fs = require('fs');

// Step 3, execute
pdfshift.convert('{{ sourced }}', {{ generateParams('javascript') }}).then(function (binary_file) {
    fs.writeFile('pdfshift-documentation.pdf', binary_file, "binary", function () {})
}).catch(function({message, code, response, errors = null}) {})

// Step 4: Grab a beer and relax. You've won the web today!</code-section>
                        <code-section lang="python" :visible="isTab('python')">import requests

response = requests.post(
    'https://api.pdfshift.io/v2/convert/',
    auth=('YOUR_API_KEY', ''),
    json={'source': '{{ sourced }}'}
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
    CURLOPT_POSTFIELDS => json_encode(array('source' => '{{ sourced }}')),
    CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
    CURLOPT_USERPWD => 'YOUR_API_KEY:'
));

$response = curl_exec($curl);
file_put_contents('pdfhsift-documentation.pdf', $response);

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
request.body = {source: '{{ sourced }}'}

response = http.request(request)
puts response.body</code-section>
                        <code-section lang="java" :visible="isTab('java')">String encoding = Base64.getEncoder().encodeToString("YOUR_API_KEY:".getBytes());
HttpPost httppost = new HttpPost("https://api.pdfshift.io/v2/convert/");
httppost.setHeader("Authorization", "Basic " + encoding);
httppost.setHeader("Content-type", "application/json");

HttpEntity postingString = new StringEntity("{\"source\":\"{{ sourced }}\"}");
httppost.setEntity(postingString);

CloseableHttpClient client = HttpClients.createDefault();

try (CloseableHttpResponse response = client.execute(httppost)) {
    HttpEntity entity = response.getEntity();
    // Use the entity
}</code-section>
                        <code-section lang="csharp" :visible="isTab('csharp')">HttpClient client = new HttpClient();
httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic",
        Convert.ToBase64String(
            System.Text.ASCIIEncoding.ASCII.GetBytes(
                string.Format("{0}:{1}", "YOUR_API_KEY", ""))));

var values = new Dictionary&lt;string, string&gt;
{
   { "source", "https://www.example.com" }
};

var content = new FormUrlEncodedContent(values);
var response = await client.PostAsync("https://api.pdfshift.io/v2/convert/", content);
var binaryPdf = await response.Content.ReadAsByteArrayAsync();</code-section>
                        <code-section lang="bash" :visible="isTab('curl')">curl \
  -u 'YOUR_API_KEY:' \
  -d source="{{ sourced }}" \
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
                    <div class="preview" v-if="processing" :class="{'visible': processing}">
                        <template v-if="finished">
                            <div>
                                <div><a href="javascript:;" title="Close this preview" v-on:click.prevent="closePreview">&times;</a></div>
                                <object :data="'data:application/pdf;base64,' + pdfResult" type="application/pdf">
                                    <embed :src="'data:application/pdf;base64,' + pdfResult" type="application/pdf" />
                                </object>
                            </div>
                        </template>
                        <template v-else>
                            <img src="../../static/img/loader.gif" />
                        </template>
                    </div>
                </div>
            </div>

            <div class="cta">
                <router-link :to="{name: 'Register'}" class="button">Get my API key</router-link>
                <p>It's free and only takes 1 minute to get started!</p>
            </div>
        </div>
        <div class="alternate">
            <div class="container">
                <div class="features">
                    <h2>Why are we better?</h2>
                    <ul>
                        <li>
                            <h3>High-Quality PDF</h3>
                            <p>Generate a fully structured, high-quality PDF document, in a few seconds only.</p>
                        </li>
                        <li>
                            <h3>Browser Based engine</h3>
                            <p>Our HTML to PDF conversion engine relies on a real browser and thus is capable of rendering HTML5, CSS3, SVG and, Webfonts at ease.</p>
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
    data () {
        return {
            form: {
                source: 'https://www.pdfshift.io/documentation',
                landscape: 'false',
                use_print: 'false',
                custom_css: false,
                custom_header: false,
                css: null,
                header: null
            },
            processing: false,
            finished: false,
            pdfResult: null
        }
    },
    computed: {
        sourced () {
            if (this.form.source.substr(0, 1) === '<') {
                return this.form.source
            }

            if (this.form.source.toLowerCase().substr(0, 4) !== 'http') {
                return 'http://' + this.form.source
            }

            return this.form.source
        }
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
        },
        convertDocument () {
            this.processing = true
            let params = {
                source: this.sourced,
                landscape: this.form.landscape,
                use_print: this.form.use_print,
                encode: false
            }

            if (this.form.css) {
                params['css'] = this.form.css
            }

            if (this.form.header) {
                params['header'] = this.form.header
            }

            this.$http.post('http://77.193.92.35:5000/v2/convert/', params).then(
                response => {
                    this.pdfResult = response.data
                    this.finished = true
                },
                response => {

                }
            )
        },
        closePreview () {
            this.pdfResult = null
            this.finished = false
            this.processing = false
        },
        generateParams (language) {
            switch (language) {
                case 'javascript':
                    return this._getOptionsJavascript()
            }
        },
        _getOptionsJavascript () {
            let options = {
                landscape: this.form.landscape === 'true',
                use_print: this.form.use_print === 'true'
            }

            if (this.form.css) {
                options['css'] = this.form.css
            }

            if (this.form.header) {
                options['header'] = this.form.header
            }

            return JSON.stringify(options)
        }
    }
}
</script>

<style>
header .tabs .tab-content .code-section code {
    min-height: 325px;
}
</style>

<style>
    .showcase code {
        max-height: 425px;
        min-height: 425px;
    }
</style>

<style lang="less" scoped>
    @import '../assets/styles/generals.less';
    @import '../assets/styles/colors.less';

    /* Website */

    header {
        padding-bottom: 200px;
    }

    .showcase {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        margin-top: -250px;
        position: relative;

        .form {
            width: 30%;
            margin: 34px 0 0 0;

            background-color: #fff;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
            border: solid 1px #ccc;
            border-radius: 5px;
            padding: 0 20px;

            form {
                margin: 0;
                padding: 0;
                font-size: 13px;
                color: #444;

                div {
                    margin: 20px 0;

                    input[type="text"] {
                        padding: 10px;
                        border: solid 1px #ccc;
                        color: #444;
                        width: 100%
                    }

                    &.radio {
                        label {
                            margin: 0 10px;
                            cursor: pointer;
                        }
                    }

                    &.checkbox {
                        label {
                            margin: 0 10px;
                            display: block;
                            cursor: pointer;
                        }

                        textarea {
                            display: block;
                            width: calc(100% - 10px);
                            padding: 10px;
                            margin: 5px 0 0 10px;
                            border: solid 1px #ccc;
                            color: #222;
                            height: 60px;
                        }
                    }
                }

                .close {
                    text-align: center;
                    font-style: italic;
                    a {
                        color: lighten(#721c24, 15%) !important;
                        font-size: 1.1em
                    }
                }

                input[type="submit"] {
                    width: 100%
                }
            }
        }

        .tabs {
            width: calc(70% - 20px);
            margin-left: 20px;
            position: relative;

            &>ul {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                li {
                    a {
                        position: relative;
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
                box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
            }

            .preview {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.7);
                opacity: 0;
                transition: opacity 0.35s ease-in-out;
                border-radius: 4px 4px 0 0;
                &.visible {opacity: 1}

                display: flex;
                justify-content: center;
                align-items: center;

                >div {
                    background-color: #000;
                    border-radius: 4px 4px 0 0;
                    width: 100%;
                    height: 100%;

                    >div {
                        text-align: right;
                        font-size: 2em;
                        padding-right: 10px;
                        height: 36px;

                        a {
                            text-decoration: none;
                            color: #ddd !important;
                        }
                    }
                    object {
                        width: 100%;
                        height: calc(100% - 36px);
                    }
                }
            }
        }

        input[type="submit"] {
            padding: 15px 20px;
            outline: none;
            background-color: #6772e5;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            transition: all .15s ease;

            &:hover {
                background-color: #7795f8;
                transform: translateY(-1px);
            }

            &[disabled] {
                opacity: 0.7;
                cursor: default;

                &:hover {
                    background-color: #6772e5;
                    transform: none;
                }
            }
        }
    }

    .container {
        .cta {
            margin-top: 80px;
            margin-bottom: 80px;
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
