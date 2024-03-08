<template>
    <section class="pt-8 pb-16 lg:pt-16 lg:pb-32 bg-white" id="features">
        <div class="bg-net py-6 pb-48 lg:pb-64 ">
            <div class="container space-y-32 lg:space-y-36">
                <div>
                    <div class="container flex justify-center">
                        <TextPill icon="Clock">
                            <span class="font-light">We care about</span>
                            <strong class="font-bold">your time</strong>
                        </TextPill>
                    </div>
                    <div class="flex flex-col mt-8 lg:mt-0 lg:flex-row items-center gap-4 lg:gap-28">
                        <div class="w-full lg:w-3/5 ">
                            <NuxtImg class="w-full" src="/images/illustrations/converting.svg" alt="Illustration of Converting PDF" />
                        </div>
                        <div class="w-full lg:w-2/5 flex flex-col items-center lg:block">
                            <div class="mt-8 md:mt-16 lg:mt-24 text-center lg:text-left lg:pr-8">
                                <h2 class="h2">
                                    HTML to <span class="text-purple">PDF</span> in under 2 seconds
                                </h2>
                                <p class="p text-navy-700  mt-4">
                                    Our API makes it easy to export high-quality PDF versions of HTML documents from raw code or URLs. There's no need to worry about CSS properties, outdated libraries or conversion errors.
                                </p>
                                <!--<Button to="/case-studies" class="mt-10" :arrow="true">See Our Case Studies</Button>-->
                                <Button to="/guides" class="mt-10" :arrow="true">See Our Guides</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="container flex justify-center">
                        <TextPill icon="ClipboardCode">
                            <span class="font-light">We care about</span>
                            <strong class="font-bold">your needs</strong>
                        </TextPill>
                    </div>
                    <div class="flex flex-col-reverse mt-8 lg:mt-0 lg:flex-row items-center gap-4 lg:gap-28">
                        <div class="w-full lg:w-1/3 flex flex-col items-center lg:block">
                            <div class="mt-8 md:mt-16 lg:mt-24 text-center lg:text-left lg:pr-8">
                                <h2 class="h2">
                                    Generate <span class="text-purple">beautiful previews</span> of any website
                                </h2>
                                <p class="p text-navy-700 mt-4">
                                    Equip your product with the ability to turn visual content into downloadable images. Grab up-to-date screenshots from any website to generate beautiful previews and customize image output to suit your needs. All it takes is one simple API call.
                                </p>
                                <!--<Button to="/case-studies" class="mt-10" :arrow="true">See Our Case Studies</Button>-->
                                <Button to="/guides" class="mt-10" :arrow="true">See Our Guides</Button>
                            </div>
                        </div>
                        <div class="w-full lg:w-2/3 ">
                            <NuxtImg class="w-full" src="/images/illustrations/generating-preview.svg" alt="Illustration of PDF Generation" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="-mt-16 lg:-mt-32">
            <div class="container">
                <div class="rounded-3xl bg-navy-900 p-8 lg:px-12 lg:py-24 relative">
                    <div class="absolute bg-diamond-net left-0 top-0 w-full h-full bg-center z-0"></div>
                    <div class="flex flex-col lg:flex-row items-center lg:gap-18 relative">
                        <div class="w-full">
                            <NuxtImg class="w-full lg:scale-110 relative lg:top-8" src="/images/illustrations/social-automations.svg" alt="Illustration of social automations" />
                        </div>
                        <div class="w-full lg:pr-36">
                            <div class="hidden lg:inline-block bg-purple rounded-full p-4">
                                <IconsAddPhoto />
                            </div>
                            <h2 class="h2 text-white mt-6">
                                Automate <span class="text-purple-500">blog banners</span> for social networks
                            </h2>
                            <p class="p text-white mt-4">
                                Generate impactful Open Graph images to share your content on social networks easily. Use custom templates and provide variable parameters to automatically integrate banners into your CMS.
                            </p>
                            <!--<Button to="/case-studies" bg="dark" class="mt-10" :arrow="true">See Our Case Studies</Button>-->
                            <Button to="/guides" bg="dark" class="mt-10" :arrow="true">See Our Guides</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-net py-6 mt-16 lg:mt-32">
            <div class="container space-y-32 lg:space-y-48">
                <div>
                    <div class="container flex justify-center">
                        <TextPill icon="Lock">
                            <span class="font-light">We care about</span>
                            <strong class="font-bold">your safety</strong>
                        </TextPill>
                    </div>
                    <div class="flex flex-col-reverse lg:flex-row items-center gap-4 lg:gap-28 mt-16">
                        <div class="w-full lg:w-2/5 flex flex-col items-center lg:block">
                            <div class="space-y-8 mt-8 text-center lg:text-left lg:pr-16">
                                <h2 class="h2">
                                    Store your template at
                                    <span class="text-purple">PDFShift</span> and increase conversion speed
                                </h2>
                                <p class="p text-navy-700">
                                    Store your template and take advantage of our powerful template engine to convert your documents even faster. Storing your templates at PDFShift will allow you to generate documents on the fly with your customer in a secure way. It will allow you to automatically build banner images for your blog posts securely within your blog engine (Wordpress, Next, Nuxt).
                                </p>
                                <!--<Button to="/case-studies" :arrow="true">See Our Case Studies</Button>-->
                                <Button to="/guides" class="mt-10" :arrow="true">See Our Guides</Button>
                            </div>
                        </div>
                        <div class="w-full lg:w-3/5 flex justify-center">
                            <NuxtImg class="w-full" src="/images/illustrations/secure-storage.svg" alt="Illustration of PDFShift Storing Secure Template" />
                        </div>
                    </div>
                </div>

                <div>
                    <div class="container flex justify-center">
                        <TextPill icon="Clipboard">
                            <span class="font-light">We care about</span>
                            <strong class="font-bold">your data</strong>
                        </TextPill>
                    </div>
                    <div class="flex flex-col lg:flex-row items-center gap-4 lg:gap-28 mt-16">
                        <div class="w-full px-8 lg:px-0 lg:w-3/5 flex justify-center">
                            <NuxtImg class="w-full" src="/images/illustrations/s3-bucket.svg" alt="Illustration of PDFShift API Storing on Amazon S3" />
                        </div>
                        <div class="w-full lg:w-2/5 flex flex-col items-center lg:block">
                            <div class="space-y-8 mt-8 text-center lg:text-left lg:pr-16">
                                <h2 class="h2">
                                    Securely store your content in your
                                    <span class="text-purple">S3 Bucket</span>
                                </h2>
                                <p class="p text-navy-700">
                                    Our API makes it easy to export high-quality PDF versions of HTML documents from raw code or URLs. There's no need to worry about CSS properties, outdated libraries or conversion errors.
                                </p>
                                <!--<Button to="/case-studies" :arrow="true">See Our Case Studies</Button>-->
                                <Button to="/guides" :arrow="true">See Our Guides</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
