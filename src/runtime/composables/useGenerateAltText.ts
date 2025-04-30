import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useFetch } from '#app'

type Options = {
  src: MaybeRefOrGetter<string>
  lang?: MaybeRefOrGetter<string>
}

export function useGenerateAltText(options: Options) {
  const fetchResponse = useFetch<string>('/api/__alt__/generate', {
    method: 'POST',
    body: {
      src: toValue(options.src),
      lang: toValue(options.lang) ?? 'en',
    },
  })

  const alt = computed(() => fetchResponse.data.value ?? undefined)

  return {
    alt,
    ...fetchResponse,
  }
};
