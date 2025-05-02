import { generateAltTextFromImage } from '../../utils/generateAltTextFromImage'
import { createError, defineCachedEventHandler, readBody } from '#imports'

export default defineCachedEventHandler(async (event) => {
  const src = (await readBody(event))?.src
  const lang = (await readBody(event))?.lang ?? 'en' // @todo nuxt-i18n connection?

  if (!src) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing src parameter',
    })
  }

  const response = await generateAltTextFromImage({ src, lang }, event)

  // @todo don't cache if the response is an error?

  if (response.error) {
    throw createError({
      statusCode: 424,
      statusMessage: response.error.message,
    })
  }

  if (response.output_text === 'ERROR') {
    throw createError({
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
