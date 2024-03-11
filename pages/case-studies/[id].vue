<template>
    <div>
        <NuxtLayout name="default">
            <article class="" itemscope itemtype="http://schema.org/TechArticle">
                <div class="grid gap-8 md:grid-cols-2 ">
                    <div>
                        <header>
                            <h1 class="h1" itemprop="headline">
                                How DEMO used Shift PDF to increase revenue by 23% in 2023
                            </h1>
                            <p class="p -lead mt-4" itemprop="description">
                                This is some text introducing how PDF Shift helped that company. Don’t make it too long, we’ll have room for that down below the page!
                            </p>
                        </header>
                        <Quote class="mt-8 md:mt-12">
                            <p>"PDFShift works great with external libraries such as Tailwind, Bootstrap, Bulma, Skeleton, …. You can also generate beautiful charts with javascript libraries or maps using Google Map or OpenStreetMap."</p>
                            <template v-slot:footer>
                                <img src="/images/demo/quote-author.jpg" alt="quote author">
                                <span>Lisa from Company Z</span>
                            </template>

                            <template v-slot:cta>
                                <Button to="/register" :light="true" :arrow="true">Try PDFShift For Free</Button>
                            </template>

                        </Quote>
                    </div>
                    <div class="md:pl-16 lg:pl-24 xl:pl-32">
                        <CardLight>
                            <article itemscope itemtype="http://schema.org/Organization" class="md:pt-6">
                                <header>
                                    <figure>
                                        <img src="/images/demo/demo-company-logo.png" alt="Demo Company Logo" />
                                    </figure>
                                </header>
                                <section class="mt-6">
                                    <h3 itemprop="name" class="text-xl font-medium">About DEMO</h3>
                                    <p itemprop="description" class="p text-lg font-light mt-2">Some text that introduces the company in a short and concise manner.</p>
                                </section>
                                <section class="my-6">
                                    <dl>
                                        <dt class="h5 text-purple-500">CATEGORY</dt>
                                        <dd class="h4 mt-2" itemprop="additionalType">SaaS / Social Proof</dd>

                                        <dt class="mt-6 h5 text-purple-500">COMPANY SIZE</dt>
                                        <dd class="h4 mt-2"><span itemprop="numberOfEmployees">2 people</span></dd>

                                        <dt class="mt-6 h5 text-purple-500">FOUNDED</dt>
                                        <dd class="h4 mt-2">
                                            <time itemprop="foundingDate" datetime="2022-01-01">2022</time>
                                        </dd>

                                        <dt class="mt-6 h5 text-purple-500">FEATURES WE LOVE</dt>
                                        <dd class="h4 mt-2">
                                            This is where they make waves about PDF Shift in about a couple of lines. Or more.
                                        </dd>
                                    </dl>
                                </section>
                            </article>

                        </CardLight>
                    </div>
                </div>

                <div class="mt-16 md:mt-32 max-w-3xl mx-auto text-content case-study-content" itemprop="articleBody">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <h3>A headline that segments content for the case study</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <img src="/images/demo/blog/1b.jpg" alt="Blog image 2" />
                    <blockquote>“PDFShift works great with external libraries such as Tailwind, Bootstrap, Bulma, Skeleton, …. You can also generate beautiful charts with javascript libraries or maps using Google Map or OpenStreetMap.”</blockquote>

                    <h3>A headline that segments content for the case study</h3>

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </article>

            <div class="max-w-3xl mx-auto mt-24 md:mt-32 mb-24">
                <section class="px-12 md:px-28 py-12 md:py-16 md:pb-20 rounded-3xl bg-purple relative overflow-hidden">
                    <div class="absolute left-0 top-0 w-full h-full">
                        <div class="bg-diamond-net-hero bg-center absolute z-10 left-0 top-0 w-3/4 h-full" ></div>
                        <div class="bg-gradient-to-r z-20 from-transparent to-purple-400 absolute left-0 top-0 w-full h-full"></div>
                    </div>
                    <div class="relative z-30 flex flex-col justify-center items-center gap-6 ">
                        <span class="h2 text-white font-normal text-center">PDFShift is the best way to do X, Y and Z for your business</span>
                        <Button to="/register" :light="true" :arrow="true">Give PDFShift a try</Button>
                    </div>
                </section>

                <nav class="grid grid-cols-2 gap-4 md:gap-8 mt-12 md:mt-16">
                    <NavigationCard to="/case-studies/1" prev>
                        <span>Previous Case Study</span>
                    </NavigationCard>
                    <NavigationCard to="/case-studies/3" next>
                        <span>Next Case Study</span>
                    </NavigationCard>
                </nav>
            </div>
        </NuxtLayout>
    </div>
</template>


<script>
// XXX ??
import NavigationCard from "~/components/case-studies/NavigationCard.vue";

export default defineComponent({
    components: {NavigationCard}
})
</script>

<style>
.case-study-content blockquote {
    @apply p-8 md:p-16 italic text-xl md:text-2xl !leading-normal text-purple;
}
</style>
