<script setup lang="ts">
import {ref, computed, nextTick} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {useQaData} from '@/composable/useQaData';
import {useProgress} from '@/composable/useProgress';

const {useLevels} = useQaData();
const {isLevelCompleted} = useProgress();

const moduleId = ref<number>(0);

// 原始关卡列表(可能为 ref 或 computed)
const rawLevels = useLevels(moduleId);

// 解锁规则: 第一关默认解锁; 其它关需前一关完成
function isLevelUnlocked(levelId: number) {
  if (levelId === 1) return true;
  return isLevelCompleted(moduleId.value, levelId - 1);
}

// 过滤并保证数组安全
const levelItems = computed(() => {
  const arr = rawLevels?.value;
  if (!Array.isArray(arr)) return [];
  return arr.filter(l => l && typeof l.levelId === 'number');
});

function startGame(levelId: number, disabled: boolean) {
  if (disabled) return;
  uni.navigateTo({
    url: `/pages/quiz/quiz?moduleId=${moduleId.value}&levelId=${levelId}`
  });
}

function menuBack() {
  uni.navigateTo({ url: '/pages/home/home' });
}

onLoad((options: any) => {
  moduleId.value = Number(options?.moduleId) || 0;
  nextTick(() => {
    console.log('menu onLoad moduleId=', moduleId.value, 'levels=', rawLevels?.value);
  });
});
</script>

<template>
  <image class="menu-back" src="@/assets/menu-back.svg" @click="menuBack" />
  <view class="menu-background">
    <view class="menu-title">
      <text>基础</text>
      <text>知识</text>
    </view>

    <view v-if="levelItems.length" class="quiz-btns">
      <view
          v-for="l in levelItems"
          :key="l.levelId"
          class="menu-btn"
          :class="{
          disabled: !isLevelUnlocked(l.levelId),
          completed: isLevelCompleted(moduleId, l.levelId)
        }"
          @click="startGame(l.levelId, !isLevelUnlocked(l.levelId))"
      >
        <text class="menu-text">{{ l.levelName }}</text>
      </view>
    </view>

    <view v-else style="color:#fff;font-size:32rpx;font-family:slidefu-regular;">
      加载中...
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

.quiz-btns {
  width: 500rpx;
  height: 800rpx;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.menu-btn {
  width: 100%;
  height: 150rpx;
  background-image: url("@/assets/menu-btn.png");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-btn.disabled {
  opacity: 0.2;
  pointer-events: none;
}

.menu-btn.completed {
  box-shadow: 0 0 12rpx #7fd4ff;
}

.menu-text {
  font-size: 40rpx;
  font-family: slidefu-regular;
  color: white;
}
</style>