<template>
    <footer class="text-center md:text-left px-4 py-12 lg:pb-16 bg-navy-900" :class="{'md:pt-24 lg:pt-40': push }">
        <div class="max-w-full xl:max-w-7xl mx-auto grid md:grid-cols-4 gap-12 md:gap-0">
            <div class="col-span-full md:col-span-1 text-white relative md:mr-16">
                <div class="w-36 m-auto md:m-0">
                    <NuxtLink to="/" title="Go to the home page">
                        <IconsLogo class="text-white" />
                    </NuxtLink>
                </div>
                <ul class="text-white flex items-center gap-8 mt-2 flex-col md:flex-row">
                    <li class="size-8 p-1.5">
                        <NuxtLink to="https://twitter.com/pdfshift" title="View our X (ex Twitter) profile">
                            <LogosX />
                        </NuxtLink>
                    </li>
                    <li class="size-8">
                        <NuxtLink to="https://linkedin.com/company/pdfshift" title="View our LinkedIn profile">
                            <LogosLinkedin />
                        </NuxtLink>
                    </li>
                </ul>
                <div class="mt-8 text-sm">&copy; {{ new Date().getFullYear() }} PDFShift.</div>
                <div class="mt-2 text-sm">PDFShift is a 🇫🇷 French company</div>
                <div class="hidden md:block absolute h-full right-0 top-0 footer-separator w-px"></div>
            </div>
            <div class="col-span-full md:col-span-1">
                <span class="text-white uppercase text-sm">Company Details</span>
                <ul class="mt-6 space-y-4 text-purple-400 text-sm">
                    <li class="hover:underline">
                        <NuxtLink to="/contact" title="Feel free to contact us if you have any request">Contact Us</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/legal/terms" title="read our Terms of Service">Terms of service</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/legal/privacy" title="read our Privacy Policy">Privacy Policy</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/legal/gdpr" title="Read our GDPR guidelines">GDPR</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/legal/hipaa" title="Read more about our HIPAA">HIPAA - BAA</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="col-span-full md:col-span-1">
                <span class="text-white uppercase text-sm">Product</span>
                <ul class="mt-6 space-y-4 text-purple-400 text-sm">
                    <li class="hover:underline">
                        <NuxtLink to="/#features">Features</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/#pricing">Pricing</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="https://docs.pdfshift.io" class="inline-flex items-center" target="_blank">
                            Documentation
                            <span class="inline-block size-3.5 ml-1 -top-px relative">
                                <IconsExternalLink />
                            </span>
                        </NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="https://playground.pdfshift.io" target="_blank" class="inline-flex items-center">
                            Playground
                            <span class="inline-block size-3.5 ml-1 -top-px relative">
                                <IconsExternalLink />
                            </span>
                        </NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="https://status.pdfshift.io" target="_blank" class="inline-flex items-center">
                            Status Page
                            <span class="inline-block size-3.5 ml-1 -top-px relative">
                                <IconsExternalLink />
                            </span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="col-span-full md:col-span-1">
                <span class="text-white uppercase text-sm">Guides</span>
                <ul class="mt-6 space-y-4 text-purple-400 text-sm">
                    <li class="hover:underline">
                        <NuxtLink to="/guides/node/">NodeJS Guide</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/guides/go/">GoLang Guide</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/guides/php/">PHP Guide</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/guides/python/">Python Guide</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/guides/ruby/">Ruby Guide</NuxtLink>
                    </li>
                    <li class="hover:underline">
                        <NuxtLink to="/guides/">All our Guide</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>


<script setup>
const props = defineProps({
    push: {
        type: Boolean,
        default: false,
    }
})
</script>

<style scoped>
.footer-separator {
    background: linear-gradient(180deg, rgba(68, 72, 112, 0.00) 0%, #444870 52.95%, rgba(68, 72, 112, 0.00) 95.83%);
}
</style>
