<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps<{
  isUnlocked: boolean;
  isCompleted: boolean;
}>();

const classes = computed(() => ({
  completed: props.isCompleted,
  disabled: !props.isUnlocked,
  progressing: props.isUnlocked && !props.isCompleted
}));
</script>

<template>
  <view class="home-btn" :class="classes">
    <slot/>
  </view>
</template>

<style scoped>
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

.home-btn.disabled {
  color: #7B7B7B;
}

.home-btn.disabled:after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("@/assets/home-btn-lock.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.home-btn.progressing, .home-btn.completed {
  color: black;
}

</style>