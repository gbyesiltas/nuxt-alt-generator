# Nuxt Alt Generator

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This is a Nuxt module that allows tools to automatically generate alt text for images in your Nuxt application. It uses the [OpenAI API](https://platform.openai.com) to generate alt text based on the content of the image. It uses OpenAI's `gpt-4.1-nano` model.


⚠️ **This module is in early development and may include frequent breaking changes. Any contribution is welcome.** ⚠️

## Features

- ⚙️ Can automatically generate and inject alt text to images on the server-side response of your Nuxt application.
- 🪭 Provides a `useGenerateAltText` composable to generate alt text for a given image src.
- 🌐 Automatically detects the language to generate the alt text in based on the `Accept-Language` header.
- 💨 Caches the generated alt text for every image for optimised performance and AI costs. The cache time is 1 year for a given src+lang combo. Beware that this cache will most likely reset after a new deployment since the module currently does not include any Database storage etc.
- ℹ️ You can provide context to the AI to generate more accurate alt text for more relevant key-words.

## Quick Setup

Install the module to your Nuxt application with one command:

1. Install and add the module
```bash
npx nuxi module add nuxt-alt-generator
```

2. Add your OpenAI API key to your `.env` file or to your `nuxt.config.ts` file:
```bash
# .env
NUXT_ALT_GENERATOR_AI_API_KEY=example # OpenAI API key
NUXT_ALT_GENERATOR_AI_BASE_URL=https://example.com # Optional
```


That's it! You can now use the module in your Nuxt app ✨

## Configuration options
### `auto`
If you enable the `auto` option in the module configuration, the module will automatically generate alt text for images that do not have one and inject it on server-side renders.

### `enabled`
By default, the module will not make AI calls to generate alt text while on development mode but instead will provide a mock text. By setting this option to `true` you can enable the module to make AI calls even in development mode.

### `allowedSrcPatterns`
⚠️ Good to know for **security** ⚠️

Since this module exposes an endpoint to generate alt text for a given image src, you can restrict the src patterns that are allowed to be used with the endpoint to avoid people possibly abusing your OpenAI usage. By default, all src patterns are allowed.

The alt text generation is cached for 1 year, so it will not hit the OpenAI API every time you call the endpoint. This means if someone is only able to use the endpoint for your specific image domains, they will only be able to pre-generate alt text for those images for you 🤷.

### `ai.context`
You can provide a context to the AI about your website so that it can generate more relevant alt text with more relevant key-words.

### `ai.apiKey`
You can either provide your OpenAI API key in the `.env` file or in the module configuration. If you don't provide either, the module will not work.

### `ai.baseUrl`
You can provide a custom base URL for the OpenAI API.

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-alt-generator/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-alt-generator

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-alt-generator.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-alt-generator

[license-src]: https://img.shields.io/npm/l/nuxt-alt-generator.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-alt-generator

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
