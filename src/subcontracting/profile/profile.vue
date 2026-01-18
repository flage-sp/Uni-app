<script setup lang="ts">
import { ref } from 'vue'
import { getMemberProfileAPI, putMemberProfileAPI } from '@/api/index'
import { onLoad } from '@dcloudio/uni-app'
import { Profile } from '@/types/profile/profole'
import { peopleprofile } from '@/stores/index'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const formModel = ref({
  account: '',
  avatar: '',
  birthday: '',
  fullLocation: '',
  gender: '',
  id: '',
  nickname: '',
  profession: '',
})
const getpersonalinformation = async () => {
  const res = await getMemberProfileAPI()
  formModel.value = res.result
}
const onGenderChange: UniHelper.RadioGroupOnChange = (ev) => {
  formModel.value.gender = ev.detail.value
}
const onBirthdayChange: UniHelper.DatePickerOnChange = (ev) => {
  formModel.value.birthday = ev.detail.value
}
const putfullLocation = ref<string | {}>({})
const onFullLocationChange: UniHelper.RegionPickerOnChange = (ev) => {
  formModel.value.fullLocation = ev.detail.value?.join('  ')
  putfullLocation.value = ev.detail.code
}
const submitform = async () => {
  const { nickname, gender, birthday, profession } = formModel.value
  const data = ref<Profile>({
    nickname,
    gender,
    birthday,
    profession,
    provinceCode: putfullLocation.value[0],
    cityCode: putfullLocation.value[1],
    countyCode: putfullLocation.value[2],
  })
  const res = await putMemberProfileAPI(data.value)
  console.log(res)
  if (res.code === '1') {
    const store = peopleprofile()
    store.setpeople(res.result)
    uni.showToast({ icon: 'success', title: '修改成功' })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  } else {
    uni.showToast({
      title: '内部错误',
      icon: 'success',
      mask: true,
    })
  }
}
// 修改头像
const onAvatarChange = () => {
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      // 文件上传
      uni.uploadFile({
        url: '/member/profile/avatar', // [!code ++]
        name: 'file', // 后端数据字段名  // [!code ++]
        filePath: tempFilePath, // 新头像  // [!code ++]
        success: (res) => {
          // 判断状态码是否上传成功
          if (res.statusCode === 200) {
            // 提取头像
            const { avatar } = JSON.parse(res.data).result
            // 当前页面更新头像
            formModel.value!.avatar = avatar // [!code ++]
            // 更新 Store 头像
            uni.showToast({ icon: 'success', title: '更新成功' })
          } else {
            uni.showToast({ icon: 'error', title: '出现错误' })
          }
        },
      })
    },
  })
}
onLoad(() => {
  getpersonalinformation()
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @tap="onAvatarChange">
        <image class="image" :src="formModel.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ formModel.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="formModel.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="formModel.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="formModel.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            value="2000-01-01"
            @change="onBirthdayChange"
          >
            <view v-if="formModel.birthday">{{ formModel.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            mode="region"
            :value="['广东省', '广州市', '天河区']"
            @change="onFullLocationChange"
          >
            <view v-if="formModel.fullLocation">{{ formModel.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            placeholder="请填写职业"
            v-model="formModel.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="submitform">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
