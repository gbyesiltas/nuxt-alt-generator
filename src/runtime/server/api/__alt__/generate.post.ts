import OpenAI from 'openai'
import type { H3Event } from 'h3'
import { createError, defineCachedEventHandler, readBody, useRuntimeConfig } from '#imports'

let _openai: OpenAI | null = null

// @todo: i18n support
const SYSTEM_PROMPT = `
  You will be given an image and will return the alt text for it taking into account best SEO and accessibility practices.
  Only return the alt text, do not add any other text.
  `

const getOpenAI = (event: H3Event) => {
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

export default defineCachedEventHandler(async (event) => {
  const src = (await readBody(event))?.src
  if (!src) {
    return createError({
      statusCode: 400,
      statusMessage: 'Missing src parameter',
    })
  }

  const instance = getOpenAI(event)

  const response = await instance.responses.create({
    // @todo: add support for other models
    model: 'gpt-4.1-nano',
    input: [
      {
        role: 'user',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_image',
            image_url: src,
            detail: 'auto',
          },
        ],
      },
    ],
  })

  return response.output_text
}, {
  // @todo make this configurable
  maxAge: 60 * 60 * 24 * 365 /* 1 year */,
  getKey: async (event) => {
    const src = (await readBody(event))?.src
    return `generate-alt-${src}`
  },
})
