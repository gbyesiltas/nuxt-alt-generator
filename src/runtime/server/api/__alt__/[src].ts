import { defineEventHandler, getRouterParam, useRuntimeConfig } from '#imports'

export default defineEventHandler((event) => {
  const src = getRouterParam(event, 'src')

  const apiKey = useRuntimeConfig(event).altGenerator.openApiKey

  return `Hello from the Alt API! Your API key is: ${apiKey} and the src is: ${src}`
})
