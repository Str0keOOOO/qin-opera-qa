<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{ isCorrect: boolean }>();

const emit = defineEmits(['click'])

const classes = computed(() => ({
  correct: props.isCorrect,
  wrong: !props.isCorrect
}));

function handleClick() {
  emit('click')
}
</script>

<template>
  <button
      type="button"
      class="quiz-btn"
      :class="classes"
      @click="handleClick"
  >
    <slot/>
  </button>
</template>

<style scoped>
.quiz-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/static/images/quiz-btn.png");
  background-size: cover;
  border-radius: 0;
  color: white;
}

.quiz-btn.correct:active {
  background-image: url("@/static/images/quiz-btn-correct.png");
}

.quiz-btn.wrong:active {
  background-image: url("@/static/images/quiz-btn-wrong.png");
}

.quiz-btn-border {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>