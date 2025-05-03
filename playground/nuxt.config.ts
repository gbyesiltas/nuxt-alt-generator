export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  altGenerator: {
    enabled: true,
    auto: true,
    ai: {
      apiKey: '',
      baseUrl: '',
    },
  },
})
