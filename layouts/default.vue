<template>
    <div>
        <div id="main">
            <header id="header">
                <div class="heading">
                    <div class="container">
                        <div class="row">
                            <div class="column">
                                <div class="accordion-menu">
                                    <div />
                                    <div />
                                    <div />
                                </div>
                                <NuxtLink to="/" title="Return to our Homepage" itemprop="name" class="brand">
                                    <svg viewBox="0 0 1374 525" xmlns="http://www.w3.org/2000/svg">
                                        <path class="svg-fill" d="M485 352h32v-46h35c32 0 56-20 56-48 0-29-24-49-56-49h-67v143zm32-74v-41h31c16 0 27 8 27 21 0 12-11 20-27 20h-31zm112 74h53c50 0 86-29 86-71s-36-72-86-72h-53v143zm32-27v-88h25c29 0 49 18 49 44 0 25-20 44-49 44h-25zm246-88v-28H792v143h32v-56h75v-28h-75v-31h83zm76 118c35 0 53-19 53-41 0-26-21-35-49-42-25-6-40-11-40-26 0-13 14-25 32-25 15 0 30 7 43 19l10-13c-14-12-30-20-52-20-29 0-50 18-50 40 0 25 19 34 49 41 26 6 40 12 40 27 0 13-12 25-35 25-21 0-36-9-49-21l-10 13c15 14 34 23 58 23zm134-113c-16 0-30 9-37 20v-55h-16v145h16v-68c0-15 16-28 35-28 16 0 28 13 28 30v66h16v-68c0-24-17-42-42-42zm83-17c6 0 11-5 11-10 0-6-5-10-11-10s-11 4-11 10c0 5 5 10 11 10zm-8 127h16V245h-16v107zm74-122c0-8 6-14 12-14 5 0 10 2 12 5l8-12c-6-4-13-7-21-7-16 0-27 12-27 28v15h-18v14h18v93h16v-93h28v-14h-28v-15zm100 107c-3 2-7 4-12 4-6 0-12-6-12-14v-68h28v-14h-28v-30h-16v30h-18v14h18v68c0 17 11 28 27 28 8 0 15-3 21-7l-8-11zM341 304L219 147 205 0v525l14-157 122-64z" />
                                        <path class="svg-fill" d="M380 222l-28 80-53-66zM422 254l-36-28-10 33zM336 316l-1 15-103 38zM168 409h25v-23h-25zM173 321h20v19h-20zM170 348h23v22h-23zM127 449v-20h21v20zM110 444v-11h11v11zM120 424v-15h16v15zM117 458v-9h9v9zM136 388v-12h13v12zM147 365v-15h15v15zM182 304h11v10h-11zM165 269h28v26h-28zM172 242h21v20h-21zM176 220h17v16h-17zM164 206h10v10h-10zM159 246h9v8h-9zM174 181h19v18h-19zM151 179h16v15h-16zM141 134h21v20h-21zM166 160h16v16h-16zM180 144h13v12h-13zM22 118h13v12H22zM43 111h12v12H43zM68 116h24v23H68zM129 174h12v12h-12zM147 223h11v10h-11zM130 198h17v16h-17zM104 174h12v12h-12zM53 140h8v8h-8zM106 125h16v16h-16zM82 156h14v13H82zM19 139h8v8h-8zM29 152h16v16H29zM56 160h13v12H56zM52 179h9v9h-9zM67 192h9v8h-9zM81 189h17v17H81zM102 207h8v9h-8zM109 221h9v8h-9zM122 225h20v19h-20zM147 256h8v9h-8zM140 409v-9h9v9zM104 461v-5h6v5zM0 106h9v9H0zM160 425v-9h9v9zM156 400v-5h6v5zM108 148h17v17h-17z" />
                                    </svg>
                                </NuxtLink>
                            </div>
                            <nav id="header-main-menu" class="column">
                                <ul itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">
                                    <li><NuxtLink to="/#features" title="Check out our features" itemprop="name">Features</NuxtLink></li>
                                    <!--<li><NuxtLink to="/#try-me" title="Check out our features" itemprop="name">Try it out</NuxtLink></li>-->
                                    <li><NuxtLink to="/#pricing" title="More on our pricing plans" itemprop="name">Pricing</NuxtLink></li>
                                    <li>
                                        <a href="https://docs.pdfshift.io/" title="Read our documentation" itemprop="name" target="_blank">
                                            Docs <SvgOutsideLink />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://status.pdfshift.io/" title="View our running status" itemprop="name" target="_blank">
                                            Status page <SvgOutsideLink />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <div id="header-main-cta" class="cta">
                                <div>
                                    <a href="https://app.pdfshift.io" title="Login on PDFShift.io" itemprop="name">Login</a> or
                                    <NuxtLink to="/register/" title="Register now for free and start converting HTML to PDF!" class="column create-account">
                                        <svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.004 0c-5.523 0-10 4.478-10 10a9.87 9.87 0 0 0 .713 3.629L1.568 25.777C1.217 26.129 1 26.463 1 27v3c0 1.07.929 2 2 2h3c.536 0 .875-.215 1.226-.564L8.661 30h2.343a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 2-2v-2.344l2.369-2.371c1.129.445 2.344.715 3.631.715 5.521 0 10-4.478 10-10s-4.479-10-10-10zm0 18c-1.48 0-2.852-.43-4.041-1.132l-.344.343-1.125 1.125-1.905 1.906a1.999 1.999 0 0 0-.586 1.414V24h-2a2 2 0 0 0-2 2v2H8.661a2 2 0 0 0-1.414.586l-1.418 1.418L3.003 30 3 27.15l11.665-11.644.001.002 1.469-1.469c-.702-1.189-1.132-2.56-1.132-4.04A8.001 8.001 0 1 1 23.004 18z" class="svg-fill" />
                                            <path d="M28.82 8.239a17.71 17.71 0 0 0-4.055-4.054.961.961 0 0 0-.882-.127c-1.389.489-2.34 1.439-2.826 2.828a.952.952 0 0 0 .127.882 17.736 17.736 0 0 0 4.053 4.053.966.966 0 0 0 .881.128c1.391-.486 2.342-1.438 2.83-2.828a.952.952 0 0 0-.128-.882zm-3 2.771A17.122 17.122 0 0 1 22 7.217c.387-1.103 1.111-1.827 2.182-2.221a16.75 16.75 0 0 1 3.816 3.811c-.391 1.095-1.113 1.815-2.178 2.203z" class="svg-fill" />
                                        </svg>
                                        Register
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="$route.name === 'index'" class="container hero">
                    <div class="row">
                        <div class="column seven">
                            <div>
                                <!--<h1>Automate your HTML to PDF conversion.</h1>-->
                                <h1 class="fade-in from-left delay-1">HTML to PDF conversion API</h1>
                                <!--<h1>Convert HTML documents to PDF in seconds</h1>-->
                                <div class="fade-in from-left delay-2">
                                    <p>Stop wasting time implementing and maintaining a third-party software/library.</p>
                                    <p>With PDFShift, rely on an up-to-date, high-fidelity conversion API with no maintenance costs.</p>
                                    <div class="actions">
                                        <NuxtLink to="/register/" title="Create an account now" class="button create-account">Create an account</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column five">
                            <form id="register" class="fade-in from-right delay-3">
                                <h2>Get started now</h2>
                                <p>Get started with <strong>50 free credits per months</strong><br />and upgrade whenever you are ready.</p>
                                <div><input type="text" name="name" placeholder="Full Name" required /></div>
                                <div><input type="email" name="email" placeholder="Email Address" required /></div>
                                <div>
                                    <p><small>By signing up, you agree to the <NuxtLink to="/terms/" title="Read our Terms of Service">Terms of Service</NuxtLink> and <NuxtLink to="/privacy/" title="Read our Privacy Policy">Privacy Policy</NuxtLink>.</small></p>
                                </div>
                                <input type="submit" name="submit" value="Create your free account" class="button button-primary" />
                            </form>
                        </div>
                    </div>
                </div>
                <div v-else-if="$route.name === 'pricing'" id="hero-pricing-details" class="container hero">
                    <div class="row">
                        <div class="column twelve">
                            <h1>Plans that scale with you</h1>
                            <p>Start with 50 conversions per months for free. No credit card required.</p>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <Nuxt />
            </main>
        </div>
        <footer :class="{'white': $route.name === 'index'}">
            <div class="container">
                <div class="row links">
                    <div class="column two brand">
                        <svg viewBox="0 0 1374 525" xmlns="http://www.w3.org/2000/svg">
                            <path class="svg-fill" d="M485 352h32v-46h35c32 0 56-20 56-48 0-29-24-49-56-49h-67v143zm32-74v-41h31c16 0 27 8 27 21 0 12-11 20-27 20h-31zm112 74h53c50 0 86-29 86-71s-36-72-86-72h-53v143zm32-27v-88h25c29 0 49 18 49 44 0 25-20 44-49 44h-25zm246-88v-28H792v143h32v-56h75v-28h-75v-31h83zm76 118c35 0 53-19 53-41 0-26-21-35-49-42-25-6-40-11-40-26 0-13 14-25 32-25 15 0 30 7 43 19l10-13c-14-12-30-20-52-20-29 0-50 18-50 40 0 25 19 34 49 41 26 6 40 12 40 27 0 13-12 25-35 25-21 0-36-9-49-21l-10 13c15 14 34 23 58 23zm134-113c-16 0-30 9-37 20v-55h-16v145h16v-68c0-15 16-28 35-28 16 0 28 13 28 30v66h16v-68c0-24-17-42-42-42zm83-17c6 0 11-5 11-10 0-6-5-10-11-10s-11 4-11 10c0 5 5 10 11 10zm-8 127h16V245h-16v107zm74-122c0-8 6-14 12-14 5 0 10 2 12 5l8-12c-6-4-13-7-21-7-16 0-27 12-27 28v15h-18v14h18v93h16v-93h28v-14h-28v-15zm100 107c-3 2-7 4-12 4-6 0-12-6-12-14v-68h28v-14h-28v-30h-16v30h-18v14h18v68c0 17 11 28 27 28 8 0 15-3 21-7l-8-11zM341 304L219 147 205 0v525l14-157 122-64z" />
                            <path class="svg-fill" d="M380 222l-28 80-53-66zM422 254l-36-28-10 33zM336 316l-1 15-103 38zM168 409h25v-23h-25zM173 321h20v19h-20zM170 348h23v22h-23zM127 449v-20h21v20zM110 444v-11h11v11zM120 424v-15h16v15zM117 458v-9h9v9zM136 388v-12h13v12zM147 365v-15h15v15zM182 304h11v10h-11zM165 269h28v26h-28zM172 242h21v20h-21zM176 220h17v16h-17zM164 206h10v10h-10zM159 246h9v8h-9zM174 181h19v18h-19zM151 179h16v15h-16zM141 134h21v20h-21zM166 160h16v16h-16zM180 144h13v12h-13zM22 118h13v12H22zM43 111h12v12H43zM68 116h24v23H68zM129 174h12v12h-12zM147 223h11v10h-11zM130 198h17v16h-17zM104 174h12v12h-12zM53 140h8v8h-8zM106 125h16v16h-16zM82 156h14v13H82zM19 139h8v8h-8zM29 152h16v16H29zM56 160h13v12H56zM52 179h9v9h-9zM67 192h9v8h-9zM81 189h17v17H81zM102 207h8v9h-8zM109 221h9v8h-9zM122 225h20v19h-20zM147 256h8v9h-8zM140 409v-9h9v9zM104 461v-5h6v5zM0 106h9v9H0zM160 425v-9h9v9zM156 400v-5h6v5zM108 148h17v17h-17z" />
                        </svg>
                    </div>
                    <div class="column two">
                        <h5>Company</h5>

                        <ul class="unstyled">
                            <li><NuxtLink to="/contact/" title="Contact our team and get answers">Contact</NuxtLink></li>
                            <li><NuxtLink to="/terms/" title="Read our Terms of Service">Terms of Service</NuxtLink></li>
                            <li><NuxtLink to="/privacy/" title="Read our Privacy Policy">Privacy Policy</NuxtLink></li>
                            <li><NuxtLink to="/gdpr/" title="Read more about how we process your data">GDPR</NuxtLink></li>
                        </ul>
                    </div>
                    <div class="column two">
                        <h5>Product</h5>

                        <ul class="unstyled">
                            <li><NuxtLink to="/#features" title="">Features</NuxtLink></li>
                            <li><NuxtLink to="/pricing/" title="">Pricing</NuxtLink></li>
                            <li><a ref="https://docs.pdfshift.io" title="Read our documentation">Documentation <SvgOutsideLink /></a></li>
                            <li><a ref="https://status.pdfshift.io" title="View our status page">Status page <SvgOutsideLink /></a></li>
                        </ul>
                    </div>
                    <div class="column two">
                        <h5>Guides</h5>

                        <ul class="unstyled">
                            <!--<li><NuxtLink to="/guides/angular/" title="">Angular Guide</NuxtLink></li>
                            <li><NuxtLink to="/guides/react/" title="">React Guide</NuxtLink></li>-->
                            <li><NuxtLink to="/guides/convert-html-to-pdf-with-node/" title="Read how to implement PDFShift with Javascript Node.">Node.js Guide</NuxtLink></li>
                            <li><NuxtLink to="/guides/convert-html-to-pdf-with-php/" title="Read how to implement PDFShift with PHP">PHP Guide</NuxtLink></li>
                            <li><NuxtLink to="/guides/convert-html-to-pdf-with-python/" title="Read how to implement PDFShift with Python">Python Guide</NuxtLink></li>
                            <li><NuxtLink to="/guides/convert-html-to-pdf-with-ruby/" title="Read how to implement PDFShift with Ruby">Ruby Guide</NuxtLink></li>
                            <li><NuxtLink to="/guides/" title="View all our available guides">All our guides</NuxtLink></li>
                        </ul>
                    </div>
                    <!--
                    <div class="column links">
                        <h5>Compare</h5>

                        <ul class="unstyled">
                            <li><NuxtLink to="#" title="">PDFShift vs️ WKHTMLTOPDF</NuxtLink></li>
                            <li><NuxtLink to="#" title="">PDFShift vs️ DocRaptor</NuxtLink></li>
                            <li><NuxtLink to="#" title="">PDFShift vs Restpack</NuxtLink></li>
                            <li><NuxtLink to="#" title="">PDFShift vs HTML2PDFRocket</NuxtLink></li>
                            phantomJs - Prince
                        </ul>
                    </div>
                    -->
                </div>
                <hr />
                <div class="row disclaimer">
                    <div class="column nine">
                        <p>
                            © PDFShift S.A.S. Software, Inc. {{ fullYear }}. 128 rue la boétie, 2nd floor, 75008 PARIS, France.<br />
                            Send us a note to <a href="mailto:hi@pdfshift.io" title="Say hi, ask a question or just reach out and talk to us">hi@pdfshift.io</a>
                        </p>
                    </div>
                    <div class="column three">
                        <ul class="unstyled">
                            <li class="twitter">
                                <a href="https://twitter.com/pdfshift" title="View our Twitter page" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <noscript><img src="https://api.pdfshift.io/v3/t/page.gif" async height="1" width="1" /></noscript>
        </footer>
    </div>
