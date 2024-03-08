<template>
  <img 
    :src="imageUrl" 
    :alt="altText"
  >
</template>

<script setup>
  import { defineProps } from 'vue';
  const { imageUrl, altText } = defineProps({
    imageUrl: {
      type: String,
      required: true
    },
    altText: {
      type: String,
    }
  });
</script>