import { XtxGuessInstance } from '@/types/index/component'

export const useGuessList = (guessRef: XtxGuessInstance) => {
  const onScrolltolower = () => {
    guessRef.value.add()
  }
  return {
    onScrolltolower,
  }
}
