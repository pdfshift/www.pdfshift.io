<template>
  <section class="rely">
    <div class="rely__icons">
      <div class="rely__icon-holder">
        <span class="rely__icon rely__icon--active" ref="start">
          <img src="~/assets/images/icons/ico-html.svg" alt="html">
        </span>
        HTML
      </div><!-- / icon-holder -->
      <div ref="container" class="rely__icon-container">
        <img 
          ref="icon"
          class="rely__center" 
          src="~/assets/images/icons/ico-lightning.svg" 
          alt="lightning"
        >
      </div>
      <div class="rely__icon-holder">
        <span class="rely__icon" ref="finish">
          <img src="~/assets/images/icons/ico-pdf.svg" alt="pdf">
        </span>
        PDF
      </div><!-- / icon-holder -->
    </div><!-- / icons -->
    <h2 class="rely__title">Rely on a leading <br>conversion service.</h2>
    <strong class="rely__sub-title">Users all over the world trust PDFShift <br>for high-quality document conversion.</strong>
    <div class="rely__info">
      <div class="rely__cell">
        <img src="~/assets/images/icons/ico-downloads.svg" alt="download" class="rely__cell-icon">
        <strong class="rely__cell-number">30+ Million</strong>
        <span class="rely__cell-text">Conversions completed</span>
      </div><!-- / cell -->
      <span class="rely__sep"></span>
      <div class="rely__cell">
        <img src="~/assets/images/icons/ico-users.svg" alt="users" class="rely__cell-icon">
        <strong class="rely__cell-number">18,000+</strong>
        <span class="rely__cell-text">Users</span>
      </div><!-- / cell -->
      <span class="rely__sep"></span>
      <div class="rely__cell">
        <img src="~/assets/images/icons/ico-speed.svg" alt="speed" class="rely__cell-icon">
        <strong class="rely__cell-number">1.5s</strong>
        <span class="rely__cell-text">Average conversion time</span>
      </div><!-- / cell -->
      <span class="rely__sep"></span>
      <div class="rely__cell">
        <img src="~/assets/images/icons/ico-uptime.svg" alt="uptime" class="rely__cell-icon">
        <strong class="rely__cell-number">99.99%</strong>
        <span class="rely__cell-text">Uptime</span>
      </div><!-- / cell -->
    </div><!-- / info -->
  </section><!-- / rely -->
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  const icon = ref(null);
  const container = ref(null);
  const start = ref(null);
  const finish = ref(null);

  //scroll spy for thunder icon
  const handleScroll = () => {
    if (icon.value && container.value) {
      const containerRect = container.value.getBoundingClientRect();
      const containerTop = containerRect.top;
      const windowHeight = window.innerHeight;

      const startThreshold = windowHeight * 0.6;
      const endThreshold = windowHeight * 0.8;

      if (containerTop >= startThreshold && containerTop <= endThreshold) {
        const percentage = (containerTop - startThreshold) / (endThreshold - startThreshold);
        const containerWidth = container.value.offsetWidth - 40;
        const offset = containerWidth * (1 - percentage);

        icon.value.style.left = `${offset}px`; 

        if (percentage <= 0.35) {
          finish.value.classList.add('rely__icon--active');
          start.value.classList.remove('rely__icon--active');
        } 

        if (percentage >= 0.7) {
          start.value.classList.add('rely__icon--active');
          finish.value.classList.remove('rely__icon--active');
        } 
      }     
    }
  };





  //adding event listeners
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  //removing event listeners
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style lang="scss" scoped>
.rely {
  margin-top: 10.5rem;
  background: url('~/assets/images/bg-rely.png') no-repeat 50% 0;

  &__icons {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 34.5rem;
    margin: 0 auto 3.25rem;
  }

  &__icon-holder {
    text-align: center;
    position: relative;
    z-index: 2;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.625rem;
    height: 3.625rem;
    margin: 0 0 0.7rem;
    background: url('~/assets/images/bg-icon.png') no-repeat;
    border-radius: 0.375rem;
    border: 1px solid #6E60C2;
    transition: 0.3s;

    &--active {
      box-shadow:  
        0 0 26px #4D3DA9,
        0 0 15px #4D3DA9,
        0 0 9px #4D3DA9,
        0 0 4px #4D3DA9,
        0 0 1px #4D3DA9,
    }
  }

  &__icon-container {
    position: relative;
    z-index: 1;
    flex: 1;
    height: 3.6rem;

    &:before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right,  rgba(133,120,212,0) 0%,rgba(133,120,212,1) 50%,rgba(133,120,212,0) 100%);
      background-size: 200% 200%;
      animation: gradient 10s ease infinite;
    }

    @keyframes gradient {
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

    &:after {
      content: '';
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      border-top: 3px dotted var(--color-dark);
    }
  }

  &__center {
    position: absolute;
    z-index: 3;
    top: 1rem;
    display: block;
  }

  &__title {
    font-family: var(--font-title);
    font-size: 2.5rem;
    line-height: 2.75rem;
    font-weight: 500;
    text-align: center;
    margin: 0 0 1rem;
    color: var(--color-primary);
    @supports (background-clip: text) {
      background: linear-gradient(to bottom, rgba(224,224,244,1), rgba(224,224,224,0.3));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }

  &__sub-title {
    display: block;
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: 500;
    text-align: center;
    margin: 0 0 5rem;
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 65rem;
    margin: 0 auto;
  }

  &__sep {
    display: block;
    width: 1px;
    height: 6rem;
    background: #1F1943;
  }

  &__cell {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__cell-icon {
    width: 2.5rem;
    margin: 0 0 1.125rem;
  }

  &__cell-number {
    display: block;
    color: var(--color-primary);
    font-size: 1.5rem;
    height: 2rem;
    font-weight: 600;
  }

  &__cell-text {
    font-size: 1.25rem;
    line-height: 1.25rem;
    font-weight: 500;
    white-space: nowrap;
  }
}
</style>