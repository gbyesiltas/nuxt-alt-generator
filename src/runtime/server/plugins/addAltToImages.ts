import type { H3Event } from 'h3'
import * as cheerio from 'cheerio'
import { generateAltTextFromImage } from '../utils/generateAltTextFromImage'
import { defineNitroPlugin } from '#imports'

const addAltToImagesFromHtmlBody = async (htmlBody: string[], event: H3Event) => {
  const promises = htmlBody.map(async (root) => {
    const $ = cheerio.load(root)
    const images = $('img').toArray()

    const altPromises = images.map(async (image) => {
      const src = $(image).attr('src')
      if (!src || $(image).attr('alt')) {
        return
      }

      try {
        const response = await generateAltTextFromImage(
          {
            src,
          },
          event,
        )

        $(image).attr('alt', response)
      }
      catch {
        console.warn('Error generating alt text for image:', src, '\nContinuing...')
      }
    })

    await Promise.all(altPromises)
    return $.html()
  })

  return await Promise.all(promises)
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', async (html, { event }) => {
    // @todo I sometimes see hydration mismatches --> look into it
    html.body = await addAltToImagesFromHtmlBody(html.body, event)
  })
})
