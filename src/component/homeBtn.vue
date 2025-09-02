<script setup lang="ts">
import {computed} from 'vue'

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
      @click="handleClick"
  >
    <slot/>
  </view>
</template>

<style scoped>
.home-btn {
  background-image: url("data:image/webp;base64,UklGRuwCAABXRUJQVlA4IOACAADQDwCdASonAJEAPpE8mUoloyKmpnVdqNASCUAanwtva4kftmueS9AG8x7yNLZnuygUyQWW3Cj5fv017BHR0A0PIhKFw2M8R7G8JQbyr9Vs6bh9BdcDr57KDfMlBpGPTrqTuKYxG05Yf40oZiqfSOFaOOhqBYB9ZlMn6Gdt6YDXbHjSX/yOpwAA/tDQCg5tVFUmTzK/btv3Lmg28mGoJJa+egiRuyY8lWkoNRcOTKE9eQOJ2+tu2GSuv1Lo8bZSrQ0Sh1zelpRxxwfzM/8tFKLOlwvNhosmn4vm0R/igJ7x8emqyb//47DNepMCGH4JG76saLV+Ls//g0yGIRkm0Cw2QdN7unWL+5KGjUSoWfXifuzowTcXc4l7nBq1w/rqg/jOn30Qdg3ksjRwCm1ov3BxTdAp7lAqwTThub/Kc7vqG+9zVuE/JWlESogz6kfRJIwDU/qhOj1D5cjumKwNcwV9X/QImeh0kcuuPPZfV8jmuWHTs2o7C92sapU92Y889TY3/Y1Wugr8GRUk82sNnAuDJOfCY3iZuj8qMdv+5JkR95MLPJ7xdrC8TwC6xgw9wvSce2AIJUp6dnx2dWiFFzrOLWz2P51E5I46DWtTWipsMYZq4sqagqAqEpra1lJ1gHC0Wft915NO8vViiWimiqLIiyB1vl3b/R3EwpxjtUyZTKROXsGx7pbrojJTTNYAxBrgNlFjFOaClEG8RcVzSJlsb3MIhhKvFEX8P2l/wKyZWk3v61dvybYXx37WCk9tI+R7cIaZH3bT21sRcTe/4kTATY1+4+4woe3Is6/fSHrvy+H7SZ/l0iMjERVb59/07Gi38L/zKrv6r3zXBzVoQHNNk8bbtsDauoN/jFbcHKIvKZb+Pf4zx/eBdOvk8hb/V95f1mMIBMWeg//Jcv/RbPn2zF254+L97WBWz3r0Jx6AcSF93L//3sOiHf//tXunJCGaPCunWa0VpeT4YIhX2AAA");
  width: 80rpx;
  height: calc(80rpx * 145 / 39);
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
  background-image: url("data:image/webp;base64,UklGRnwBAABXRUJQVlA4WAoAAAAQAAAAKAAAFQAAQUxQSLUAAAABcAgAbBwFYQYLwgxag5vBzeBmUIScQc7gEIowhCIEIfekT0oQEQzcNlLkxYPlfQUMBUSYE3ZRLfcZDlUR1RmxaAJIKn6bFtt0dYua/7KGCQoxp2uCXatwc3+Rmmw+KNoIgi5s29qYXaUaWA2w9HYjRoxo250WgPVoTgmQwkmBbLurh5tTgoUSUyLbLve8m1Pq3psO31nbgfhpFPA4tRHcN/zVwuAMNC0BHKbzHGBKWNcF+gEAAFZQOCCgAAAAMAQAnQEqKQAWAD6JNJVHpSKiITqzOACgEQlsBigALwA3goH5aQmoxKoAAP73ya//9fQT/+8/3Oiqj/wIxPrIj+3+Inwv/xgRjoiv+W8uR9xYcPtBLziFknUhvlekj1y//9UR/9We//2o5X3Ifc6Km/MbP//9fH0MGvgqPiGdsnljoaPPGNb/4pOhD+R5/lsA/0OLPwZfr/8G//lbvUAAAA==");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.home-btn.progressing,
.home-btn.completed {
  color: black;
}
</style>