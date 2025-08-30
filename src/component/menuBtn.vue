<script setup lang="ts">
import {computed} from 'vue';


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
    @click="handleClick"
  >
    <slot/>
  </view>
</template>

<style scoped>
.menu-btn {
  width: 100%;
  height: 141rpx;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-btn.disabled {
  opacity: 0.3;
  background-image: url("@/static/images/menu-btn-locked.png");
}

.menu-btn.progressing, .menu-btn.completed {
  opacity: 1;
  background-image: url("@/static/images/menu-btn.png");
}

</style>