</template>

<script>
import SvgOutsideLink from '~/static/images/outside-link.svg?inline'
export default {
    components: { SvgOutsideLink },
    mouted () {
        /*
        var i = new Image;
        i.src = [
            window.PDFShift.api_url,
            "t/page.gif?u=",
            encodeURIComponent(window.location.href),
            "&r=",
            encodeURIComponent(window.document.referrer),
            "&t=",
            encodeURIComponent(window.document.title),
            "&sr=",
            encodeURIComponent(window.screen.width+"x"+window.screen.height),
            "&vp=",
            encodeURIComponent(Math.max(document.documentElement.clientWidth,window.innerWidth||0)+"x"+Math.max(document.documentElement.clientHeight,window.innerHeight||0)),
            "&gclid=",
            window.PDFShift.getQueryVariable('gclid'),
            "&cs=",
            window.PDFShift.getQueryVariable('utm_source'),
            "&cm=",
            window.PDFShift.getQueryVariable('utm_medium'),
            "&cn=",
            window.PDFShift.getQueryVariable('utm_campaign')
        ].join('')
        // =window.PDFShift.api_url + "t/page.gif?u="+encodeURIComponent(window.location.href)+"&r="+encodeURIComponent(window.document.referrer)+"&t="+encodeURIComponent(window.document.title)+"&sr="+encodeURIComponent(window.screen.width+"x"+window.screen.height)+"&vp="+encodeURIComponent(Math.max(document.documentElement.clientWidth,window.innerWidth||0)+"x"+Math.max(document.documentElement.clientHeight,window.innerHeight||0));
        // ProveSource
        !function(o,i){
            window.provesrc&&window.console&&console.error&&console.error("ProveSource is included twice in this page."),provesrc=window.provesrc={dq:[],display:function(o,i){this.dq.push({n:o,g:i})}},o._provesrcAsyncInit=function(){provesrc.init({apiKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1Y2FjOTI2ODVhZmJjNzNmOWE3OTg4MWQiLCJpYXQiOjE1NTQ4MTM1NDR9.S0M_uClBBPlCV30eCiNkwhf_oLGShbV-MmbtkNT_Dw8",v:"0.0.3"})};
            var r=i.createElement("script");
            r.type="text/javascript",r.async=!0,r["ch"+"ar"+"set"]="UTF-8",r.src="https://cdn.provesrc.com/provesrc.js";
            var e=i.getElementsByTagName("script")[0];
            e.parentNode.insertBefore(r,e)
        }(window,document);
        */
    },
    computed: {
        fullYear () {
            return new Date().getFullYear()
        }
    }
}
</script>

<style lang="scss" scoped>
    #register {
        p>small { font-size: .75rem }
        p { color: #484848; font-size: .9em }

        label.checkbox {
            font-size: 0.9em;
            margin: 10px 0 10px 5px;
        }
    }

    #hero-pricing-details {
        text-align: center;

        h1 {
            text-align: center;
        }
    }
</style>
