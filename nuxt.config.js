
const builtAt = new Date().toISOString()

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'www',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            // General
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'An API to convert HTML/CSS documents to PDF. PDFShift is the reliable, Up-to-date and high-fidelity conversion API with no maintenance costs.' },
            { hid: 'keyword', name: 'keyword', content: 'api, pdf, html, convert, document, web, conversion, text, pdfshift, raw, link' },
            { hid: 'author', name: 'author', content: 'Cyril Nicodeme' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },

            // Twitter
            { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
            { hid: 'twitter:site', name: 'twitter:site', content: '@pdfshift' },
            { hid: 'twitter:creator', name: 'twitter:creator', content: '@cx42net' },
            { hid: 'twitter:title', name: 'twitter:title', content: 'PDFShift, The Leading HTML to PDF conversion API.' },
            { hid: 'twitter:description', name: 'twitter:description', content: 'An API to convert HTML/CSS documents to PDF. PDFShift is the reliable, Up-to-date and high-fidelity conversion API with no maintenance costs.' },
            { hid: 'twitter:image', name: 'twitter:image', content: '/images/banner/slogan.jpg' },

            // Facebook
            { hid: 'og:title', name: 'og:title', content: 'PDFShift, The Leading HTML to PDF conversion API.' },
            { hid: 'og:site_name', name: 'og:site_name', content: 'PDFShift' },
            { hid: 'og:description', name: 'og:description', content: 'An API to convert HTML/CSS documents to PDF. PDFShift is the reliable, Up-to-date and high-fidelity conversion API with no maintenance costs.' },
            { hid: 'og:url', name: 'og:url', content: 'https://pdfshift.io' },
            { hid: 'og:image', name: 'og:image', content: '/images/banner/slogan.jpg' },
            // { hid: 'og:image', name: 'og:image', content: '/images/favicons/android-chrome-512x512.png' },
            { hid: 'og:type', name: 'og:type', content: 'website' },
            { hid: 'og:locale', name: 'og:locale', content: 'en_US' },
            { property: 'og:updated_time', content: builtAt },

            // Theme related
            { name: 'msapplication-TileColor', content: '#623e98' },
            { name: 'msapplication-config', content: '/images/favicons/browserconfig.xml' },
            { name: 'theme-color', content: '#ffffff' },
            { name: 'apple-mobile-web-app-title', content: 'PDFShift' },
            { name: 'application-name', content: 'PDFShift' },
            { name: 'google-site-verification', content: 'Fz9BzvQci5_milN-1hUvE_H8oSYWTCiPzK-nbhjj7VE' }
        ],
        link: [
            /*
            { rel: 'alternate', type: 'application/atom+xml', title: 'PDFShift\'s blog', href: '/atom.xml' },
            { rel: 'alternate', type: 'application/rss+xml', title: 'PDFShift\'s blog', href: '/feed.xml' },
            { rel: 'alternate', type: 'application/rss+xml', title: 'PDFShift\'s blog', href: '/feed.xml' },
            */

            // Fonts
            // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap' },

            // Theme related
            { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicons/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicons/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicons/favicon-16x16.png' },
            { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/favicons/android-chrome-192x192.png' },
            { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/images/favicons/android-chrome-512x512.png' },
            { rel: 'mask-icon', color: '#5bbad5', href: '/images/favicons/safari-pinned-tab.svg' },
            { rel: 'manifest', href: '/images/favicons/site.webmanifest' }
        ],
        script: [
            { src: '/plausible/js/script.js', 'data-domain': 'pdfshift.io', 'data-api': '/plausible/api/event' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/general.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/prism',
        '~/plugins/axios',
        { src: '~plugins/plausible.js', mode: 'client' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/svg'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        '@nuxtjs/sitemap',
        '@nuxtjs/axios'
    ],

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {
        markdown: {
            prism: {
                theme: '~/assets/css/prism-base16-ateliersulphurpool.light.css'
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },
    sitemap: {
        hostname: 'https://pdfshift.io',
        gzip: false // No need, we are not heavy
    },
    svg: {
        vueSvgLoader: {}
    }
}
