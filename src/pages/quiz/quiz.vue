<template>
  <view class="launch-container" :style="{background: '#F5F5DC'}">
    <!-- 古装人物剪影 -->
    <image
        class="character-silhouette"
        src="/static/figures/character-silhouette.png"
        mode="aspectFit"
    />

    <!-- 镜子元素(带数字80) -->
    <view class="mirror-container">
      <image
          class="mirror"
          src="/static/figures/mirror.png"
          mode="aspectFit"
      />
      <text class="mirror-text">80</text>
    </view>

    <!-- 开始游戏按钮 -->
    <view class="start-btn" @click="navigateWithFade">
      <image
          class="btn-bg"
          src="/static/figures/start-btn-bg.png"
          mode="aspectFit"
      />
      <text class="btn-text">开始游戏</text>
    </view>

    <!-- 左下角橙色方块(数字126) -->
    <view class="corner-tag">
      <text>126</text>
    </view>
  </view>
</template>

<script setup lang="ts">
function navigateWithFade() {
  uni.navigateTo({
    url: '/pages/menu/menu',
    animationType: 'fade-in',
    animationDuration: 600
  });
}
</script>

<style>
.launch-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.character-silhouette {
  position: absolute;
  width: 80%;
  height: 60%;
  top: 10%;
  left: 10%;
}

.mirror-container {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 30%;
  right: 20%;
}

.mirror-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: orange;
  font-size: 24px;
  font-weight: bold;
}

.start-btn {
  position: absolute;
  width: 244px;
  height: 69px;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.btn-bg {
  width: 100%;
  height: 100%;
}

.btn-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
}

.corner-tag {
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 10px;
  left: 10px;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
}
</style>