<template>
    <div>
        <NuxtLayout>
            <main class="px-4 sm:px-8 lg:px-0 pb-12">
                <PageHeader :title="'How PDFShift compares to '+company">
                    Discover how {{ company }} differs from PDFShift and see for yourself which service is most suited to your needs.
                </PageHeader>

                <div class="max-w-3xl mx-auto mt-16 md:mt-24">
                    <section class="flex gap-4 md:gap-10 ">
                        <div class="rounded-xl bg-purple-400 size-24 md:size-60 shrink-0"></div>
                        <div class="flex flex-col justify-center">
                            <h3 class="h3 font-normal">About {{ company }}</h3>
                            <p class="p mt-4 font-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        </div>
                    </section>
                    <section class="flex gap-4 md:gap-10 mt-16 md:mt-20">
                        <div class="flex flex-col justify-center">
                            <h3 class="h3 font-normal">About PDFShift</h3>
                            <p class="p mt-4 font-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        </div>
                        <div class="rounded-xl bg-purple-400 size-24 md:size-60 shrink-0"></div>
                    </section>
                </div>

                <!-- Comparison Cards -->
                <section class="mt-24 md:mt-36 container">
                    <header class="text-center">
                        <h2 class="h2">Competitor vs PDFShift</h2>
                        <div class="mt-8 grid gap-12 md:gap-16 md:grid-cols-2 relative">
                            <div class="absolute justify-center items-center w-full h-full left-0 top-0 hidden md:flex">
                                <img class="w-32" src="/images/illustrations/vs.png" />
                            </div>
                            <CardLight class="relative">
                                <div class="px-4 md:px-12">
                                    <div class="h-12">
                                        <img class="h-full w-auto" src="/images/demo/demo-company-logo.png" alt="DEMO Logo" />
                                    </div>
                                    <h3 class="h3 text-left mt-8">{{ company }} point #1</h3>
                                    <p class="p text-left mt-1 font-light mb-12 md:mb-36">Some text about the competition point goes here but do not make it too long.</p>
                                </div>
                            </CardLight>
                            <CardLight class="relative">
                                <div class="px-4 md:px-12">

                                    <div class="h-12">
                                        <IconsLogo class="h-full w-auto" />
                                    </div>
                                    <h3 class="h3 text-left mt-8">PDFShift point #1</h3>
                                    <p class="p text-left mt-1 font-light mb-12 md:mb-36">Some text about the competition point goes here but do not make it too long.</p>
                                </div>
                            </CardLight>
                        </div>
                    </header>
                </section>

                <section class="mt-24 md:mt-36 max-w-5xl mx-auto">
                    <ul class="grid gap-8 sm:grid-cols-3">
                        <li>
                            <div class="rounded-lg bg-purple-100 h-64"></div>
                            <div class="h3 mt-8">Competitor point #1</div>
                            <p class="p mt-2 font-light">Some text about the competition point goes here but do not make it too long.</p>
                        </li>
                        <li>
                            <div class="rounded-lg bg-purple-100 h-64"></div>
                            <div class="h3 mt-8">Competitor point #2</div>
                            <p class="p mt-2 font-light">Some text about the competition point goes here but do not make it too long.</p>
                        </li>
                        <li>
                            <div class="rounded-lg bg-purple-100 h-64"></div>
                            <div class="h3 mt-8">Competitor point #3</div>
                            <p class="p mt-2 font-light">Some text about the competition point goes here but do not make it too long.</p>
                        </li>
                    </ul>
                </section>

                <section class="mt-24 md:mt-36 max-w-5xl mx-auto">
                    <header class="text-center">
                        <h2 class="h2">How we compare</h2>
                        <p class="p font-light mt-4 max-w-sm mx-auto">Some text about the competition point goes here but do not make it too long.</p>
                    </header>
                    <div class="grid sm:grid-cols-2 gap-8 mt-8 md:mt-16">
                        <CardLight>
                            <header>
                                <div class="h-20">
                                    <IconsLogo class="h-full w-auto" />
                                </div>
                                <p class="p mt-6">Some intro text before going deeper into the specifics about PDF Shift</p>
                            </header>
                            <div class="mt-8">
                                <span class="h5 uppercase">Section Title</span>
                                <ul class="mt-2 space-y-4 pt-2">
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                </ul>
                            </div>
                            <div class="mt-12">
                                <span class="h5 uppercase">Section Title</span>
                                <ul class="mt-2 space-y-4 pt-2">
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                </ul>
                            </div>
                        </CardLight>

                        <CardLight>
                            <header>
                                <div class="h-20">
                                    <img class="h-full w-auto" src="/images/demo/demo-company-logo.png" alt="DEMO Logo" />
                                </div>
                                <p class="p mt-6">Some intro text before going deeper into the specifics about PDF Shift</p>
                            </header>
                            <div class="mt-8">
                                <span class="h5 uppercase">Section Title</span>
                                <ul class="mt-2 space-y-4 pt-2">
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                </ul>
                            </div>
                            <div class="mt-12">
                                <span class="h5 uppercase">Section Title</span>
                                <ul class="mt-2 space-y-4 pt-2">
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                    <CompareFeature feature="Feature description" :tick="false" />
                                </ul>
                            </div>
                        </CardLight>
                    </div>
                </section>
            </main>

            <section class="mt-24 md:mt-36">
                <header class="text-center">
                    <h2 class="h2">What our clients say</h2>
                </header>
                <CompareTestimonialsCarousel class="mt-12" :slides="testimonialSlides" />
            </section>

            <section class="container mt-24 md:mt-32 mb-32 md:mb-40">
                <section class="px-12 md:px-28 py-12 md:py-16 md:pb-20 rounded-3xl bg-purple relative overflow-hidden">
                    <div class="absolute left-0 top-0 w-full h-full">
                        <div class="bg-diamond-net-hero bg-center absolute z-10 left-0 top-0 w-3/4 h-full"></div>
                        <div class="bg-gradient-to-r z-20 from-transparent to-purple-400 absolute left-0 top-0 w-full h-full"></div>
                    </div>
                    <div class="relative z-30 flex flex-col justify-center items-center gap-6 ">
                            <span class="h2 text-white font-normal text-center max-w-xl">
                                Convinced by PDFShift ?
                            </span>
                        <p class="p text-white text-center max-w-md">
                            If this page helped you make a decision and you want to give PDFShift a try, we offer a free trial to get you started.
                        </p>
                        <Button to="/register" :light="true" :arrow="true">Give PDFShift a try</Button>
                    </div>
                </section>
            </section>
        </NuxtLayout>
    </div>
