# Nuxt Alt Generator

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This is a Nuxt module that allows tools to automatically generate alt text for images in your Nuxt application. It uses the [OpenAI API](https://platform.openai.com) to generate alt text based on the content of the image.


⚠️ **This module is in early development and may include frequent breaking changes. Any contribution is welcome.** ⚠️

## Features

- ⚙️ Can automatically generate and inject alt text to images on the server-side response of your Nuxt application.
- 🪭 Provides a `useGenerateAltText` composable to generate alt text for a given image src.
- 🌐 Automatically detects the language to generate the alt text in based on the `Accept-Language` header.
- 💨 Caches the generated alt text for every image for optimised performance and AI costs. 

## Quick Setup

Install the module to your Nuxt application with one command:

1. Install and add the module
```bash
npx nuxi module add nuxt-alt-generator
```

2. Add your OpenAI API key to your `.env` file or to your `nuxt.config.ts` file:
```bash
# .env
NUXT_ALT_GENERATOR_AI_API_KEY=example
NUXT_ALT_GENERATOR_AI_BASE_URL=https://example.com # Optional
```


That's it! You can now use the module in your Nuxt app ✨


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
