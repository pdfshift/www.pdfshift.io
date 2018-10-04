<template>
    <div class="home">
        <header>
            <div>
                <header-component />
                <h1>
                    <!--
                    An HTML to PDF conversion API that doesn't suck!
                    <small>Converts any HTML document to PDF with just 2 lines of code!</small>
                    ---
                    Converting HTML to PDF, Just. Got. Better.
                    <small>The HTML to PDF API you were waiting for!</small>
                    -->
                    Convert HTML documents to PDF<br />
                    In one simple POST request!
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
                        <div class="error" v-if="error">
                            {{ error }}
                        </div>
                        <div class="buttons">
                            <input type="submit" name="send" value="Try it!" :disabled="sending" />
                        </div>
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
const pdfshift = require('pdfshift')('{{ user_api_key }}');
const fs = require('fs');

// Step 3, execute
pdfshift.convert('{{ sourced }}', {{ generateParams('javascript') }}).then(function (binary_file) {
    fs.writeFile('pdfshift-documentation.pdf', binary_file, "binary", function () {})
}).catch(function({message, code, response, errors = null}) {})

// Step 4: Grab a beer and relax. You've won the web today!</code-section>
                        <code-section lang="python" :visible="isTab('python')">import requests

response = requests.post(
    'https://api.pdfshift.io/v2/convert/',
    auth=('{{ user_api_key }}', ''),
    json={{ generateParams('python') }}
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
    CURLOPT_POSTFIELDS => json_encode({{ generateParams('php') }}),
    CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
    CURLOPT_USERPWD => '{{ user_api_key }}:'
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
request.basic_auth('{{ user_api_key }}', '')
request.body = {{ generateParams('ruby') }}

response = http.request(request)
puts response.body</code-section>
                        <code-section lang="java" :visible="isTab('java')">String encoding = Base64.getEncoder().encodeToString("{{ user_api_key }}:".getBytes());
HttpPost httppost = new HttpPost("https://api.pdfshift.io/v2/convert/");
httppost.setHeader("Authorization", "Basic " + encoding);
httppost.setHeader("Content-type", "application/json");

HttpEntity postingString = new StringEntity({{ generateParams('java') }});
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
                string.Format("{0}:{1}", "{{ user_api_key }}", ""))));

var values = new Dictionary&lt;string, string&gt;
{
{{ generateParams('csharp') }}
};

