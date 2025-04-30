<script setup lang="ts">
const input = ref('')
const alt = ref('')
const lang = ref('en')

const generateAlt = async () => {
  alt.value = await $fetch('/api/__alt__/generate', {
    method: 'POST',
    body: {
      src: input.value,
      lang: lang.value,
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

    <select v-model="lang">
      <option value="en">
        English
      </option>
      <option value="fr">
        French
      </option>
      <option value="tr">
        Turkish
      </option>
    </select>

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
