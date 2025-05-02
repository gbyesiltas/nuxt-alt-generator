import { defineNuxtModule, createResolver, addServerHandler, addImports, addServerPlugin } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  ai: {
    apiKey: string
    baseUrl: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-alt-generator',
    configKey: 'altGenerator',
    // @todo look other options
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    // Register the apiKey in the runtime config
    nuxt.options.runtimeConfig.altGenerator = defu(
      nuxt.options.runtimeConfig.altGenerator || {},
      {
        ai: {
          apiKey: options.ai?.apiKey,
          baseUrl: options.ai?.baseUrl,
        },
      },
    )

    const resolver = createResolver(import.meta.url)

    addServerHandler({
      route: '/api/__alt__/generate',
      handler: resolver.resolve('./runtime/server/api/__alt__/generate.post'),
      method: 'post',
    })

    addImports({
      name: 'useGenerateAltText',
      as: 'useGenerateAltText',
      from: resolver.resolve('runtime/composables/useGenerateAltText'),
    })

    // server dom generation for ssr
    // app:resolve for spa
    // prerender for static site generation
    addServerPlugin(resolver.resolve('./runtime/server/plugins/addAltToImages'))
  },
})
