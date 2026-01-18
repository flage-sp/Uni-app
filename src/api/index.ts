import { http } from '@/utils/http'
import type { HotResult } from '@/types/hot/global'
import { CategoryTopItem } from '@/types/category/category'
import { GoodsResult } from '@/types/goods/goods'
import { LoginResult } from '@/types/login/login'
import { ProfileDetail, Profile } from '@/types/profile/profole'
import { typeMemberAddressAPI, typeMemberAddress } from '@/types/address/address'
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
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
//登录接口
export const Login = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
//个人信息接口
export const getMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}
//修改个人信息
export const putMemberProfileAPI = (data: Profile) => {
  return http<Profile>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
//获取地址列表的接口
export const getMemberAddressAPI = () => {
  return http({
    method: 'GET',
    url: '/member/address',
  })
}
//新增地址列表的接口
export const postMemberAddressAPI = (data: typeMemberAddressAPI) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}
//修改地址列表的接口
export const putMemberAddressAPI = (id: string, data: {}) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}
//获取地址列表的接口
export const getlistMemberAddressAPI = (id: string) => {
  return http<typeMemberAddress[]>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}
/**
 * 删除收货地址
 * @param id 地址id(路径参数)
 */
export const deleteMemberAddressByIdAPI = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
