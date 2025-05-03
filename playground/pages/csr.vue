<script setup lang="ts">
definePageMeta({
  ssr: false,
})

const src = 'https://pbs.twimg.com/media/GqAg6smXgAA8d_2?format=jpg'

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
