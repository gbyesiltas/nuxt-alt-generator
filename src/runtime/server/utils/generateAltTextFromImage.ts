import type { H3Event } from 'h3'
import { getOpenAI } from './openai'
import { createError, defineCachedFunction, useRuntimeConfig } from '#imports'

const SYSTEM_PROMPT = `
  You will be given an image and a language. 
  You will return the alt text for it taking into account best SEO and accessibility practices in the given language.
  
  Only return the alt text, do not add any other text.
  `

type Parameters = {
  src: string
  lang: string
}

export const generateAltTextFromImage = defineCachedFunction(
  async ({ src, lang }: Parameters, event: H3Event) => {
    if (!useRuntimeConfig(event).altGenerator.enabled) {
      return `Example generated alt text for ${src} in ${lang}`
    }

    const instance = getOpenAI(event)

    const response = await instance.responses.create({
    // @todo: add support for other models
      model: 'gpt-4.1-nano',
      temperature: 0.1,
      store: true,
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
              detail: 'low',
            },
            {
              type: 'input_text',
              text: `Language code: ${lang}`,
            },
          ],
        },
      ],
    })

    if (response.error) {
      throw createError(response.error)
    }

    return response.output_text
  }, {
    // @todo make this configurable
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    getKey: ({ src, lang }) => `generated-alt:${src}:${lang}`,
  })
