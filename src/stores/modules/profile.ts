import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Profile } from '@/types/profile/profole'

// 定义 Store
export const peopleprofile = defineStore(
  'profile',
  () => {
    // 个人信息
    const people = ref<Profile>({})

    // 保存个人信息
    const setpeople = (val: Profile) => {
      people.value = val
    }

    // 清理个人信息
    const clearpeople = () => {
      people.value = null
    }

    // 记得 return
    return {
      people,
      setpeople,
      clearpeople,
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
