<template>
    <section class="py-8 lg:py-8 ">
        <div class="flex flex-col items-center gap-8">
            <div class="text-purple-100 bg-purple rounded-full p-2.5">
                <IconsBubbleQuestionMark />
            </div>
            <h2 class="h2 text-navy-700 text-center">Frequently Asked Questions</h2>
        </div>

        <div class="pt-16 py-32 max-w-5xl mx-auto">
            <ol>
                <li v-for="(faq,key) in faqsLeft" :key="key" class="border-b border-navy-700 py-4 text-navy-700" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <div class="p cursor-pointer flex items-center text-lg" @click="toggle(faq)" itemprop="name">
                        <span class="bg-purple rounded-full text-white size-8 inline-flex justify-center items-center mr-4">{{ key + 1 }}</span>
                        <span>{{ faq.question }}</span>
                        <span class="ml-auto" :class="{'text-purple':faq.visible}">
                            <IconsMinus v-if="faq.visible" />
                            <IconsPlus v-else />
                        </span>
                    </div>
                    <div v-if="faq.visible" class="p -small py-4 pl-12 pr-4" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <div itemprop="text" v-html="faq.answer"></div>
                    </div>
                </li>
            </ol>
            <div class="pt-16">
                <div class="h3" itemprop="name">
                    <span>What if I have other questions?</span>
                </div>
                <div class="p py-4" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <div itemprop="text">
                        <p>Our dedicated <NuxtLink to="faq" title="Head over our complete FAQ page" class="font-medium text-purple hover:underline">FAQ page</NuxtLink> contains answers to many more questions.</p>
                        <p>If you can't find what you're looking for, feel free to <a href="/contact" title="Contact us" class="font-medium text-purple hover:underline">reach out to us via email</a>, and we'll be happy to answer to all your questions.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const faqs = questions()

const faqsLeft = ref(faqs.filter(x => x.home))

const toggle = (faq) => {
    faq.visible = !faq.visible;
};
</script>
