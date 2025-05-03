<script setup lang="ts">
const src = 'https://pbs.twimg.com/media/GpuVQ1AWEAAIJc5?format=webp'
</script>

<template>
  <div>
    <h1>SSR</h1>

    <p>If the `auto` option is enabled, the image below will be injected with the alt text on server-side</p>
    <img
      :src
      width="300"
    >
  </div>
</template>
