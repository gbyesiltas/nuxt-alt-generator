import { generateAltTextFromImage } from '../../utils/generateAltTextFromImage'
import { createError, defineEventHandler, readBody, useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const src = (await readBody(event))?.src

  if (!src) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing src parameter',
    })
  }

  const allowedSrcPatterns = useRuntimeConfig(event).altGenerator.allowedSrcPatterns

  if (allowedSrcPatterns && !allowedSrcPatterns.some((pattern: string) => new RegExp(pattern).test(src))) {
    throw createError({
      statusCode: 403,
      statusMessage: 'src parameter does not match allowed patterns',
    })
  }

  return await generateAltTextFromImage({ src }, event)
})
