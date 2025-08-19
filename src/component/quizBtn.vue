<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{ isCorrect: boolean }>();

const classes = computed(() => ({
  correct: props.isCorrect,
  wrong: !props.isCorrect
}));
</script>

<template>
  <button
      type="button"
      class="quiz-btn"
      :class="classes"
  >
    <image
        src="@/assets/quiz-btn-border.png"
        class="quiz-btn-border"
    />
    <!--TODO 修改成after并且修改一下逻辑需要-->
    <slot/>
  </button>
</template>

<style scoped>
.quiz-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #BA1F4C;
  border-radius: 0;
  color: white;
}

.quiz-btn.correct:active {
  background-color: #23DEA0;
}

.quiz-btn.wrong:active {
  background-color: #FF0000;
}

.quiz-btn-border{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
<!--TODO如果后面闲的没事干可以把所有按钮都调一下这样可以增加复用度-->