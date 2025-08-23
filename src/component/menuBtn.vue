<script setup lang="ts">
import {computed} from 'vue';

const props = defineProps<{
  isUnlocked: boolean;
  isCompleted: boolean;
}>();

const classes = computed(() => ({
  disabled: !props.isUnlocked,
  completed: props.isCompleted,
  progressing: props.isUnlocked && !props.isCompleted
}));
</script>

<template>
  <view
      class="menu-btn"
      :class="classes"
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
  background-image: url("@/assets/menu-btn-locked.png");
}

.menu-btn.progressing, .menu-btn.completed {
  opacity: 1;
  background-image: url("@/assets/menu-btn.png");
}

</style>