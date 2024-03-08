<template>
  <section :class="[blockOrientation, 'text-block']">
    <div class="text-block__frame">
      <div class="text-block__holder">
        <IconBlock 
          v-if="icon"
          :iconUrl="icon"
        />
        <strong class="text-block__title">{{ title }}</strong>
        <p class="text-block__text">{{ text }}</p>
        <Button hasArrow :to="to">See our case studies</Button>
      </div><!-- / holder -->
      <img :src="imageUrl" v-if="!hasContent"  class="text-block__img" alt="img">
      <div v-if="hasContent" class="text-block__content">
        <slot></slot>
      </div><!-- / content -->
    </div><!-- / frame -->
  </section><!-- / text-block -->
</template>

<script>
import IconBlock from '~/components/IconBlock.vue';

export default {
  name: 'TextBlock',
  props: {
    orientation: {
      type: String,
      default: 'left'
    },
    imageUrl: {
      type: String,
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    to: {
      type: String,
    },
    hasContent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    blockOrientation() {
      return {
        "text-block--left": this.orientation == 'left',
        "text-block--right": this.orientation == 'right',
      };
    },
  }
}

</script>

<style lang="scss" scoped>
.text-block {
  display: flex;
  max-width: var(--width-main);
  min-height: 27.5rem;
  margin: 0 auto 3.5rem;
  border-radius: 2rem;
  background: linear-gradient(60deg, #030014, #3C2F85, #A99BF9);
  z-index: -1;
  animation: animatedgradient 10s ease alternate infinite;
  background-size: 300% 300%;

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &:nth-child(2n+1) {
    animation-duration: 6s;
    background-size: 200% 200%;
  }

  &:nth-child(3n+2) {
    animation-duration: 8s;
  }

  &__frame {
    background: var(--color-dark) url('~/assets/images/mask-05.png') no-repeat 0 100%;
    display: flex;
    align-items: center;
    margin: 1px;
    padding: 3rem 5rem;
    border-radius: 2rem;
  }

  &--right {
    
    .text-block__frame {
      background: var(--color-dark) url('~/assets/images/mask-06.png') no-repeat 100% 100%;
    }
    .text-block__img {
      order: 1;
    }

    .text-block__holder {
      order: 2;
      margin: 0 0 0 5%;
    }
  }

  &__holder {
    flex: 1;
  }

  &__title {
    display: block;
    color: var(--color-primary);
    font-family: var(--font-title);
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: 500;
    margin: 0 0 1rem;
  }

  &__text {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    line-height: 1.3125rem;
    color: #9E9FB0;
  }

  &__content {
    align-self: stretch;
  }
}
</style>