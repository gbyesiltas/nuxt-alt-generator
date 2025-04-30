import OpenAI from 'openai'
import type { H3Event } from 'h3'
import { defineEventHandler, getRouterParam, useRuntimeConfig } from '#imports'

let _openai: OpenAI | null = null

const getOpenAI = (event: H3Event) => {
  if (!_openai) {
    const apiKey = useRuntimeConfig(event).altGenerator.ai.apiKey
    const baseURL = useRuntimeConfig(event).altGenerator.ai.baseUrl

    _openai = new OpenAI({
      baseURL,
      apiKey,
    })
  }

  return _openai
}

export default defineEventHandler((event) => {
  const src = getRouterParam(event, 'src')

  const instance = getOpenAI(event)

  return `Hello from the Alt API! Your API key is: ${instance.apiKey} and the src is: ${src}`
})
