<template>
  <span class="icon-block">
    <img 
      :src="iconUrl" 
      :alt="iconAlt"
    >
  </span>
</template>

<script setup>
import { defineProps } from 'vue';

const { iconUrl, iconAlt } = defineProps({
  iconUrl: {
    type: String,
    required: true
  },
  iconAlt: {
    type: String,
  },
});
</script>

<style scoped>
.icon-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  margin: 0 0 1.5rem;
  background: url('~/assets/images/icons/ico-bg-small.png') no-repeat;
  border: 1px solid #6E60C2;
}
</style>