<template>
  <section class="testimonials">
    <h2 class="testimonials__title">Trusted and loved around the world</h2>
    <strong class="testimonials__sub-title">Hundred of users shared their love of PDFShift  </strong>
    <div class="testimonials__frame">
      <div :class="['testimonials__holder', toggleState ? 'testimonials__holder--active' : '']" ref="holder">
        <!-- name abbreviation will be available only if url is not provided -->
        <Card 
          v-for="card in cards"
          :avatarImg="card.avatarImg"
          :avatarAbbr="card.avatarAbbr"
          :altText:="card.altText"
          :name="card.name"
          :linkUrl="card.linkUrl"
          :linkText="card.linkText"
          :quote="card.quote"
        />
        <Button @click="loadMore">
          <span class="btn__text">{{ toggleState ? 'Hide' : 'Load More' }}</span>
        </Button>
      </div><!-- / holder -->
    </div><!-- / frame  -->
  </section><!-- / testimonials -->
</template>

<script setup>
import { defineProps, ref } from 'vue';
import Card from '~/components/TestimonialCard.vue';

const { cards } = defineProps({
  cards: {
    type: Array,
    required: true
  }
});


const holder = ref(null);
const toggleState = ref(false);

const loadMore = () => {
  toggleState.value = !toggleState.value;
  if (toggleState.value) {
    holder.value.style.height = 'auto';
  } else {
    holder.value.style.height = '455px'; //value for holder to be expanded on click, px is required 
  }
}

</script>

<style lang="scss" scoped>
.testimonials {
  padding: 29rem 0 0;
  background: url('~/assets/images/img-testimonials.png') no-repeat 50% 0;
  position: relative;
  z-index: 2;

  &__title {
    font-family: var(--font-title);
    font-size: 2.5rem;
    line-height: 2.5rem;
    font-weight: 500;
    color: var(--color-primary);
    text-align: center;
    margin: 0 0 1rem;
  }

  &__sub-title {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
    display: block;
    text-align: center;
    margin: 0 0 4rem;
  }

  &__frame {
    padding: 0 9999px;
    margin: 0 -9999px;
    background: url('~/assets/images/mask-04.png') repeat-x 30% 0;
    //slow moving from left to right animation
    animation: move 500s linear infinite;

    @keyframes move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 100% 40%;
      }
    }
  }

  &__holder {
    display: grid;
    gap: 1.5rem;
    overflow: hidden;
    grid-template-columns: (1fr 1fr 1fr);
    position: relative;
    z-index: 1;
    justify-content: space-evenly;
    max-width: 66.325rem;
    margin: 0 auto;
    height: 455px; //value for holder to be expanded on click, px is required

    &--active {
      padding-bottom: 3rem;

      &:before {
        display: none !important;
      }
    }

    &:before {
      content: '';
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      right: 0;
      height: 15rem;
      background: linear-gradient(to bottom,  rgba(3,0,20,0) 0%,rgba(3,0,20,0) 42%,rgba(3,0,20,1) 100%);
    }
    .btn {
      position: absolute;
      z-index: 4;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>