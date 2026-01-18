export type swiper = {
  detail: {
    current: bumber
  }
}
//轮播图数据类型
export type swiperlist = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: string
}
//前台数据类型
export type listtype = {
  id: string
  name: string
  icon: string
}
//热门推荐数据类型
export type typepopularRecommendations = {
  alt: string
  id: string
  pictures: string[]
  target: string
  title: string
  type: number
}
//猜你喜欢数据类型
export type typeguessyoulikeit = {
  /** 商品描述 */
  desc: string
  /** 商品折扣 */
  discount: number
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品已下单数量 */
  orderNum: number
  /** 商品图片 */
  picture: string
  /** 商品价格 */
  price: number
  /*解决items类型报错*/
  items: Array
  /*解决pages的报错*/
  pages: number
}
//猜你喜欢分页数据类型
export type typedata<T> = {
  /** 列表数据 */
  items: T[]
  /** 总条数 */
  counts: number
  /** 当前页数 */
  page: number
  /** 总页数 */
  pages: number
  /** 每页条数 */
  pageSize: number
}
/** 通用分页参数类型 */
export type typePageParams = {
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 10 */
  pageSize?: number
}
export interface XtxGuessInstance {
  getguessyoulikeit: () => Promise<void> // 猜你喜欢初始化方法
  add: () => Promise<void> // 加载更多
  resetData: () => void
  value: XtxGuessInstance // 重置数据
}
