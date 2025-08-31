<script setup lang="ts">
import {ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {useQaData} from '@/composable/useQaData';
import {useProgress} from '@/composable/useProgress';
import menuBtn from '@/component/menuBtn.vue';


const {useLevels} = useQaData();
const {isLevelCompleted, isLevelUnlocked} = useProgress();

const moduleId = ref<number>(0);
const levelItems = useLevels(moduleId);

function startGame(levelId: number, disabled: boolean) {
  if (disabled) return;
  uni.navigateTo({
    url: `/pages/quiz/quiz?moduleId=${moduleId.value}&levelId=${levelId}`
  });
}

function goBack() {
  uni.navigateTo({url: '/pages/home/home'});
}

onLoad((options: any) => {
  moduleId.value = Number(options?.moduleId);
});
</script>

<template>
  <image class="menu-back" src="/static/images/menu-back.svg" @click="goBack"/>
  <view
      class="menu-background"
      style="background-image: url('/static/images/menu-background.png'); "
  >
    <view class="menu-title">
      <text>基础</text>
      <text>知识</text>
    </view>

    <view v-if="levelItems.length" class="menu-btns">
      <menu-btn
          v-for="l in levelItems"
          :key="l.levelId"
          :is-unlocked="isLevelUnlocked(moduleId, l.levelId)"
          :is-completed="isLevelCompleted(moduleId, l.levelId)"
          @click="startGame(l.levelId, false)"
      >
        <text class="menu-text">{{ l.levelName }}</text>
      </menu-btn>
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
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-title {
  width: 140px;
  font-size: 120rpx;
  position: absolute;
  left: calc(50% - 70px);
  top: 5.5%;
  line-height: 0.9;
  display: flex;
  flex-direction: column;
  font-family: slidefu-regular;
}

.menu-btns {
  width: 500rpx;
  height: 800rpx;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.menu-text {
  font-size: 40rpx;
  font-family: slidefu-regular;
  color: white;
}
</style>