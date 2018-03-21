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
                <p>Instead of providing an URL, you can directly send a HTML data, encoded in base64.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>// Javascript code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>// Python Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>curl \
-H "Content-Type: application/json" \
-d '{"source":"&lt;html&gt;&lt;body&gt;&lt;h1&gt;Hello world&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;"}' \
https://api.pdfshift.io/v2/convert/</code></pre>
            </div>
            <div class="example">
                <h3>Custom CSS</h3>
                <p>You can customize the document before generating the PDF, to adapt the page to your needs.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>// Javascript code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>// Python Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>// cURL Code</code></pre>
            </div>
            <div class="example">
                <h3>Add custom HTTP Headers</h3>
                <p>It can be useful to add custom HTTP headers, like auth headers, http-agent, custom language, etc.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>// Javascript code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>// Python Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>// cURL Code</code></pre>
            </div>
            <div class="example">
                <h3>Accessing secured pages</h3>
                <p>You can rely on custom HTTP headers to do the job, or directly provide the credentials. (These are never stored!).</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>// Javascript code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>// Python Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>// cURL Code</code></pre>
            </div>
            <div class="example">
                <h3>Add cookies (Feeling hungry?)</h3>
                <p>You can add custom cookies to load a protected page.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>// Javascript code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>// Python Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>// cURL Code</code></pre>
            </div>
            <div class="example">
                <h3>Add Watermark</h3>
                <p>Protect your PDF with a watermark at ease with PDFShift.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>// Javascript code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>// Python Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>// cURL Code</code></pre>
            </div>
            <div class="example">
                <h3>Custom Header / Footer for your PDF</h3>
                <p>Add a custom header/footer to your PDF document with pagination.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>// Javascript code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>// Python Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>// cURL Code</code></pre>
            </div>
            <div class="example">
                <h3>Protect the generated PDF</h3>
                <p>Define who can read/open your newly generated document.</p>
                <language-switch :active="$route.query.lang" />
                <pre v-bind:class="{'visible': $route.query.lang == 'javascript'}"><code class="javascript" v-hljs>// Javascript code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'python'}"><code class="python" v-hljs>// Python Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'php'}"><code class="php" v-hljs>// PHP Code</code></pre>
                <pre v-bind:class="{'visible': $route.query.lang == 'curl'}"><code class="bash" v-hljs>// cURL Code</code></pre>
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
