<script setup lang="ts">
import qaData from '@/data/qa.json';

// TODO 改成接口获取一次就好了重复获取不好

interface ModuleItem {
  moduleId: number;
  module: string;
}

const modules: ModuleItem[] = qaData.map(item => ({
  moduleId: item.moduleId,
  module: item.module
}));

function startGame(moduleId: number) {
  uni.navigateTo({
    url: `/pages/menu/menu?moduleId=${moduleId}`
  });
}

// TODO要修改params传参

</script>

<template>
  <view class="home-background">
    <view class="home-btn" id="home-btn-1" @click="startGame(modules[0].moduleId)">
      <text class="home-text">{{ modules[0].module }}</text>
    </view>
    <view class="home-btn" id="home-btn-2" @click="startGame(modules[1].moduleId)">
      <text class="home-text">{{ modules[1].module }}</text>
    </view>
    <view class="home-btn" id="home-btn-3" @click="startGame(modules[2].moduleId)">
      <text class="home-text">{{ modules[2].module }}</text>
    </view>
    <view class="home-btn" id="home-btn-4" @click="startGame(modules[3].moduleId)">
      <text class="home-text">{{ modules[3].module }}</text>
    </view>
    <view class="home-btn" id="home-btn-5" @click="startGame(modules[4].moduleId)">
      <text class="home-text">{{ modules[4].module }}</text>
    </view>
  </view>
</template>

<style>
.home-background {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/home-background.png');
  background-size: cover;
}

.home-btn {
  width: 80rpx;
  height: calc(80rpx * 147 / 41);
  background-image: url('@/assets/home-btn.png');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
}

.home-text {
  font-size: 35rpx;
  font-family: slidefu-regular;
  writing-mode: vertical-rl;
  text-orientation: upright;
  text-align: center;
}

#home-btn-1 {
  top: 25%;
  right: 20%;
}

#home-btn-2 {
  top: 30%;
  left: 25%;
}

#home-btn-3 {
  top: 55%;
  left: 30%;
}

#home-btn-4 {
  top: 60%;
  right: 15%;
}

#home-btn-5 {
  top: 75%;
  right: 30%;
}
</style>