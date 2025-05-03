export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  altGenerator: {
    enabled: true,
    ai: {
      apiKey: '',
      baseUrl: '',
    },
  },
})
