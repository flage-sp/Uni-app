<script setup lang="ts">
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import { slideshow, getHomeCategoryAPI, popularRecommendations } from '@/api/index'
import { onLoad } from '@dcloudio/uni-app'
import type { swiperlist, listtype, typepopularRecommendations } from '@/types/component'
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
const guessRef = ref('')
const onScrolltolower = () => {
  guessRef.value.add()
}
onLoad(() => {
  slideshows()
  getlist()
  getpopularRecommendations()
})
</script>

<template>
  <CustomNavbar></CustomNavbar>
  <scroll-view scroll-y @scrolltolower="onScrolltolower">
    <XtxSwiper :list="slideshowlist"></XtxSwiper>
    <CategoryPanel :list="CategoryPanela"></CategoryPanel>
    <HotPanel :list="popularRecommendationslist"></HotPanel>
    <XtxGuess :list="guessyoulikeitlist" ref="guessRef"></XtxGuess>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
