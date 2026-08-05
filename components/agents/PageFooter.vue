<template>
    <footer class="relative z-[2] -mt-14 min-h-[524px] bg-[#011552] px-6 pb-16 pt-28 text-center text-white md:-mt-16 md:pt-[140px] md:text-left">
        <div class="mx-auto grid w-full max-w-[1080px] grid-cols-1 md:grid-cols-[1.25fr_repeat(3,1fr)]">
            <div class="relative min-h-0 md:min-h-[280px] md:pr-[76px]">
                <NuxtLink to="/" class="mx-auto block w-[141px] md:mx-0" title="Go to the home page">
                    <IconsLogo />
                </NuxtLink>
                <div class="mx-auto mt-6 flex justify-center gap-8 text-purple-400 md:mx-0 md:justify-start">
                    <NuxtLink class="h-[30px] w-[30px] p-1" to="https://twitter.com/pdfshift" title="View our X profile"><LogosX /></NuxtLink>
                    <NuxtLink class="h-[30px] w-[30px]" to="https://linkedin.com/company/pdfshift" title="View our LinkedIn profile"><LogosLinkedin /></NuxtLink>
                </div>
                <p class="mt-[22px] text-sm font-normal leading-[21px] tracking-[-0.14px] text-purple-400">© 2023 PDFShift.</p>
                <span class="absolute right-[34px] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#444870] to-transparent md:block" aria-hidden="true"></span>
            </div>

            <div v-for="column in footerColumns" :key="column.title" class="mt-12 md:mt-0">
                <h2 class="text-sm font-medium leading-6 tracking-[-0.14px] uppercase">{{ column.title }}</h2>
                <ul class="mt-6 [&>li+li]:mt-4">
                    <li v-for="link in column.links" :key="link.label" class="text-sm font-normal leading-[21px] tracking-[-0.14px] text-purple-400">
                        <NuxtLink class="hover:underline" :to="link.href">{{ link.label }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script setup>
const footerColumns = [
    {
        title: 'Company Details',
        links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Term of services', href: '/legal/terms' },
            { label: 'GRPR', href: '/legal/gdpr' },
            { label: 'HIPAA - BAA', href: '/legal/hipaa' },
        ],
    },
    {
        title: 'Product',
        links: [
            { label: 'Features', href: '/#features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Blog', href: '/blog' },
            { label: 'Documentation', href: 'https://docs.pdfshift.io' },
            { label: 'Playground', href: 'https://playground.pdfshift.io' },
            { label: 'Status Page', href: 'https://status.pdfshift.io' },
        ],
    },
    {
        title: 'Guides',
        links: [
            { label: 'Node.js Guide', href: '/guides/node/' },
            { label: 'Node.js Guide', href: '/guides/node/' },
            { label: 'Python Guide', href: '/guides/python/' },
            { label: 'Ruby Guide', href: '/guides/ruby/' },
            { label: 'All our Guide', href: '/guides/' },
        ],
    },
]
</script>