</template>

<script setup>
const route = useRoute()
const company = ref(route.params.company)

const testimonialSlides = [
    {
        text: "PDFShift works great with external libraries such as Tailwind, Bootstrap, Bulma, Skeleton, …. You can also generate beautiful charts with javascript libraries or maps using Google Map or OpenStreetMap.",
        link: 'A',
        author: {
            name: "John Doe",
            company: "ACME Inc.",
            image: "/images/demo/quote-author.jpg"
        },
    },
    {
        text: "PDFShift works great with external libraries such as Tailwind, Bootstrap, Bulma, Skeleton, …. You can also generate beautiful charts with javascript libraries or maps using Google Map or OpenStreetMap.",
        link: 'B',
        author: {
            name: "Lisa",
            company: "Company Z",
            image: "/images/demo/quote-author.jpg"
        },
    },
    {
        text: "PDFShift works great with external libraries such as Tailwind, Bootstrap, Bulma, Skeleton, …. You can also generate beautiful charts with javascript libraries or maps using Google Map or OpenStreetMap.",
        link: 'C',
        author: {
            name: "Maria",
            company: "Company B",
            image: "/images/demo/reviewer.png"
        },
    },

    {
        text: "PDFShift works great with external libraries such as Tailwind, Bootstrap, Bulma, Skeleton, …. You can also generate beautiful charts with javascript libraries or maps using Google Map or OpenStreetMap.",
        link: 'D',
        author: {
            name: "Joanne",
            company: "Company F",
            image: "/images/demo/quote-author.jpg"
        },
    },
]
</script>
