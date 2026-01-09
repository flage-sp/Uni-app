import { http } from '@/utils/http'
import type { HotResult } from '@/types/hot/global'
import { CategoryTopItem } from '@/types/category/category'
import type {
  swiperlist,
  listtype,
  typepopularRecommendations,
  typeguessyoulikeit,
  typedata,
  typePageParams,
} from '@/types/index/component'
/*轮播图请求接口*/
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

type HotParams = typePageParams & {
  /** Tab 项的 id，默认查询全部 Tab 项的第 1 页数据 */
  subType?: string
}
/**
 * 通用热门推荐类型
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
//分类列表数据接口
export const classificationmodule = () => {
  return http<CategoryTopItem>({
    method: 'GET',
    url: '/category/top',
  })
}
//商品详情数据接口
export const itemdetails = (id: string) => {
  return http({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
