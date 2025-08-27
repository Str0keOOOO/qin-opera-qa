<script setup lang="ts">
import {computed} from 'vue';
// import menuBtnImg from '@/assets/menu-btn.png';
// import menuBtnLockedImg from '@/assets/menu-btn-locked.png';
import imagePaths from '@/assets/imagePaths';

const menuBtnImg = imagePaths.menuButtonImg
const menuBtnLockedImg = imagePaths.menuBtnLocked


const props = defineProps<{
  isUnlocked: boolean;
  isCompleted: boolean;
}>();

const emit = defineEmits(['click'])

const classes = computed(() => ({
  disabled: !props.isUnlocked,
  completed: props.isCompleted,
  progressing: props.isUnlocked && !props.isCompleted
}));

function handleClick() {
  if (!props.isUnlocked) return
  emit('click')
}
</script>

<template>
  <view
    class="menu-btn"
    :class="classes"
    :style="{
      '--menu-btn-img': `url(${menuBtnImg})`,
      '--menu-btn-locked-img': `url(${menuBtnLockedImg})`
    }"
    @click="handleClick"
  >
    <slot/>
  </view>
</template>

<style scoped>
.menu-btn {
  width: 100%;
  height: 150rpx;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-btn.disabled {
  opacity: 0.3;
  background-image: var(--menu-btn-locked-img);
}

.menu-btn.progressing, .menu-btn.completed {
  opacity: 1;
  background-image: var(--menu-btn-img);
}

</style>