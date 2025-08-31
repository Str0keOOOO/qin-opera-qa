<script setup lang="ts">

function startGame() {
  uni.navigateTo({url: '/pages/home/home'})
}
</script>

<template>
  <view
      class="start-background"
      style="background-image: url('/static/images/start-background.png')"
  >
    <view class="start-title">
      <text class="start-title-qin">秦</text>
      <text class="start-title-qiang">腔</text>
      <text class="start-title-wen">问</text>
      <text class="start-title-da">答</text>
    </view>
    <view
        class="start-btn"
        @click="startGame"
        style="background-image: url('/static/images/start-btn.png')"
    >
      <text class="start-text">开始游戏</text>
    </view>
  </view>
</template>

<style scoped>
.start-background {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
}

.start-btn {
  width: 480rpx;
  height: calc(480rpx * 69 / 244);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 76%;
}

.start-text {
  font-size: 60rpx;
  font-family: slidefu-regular;
  color: white;
}

.start-title {
  font-size: 240rpx;
  line-height: 0.8;
  position: absolute;
  top: 15%;
  display: flex;
  flex-direction: column;
  font-family: slidefu-regular;
}

.start-title-qin {
  right: 60rpx;
  position: relative;
}

.start-title-qiang {
  left: 60rpx;
  position: relative;
}

.start-title-wen {
  right: 60rpx;
  position: relative;
}

.start-title-da {
  left: 60rpx;
  position: relative;
}
</style>