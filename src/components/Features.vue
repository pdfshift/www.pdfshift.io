 <template>
    <div>
        <header>
            <div>
                <header-component />
                <h1>
                    A rich set of features
                    <small>Built for developers, by developers.</small>
                </h1>
            </div>
        </header>
        <div class="container">
            <div class="example">
                <h3>Inline HTML</h3>
                <p>Instead of providing an URL, you can directly send HTML data.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>const pdfshift = require('./')('120d8e8a86d2....................');
const fs = require('fs');

let data = fs.readFileSync('page.html', 'utf8');

pdfshift.convert(data).then(function (binary_file) {
    fs.writeFile('result.pdf', binary_file, "binary", function () {})
}).catch(function({message, code, response, errors = null}) {})</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>import pdfshift
pdfshift.api_key = '120d8e8a86d2....................'

document = open('page.html', 'r')
document_content = document.read()
document.close()

binary_file = pdfshift.convert(document_content)
with open('result.pdf', 'wb') as output:
    output.write(binary_file)
</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code coming soon!</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-u '120d8e8a86d2....................:' \
-d source="&lt;html&gt;&lt;body&gt;&lt;h1&gt;Hello world&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;" \
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>
            <div class="example">
                <h3>Custom CSS</h3>
                <p>You can customize the document before generating the PDF, to adapt the page to your needs.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>const pdfshift = require('./')('120d8e8a86d2....................');
const fs = require('fs');

pdfshift.convert('https://www.example.com', {css: 'https://www.example.com/public/css/print.css'}).then(function (binary_file) {
    fs.writeFile('result.pdf', binary_file, "binary", function () {})
}).catch(function({message, code, response, errors = null}) {})</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>import pdfshift
pdfshift.api_key = '120d8e8a86d2....................'

binary_file = pdfshift.convert(
    'https://www.example.com',
    css="https://www.example.com/public/css/print.css"
)

with open('result.pdf', 'wb') as output:
    output.write(binary_file)</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code coming soon!</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-u '120d8e8a86d2....................:' \
-d source="https://example.com" \
-d css="https://www.example.com/public/css/print.css" \
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>
            <div class="example">
                <h3>Add custom HTTP Headers</h3>
                <p>It can be useful to add custom HTTP headers, like auth headers, http-agent, custom language, etc.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>const pdfshift = require('./')('120d8e8a86d2....................');
const fs = require('fs');

