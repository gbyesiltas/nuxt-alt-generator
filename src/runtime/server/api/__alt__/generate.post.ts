import OpenAI from 'openai'
import type { H3Event } from 'h3'
import { createError, defineCachedEventHandler, readBody, useRuntimeConfig } from '#imports'

let _openai: OpenAI | null = null

const SYSTEM_PROMPT = `
  You will be given an image and a language. 
  You will return the alt text for it taking into account best SEO and accessibility practices in the given language.
  
  Only return the alt text, do not add any other text.

  If you are not able to load the image, or are not able to generate an alt text for the given image, return the text "ERROR" and nothing else.
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
  const lang = (await readBody(event))?.lang ?? 'en' // @todo nuxt-i18n connection?

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
            type: 'input_text',
            text: `Generate an alt text for the image in ${lang}`,
          },
          {
            type: 'input_image',
            image_url: src,
            detail: 'low',
          },
        ],
      },
    ],
  })

  // @todo don't cache if the response is an error?

  if (response.error) {
    return createError({
      statusCode: 424,
      statusMessage: response.error.message,
    })
  }

  if (response.output_text === 'ERROR') {
    return createError({
      statusCode: 424,
      statusMessage: 'Unable to load the image',
    })
  }

  return response.output_text
}, {
  // @todo make this configurable
  maxAge: 60 * 60 * 24 * 365 /* 1 year */,
  getKey: async (event) => {
    const src = (await readBody(event))?.src
    const lang = (await readBody(event))?.lang ?? 'en'

    return `generate-alt-${src}-${lang}`
  },
})
