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

      const response = await generateAltTextFromImage(
        {
          src,
          lang: 'en', // @todo config option or nuxt-i18n connection
        },
        event,
      )

      $(image).attr('alt', response.output_text)
    })

    await Promise.all(altPromises)
    return $.html()
  })

  return await Promise.all(promises)
}

export default defineNitroPlugin((nitroApp) => {
  // @todo make this a config option
  nitroApp.hooks.hook('render:html', async (html, { event }) => {
    html.body = await addAltToImagesFromHtmlBody(html.body, event)
  })
})
