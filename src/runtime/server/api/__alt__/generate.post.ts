import { generateAltTextFromImage } from '../../utils/generateAltTextFromImage'
import getIsLocalPath from '../../utils/getIsLocalPath'
import { createError, defineEventHandler, readBody, useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const src = (await readBody(event))?.src

  if (!src) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing src parameter',
    })
  }

  const allowedExternalSrcPatterns = useRuntimeConfig(event).altGenerator.allowedExternalSrcPatterns

  if (!getIsLocalPath(src) && !allowedExternalSrcPatterns?.some((pattern: string) => new RegExp(pattern).test(src))) {
    throw createError({
      statusCode: 403,
      statusMessage: 'src parameter does not match allowed patterns',
    })
  }

  return await generateAltTextFromImage({ src }, event)
})
