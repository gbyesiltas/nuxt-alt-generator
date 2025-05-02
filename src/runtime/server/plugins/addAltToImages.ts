import type { H3Event } from 'h3'
import * as cheerio from 'cheerio'
import { generateAltTextFromImage } from '../utils/generateAltTextFromImage'
import { defineNitroPlugin } from '#imports'

const addAltToImagesFromHtmlBody = async (htmlBody: string[], event: H3Event) => {
  const newBody = []

  for (const root of htmlBody) {
    const $ = cheerio.load(root)
    const images = $('img')

    for (const image of images) {
      const src = $(image).attr('src')
      if (!src) {
        continue
      }

      const alt = $(image).attr('alt')
      if (alt) {
        continue
      }

      const response = await generateAltTextFromImage(
        {
          src,
          lang: 'en', // @todo config option or nuxt-i18n connection
        },
        event,
      )

      $(image).attr('alt', response.output_text)
    }

    newBody.push($.html())
  }

  return newBody
}

export default defineNitroPlugin((nitroApp) => {
  // @todo make this an option
  nitroApp.hooks.hook('render:html', async (html, { event }) => {
    // const newVersion = html.body[0].replace('<div id="__nuxt"><div><img src="https://pbs.twimg.com/media/GpuVQ1AWEAAIJc5?format=webp" width="300"></div></div>', '<div>example</div>')
    html.body = await addAltToImagesFromHtmlBody(html.body, event)
  })
})
