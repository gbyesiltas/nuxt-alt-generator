import OpenAI from 'openai'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

let _openai: OpenAI | null = null

export const getOpenAI = (event: H3Event) => {
  if (!_openai) {
    // @todo: rename `ai` to `openai` in the runtime config
    const apiKey = useRuntimeConfig(event).altGenerator.ai.apiKey
    const baseURL = useRuntimeConfig(event).altGenerator.ai.baseUrl

    _openai = new OpenAI({
      baseURL,
      apiKey,
    })
  }

  return _openai
}
