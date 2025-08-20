<script setup lang="ts">
import {computed} from 'vue';
import {useQaData} from '@/composable/useQaData';
import {useProgress} from '@/composable/useProgress';

const {useModules} = useQaData();
const {isModuleCompleted, completedModulesCount} = useProgress();

const modules = useModules();

// 解锁规则: 第1模块默认解锁; 其它模块需前一个模块完成
function isModuleUnlocked(id: number) {
  if (id === 1) return true;
  return isModuleCompleted(id - 1);
}

function startGame(moduleId: number, disabled: boolean) {
  if (disabled) return;
  uni.navigateTo({ url: `/pages/menu/menu?moduleId=${moduleId}` });
}

const totalModules = computed(() => Array.isArray(modules.value) ? modules.value.length : 0);

const progressText = computed(() =>
    `已完成 ${completedModulesCount.value} / ${totalModules.value}`
);
</script>

<template>
  <view class="home-progress">{{ progressText }}</view>
  <view class="home-background">
    <view
        v-for="m in modules"
        :key="m.moduleId"
        class="home-btn"
        :class="[
        'home-btn-dyn',
        {
          disabled: !isModuleUnlocked(m.moduleId),
          completed: isModuleCompleted(m.moduleId)
        }
      ]"
        @click="startGame(m.moduleId, !isModuleUnlocked(m.moduleId))"
    >
      <text class="home-text">{{ m.module }}</text>
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



.home-btn-dyn.disabled {
  opacity: 0.2;
  pointer-events: none;
}

.home-btn-dyn.completed {
  box-shadow: 0 0 10rpx #ffd27f;
}

.home-progress {
  position: absolute;
  top: 4%;
  left: 5%;
  font-size: 40rpx;
  color: #fff;
  font-family: slidefu-regular;
}

.home-text {
  font-size: 35rpx;
  font-family: slidefu-regular;
  writing-mode: vertical-rl;
  text-orientation: upright;
  text-align: center;
}

.home-btn-dyn:nth-of-type(1) { top:25%; right:20%; }
.home-btn-dyn:nth-of-type(2) { top:30%; left:25%; }
.home-btn-dyn:nth-of-type(3) { top:55%; left:30%; }
.home-btn-dyn:nth-of-type(4) { top:60%; right:15%; }
.home-btn-dyn:nth-of-type(5) { top:75%; right:30%; }
</style>