<template>
  <div class="card">
    <div class="card__headline">
      <div class="card__avatar">
        <img v-if="avatarImg" :src="avatarImg" :alt="altText" class="card__img">
        <span v-else class="card__abbr">{{ avatarAbbr }}</span>
      </div><!-- / card__avatar -->
      <div>
        <strong class="card__name">{{ name }}</strong>
        <NuxtLink 
          v-if="linkText" 
          :to="linkUrl" 
          class="card__link"
          target="_blank"
        >
          {{ linkText}}
        </NuxtLink>
      </div>
    </div><!-- / headline -->
    <p class="card__text">{{ quote }}</p>
  </div><!-- / card -->
</template>

<script setup>
import { defineProps } from 'vue';

const { avatarImg, avatarAbbr, altText, name, linkUrl, linkText, quote, } = defineProps({
  avatarImg: {
    type: String,
  },
  avatarAbbr: {
    type: String,
    default: 'AV'
  },
  altText: {
    type: String,
    default: 'image'
  },
  name: {
    type: String,
    required: true
  },
  linkUrl: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
  },
  quote: {
    type: String,
    required: true
  }
});

</script>

<style lang="scss" scoped>
.card {
  padding: 1.1rem 1.1rem;
  background: rgba(3,0,20,0.5);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  border: 1px solid #332B5E;
  position: relative;
  z-index: 1;

  &__headline {
    display: flex;
    align-items: flex-start;
    margin: 0 0 1.5rem;
  }

  &__avatar {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 1rem 0 0;
    border-radius: 50%;
    text-align: center;

    &:before {
      content:'';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom,  rgba(51,43,94,1) 0%,rgba(68,52,154,1) 100%);
    }

    &:after {
      content:'';
      position: absolute;
      top: 1px;
      right: 1px;
      bottom: 1px;
      left: 1px;
      z-index: 2;
      background: #030014;
      border-radius: 50%;
      box-shadow: inset 0 -3px 16px 0 rgba(73,58,169,0.95);
    }
  }

  &__img,
  &__abbr {
    position: relative;
    z-index: 4;
  }

  &__name {
    display: block;
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 0.3rem;
    font-weight: 500;
    color: #C4C4DE;
  }

  &__link {
    text-decoration: underline;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #9695AD;

    &:hover {
      text-decoration: none;
    }
  }

  &__text {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #A2A1B7;
  }
}
</style>