import { http } from '@/utils/http'
import type {
  swiperlist,
  listtype,
  typepopularRecommendations,
  typeguessyoulikeit,
  typedata,
} from '@/types/component'
export const slideshow = () => {
  return http<swiperlist[]>({
    method: 'GET',
    url: '/home/banner',
  })
}
export const getHomeCategoryAPI = () => {
  return http<listtype[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}
export const popularRecommendations = () => {
  return http<typepopularRecommendations[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}
export const guessyoulikeit = (data?: typedata<typeguessyoulikeit>) => {
  return http<typeguessyoulikeit>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
