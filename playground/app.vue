<script setup lang="ts">
const input = ref('')
const alt = ref('')

const generateAlt = async () => {
  alt.value = await $fetch('/api/__alt__/generate', {
    method: 'POST',
    body: {
      src: input.value,
    },
  })
}
</script>

<template>
  <div>
    Nuxt module playground!

    <input
      v-model="input"
      type="text"
      placeholder="Type something..."
    >

    <button @click="generateAlt">
      Generate alt
    </button>

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
