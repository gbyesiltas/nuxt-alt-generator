<script setup lang="ts">
const src = 'https://pbs.twimg.com/media/GpuVQ1AWEAAIJc5?format=jpg'
const { alt, error } = useGenerateAltText({
  src,
  lang: 'tr',
})
</script>

<template>
  <div>
    Nuxt module playground!

    <img
      :src
      :alt
      width="300"
    >

    <div v-if="error">
      <h2>Error</h2>
      <p>{{ error }}</p>
    </div>

    <div v-if="alt">
      <h2>Generated alt</h2>
      <p>{{ alt }}</p>
    </div>
  </div>
</template>

<style>
body {
  background: black;
  color: lightgray;
}
</style>
