import type { H3Event } from 'h3'
import { getOpenAI } from './openai'

const SYSTEM_PROMPT = `
  You will be given an image and a language. 
  You will return the alt text for it taking into account best SEO and accessibility practices in the given language.
  
  Only return the alt text, do not add any other text.
  `

type Parameters = {
  src: string
  lang: string
}

export const generateAltTextFromImage = async ({ src, lang }: Parameters, event: H3Event) => {
  const instance = getOpenAI(event)

  return await instance.responses.create({
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
}
