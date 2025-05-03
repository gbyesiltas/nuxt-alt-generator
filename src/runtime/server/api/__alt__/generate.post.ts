import { generateAltTextFromImage } from '../../utils/generateAltTextFromImage'
import { createError, defineCachedEventHandler, readBody } from '#imports'

// @todo somehow make this only accessible from our client and/or make the endpoint a config option
export default defineCachedEventHandler(async (event) => {
  const src = (await readBody(event))?.src
  const lang = (await readBody(event))?.lang ?? 'en' // @todo nuxt-i18n connection?

  if (!src) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing src parameter',
    })
  }

  return await generateAltTextFromImage({ src, lang }, event)
})
