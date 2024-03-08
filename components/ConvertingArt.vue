<template>
  <section class="art" ref="progressContainer">
    <div class="art__lines">
      <span class="art__line"></span>
      <span class="art__line"></span>
      <span class="art__line"></span>
      <span class="art__line"></span>
      <span class="art__line"></span>
      <div class="art__icon art__icon--pdf">
        <img src="~/assets/images/icons/ico-doc.svg" alt="doc">
      </div>
      <div class="art__icon art__icon--html">
        <img src="images/icons/ico-feature-01.svg" alt="html">
      </div>
      <div class="art__icon art__icon--jpg">
        <img src="images/icons/ico-img.svg" alt="img">
      </div>
    </div><!-- / lines -->
    <div class="art__block" ref="progressContainer" >
      <span class="art__title">Converting your PDF</span>
      <span class="art__status">
        <span :style="{width: progressWidth}" class="art__bar"></span>
      </span><!-- /status -->
      <div class="art__bottom">
        <strong class="art__speed"><span>{{ currentMB }}mb</span>/{{ totalMB }}mb</strong>
        <span class="art__time">{{ timeRemaining }} sec remeaning</span>
      </div><!-- / bottom -->
    </div><!-- / block -->
  </section><!-- / art -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const progressContainer = ref(null);
const progressWidth = ref('0%');
let currentMB = ref('0');
const totalMB = ref('10');
let timeRemaining = ref(2);

const updateValue = () => {
  let startTime = Date.now();
  let targetMB = 10.3;
  let targetTime = 2000; // 2 seconds in milliseconds
  
  let interval = setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    let progress = (elapsedTime / targetTime);

    if (progress >= 1) {
      clearInterval(interval);
      progress = 1;
      timeRemaining.value = 0;
    }

    let calculatedWidth = `${(progress * 100).toFixed(0)}%`;
    let calculatedMB = (targetMB * progress).toFixed(1);

    progressWidth.value = calculatedWidth;
    currentMB.value = calculatedMB;
    
    timeRemaining.value = Math.ceil((targetTime - elapsedTime) / 1000);
  }, 50);
};


let observer;

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1
  };

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateValue();
        observer.unobserve(progressContainer.value);
      }
    });
  }, options);

  observer.observe(progressContainer.value);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});


</script>

<style lang="scss" scoped>
.art {
  height: 100%;
  min-width: 30rem;

  &__lines {
    position: relative;
    z-index: 1;
    height: 70%;
    overflow: hidden;
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 15%;
      z-index: 4;
    }

    &:before {
      background: linear-gradient(to right,  rgba(3,0,20,1) 0%,rgba(3,0,20,1) 27%,rgba(3,0,20,0) 100%);
      left: 0;
    }

    &:after {
      background: linear-gradient(to right,  rgba(3,0,20,0) 0%,rgba(3,0,20,1) 73%,rgba(3,0,20,1) 100%);
      right: 0;
    }
  }

  &__line {
    position: absolute;
    z-index: 1;
    background: linear-gradient(to right,  rgba(133,120,212,0) 0%,rgba(133,120,212,1) 50%,rgba(133,120,212,1) 100%);
    opacity: 0.6;

    &:nth-child(1) {
      top: 10%;
      width: 50%;
      height: 1px;
      animation: move-right 5s linear infinite;
    }
    &:nth-child(2) {
      top: 16%;
      width: 66%;
      height: 1px;
      animation: move-right 2s linear infinite;
    }
    &:nth-child(3) {
      top: 25%;
      width: 66%;
      height: 1px;
      animation: move-right 3s linear infinite;
    }
    &:nth-child(4) {
      top: 46%;
      width: 66%;
      height: 1px;
      animation: move-right 2.4s linear infinite;
    }
    &:nth-child(5) {
      top: 55%;
      width: 66%;
      height: 1px;
      animation: move-right 4s linear infinite;
    }
  }

  @keyframes move-right {
    0% {
      transform: translateX(-200%);
    }
    100% {
      transform: translateX(200%);
    }
  }

  &__icon {
    position: absolute;
    z-index: 5;

    &--pdf {
      top: 25%;
      right: 15%;
      box-shadow: 
        0 0 113px #4B50E2,
        0 0 64px #4B50E2,
        0 0 37px #4B50E2,
        0 0 19px #4B50E2,
        0 0 5px #4B50E2,
        0 0 3px #4B50E2;
      border-radius: 0.5rem;

      & > * {
        vertical-align: top;
      }
    }

    &--jpg {
      position: absolute;
      top: 10%;
      left: 30%;
    }

    &--html {
      position: absolute;
      top: 33%;
      left: 15%;
    }
  }

  &__block {
    max-width: 21rem;
    margin: 0 auto;
    padding: 0.875rem;
    border-radius: 0.5rem;
    border: 1px solid var(--stroke-btn-primary);
  }

  &__title {
    display: block;
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 500;
    color:var(--color-secondary);
  }

  &__status {
    display: block;
    height: 0.5rem;
    margin: 0 0 0.5rem;
    border-radius: 0.5rem;
    background: #211A48;
  }

  &__bar {
    display: block;
    height: 0.5rem;
    transition: 0.1s;
    background: #4A3E95;
    border-radius: 0.5rem;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;
    line-height: 1rem;
  }

  &__speed {
    color: var(--color-secondary);
    font-weight: 400;

    span {
      font-weight: 500;
      color: #D3CBFF;
    }
  }

  &__time {
    color: #5F5693;
  }
}
</style>