var content = new FormUrlEncodedContent(values);
var response = await client.PostAsync("https://api.pdfshift.io/v2/convert/", content);
var binaryPdf = await response.Content.ReadAsByteArrayAsync();</code-section>
                        <code-section lang="bash" :visible="isTab('curl')">curl \
  -u '{{ user_api_key }}:' \
{{ generateParams('bash') }}
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
                    <div class="loading" v-if="processing && !finished" :class="{'visible': processing}">
                        <img src="../../static/img/loader.gif" />
                    </div>
                    <div class="preview" v-if="processing && finished" :class="{'visible': processing}">
                        <div class="header"><a href="javascript:;" title="Close this preview" v-on:click.prevent="closePreview">&times;</a></div>
                        <div>
                            <a :href="result.url" target="_blank" title="Preview the result">
                                <img src="../../static/img/pdf-icon.png" alt="pdf" />
                                <span>
                                    result.pdf<br />
                                    <small>({{ result.filesize }}Mb)</small>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cta">
                <router-link :to="{name: 'Register'}" class="button">Get my free API key</router-link>
                <p>It's free and only takes 1 minute to get started!</p>
            </div>
        </div>
        <div id="testimonials" class="alternate">
            <div class="container">
                <h2>
                    <span>Testimonials</span>
                </h2>

                <agile :fade="true">
                    <div class="slide" v-for="t in tweets" v-bind:key="t.url">
                        <img :src="'https://avatars.io/twitter/' + t.handler" v-bind:alt="t.name + ' \'s avatar'" />
                        <h4>{{ t.name }}<span>@{{ t.handler }}</span></h4>
                        <p v-html="twitter(t.message)"></p>
                        <div class="link"><a :href="t.url" v-bind:title="'View ' + t.name + '\'s message on Twitter'">View on Twitter</a></div>
                    </div>
                </agile>
                <div class="clearfix"></div>
            </div>
        </div>
        <div>
            <div class="container">
                <div class="features">
                    <h2>
                        <span>Why are we better?</span>
                    </h2>
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
            user_api_key: 'YOUR_API_KEY',
            form: {
                source: 'https://www.pdfshift.io/documentation',
                landscape: 'false',
                use_print: 'false',
                custom_css: false,
                css: null
            },
            result: {
                url: null,
                filesize: 0
            },
            processing: false,
            sending: false,
            finished: false,
            error: null,
            tweets: [
                {
                    name: 'Sujan Patel',
                    handler: 'sujanpatel',
                    message: 'Need to convert HTML documents to PDF? The team behind https://pdfshift.io  is doing a terrific job!',
                    url: 'https://twitter.com/sujanpatel/status/1034113691564875776'
                },
                {
                    name: 'Northcoders',
                    handler: 'northcoders',
                    message: 'The HTML to PDF #API you\'ve been waiting for is here and we love it! @pdfshift https://pdfshift.io/?tab=javascript  #javascript',
                    url: 'https://twitter.com/northcoders/status/1017065907410042881'
                },
                {
                    name: 'Gustavo Carreno',
                    handler: 'gcarrenos',
                    message: 'I\'m using https://pdfshift.io  to convert my HTML documents to PDF and it does the job really well. No need to write my own code anymore! :) @pdfshift',
                    url: 'https://twitter.com/gcarrenos/status/1027575609092960256'
                },
                {
                    name: 'JavaScript Daily',
                    handler: 'JavaScriptDaily',
                    message: 'PDFShift: An Easy-to-Use Remote HTML to PDF API - https://pdfshift.io/?tab=javascript  (A commercial service but free up to 250 conversions per month.)',
                    url: 'https://twitter.com/JavaScriptDaily/status/1014944000304992256'
                },
                {
                    name: 'JavaScriptKicks',
                    handler: 'JavaScriptKicks',
                    message: 'PDFShift - Convert HTML to PDF online with PDFShift\'s lightning-fast and powerful API by @pdfshift https://javascriptkicks.com/r/39676?url=https://pdfshift.io/pricing … #javascript via @JavaScriptKicks',
                    url: 'https://twitter.com/JavaScriptKicks/status/1014195972417695744'
                },
                {
                    name: 'Azat Mardan',
                    handler: 'azatmardan',
                    message: 'PDFShift: An Easy-to-Use Remote HTML to PDF API',
                    url: 'https://twitter.com/azatmardan/status/1018329559136120832'
                },
                {
                    name: 'مؤسسة عماد',
                    handler: '3mad_co',
                    message: '@pdfshift I have used it for PDF conversation and it\'s awesome.',
                    url: 'https://twitter.com/3mad_co/status/1028026511918592006'
                },
                {
                    name: 'Jordan Kniest',
                    handler: 'j_kniest',
                    message: 'Dynamic #PDF generation was never easier. Simple, straightforward API to convert HTML code and websites to PDF files. https://pdfshift.io  #PDFShift @pdfshift',
                    url: 'https://twitter.com/j_kniest/status/1036984306609139714'
                },
                {
                    name: 'ProgrammableWeb',
                    handler: 'programmableweb',
                    message: 'Convert HTML documents to watermarked, #encrypted PDFs with @PDFshift #API http://bit.ly/2yCXYQQ',
                    url: 'https://twitter.com/programmableweb/status/1011685780878749696'
                }
            ]
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
    created () {
        try {
            this.user_api_key = this.$storage.getItem('api_key', 'YOUR_API_KEY')
        } catch (e) {
            this.user_api_key = 'YOUR_API_KEY'
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
            if (this.sending) {
                return false
            }

            this.closePreview()
            this.processing = true
            this.sending = true

            let params = {
                source: this.sourced,
                landscape: this.form.landscape,
                use_print: this.form.use_print,
                encode: true,
                filename: 'result.pdf',
                timeout: 15
            }

            if (this.form.css) {
                params['css'] = this.form.css
            }

            this.$http.post('https://api.pdfshift.io/v2/convert', params).then(
                response => {
                    this.finished = true
                    this.sending = false
                    this.result.url = response.data.url
                    this.result.filesize = (response.data.filesize / 1000 / 1000).toFixed(2)
                },
                response => {
                    this.sending = false
                    this.closePreview()
                    if (response.body.hasOwnProperty('error')) {
                        this.error = response.body.error
                    } else if (response.body.hasOwnProperty('errors')) {
                        let keyname = Object.keys(response.body.errors)[0]
                        this.error = keyname + ' : ' + response.body.errors[keyname][0]
                    } else {
                        this.error = 'A fatal error occured!'
                    }
                }
            )
        },
        closePreview () {
            this.error = null
            this.finished = false
            this.processing = false
            this.result = {url: null, filesize: 0}
        },
        generateParams (language) {
            switch (language) {
                case 'javascript':
                    return this._getOptionsJavascript()
                case 'python':
                    return this._getOptionsPython()
                case 'php':
                    return this._getOptionsPhp()
                case 'ruby':
                    return this._getOptionsRuby()
                case 'java':
                    return this._getOptionsJava()
                case 'csharp':
                    return this._getOptionsCSharp()
                case 'bash':
                    return this._getOptionsBash()
            }
        },
        _getOrganicOptions () {
            let options = {
                source: this.sourced,
                landscape: this.form.landscape === 'true',
                use_print: this.form.use_print === 'true'
            }

            if (this.form.css) {
                options['css'] = this.form.css
            }

            return options
        },
        _getOptionsJavascript () {
            let options = {
                landscape: this.form.landscape === 'true',
                use_print: this.form.use_print === 'true'
            }

            if (this.form.css) {
                options['css'] = this.form.css
            }

            return JSON.stringify(options)
        },
        _getOptionsPython () {
            let options = this._getOrganicOptions()

            let result = JSON.stringify(options)
            result = result.split(':true').join(':True')
            result = result.split(':false').join(':False')
            return result
        },
        _getOptionsPhp () {
            let options = this._getOrganicOptions()

            let result = 'array('
            for (let k in options) {
                if (!options.hasOwnProperty(k)) {
                    continue
                }

                result += '"' + k + '" => ' + JSON.stringify(options[k]) + ', '
            }
            return result.substring(0, result.length - 2) + ')'
        },
        _getOptionsRuby () {
            let options = this._getOrganicOptions()

            let result = '{'
            for (let k in options) {
                if (!options.hasOwnProperty(k)) {
                    continue
                }

                result += k + ': ' + JSON.stringify(options[k]) + ', '
            }
            return result.substring(0, result.length - 2) + '}'
        },
        _getOptionsJava () {
            let options = this._getOrganicOptions()
            return JSON.stringify(JSON.stringify(options))
        },
        _getOptionsCSharp () {
            // { "source", "https://www.example.com" }
            let options = this._getOrganicOptions()

            let result = ''
            for (let k in options) {
                if (!options.hasOwnProperty(k)) {
                    continue
                }

                result += '    { ' + JSON.stringify(k) + ', ' + JSON.stringify('' + options[k]) + ' },\n'
            }
            return result.substring(0, result.length - 2)
        },
        _getOptionsBash () {
            // -d source="{{ sourced }}" \
            let options = this._getOrganicOptions()

            let result = ''
            for (let k in options) {
                if (!options.hasOwnProperty(k)) {
                    continue
                }

                result += '  -d ' + k + '=' + JSON.stringify('' + options[k]) + ' \\\n'
            }
            return result.substring(0, result.length - 1)
        },
        twitter (text) {
            let exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/i
            text = text.replace(exp, '<a href="$1" target="_blank">$1</a>')
            text = text.replace(/(^|\s)#(\w+)/g, '$1<a href="https://twitter.com/hashtag/$2?src=hash" target="_blank">#$2</a>')
            text = text.replace(/(^|\s)@(\w+)/g, '$1<a href="https://www.twitter.com/$2" target="_blank">@$2</a>')
            return text
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

        h1 {
            line-height: 1.5em
        }
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

                .error {
                    text-align: center;
                    font-style: italic;
                    color: lighten(#721c24, 15%) !important;
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

            .loading, .preview {
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
            }

            .loading {
                justify-content: center;
                align-items: center;
            }

            .preview {
                flex-direction: column;

                .header {
                    border-radius: 4px 4px 0 0;
                    background-color: #000;
                    text-align: right;
                    display: block;
                    width: 100%;
                    height: 34px;

                    a {
                        text-decoration: none;
                        color: #ddd !important;
                        font-size: 32px;
                        margin-right: 5px;

                        &:hover {
                            color: #ccc;
                        }
                    }
                }

                .header + div {
                    background-color: #fff;
                    height: calc(100% - 34px);
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    text-align: center;
                    font-size: 2em;
                    padding-right: 10px;

                    a {
                        text-decoration: none;
                        color: #777;
                        span {
                            display: block
                        }
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

        h2 {
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Montserrat', sans-serif;

            span {
                position: relative;
                display: inline-block;
                color: #afafaf !important;
                font-weight: bold;

                &:after {
                    bottom: -5px;
                    content: "";
                    display: block;
                    height: 2px;
                    position: absolute;
                    background-color: @secondary_color;
                    width: 80%;
                    left: 50%;
                    transform: translate(-50%, 0);
                }
            }

            &.alternate span {
                color: darken(#afafaf, 10%) !important;
            }
        }

        .features {
            margin-bottom: 0;

            ul {
                margin-top: 40px;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: space-between;
                align-items: baseline;

                li {
                    width: 50%;
                    padding: 0 20px;
                    text-align: justify;

                    h3 {
                        font-weight: bold;
                        font-size: 16px;
                        color: #111;
                        margin: 30px 0 10px;
                        padding: 0;
                        font-family: 'Montserrat', sans-serif;
                        letter-spacing: 1px;

                        img {
                            vertical-align: middle;
                            margin-right: 20px;
                        }
                    }

                    p {
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        color: #616161;
                        font-weight: 100;
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
        padding: 0 0 20px;
    }
</style>

<style lang="less">
    @import '../assets/styles/colors.less';
    .agile {
        position: relative;
        margin: 0 auto 60px;

        &__list {
            display: block;
            overflow: hidden;
            padding: 0;
            position: relative;
            margin: 0 auto;
        }

        &__track {
            align-items: center;
            display: flex;
            justify-content: flex-start;
            margin-top: 25px;
            padding-bottom: 15px;

            .agile--disabled & {
                display: block;
                max-width: 100%;
            }
        }

        .slide {
            max-width: 800px;
            margin: 0 auto;
        }

        &__slide {
            display: block;
            background-color: #fff;
            padding: 20px;

            text-align: center;
            box-shadow: 10px 10px 10px rgba(0, 0, 0, 20%);
            margin: 20px;

            .agile--fade & {
                opacity: 0;
                position: relative;
                z-index: 0;

                &--active {
                    opacity: 1;
                    z-index: 2;
                }

                &--expiring {
                    opacity: 1;
                    transition-duration: 0s;
                    z-index: 1;
                }
            }

            img {
                display: block;
                margin: -42px auto 0;
                background-color: #fff;
                border-radius: 50%;
                border: solid 2px #ccc;
                width: 48px;
            }

            h4 {
                font-family: 'Montserrat', sans-serif;

                span {
                    margin-top: 10px;
                    display: block;
                    color: #cecece;
                }
            }

            p {
                font-size: 16px;
                color: #616161;
                position: relative;
            }

            p:before {
                display: block;
                padding-left: 10px;
                content: "\201C";
                font-size: 80px;
                position: absolute;
                left: -20px;
                top: -20px;
                color: @secondary_color;
            }

            .link {
                text-align: right;
                font-size: 0.9em;
            }
        }

        &__arrow {
            border: none;
            bottom: -11px;
            margin: 0;
            padding: 0;
            position: absolute;
            transition-duration: .3s;
            height: 100%;
            top: 0;
            width: 50px;
            background-color: transparent;

            &[disabled] {
                display: none;
            }

            &:hover {
                svg {
                    fill: @secondary_color;
                    cursor: pointer;
                }
            }

            &--prev {
                left: 0;
            }

            &--next {
                right: 0;
            }

            svg {
                fill: #ddd;
                height: 48px;
                transition-duration: .3s;
            }
        }

        &__dots {
            align-items: center;
            display: flex;
            justify-content: center;
            list-style: none;
            margin: 15px 0 0;
            padding: 0;
            text-align: center;
            white-space: nowrap;
            left: 50%;
            position: absolute;
            transform: translateX(-50%);
        }

        &__dot {
            margin: 0 10px;

            button {
                border-radius: 50%;
                cursor: pointer;
                display: block;
                height: 14px;
                width: 14px;
                font-size: 0;
                line-height: 0;
                margin: 0;
                transition-duration: .3s;

                background-color: #ddd;
                border: none;

                &:hover {
                    background-color: @secondary_color;
                }
            }

            &--current {
                button {
                    background-color: @secondary_color;
                }
            }
        }
    }
</style>
