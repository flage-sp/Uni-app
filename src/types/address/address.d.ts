export type typeMemberAddressAPI = {
  /*收货人姓名
   */
  receiver: string
  /*联系方式
   */
  contact: string
  /*所在省份编码
   */
  provinceCode: string
  /*所在城市编码
   */
  cityCode: string
  /*所在区/县编码
   */
  countyCode: string
  /*详细地址
   */
  address: string
  /*是否为默认，1为是，0为否*/
  isDefault: number
  /*前端页面展示省市区，可选*/
  fullLocation?: string
}
export type typeMemberAddress = {
  address: string
  addressTags: null
  cityCode: string
  contact: string
  countyCode: string
  fullLocation: string
  id: string
  isDefault: number
  postalCode: null
  provinceCode: string
  receiver: string
}
