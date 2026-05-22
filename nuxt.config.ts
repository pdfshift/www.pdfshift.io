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
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "PDFShift",
                        "legalName": "PDFShift",
                        "url": "https://pdfshift.io",
                        "logo": "https://pdfshift.io/images/logo/logo.png",
                        "foundingDate": "2018",
                        "description": "From HTML to pixel-perfect PDF in seconds",
                        "slogan": "From HTML to pixel-perfect PDF in seconds",
                        "keywords": "API, HTML, PDF, Convert, Image, document, web, conversion, text, pdfshift, raw, link, WEBP, JPG, JPEG, PNG, Chrome, Chromium",
                        "founder": {
                            "@type": "Person",
                            "name": "Cyril Nicodeme"
                        },
                        "sameAs": [
                            "https://twitter.com/pdfshift",
                            "https://github.com/pdfshift"
                        ],
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "customer support",
                            "email": "support@pdfshift.io"
                        }
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
            // Copy all markdown files to dist for Netlify Edge Functions
            const { copyFile, mkdir, readdir, stat } = await import('fs/promises')
            const { join, relative } = await import('path')
            const { existsSync } = await import('fs')

            const contentDir = join(process.cwd(), 'content')
            const targetDir = join(nitro.options.output.publicDir, 'content')

            // Recursive function to copy all .md files
            async function copyMarkdownFiles(sourceDir: string, targetBaseDir: string) {
                const entries = await readdir(sourceDir, { withFileTypes: true })

                for (const entry of entries) {
                    const sourcePath = join(sourceDir, entry.name)
                    const relativePath = relative(contentDir, sourcePath)
                    const targetPath = join(targetBaseDir, relativePath)

                    if (entry.isDirectory()) {
                        // Create directory and recurse
                        if (!existsSync(targetPath)) {
                            await mkdir(targetPath, { recursive: true })
                        }
                        await copyMarkdownFiles(sourcePath, targetBaseDir)
                    } else if (entry.isFile() && entry.name.endsWith('.md')) {
                        // Copy markdown file
                        const targetDirPath = join(targetPath, '..')
                        if (!existsSync(targetDirPath)) {
                            await mkdir(targetDirPath, { recursive: true })
                        }
                        await copyFile(sourcePath, targetPath)
                        console.log(`✓ Copied ${relativePath} to dist/content/`)
                    }
                }
            }

            // Create target directory
            if (!existsSync(targetDir)) {
                await mkdir(targetDir, { recursive: true })
            }

            // Copy all markdown files recursively
            await copyMarkdownFiles(contentDir, targetDir)
            console.log('✓ All markdown files copied to dist/content/')
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
