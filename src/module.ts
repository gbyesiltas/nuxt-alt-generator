import { defineNuxtModule, createResolver, addServerHandler, addImports, addServerPlugin } from '@nuxt/kit'
import { defu } from 'defu'

export interface ModuleOptions {
  /**
   * Whether there will be a call to the AI API to generate alt text for images
   * If `false`, the generated alt text will be a mock/example text.
   *
   * Will default to `false` in development mode.
   *
   * @default true
   */
  enabled?: boolean
  /**
   * Whether to automatically generate and inject alt text for images in server-rendered pages.
   *
   * @default false
   */
  auto?: boolean
  /**
   * List of allowed image src patterns to generate alt text for. This will only be checked for requests coming from the client.
   *
   * You can for example set the base url of your image provider so that other people can't just use your endpoint and use your AI resources.
   */
  allowedSrcPatterns?: string[]
  ai: {
    apiKey: string
    baseUrl?: string
    /**
     * The context of the website. This will be used to generate more relevant alt text.
     *
     * @example "This is a website that sells shoes"
     */
    context?: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-alt-generator',
    configKey: 'altGenerator',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    auto: false,
    ai: {
      apiKey: '',
      baseUrl: '',
    },
  },
  setup(options, nuxt) {
    // Merge module options with runtime config
    nuxt.options.runtimeConfig.altGenerator = defu(
      nuxt.options.runtimeConfig.altGenerator || {},
      {
        enabled: options.enabled ?? !nuxt.options.dev, // Disable by default in dev mode
        allowedSrcPatterns: options.allowedSrcPatterns,
        ai: {
          context: options.ai?.context,
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

    // @todo spa
    // @todo prerender for static site generation
    if (options.auto) {
      addServerPlugin(resolver.resolve('./runtime/server/plugins/addAltToImages'))
    }
  },
})
