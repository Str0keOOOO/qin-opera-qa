<script setup lang="ts">
import {ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {useQaData} from '@/composable/useQaData';

const {useLevels} = useQaData();

const moduleId = ref(0);
const levels = useLevels(moduleId);

onLoad((options: any) => {
  moduleId.value = Number(options?.moduleId);
});

function startGame(levelId: number) {
  uni.navigateTo({
    url: `/pages/quiz/quiz?moduleId=${moduleId.value}&levelId=${levelId}`
  });
}

function menuBack() {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    uni.reLaunch({url: '/pages/home/home'});
  }
}
</script>

<template>
  <image class="menu-back" src="@/assets/menu-back.svg" @click="menuBack"></image>
  <view class="menu-background">
    <view class="menu-title">
      <text class="menu-title-jichu">基础</text>
      <text class="menu-title-zhishi">知识</text>
    </view>
    <view class="quiz">
      <text class="quiz-title">
        第一/五题
      </text>
      <view class="quiz-btns">
        <text>秦腔发源于中国哪个地区？</text>
      </view>
    </view>

  </view>
</template>

<style>
.menu-back {
  width: 70rpx;
  height: 70rpx;
  position: absolute;
  left: 40rpx;
  top: 40rpx;
}

.menu-background {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/menu-background.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-title {
  width: 140px;
  font-size: 120rpx;
  line-height: 0.8;
  position: absolute;
  left: calc(50% - 70px);
  top: 5.5%;
  line-height: 0.9;
  display: flex;
  flex-direction: column;
  font-family: slidefu-regular;
}

.quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.quiz-title {
  font-size: 45rpx;
  font-family: slidefu-regular;
  color: #831A1F;
}

.quiz-btns {
  width: 700rpx;
  height: calc(700rpx * 403 / 361);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-image: url("@/assets/quiz-btns.png");
  background-size: cover;
}

</style>