// We use .prepare() instead of .convert for easily handle advanced configuration
pdfshift.prepare('https://httpbin.org/headers')
    .setHTTPHeaders({
        'X-Original-Header': 'Awesome value'
    })
    .addHTTPHeader('user-agent', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0') // Also works like this
    .convert()
    .then(function (binary_file) {
        fs.writeFile('result.pdf', binary_file, "binary", function () {})
    })
    .catch(function({message, code, response, errors = null}) {})</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>import pdfshift
pdfshift.api_key = '120d8e8a86d2....................'

binary_file = pdfshift.convert(
    'https://httpbin.org/headers',
    headers={
        'X-Original-Header': 'Awesome value',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    }
)

with open('result.pdf', 'wb') as output:
    output.write(binary_file)</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code coming soon!</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-u '120d8e8a86d2....................:' \
-d source="https://httpbin.org/headers" \
-d http_headers[X-Original-Header]="Awesome value" \
-d http_headers[user-agent]="Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0" \
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>
            <div class="example">
                <h3>Accessing secured pages</h3>
                <p>You can rely on custom HTTP headers to do the job, or directly provide the credentials. (These are never stored!).</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>const pdfshift = require('./')('120d8e8a86d2....................');
const fs = require('fs');

// We use .prepare() instead of .convert for easily handle advanced configuration
pdfshift.prepare('https://httpbin.org/basic-auth/user/passwd')
    .auth('user', 'passwd')
    .convert()
    .then(function (binary_file) {
        fs.writeFile('result.pdf', binary_file, "binary", function () {})
    })
    .catch(function({message, code, response, errors = null}) {})</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>import pdfshift
pdfshift.api_key = '120d8e8a86d2....................'

binary_file = pdfshift.convert('https://httpbin.org/basic-auth/user/passwd', auth=('user', 'passwd'))

with open('result.pdf', 'wb') as output:
    output.write(binary_file)</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code coming soon!</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-u '120d8e8a86d2....................:' \
-d source="https://httpbin.org/basic-auth/user/passwd" \
-d auth[username]="user" \
-d auth[password]="passwd" \
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>
            <div class="example">
                <h3>Add cookies (Feeling hungry?)</h3>
                <p>You can add custom cookies to load a protected page.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>const pdfshift = require('./')('120d8e8a86d2....................');
const fs = require('fs');

// We use .prepare() instead of .convert for easily handle advanced configuration
pdfshift.prepare('https://httpbin.org/cookies')
    .addCookie({name: 'session', value: '4cb496a8-a3eb-4a7e-a704-f993cb6a4dac'})
    .convert()
    .then(function (binary_file) {
        fs.writeFile('result.pdf', binary_file, "binary", function () {})
    })
    .catch(function({message, code, response, errors = null}) {})</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>import pdfshift
pdfshift.api_key = '120d8e8a86d2....................'

binary_file = pdfshift.convert(
    'https://httpbin.org/cookies',
    cookies=[
        {'name': 'session', 'value': '4cb496a8-a3eb-4a7e-a704-f993cb6a4dac'}
    ]
)

with open('result.pdf', 'wb') as output:
    output.write(binary_file)</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code coming soon!</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-u '120d8e8a86d2....................:' \
-d source="https://example.com" \
-d cookies[0][name]="session" \
-d cookies[0][value]="4cb496a8-a3eb-4a7e-a704-f993cb6a4dac" \
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>
            <div class="example">
                <h3>Add Watermark</h3>
                <p>Protect your PDF with a watermark at ease with PDFShift.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>const pdfshift = require('./')('120d8e8a86d2....................');
const fs = require('fs');

// We use .prepare() instead of .convert for easily handle advanced configuration
pdfshift.prepare('https://www.example.com')
    .watermark({
        source: 'https://pdfshift.io/static/static/img/logo.png',
        offset_x: 50,
        offset_y: '100px',
        rotate: 45,
        background: true
    })
    .convert()
    .then(function (binary_file) {
        fs.writeFile('result.pdf', binary_file, "binary", function () {})
    })
    .catch(function({message, code, response, errors = null}) {})</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>import pdfshift
pdfshift.api_key = '120d8e8a86d2....................'

binary_file = pdfshift.convert(
    'https://www.example.com',
    watermark={
        'source': 'https://pdfshift.io/static/static/img/logo.png',
        'offset_x': 50,
        'offset_y': '100px',
        'rotate': 45,
        'background': true
    }
)

with open('result.pdf', 'wb') as output:
    output.write(binary_file)</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code coming soon!</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-u '120d8e8a86d2....................:' \
-d source="https://example.com" \
-d watermark[source]="https://pdfshift.io/static/static/img/logo.png" \
-d watermark[offset_x]= 50\
-d watermark[offset_y]= "100px"\
-d watermark[rotate]= 45\
-d watermark[background]= true\
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>
            <div class="example">
                <h3>Custom Header / Footer for your PDF</h3>
                <p>Add a custom header/footer to your PDF document with pagination.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>const pdfshift = require('./')('120d8e8a86d2....................');
const fs = require('fs');

// We use .prepare() instead of .convert for easily handle advanced configuration
pdfshift.prepare('https://www.example.com')
    .footer({source: '&lt;div&gt;Page {{custom_header_template}}&lt;/div&gt;', spacing: '50px'})
    .convert()
    .then(function (binary_file) {
        fs.writeFile('result.pdf', binary_file, "binary", function () {})
    })
    .catch(function({message, code, response, errors = null}) {})</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>import pdfshift
pdfshift.api_key = '120d8e8a86d2....................'

binary_file = pdfshift.convert(
    'https://www.example.com',
    footer={
        'source': '&lt;div&gt;Page {{custom_header_template}}&lt;/div&gt;',
        'spacing': '50px'
    }
)

with open('result.pdf', 'wb') as output:
    output.write(binary_file)</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code coming soon!</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-u '120d8e8a86d2....................:' \
-d source="https://example.com" \
-d footer[source]="&lt;div&gt;Page {{custom_header_template}}&lt;/div&gt;" \
-d footer[spacing]="150px" \
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>
            <div class="example">
                <h3>Protecting the generated PDF</h3>
                <p>Define who can read/open your newly generated document.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>const pdfshift = require('./')('120d8e8a86d2....................');
const fs = require('fs');

// We use .prepare() instead of .convert for easily handle advanced configuration
pdfshift.prepare('https://www.example.com')
    .protect({
        encrypt: 128,
        user_password: 'user',
        owner_password: 'owner',
        no_print: true
    })
    .convert()
    .then(function (binary_file) {
        fs.writeFile('result.pdf', binary_file, "binary", function () {})
    })
    .catch(function({message, code, response, errors = null}) {})</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>import pdfshift
pdfshift.api_key = '120d8e8a86d2....................'

binary_file = pdfshift.convert(
    'https://www.example.com',
    protection={
        'encrypt': 128,
        'user_password': 'user',
        'owner_password': 'owner',
        'no_print': True
    }
)

with open('result.pdf', 'wb') as output:
    output.write(binary_file)</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code coming soon!</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-u '120d8e8a86d2....................:' \
-d source="https://example.com" \
-d protection[encrypt]=128 \
-d protection[user_password]="user" \
-d protection[owner_password]="owner" \
-d protection[no_print]=true \
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>

            <div class="cta">
                <router-link :to="{name: 'Register'}" class="button">Get your API key</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/partials/Header.vue'
import LanguageSwitch from '@/components/partials/LanguageSwitch.vue'

export default {
    components: {
        HeaderComponent: HeaderComponent,
        LanguageSwitch: LanguageSwitch
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            return vm.redirect(to.query.lang)
        })
    },
    beforeRouteUpdate (to, from, next) {
        next(this.redirect(to.query.lang))
    },
    data () {
        return {
            'custom_header_template': '{{page}} of {{total}}'
        }
    },
    methods: {
        redirect (tab) {
            if (tab === undefined) {
                this.$router.replace({name: 'Features', query: {'lang': 'javascript'}})
                return false
            }

            return true
        }
    }
}
</script>

<style lang="less" scoped>
.example {
    margin-top: 60px;
    &:first-child {
        margin-top: 40px;
    }

    h3 {
        color: #666;
        margin: 0;
        padding: 0;
        font-size: 1.4em;
    }

    p {
        line-height: 1.5em;
        margin: 5px 0 20px;
        padding: 0;
        font-size: 0.9em
    }

    pre, code {
        margin: 0;
        padding: 0;
    }

    code {
        padding: 10px;
        margin: 10px 0;
    }

    pre {
        display: none;
        &.visible {display: block}
    }
}

.cta {
    margin: 60px 0;
    text-align: center;
    padding: 20px 60px;
}
</style>
