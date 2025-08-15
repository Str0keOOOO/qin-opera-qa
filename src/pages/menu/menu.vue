<script setup lang="ts">
import {ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import qaData from '@/data/qa.json';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface Level {
  levelId: number;
  levelName: string;
  questions: Question[];
}

interface Module {
  moduleId: number;
  module: string;
  levels: Level[];
}

const moduleId = ref(0);
const levels = ref<Level[]>([]);

onLoad((options: any) => {
  moduleId.value = Number(options?.moduleId);
  levels.value = (qaData as Module[]).find(m => m.moduleId === moduleId.value)?.levels;
  console.log(levels.value);
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
  <!--TODO 可能出现打包的问题  -->
  <view class="menu-background">
    <view class="menu-title">
      <text class="menu-title-jichu">基础</text>
      <text class="menu-title-zhishi">知识</text>
    </view>
    <view class="menu-btns" @click="startGame(levels[0].levelId)">
      <view class="menu-btn">
        <text class="menu-text">{{ levels[0].levelName }}</text>
      </view>
      <view class="menu-btn" @click="startGame(levels[1].levelId)">
        <text class="menu-text">{{ levels[1].levelName }}</text>
      </view>
      <view class="menu-btn" @click="startGame(levels[2].levelId)">
        <text class="menu-text">{{ levels[2].levelName }}</text>
      </view>
      <view class="menu-btn" @click="startGame(levels[3].levelId)">
        <text class="menu-text">{{ levels[3].levelName }}</text>
      </view>
      <view class="menu-btn" @click="startGame(levels[4].levelId)">
        <text class="menu-text">{{ levels[4].levelName }}</text>
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

.menu-btns{
  width: 500rpx;
  height: 800rpx;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.menu-btn{
  width: 100%;
  height: 150rpx;
  background-image: url("@/assets/menu-btn.png");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-text{
  font-size: 40rpx;
  font-family: slidefu-regular;
  color: white;
}
</style>