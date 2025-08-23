<script setup lang="ts">
import { computed } from 'vue'
import homeBtnImg from '@/assets/home-btn.png'
import homeBtnLockImg from '@/assets/home-btn-lock.png'

const props = defineProps<{
  isUnlocked: boolean;
  isCompleted: boolean;
}>()

const emit = defineEmits(['click'])

const classes = computed(() => ({
  completed: props.isCompleted,
  disabled: !props.isUnlocked,
  progressing: props.isUnlocked && !props.isCompleted
}))

function handleClick() {
  if (!props.isUnlocked) return
  emit('click')
}
</script>

<template>
  <view
      class="home-btn"
      :class="classes"
      :style="{
      '--home-btn-img': `url(${homeBtnImg})`,
      '--home-btn-lock-img': `url(${homeBtnLockImg})`
    }"
      @click="handleClick"
  >
    <slot />
  </view>
</template>

<style scoped>
.home-btn {
  width: 80rpx;
  height: calc(80rpx * 147 / 41);
  background-image: var(--home-btn-img);
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
  background-image: var(--home-btn-lock-img);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.home-btn.progressing,
.home-btn.completed {
  color: black;
}
</style>
    <script setup lang="ts">
    </script>