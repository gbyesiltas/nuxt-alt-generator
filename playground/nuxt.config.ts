export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  altGenerator: {
    enabled: true,
    auto: true,
    allowedExternalSrcPatterns: ['https://pbs.twimg.com/media/*'],
    ai: {
      apiKey: '',
      baseUrl: '',
    },
  },
})
