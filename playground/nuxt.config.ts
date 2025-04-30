export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  altGenerator: {
    ai: {
      apiKey: '',
      baseUrl: '',
    },
  },
})
