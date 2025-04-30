import { defineNuxtModule, createResolver, addServerHandler } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  openApiKey?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-alt-generator',
    configKey: 'altGenerator',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    // Register the openApiKey in the runtime config
    nuxt.options.runtimeConfig.altGenerator = defu(
      nuxt.options.runtimeConfig.altGenerator || {},
      {
        openApiKey: options.openApiKey,
      },
    )

    const resolver = createResolver(import.meta.url)
    addServerHandler({
      route: '/api/__alt__/:src',
      handler: resolver.resolve('./runtime/server/api/__alt__/[src]'),
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
