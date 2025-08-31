<script setup lang="ts">
import {computed} from 'vue'
import {useQaData} from '@/composable/useQaData'
import {useProgress} from '@/composable/useProgress'
import HomeBtn from '@/component/homeBtn.vue'


const {useModules} = useQaData()
const {isModuleCompleted, isModuleUnlocked, completedModulesCount} = useProgress()

const modules = useModules()

function startGame(moduleId: number) {
  if (!isModuleUnlocked(moduleId)) return
  uni.navigateTo({url: `/pages/menu/menu?moduleId=${moduleId}`})
}

const totalModules = computed(() => Array.isArray(modules.value) ? modules.value.length : 0)
const progressText = computed(() => `已完成${completedModulesCount.value}/${totalModules.value}`)
</script>

<template>
  <view class="home-progress">
    <text class="home-progress-text">{{ progressText }}</text>
    <image class="home-progress-bar" src="@/static/home-progress-bar.webp"/>
  </view>

  <view
      class="home-background"
      style="background-image: url('/static/home-background.webp')"
  >
    <home-btn
        v-for="m in modules"
        :key="m.moduleId"
        :is-unlocked="isModuleUnlocked(m.moduleId)"
        :is-completed="isModuleCompleted(m.moduleId)"
        @click="startGame(m.moduleId)"
        class="home-btn"
    >
      <text class="home-text">{{ m.moduleName }}</text>
    </home-btn>
  </view>
</template>

<style scoped>
.home-background {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.home-progress {
  position: absolute;
  top: 5%;
  left: 6%;
  width: 280rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-progress-text {
  font-size: 40rpx;
  color: #fff;
  font-family: slidefu-regular;
}

.home-progress-bar {
  width: 280rpx;
  height: calc(280rpx * 13 / 140);
}

.home-text {
  font-size: 35rpx;
  font-family: slidefu-regular;
  writing-mode: vertical-rl;
  text-orientation: upright;
  text-align: center;
}


.home-btn:nth-of-type(1) {
  top: 25%;
  right: 30%;
  position: absolute;
}

.home-btn:nth-of-type(2) {
  top: 30%;
  left: 25%;
  position: absolute;
}

.home-btn:nth-of-type(3) {
  top: 55%;
  left: 30%;
  position: absolute;
}

.home-btn:nth-of-type(4) {
  top: 58%;
  right: 25%;
  position: absolute;
}

.home-btn:nth-of-type(5) {
  top: 75%;
  right: 40%;
  position: absolute;
}
</style>