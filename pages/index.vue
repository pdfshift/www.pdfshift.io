<template>
  <div>
    <Hero />
    <APIExample />
    <div class="stars-bg">
      <Trusted :images="logos"/>
      <Rely />
    </div>
    <h2 class="title">Use PDFShift's API to generate <br>PDF/Screenshot/Banner</h2>
    <TextBlock
      icon="images/icons/ico-clock.svg"
      title="Go from HTML to PDF in under 2 seconds"
      text="Our API makes it easy to export high-quality PDF versions of HTML documents from raw code or URLs. There's no need to worry about CSS properties, outdated libraries or conversion errors."
      hasContent
      to="/"
    >
      <ConvertingArt />
    </TextBlock>
    <TextBlock
      orientation="right"
      icon="images/icons/ico-screen.svg"
      title="Generate beautiful previews of any website"
      text="Equip your product with the ability to turn visual content into downloadable images. Grab up-to-date screenshots from any website to generate beautiful previews and customize image output to suit your needs. All it takes is one simple API call."
      hasContent
      to="/"
    >
      <GenerateScreenshot />
    </TextBlock>
    <TextBlock
      icon="images/icons/ico-img.svg"
      title="Automate blog banners for social networks"
      text="Generate impactful Open Graph images to share your content on social networks easily. Use custom templates and provide variable parameters to automatically integrate banners into your CMS."
      imageUrl="images/text-block/img-info-03.png"
      to="/"
    />
    <TextBlock
      orientation="right"
      icon="images/icons/ico-time.svg"
      title="Store your template at PDFShift and increase conversion speed."
      text="Store your template and take advantage of our powerful template engine to convert your documents even faster. Storing your templates at PDFShift will allow you to generate documents on the fly with your customer in a secure way. It will allow you to automatically build banner images for your blog posts securely within your blog engine (Wordpress, Next, Nuxt)."
      imageUrl="images/text-block/img-info-04.png"
      hasContent
      to="/"
    >
      <SaveTemplate />
    </TextBlock>
    <TextBlock
      orientation="left"
      icon="images/icons/ico-time.svg"
      title="Securely store your content in your S3 buckets"
      text="Beam every generated content from PDFShift directly into your AWS S3 cloud storage. This will allow you to keep your content secure and private and to use it in your applications."
      imageUrl="images/text-block/img-info-04.png"
      to="/"
    />
    <Features />
    <Compliance />
    <Pricing />
    <Testimonials :cards="testimonials"/>
    <div class="footer-mask">
      <Conversion />
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Hero from '~/components/Hero.vue';
import APIExample from '~/components/APIExample.vue';
import Trusted from '~/components/Trusted.vue';
import Rely from '~/components/Rely.vue';
import TextBlock from '~/components/TextBlock.vue';
import GenerateScreenshot from '~/components/GenerateScreenshot.vue';
import Features from '~/components/Features.vue';
import Compliance from '~/components/Compliance.vue';
import Pricing from '~/components/Pricing.vue';
import Testimonials from '~/components/Testimonials.vue';
import Conversion from '~/components/Conversion.vue';
import Footer from '~/components/Footer.vue';
import SaveTemplate from '~/components/SaveTemplate.vue';

const logos = ref([
  {
    id: 1,
    url: 'images/logos/logo-01.svg',
    altText: 'logo 1'
  },
  {
    id: 2,
    url: 'images/logos/logo-01.svg',
    altText: 'logo 2'
  },
  {
    id: 3,
    url: 'images/logos/logo-01.svg',
    altText: 'logo 3'
  },
  {
    id: 4,
    url: 'images/logos/logo-01.svg',
    altText: 'logo 4'
  },
  {
    id: 5,
    url: 'images/logos/logo-01.svg',
    altText: 'logo 5'
  },
])

const testimonials = ref([
  {
    avatarImg: 'images/avatars/ava-01.png',
    altText: 'image',
    name: 'Nomad WebDesign',
    linkUrl: 'https://www.google.com',
    linkText: 'AlternativeTo',
    quote: 'So far this is one of the best HTML to PDF converters I have come across. I like that it\'s simple and does a good job. Also, their support and pricing is great!'
  },
  {
    avatarAbbr: 'NW',
    altText: 'image',
    name: 'Skystover',
    linkUrl: 'https://www.google.com',
    linkText: 'AlternativeTo',
    quote: 'Very easy to use, highly customizable, and works just as intended. The biggest feature missing from other PDF APIs was the ability to decide where a page "breaks" and continues on to a new page. PDFShift made doing so easy with a simple CSS class.'
  },
  {
    avatarImg: 'images/avatars/ava-02.png',
    altText: 'image',
    name: 'Greg R.',
    linkUrl: 'https://www.google.com',
    linkText: 'AlternativeTo',
    quote: 'PDFShift is awesome! Before I was creating PHP PDF files through fPDF and it was very time consuming and difficult. Now with PDFShift, I can just mock them up in HTML and CSS and then through a very simple and easy to use API I can create a PDF in a matter of seconds. I highly recommend PDFShift.'
  },
  {
    avatarImg: 'images/avatars/ava-03.png',
    altText: 'image',
    name: 'Billy B.',
    linkUrl: 'https://www.google.com',
    linkText: 'G2',
    quote: 'Perfect rendering, easy to setup and use.'
  },
  {
    avatarImg: 'images/avatars/ava-04.png',
    altText: 'image',
    name: 'Greg R.',
    linkUrl: 'https://www.google.com',
    linkText: 'Capterra',
    quote: 'Stop rolling your own PDF generator - PDFShift has done it better.'
  },
  {
    avatarImg: 'images/avatars/ava-04.png',
    altText: 'image',
    name: 'Greg R.',
    linkUrl: 'https://www.google.com',
    linkText: 'Capterra',
    quote: 'Stop rolling your own PDF generator - PDFShift has done it better.'
  },
  {
    avatarImg: 'images/avatars/ava-01.png',
    altText: 'image',
    name: 'Nomad WebDesign',
    linkUrl: 'https://www.google.com',
    linkText: 'AlternativeTo',
    quote: 'So far this is one of the best HTML to PDF converters I have come across. I like that it\'s simple and does a good job. Also, their support and pricing is great!'
  },
  {
    avatarImg: 'images/avatars/ava-01.png',
    altText: 'image',
    name: 'Nomad WebDesign',
    linkUrl: 'https://www.google.com',
    linkText: 'AlternativeTo',
    quote: 'So far this is one of the best HTML to PDF converters I have come across. I like that it\'s simple and does a good job. Also, their support and pricing is great!'
  },
  {
    avatarImg: 'images/avatars/ava-01.png',
    altText: 'image',
    name: 'Nomad WebDesign',
    linkUrl: 'https://www.google.com',
    linkText: 'AlternativeTo',
    quote: 'So far this is one of the best HTML to PDF converters I have come across. I like that it\'s simple and does a good job. Also, their support and pricing is great!'
  },
])
</script>

<style lang="scss" scoped>
.stars-bg {
  background: url('~/assets/images/stars.png') no-repeat 50% 0;
  background-size: cover;
  position: relative;
  z-index: 0;
  padding-bottom: 10rem;
}

.title {
  font-size: 3rem;
  line-height: 3.9rem;
  font-weight: 500;
  color: var(--color-primary);
  max-width: var(--width-main);
  margin: 0 auto 4rem;
}
</style>