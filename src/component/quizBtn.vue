<script setup lang="ts">
import {computed} from 'vue'
// import quizBtnImg from '@/assets/quiz-btn.png'
// import quizBtnCorrectImg from '@/assets/quiz-btn-correct.png'
// import quizBtnWrongImg from '@/assets/quiz-btn-wrong.png'
import imagePaths from '@/assets/imagePaths'

const quizBtnImg = imagePaths.quizButtonImg;
const quizBtnCorrectImg = imagePaths.quizBtnCorrect;
const quizBtnWrongImg = imagePaths.quizBtnWrong;

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
      :style="{
        '--quiz-btn-img': `url(${quizBtnImg})`,
        '--quiz-btn-correct-img': `url(${quizBtnCorrectImg})`,
        '--quiz-btn-wrong-img': `url(${quizBtnWrongImg})`
      }"
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
  background-image: var(--quiz-btn-img);
  background-size: cover;
  border-radius: 0;
  color: white;
}

.quiz-btn.correct:active {
  background-image: var(--quiz-btn-correct-img);
}

.quiz-btn.wrong:active {
  background-image: var(--quiz-btn-wrong-img);
}

.quiz-btn-border {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>