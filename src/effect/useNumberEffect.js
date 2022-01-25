import { computed } from 'vue'
import numeral from 'numeral'

export const useNumberEffect = (value) => {
  const val = computed(() => {
    if (!value) return ''
    return numeral(value).format('0,0')
  })
  return { val }
}