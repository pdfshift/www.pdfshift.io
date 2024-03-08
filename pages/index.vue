<template>
    <div>
        <NuxtLayout name="home">
            <div class="bg-navy-900">
                <Header :dark="true" />

                <section class="px-4 pt-32 pb-12 lg:pt-48">
                    <div class="lg:grid lg:gap-16 lg:grid-cols-12 max-w-full lg:max-w-7xl mx-auto relative">
                        <div class="absolute bg-diamond-net-hero opacity-50 left-0 top-0 w-full h-full bg-top z-0"></div>
                        <div class="lg:col-span-6 flex flex-col justify-start max-w-xl mx-auto lg:max-w-none relative">
                            <h1 class="h1 text-white text-center lg:text-left lg:pr-16 text-4xl">
                                From HTML to pixel-perfect<br /><span class="text-purple-500">{{ highlightedWord }}</span> in seconds
                            </h1>
                            <p class="p -lead text-white text-center mt-4 lg:text-left">
                                Our always-up-to-date API for developers automates your document conversion tasks - effortlessly.
                            </p>
                            <div class="flex mt-4 lg:mt-8 justify-center lg:justify-start">
                                <Button to="/register" :arrow="true">Register for free</Button>
                            </div>

                            <NuxtLink to="https://www.capterra.com/p/184246/PDFShift/reviews/" class="mt-12 flex flex-col gap-6 md:flex-row items-center md:gap-8 mx-auto lg:mx-0 hover:underline" target="_blank">
                                <img class="w-32" src="/images/comparators/capterra-white.svg" alt="Capterra logo" />
                                <StarRating class="text-white hover:underline" :rating="4.8" :reviews="44" />
                            </NuxtLink>
                        </div>
                        <div class="lg:col-span-6 mt-12 lg:mt-0 text-sm lg:text-base max-w-full relative">
                            <div class="relative">
                                <HomeCodeSnippets />
                            </div>
                        </div>
                    </div>
                    <ul class="mt-20 w-full lg:max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 justify-center gap-12 lg:gap-24 xl:gap-32">
                        <li>
                            <HomeHeroFeature>
                                <template v-slot:icon>
                                    <IconsClipboardTick />
                                </template>
                                <template v-slot:title>36+ Million</template>
                                <template v-slot:description>Conversions made</template>
                            </HomeHeroFeature>
                        </li>
                        <li>
                            <HomeHeroFeature>
                                <template v-slot:icon>
                                    <IconsPeople />
                                </template>
                                <template v-slot:title>19,000+</template>
                                <template v-slot:description>Loyal users</template>
                            </HomeHeroFeature>
                        </li>
                        <li>
                            <HomeHeroFeature>
                                <template v-slot:icon>
                                    <IconsTimerPaused />
                                </template>
                                <template v-slot:title>1.5s</template>
                                <template v-slot:description>Average conversion time</template>
                            </HomeHeroFeature>
                        </li>
                        <li>
                            <HomeHeroFeature>
                                <template v-slot:icon>
                                    <IconsBarGraphUp />
                                </template>
                                <template v-slot:title>99.99%</template>
                                <template v-slot:description>Uptime</template>
                            </HomeHeroFeature>
                        </li>
                    </ul>
                </section>
            </div>

            <HomeCompanies />

            <main>
                <HomeIllustratedFeatures />
                <div class="bg-gradient-to-br from-purple-900 to-navy-700 via-20% via-navy-700 pb-24 lg:pb-36">
                    <div class="container">
                        <section class="py-16 lg:py-32">
                            <div class="lg:max-w-md mx-auto text-center">
                                <h2 class="h2 text-white"><span class="text-purple-500">Powerful features</span> for high-fidelity documents</h2>
                            </div>

                            <ul class="grid grid-cols-6 gap-8 mt-12 lg:mt-16">
                                <li class="col-span-full md:col-span-3 lg:col-span-2">
                                    <CardDark>
                                        <div class="p-4 flex justify-center">
                                            <img src="/images/illustrations/render-css3.svg" alt="Render pages with CSS3 - Illustration" />
                                        </div>
                                        <h3 class="h3 mt-6 text-white">Render pages beautifully with full
                                            <span class="text-purple-500">CSS Support</span></h3>
                                        <p class="p -small text-white mt-4">
                                            Our powerful engine supports all the latest CSS features, including custom web fonts, flexbox, grid layouts, and responsive design.
                                        </p>
                                    </CardDark>
                                </li>

                                <li class="col-span-full md:col-span-3 lg:col-span-2">
                                    <CardDark>
                                        <div class="p-4 flex justify-center">
                                            <img src="/images/illustrations/render-html5.svg" alt="Render pages with HTML5 - Illustration" />
                                        </div>
                                        <h3 class="h3 mt-4 text-white">
                                            <span class="text-purple-500">Tailor documents</span> to suit your needs</h3>
                                        <p class="p -small text-white mt-4">
                                            Customize headers and footers, inject custom CSS and Javascript, and wait for custom elements on the page so they turn out perfect every time.
                                        </p>
                                    </CardDark>
                                </li>

                                <li class="col-span-full md:col-span-3 lg:col-span-2">
                                    <CardDark>
                                        <div class="p-4 flex justify-center">
                                            <img src="/images/illustrations/render-secure.svg" alt="Converts pages securely - Illustration" />
                                        </div>
                                        <h3 class="h3 mt-4 text-white">Convert documents <span class="text-purple-500">securely</span>
                                        </h3>
                                        <p class="p -small text-white mt-4">
                                            Beam your raw HTML directly to PDFShift for completely secure conversions &dash; perfect for handling sensitive data.
                                        </p>
                                    </CardDark>
                                </li>

                                <li class="col-span-full md:col-span-3">
                                    <CardDark>
                                        <div class="flex flex-col-reverse lg:flex-row lg:items-center gap-8 lg:gap-12">
                                            <div class="lg:w-2/3">
                                                <h3 class="text-white text-2xl">Play nice with
                                                    <span class="text-purple-500">third-party libraries</span></h3>
                                                <p class="p -small text-white mt-4">
                                                    PDFShift works great with external libraries such
                                                    as Tailwind, Bootstrap, Bulma, Skeleton, …. You can also generate beautiful charts with javascript libraries or maps using Google Map or OpenStreetMap.
                                                </p>
                                            </div>
                                            <div class="h-28 lg:h-auto lg:w-1/3 flex justify-center">
                                                <img src="/images/illustrations/css-frameworks.svg" alt="CSS Frameworks - Illustration" />
                                            </div>
                                        </div>
                                    </CardDark>
                                </li>

                                <li class="col-span-full md:col-span-3">
                                    <CardDark>
                                        <div class="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
                                            <div class="lg:w-2/3">
                                                <h3 class="text-white text-2xl"><span class="text-purple-500">Generate documents</span> in the blink of an eye</h3>
                                                <p class="p -small text-white mt-4">
                                                    Use PDFShift's powerful webhook system to quickly generate thousands of documents with minimal wait times. Need more? Invoke our parallel conversion system to convert many documents with a single request for results in milliseconds.
                                                </p>
                                            </div>
                                            <div class="h-28 lg:h-auto lg:w-1/3">
                                                <img class="h-full w-auto" src="/images/illustrations/document.svg" alt="Document - Illustration" />
                                            </div>
                                        </div>
                                    </CardDark>
                                </li>
                            </ul>
                        </section>
                        <div class="bg-gradient-to-br from-purple-100 to-purple-100 via-white rounded-3xl p-8 lg:p-16 overflow-hidden">
                            <div class="flex flex-col-reverse md:flex-row items-center gap-8">
                                <div class="w-full">
                                    <div class="hidden lg:block w-24">
                                        <IconsRoundedLock />
                                    </div>

                                    <h2 class="-mt-8 lg:mt-0 h2 text-navy-700">Guaranteed privacy with HIPAA compliance</h2>
                                    <p class="p text-navy-700 mt-4">
                                        PDFShift's conversion technology is fully HIPAA compliant,
                                        making it a great choice for the healthcare industry. We don't store your documents (unless specifically requested in the API), so we can ensure the privacy of your data.
                                    </p>
                                    <div class="mt-12">
                                        <Button to="/legal/hipaa" :arrow="true">Review our Business Associate Agreement (BAA)</Button>
                                    </div>
                                </div>
                                <div class="w-full relative">
                                    <div class="absolute w-full h-full bg-net bg-cover"></div>
                                    <NuxtImg width="560" height="560" class="lg:scale-150 object-cover" src="/images/illustrations/shield.png" alt="Illustration of shield" format="webp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gradient-to-bl from-purple-100 to-purple-100 via-white">
                    <div class="container">
                        <HomePricing />
                        <HomeFAQ />
                        <HomeTestimonials />
                        <div class="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mt-12">
                            <HomeReview v-for="(review,index) in reviews" :rating="review.rating" :small="true" :reviews="review.reviews" :to="review.url" :key="index" :name="review.name" :logo="review.logo" />
                        </div>
                        <section class="mt-16 lg:mt-20 bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 lg:p-16 max-w-5xl mx-auto -mb-8 lg:-mb-20 relative flex items-center gap-24">
                            <div>
                                <div class="font-medium text-xl lg:text-3xl leading-relaxed text-white">Improving automated conversion<br />since 2018.</div>
                                <div class="font-medium text-xl lg:text-3xl leading-relaxed mt-8 mb-12 text-white">We're here for the long haul!</div>
                                <Button to="/register" :arrow="true" :light="true" hover="dark">Register For Free</Button>
                            </div>
                            <div class="hidden lg:block shrink-0 text-purple-500 w-48 mt-10 pr-12">
                                <IconsLogoBird />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = 'Fast, Easy Website and HTML to PDF Converter via API | PDFShift';
