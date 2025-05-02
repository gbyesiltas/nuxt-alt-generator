import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import { useFetch } from '#app'

type Options = {
  src: MaybeRefOrGetter<string>
  lang?: MaybeRefOrGetter<string>
}

type Response = {
  alt: ComputedRef<string | undefined>
  error: ComputedRef<boolean>
}

export function useGenerateAltText(options: Options): Response {
  const fetchResponse = useFetch<string>('/api/__alt__/generate', {
    method: 'POST',
    body: {
      src: toValue(options.src),
      lang: toValue(options.lang) ?? 'en',
    },
  })

  const alt = computed(() => fetchResponse.data.value ?? undefined)
  const error = computed(() => !!fetchResponse.error.value)

  return {
    alt,
    error,
  }
};
