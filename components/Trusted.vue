<template>
  <section class="trusted fade-slide">
    <h2 class="trusted__title">Trusted by 18,000+ users with millions of generated documents.</h2>
    <div class="trusted__row">
      <ImageComponent 
        class="trusted__logo"
        v-for="image in images"
        :key="image.id"
        :imageUrl="image.url"
        :altText="image.altText"
      />
    </div><!-- / row -->
  </section>
</template>

<script setup>
import { defineProps } from 'vue';
import ImageComponent from '~/components/ImageComponent.vue';

const { images } = defineProps({
  images: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.trusted {
  text-align: center;
  margin-bottom: 5rem;
  animation: fade-slide 1s ease-out 2.5s forwards;

  &__title {
    font-family: var(--font-title);
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: 500;
    margin: 0 0 2.45rem;
  }

  &__row {
    display: flex;
    justify-content: space-around;
    width: 62rem;
    margin: 0 auto;
    position: relative;
    z-index: 1;

    &:before,
    &:after {
      content: '';
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      width: 9.375rem;
      background: linear-gradient(to right,  rgba(3,0,20,1) 0%,rgba(3,0,20,1) 20%,rgba(3,0,20,0) 99%,rgba(3,0,20,0) 100%);
    }

    &:before {
      left: 0;
    }
    &:after {
      right: 0;
      background: linear-gradient(to right,  rgba(3,0,20,0) 0%,rgba(3,0,20,0) 1%,rgba(3,0,20,1) 80%,rgba(3,0,20,1) 100%);
    }
  }

  &__logo {
    position: relative;
    z-index: 1;
  }
}
</style>