const description = 'An API to convert HTML/CSS documents to PDF. PDFShift is the reliable, Up-to-date and high-fidelity conversion API with no maintenance costs.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
})

const highlightedWord = ref('PDF');
const wordsToType = ['Banner', 'Screenshot', 'PDF'];
const typingSpeed = 200; // milliseconds per character
const wordPause = 1000; // pause for 1 second before starting to type the next word

// Trigger the word swap
if (process.client) {
    const isLooping = ref(true);

    //wait untill hydration is done
    setTimeout(async () => {
        while (isLooping.value) { // Endless loop
            for (const wordToType of wordsToType) {
                // Delete the current word
                while (highlightedWord.value.length > 0) {
                    highlightedWord.value = highlightedWord.value.slice(0, -1);
                    await new Promise((resolve) => setTimeout(resolve, typingSpeed));
                }

                // Pause after deleting the current word
                await new Promise((resolve) => setTimeout(resolve, wordPause));

                // Type the new word
                for (let i = 0; i < wordToType.length; i++) {
                    highlightedWord.value += wordToType[i];
                    await new Promise((resolve) => setTimeout(resolve, typingSpeed));
                }

                // Pause after typing the new word
                await new Promise((resolve) => setTimeout(resolve, wordPause));
            }
        }
    }, 1000);
}

const reviews = [
    {
        name: "Capterra",
        rating: 4.8,
        reviews: 44,
        logo: "/images/comparators/capterra.svg",
        url: "https://www.capterra.com/p/184246/PDFShift/reviews",
    },
    {
        name: "G2",
        rating: 4.5,
        reviews: 22,
        logo: "/images/comparators/g2.svg",
        url: "https://www.g2.com/products/pdfshift/reviews",
    },
    {
        name: "AlternativeTo",
        rating: 4.9,
        reviews: 30,
        logo: "/images/comparators/alternativeto.svg",
        url: "https://alternativeto.net/software/pdfshift/about/",
    },
]
</script>

<style>
.code-snippet-shadow {
    box-shadow: 15px -15px 30px 40px rgb(199 146 234 / 20%);
}
</style>