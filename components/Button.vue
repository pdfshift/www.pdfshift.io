<template>
  <NuxtLink
    :class="['btn', btnClass]"
    :to="to"
  >
    <img
      v-if="hasIcon"
      :src="icon"
      alt="icon"
      class="btn__icon"
    />
    <slot></slot>
    <img
      v-if="hasArrow"
      src="~/assets/images/icons/ico-arrow-right.svg"
      alt="arrow"
      class="btn__arrow"
    />
  </NuxtLink>
</template>

<script>
export default {
  name: 'Button',
  props: {
    hasIcon: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    hasArrow: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '/'
    },
    glossy: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    btnClass() {
      return {
        //style: glossy or default
        "btn--glossy": this.glossy == true,
        "btn--full-width": this.fullWidth == true,
      };
    },
  }
};
</script>

<style lang="scss" scoped>
.btn {
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-btn-primary);
  color: var(--color-btn-primary);
  font-weight: 500;
  line-height: 2.5rem;
  padding: 0 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--stroke-btn-primary);
  transition: 0.3s;

  &--glossy {
    border-radius: 2.5rem;
    background: var(--bg-btn-glossy);
    border-color: var(--stroke-btn-glossy);
    box-shadow: inset 0 4px 14px rgba(133,122,236,0.25);

    &:hover {
      box-shadow: inset 0 0 22px rgba(133,122,236,0.5);

      .btn__arrow {
        animation: none !important;
      }
    }
  }

  &--full-width {
    width: 100%;
  }

  &:hover {
    text-decoration: none;
    opacity: 0.9;
    
    .btn__arrow {
      //TODO: not final animation
      animation: shake 1.5s cubic-bezier(.36,.07,.19,.97) both;
    }
  }

  &:active {
    transform: scale(0.95);
  }
}

.btn__icon {
  margin-right: 0.5rem;
}

.btn__arrow {
  margin-left: 0.5rem;
}

//slow skake animation
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(1px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
}


</style>

