<script setup lang="ts">
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import SkeletonScreen from '@/pages/index/components/SkeletonScreen.vue'
import { slideshow, getHomeCategoryAPI, popularRecommendations } from '@/api/index'
import { onLoad } from '@dcloudio/uni-app'
import type {
  swiperlist,
  listtype,
  typepopularRecommendations,
  XtxGuessInstance,
} from '@/types/index/component'
import { ref } from 'vue'
//轮播图数据
const slideshowlist = ref<swiperlist[]>([])
const slideshows = async () => {
  const res = await slideshow()
  slideshowlist.value = res.result
}
//前台数据
const CategoryPanela = ref<listtype[]>([])
const getlist = async () => {
  const res = await getHomeCategoryAPI()
  CategoryPanela.value = res.result
}
//热门推荐数据
const popularRecommendationslist = ref<typepopularRecommendations[]>([])
const getpopularRecommendations = async () => {
  const res = await popularRecommendations()
  popularRecommendationslist.value = res.result
}
//滚动容器到底的函数
const guessRef = ref<XtxGuessInstance | null>(null)
const onScrolltolower = () => {
  guessRef.value.add()
}
//下拉菜单调用组件方法
const menuclose = ref(false)
const dropdownrefresh = async () => {
  menuclose.value = true
  guessRef.value.resetData()
  await Promise.all([
    slideshows(),
    getpopularRecommendations(),
    (guessRef.value as XtxGuessInstance).add(),
    getlist(),
  ])
  menuclose.value = false
}
//控制骨架屏的显示和隐藏
const isLoding = ref(false)
onLoad(async () => {
  isLoding.value = true
  await Promise.all([slideshows(), getlist(), getpopularRecommendations()])
  isLoding.value = false
})
</script>

<template>
  <CustomNavbar></CustomNavbar>
  <scroll-view
    scroll-y
    @scrolltolower="onScrolltolower"
    refresher-enabled
    @refresherrefresh="dropdownrefresh"
    :refresher-triggered="menuclose"
  >
    <SkeletonScreen v-if="isLoding"></SkeletonScreen>
    <template v-else>
      <XtxSwiper :list="slideshowlist"></XtxSwiper>
      <CategoryPanel :list="CategoryPanela"></CategoryPanel>
      <HotPanel :list="popularRecommendationslist"></HotPanel>
      <XtxGuess ref="guessRef"></XtxGuess>
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
