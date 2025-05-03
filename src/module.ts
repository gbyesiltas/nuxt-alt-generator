import { defineNuxtModule, createResolver, addServerHandler, addImports, addServerPlugin } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  enabled?: boolean
  auto?: boolean
  ai: {
    apiKey: string
    baseUrl: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-alt-generator',
    configKey: 'altGenerator',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    auto: true,
  },
  setup(options, nuxt) {
    // Merge module options with runtime config
    nuxt.options.runtimeConfig.altGenerator = defu(
      nuxt.options.runtimeConfig.altGenerator || {},
      {
        ...options,
        enabled: options.enabled ?? !nuxt.options.dev, // Disable by default in dev mode
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

    // @todo app:resolve for spa
    // @todo prerender for static site generation
    addServerPlugin(resolver.resolve('./runtime/server/plugins/addAltToImages'))
  },
})
