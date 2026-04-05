import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const token = ref<string | null>(null)

    // 保存会员信息，登录时使用
    const settoken = (val: string) => {
      token.value = val
    }

    // 清理会员信息，退出时使用
    const cleartoken = () => {
      token.value = ''
    }

    // 记得 return
    return {
      token,
      settoken,
      cleartoken,
    }
  },
  // TODO: 持久化
  {
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value) // [!code warning]
        },
        getItem(key) {
          return uni.getStorageSync(key) // [!code warning]
        },
      },
    },
  },
)
