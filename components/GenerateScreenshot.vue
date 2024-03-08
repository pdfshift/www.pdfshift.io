<template>
  <div 
    class="screenshot" 
    ref="parent"
    @mousemove="handleMouseMove"
    @mouseover="stopMovement"
  >
    <img src="~/assets/images/img-preview.png" alt="preview" class="screenshot__preview">
    <a
      herf="/" 
      ref="box"
      class="screenshot__area"
    >
      <img src="~/assets/images/icons/ico-select-area.svg" alt="select area">
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const parent = ref(null);
const box = ref(null);
let interval;
let velocity = {x: 0.2, y: 0.2};
let boxWidth = 328;
let boxHeight = 128;
let intervalStopped = false

const handleMouseMove = (e) => {
  const rect = parent.value.getBoundingClientRect();
  let x = e.clientX - rect.left - boxWidth / 2;
  let y = e.clientY - rect.top - boxHeight / 2;

  x = Math.min(Math.max(0, x), rect.width - boxWidth);
  y = Math.min(Math.max(0, y), rect.height - boxHeight);

  box.value.style.left = `${x}px`;
  box.value.style.top = `${y}px`;
};

const startMovement = () => {
  if (!parent.value || !box.value) return;

  const parentRect = parent.value.getBoundingClientRect();
  const boxRect = box.value.getBoundingClientRect();

  let newX = boxRect.left - parentRect.left + velocity.x;
  let newY = boxRect.top - parentRect.top + velocity.y;

  if (newX < 0 || newX > parentRect.width - boxRect.width) {
    velocity.x *= -velocity;
  }

  if (newY < 0 || newY > parentRect.height - boxRect.height) {
    velocity.y *= -velocity;
  }

  box.value.style.left = `${Math.min(Math.max(0, newX), parentRect.width - boxWidth)}px`;
  box.value.style.top = `${Math.min(Math.max(0, newY), parentRect.height - boxHeight)}px`;
};

const stopMovement = () => {
  clearInterval(interval);
  intervalStopped = true;
}

onMounted(() => {
  if (!intervalStopped) {
    interval = setInterval(startMovement, 16);
  }
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style lang="scss" scoped>
.screenshot {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  height: 100%; 

  &__preview {
    vertical-align: top;
    position: relative;
    z-index: 1;
  }

  &__area {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 328px; 
    height: 128px;
    border-radius: 0.5rem;
    border: 1px dashed #362E60;
    background: rgba(18,16,28,0.6);
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    cursor: pointer;

    &:active {
      transform: scale(0.95);
      transition: 0.3s;
    }
  }
}
</style>