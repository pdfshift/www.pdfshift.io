// https://nuxt.com/docs/api/configuration/nuxt-config
const builtAt = new Date().toISOString()

export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    app: {
        // pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            htmlAttrs: { lang: 'en' },
            meta: [
                // General
                { hid: 'keyword', name: 'keyword', content: 'api, pdf, html, convert, document, web, conversion, text, pdfshift, raw, link' },
                { hid: 'author', name: 'author', content: 'Cyril Nicodeme' },
                { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },

                // Twitter
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                { hid: 'twitter:site', name: 'twitter:site', content: '@pdfshift' },
                { hid: 'twitter:creator', name: 'twitter:creator', content: '@cx42net' },
                { hid: 'twitter:image', name: 'twitter:image', content: '/images/banner/slogan.png' },

                // Facebook
                { hid: 'og:site_name', name: 'og:site_name', content: 'PDFShift' },
                { hid: 'og:image', name: 'og:image', content: '/images/banner/slogan.png' },
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
                { src: '/plausible/js/script.js', 'data-domain': 'pdfshift.io', 'data-api': '/plausible/api/event' },
                { src: '/js/signups.js', 'data-domain': 'pdfshift.io' },
                {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify({
                        "@type": "Organization",
                        "founder": {
                            "@type": "Person",
                            "name": "Cyril Nicodeme"
                        },
                        "foundingDate": "2018",
                        "keywords": "API, HTML, PDF, Convert, Image, document, web, conversion, text, pdfshift, raw, link, WEBP, JPG, JPEG, PNG, Chrome, Chromium",
                        "legalName": "PDFShift",
                        "name": "PDFShift",
                        "logo": "https://pdfshift.io/images/logo/logo.png",
                        "slogan": "From HTML to pixel-perfect PDF in seconds"
                    })
                }
            ],
        }
    },
    modules: [
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    'DM Sans': {
                        wght: [300,400,500,700],
                        ital: [400,500],
                    }
                }
            }
        ],
        '@nuxt/image',
        '@nuxt/content',
        '@nuxtjs/sitemap',
        'dayjs-nuxt',
        'vue3-carousel-nuxt'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    hooks: {
        'pages:extend' (pages) {
            pages.push({
                name: 'guides-library-list',
                path: '/guides/:language(csharp|curl|go|java|node|php|python|ruby)/:library/',
                file: '~/pages/guides/[language]/index.vue'
            })
        },
        async 'nitro:build:public-assets' (nitro) {
            // Copy markdown files to dist for Netlify Edge Functions
            const { copyFile, mkdir } = await import('fs/promises')
            const { join } = await import('path')
            const { existsSync } = await import('fs')

            const contentDir = join(process.cwd(), 'content')
            const targetDir = join(nitro.options.output.publicDir, 'content')

            // Create target directory
            if (!existsSync(targetDir)) {
                await mkdir(targetDir, { recursive: true })
            }

            // Copy specific markdown files
            const filesToCopy = ['index.md', 'faq.md']
            for (const file of filesToCopy) {
                const source = join(contentDir, file)
                const target = join(targetDir, file)
                if (existsSync(source)) {
                    await copyFile(source, target)
                    console.log(`✓ Copied ${file} to dist/content/`)
                }
            }
        }
    },
    site: {
        url: 'https://pdfshift.io',
    },
    sitemap: {
        sources: [
          '/api/__sitemap__/urls',
        ]
    }
})