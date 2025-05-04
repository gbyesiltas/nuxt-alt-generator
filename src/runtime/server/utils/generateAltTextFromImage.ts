import type { H3Event } from 'h3'

import { getOpenAI } from './openai'
import getIsLocalPath from './getIsLocalPath'
import { __buildAssetsURL, __publicAssetsURL, createError, defineCachedFunction, useRuntimeConfig } from '#imports'

const getSystemPropmt = (context: string) => `
  You will be given an image and a language. 
  You will return the alt text for it taking into account best SEO and accessibility practices in the given language.
  
  ${context && 'While generating the alt text, take into account the context of the website for including the relevant key-words.' + '\'' + context + '\''}

  Only return the alt text, do not add any other text.
  `

type Parameters = {
  src: string
}

// @todo: add support for setting the language in the request?
// @todo: test with nuxt-i18n
const getAcceptLanguageHeader = (event: H3Event) => {
  const acceptLanguageHeader = event.node.req.headers['accept-language']?.split(',')[0]

  return acceptLanguageHeader || 'en'
}

const getInputImageUrl = (src: string, event: H3Event) => {
  const isLocalPublicImage = getIsLocalPath(src)
  const host = event.node.req.headers['host']

  if (isLocalPublicImage && host) {
    if (import.meta.dev) {
      console.warn('Local public images in dev mode are not yet supported.')
      return src
    } {
      return new URL(src, host).toString()
    }
  }

  return src
}

export const generateAltTextFromImage = defineCachedFunction(
  async ({ src }: Parameters, event: H3Event) => {
    const runtimeConfig = useRuntimeConfig(event).altGenerator

    if (!runtimeConfig.enabled) {
      return `Example generated alt text for ${src}`
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
          content: getSystemPropmt(runtimeConfig.ai.context),
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_image',
              image_url: getInputImageUrl(src, event),
              detail: 'low',
            },
            {
              type: 'input_text',
              text: `Language code: ${getAcceptLanguageHeader(event)}`,
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
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    getKey: ({ src }, event) => `generated-alt:${src}:${getAcceptLanguageHeader(event)}`,
  })
