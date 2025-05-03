<script setup lang="ts">
definePageMeta({
  ssr: false,
})

const src = 'https://pbs.twimg.com/media/GpuVQ1AWEAAIJc5?format=webp'

const { alt } = useGenerateAltText({
  src,
})
</script>

<template>
  <div>
    <h1>CSR</h1>
    <img
      :src
      :alt
      width="300"
    >
  </div>
</template>
