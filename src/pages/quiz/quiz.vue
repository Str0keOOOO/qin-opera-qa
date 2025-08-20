<script setup lang="ts">
import {ref, computed, watch, nextTick} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {useQaData} from '@/composable/useQaData';
import QuizBtn from '@/component/quizBtn.vue';
import {useProgress} from '@/composable/useProgress';

const {markLevelCompleted} = useProgress();

// 引入需要的获取函数
const {useQuestions, useLevels, useModules} = useQaData();

const moduleId = ref(0);
const levelId = ref(0);

const questions = useQuestions(moduleId, levelId);
const levels = useLevels(moduleId);          // 当前模块所有关卡
const modules = useModules();                // 所有模块(用于跳到下一个模块)

const currentIndex = ref(0);
const selected = ref<number | null>(null);

const resultPopup = ref();
const popupType = ref<'success' | 'fail' | null>(null);

const currentQuestion = computed(() => questions.value[currentIndex.value]);
const progressText = computed(() =>
    questions.value.length ? `第${currentIndex.value + 1}/${questions.value.length}题` : ''
);

const isSuccess = computed(() => popupType.value === 'success');
const isFail = computed(() => popupType.value === 'fail');

function openPopup(type: 'success' | 'fail') {
  popupType.value = type;
  nextTick(() => resultPopup.value?.open('center'));
}

function selectOption(i: number) {
  if (!currentQuestion.value) return;
  if (selected.value != null) return;
  selected.value = i;

  const correct = (i + 1) === currentQuestion.value.answer;
  if (!correct) {
    openPopup('fail');
    return;
  }

  // 最后一题且正确 -> 记录关卡完成
  if (currentIndex.value === questions.value.length - 1) {
    markLevelCompleted(moduleId.value, levelId.value);
    openPopup('success');
    return;
  }

  setTimeout(() => {
    currentIndex.value++;
    selected.value = null;
  }, 400);
}

function restartQuiz() {
  uni.navigateTo({
    url: `/pages/quiz/quiz?moduleId=${moduleId.value}&levelId=${levelId.value}`
  });
}

// 修复: 跳转到下一关或下一模块第一关
function nextQuiz() {
  const hasNextLevel = levels.value.some(l => l.levelId === levelId.value + 1);
  if (hasNextLevel) {
    uni.navigateTo({
      url: `/pages/quiz/quiz?moduleId=${moduleId.value}&levelId=${levelId.value + 1}`
    });
    return;
  }

  // 计算下一模块
  const sorted = [...modules.value].sort((a, b) => a.moduleId - b.moduleId);
  const idx = sorted.findIndex(m => m.moduleId === moduleId.value);
  const nextModule = sorted[idx + 1];

  if (nextModule) {
    uni.navigateTo({
      url: `/pages/quiz/quiz?moduleId=${nextModule.moduleId}&levelId=1`
    });
  } else {
    // 已是最后一个模块最后一关，可改成自定义结束页
    uni.navigateTo({ url: '/pages/home/home' });
  }
}

function menuBack() {
  uni.navigateTo({
    url: `/pages/menu/menu?moduleId=${moduleId.value}`
  });
}

function closeAndFinish() {
  resultPopup.value?.close();
  popupType.value = null;
}

onLoad((options: any) => {
  moduleId.value = Number(options?.moduleId) || 0;
  levelId.value = Number(options?.levelId) || 0;
  nextTick(() => {
    console.log('loaded questions:', questions.value);
  });
});

watch(questions, () => {
  currentIndex.value = 0;
  selected.value = null;
  popupType.value = null;
});
</script>

<template>
  <image class="menu-back" src="@/assets/menu-back.svg" @click="menuBack"></image>
  <view class="menu-background">
    <view class="menu-title">
      <text class="menu-title-jichu">基础</text>
      <text class="menu-title-zhishi">知识</text>
    </view>

    <view class="quiz" v-if="currentQuestion">
      <text class="quiz-title">{{ progressText }}</text>

      <view class="quiz-btns">
        <text>{{ currentQuestion.question }}</text>

        <quiz-btn
            v-for="(opt,i) in currentQuestion.options"
            :key="i"
            class="quiz-btn"
            :isCorrect="(i+1) === currentQuestion.answer"
            @click="selectOption(i)"
        >
          {{ opt }}
        </quiz-btn>

        <!-- 结果弹窗 -->
        <uni-popup ref="resultPopup" type="center" :mask-click="false">
          <!-- 成功弹窗 -->
          <view v-if="isSuccess" class="result-popup">
            <text class="result-title">恭喜你，全部正确</text>
            <view class="result-actions">
              <button class="result-btn" @click="menuBack">返回目录</button>
              <button class="result-btn" @click="nextQuiz">下一题</button>
            </view>
          </view>

          <!-- 失败弹窗 -->
          <view v-else-if="isFail" class="result-popup">
            <text class="result-title">很遗憾，出错了</text>
            <view class="result-actions">
              <button class="result-btn" @click="menuBack">返回目录</button>
              <button class="result-btn" @click="restartQuiz">重新开始</button>
            </view>
          </view>
        </uni-popup>
      </view>
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
  background-image: url('@/assets/menu-background.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-title {
  width: 140px;
  font-size: 120rpx;
  line-height: 0.8;
  position: absolute;
  left: calc(50% - 70px);
  top: 5.5%;
  line-height: 0.9;
  display: flex;
  flex-direction: column;
  font-family: slidefu-regular;
}

.quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.quiz-title {
  font-size: 45rpx;
  font-family: slidefu-regular;
  color: #831A1F;
}

.quiz-btns {
  width: 700rpx;
  height: calc(700rpx * 403 / 361);
  padding: 10% 10% 20% 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-image: url("@/assets/quiz-btns.png");
  background-size: cover;
  font-family: slidefu-regular;
  font-size: 25px;
}

.quiz-btn {
  width: 300rpx;
  height: calc(300rpx * 47 / 166);
  color: white;
  font-size: 40rpx;
  font-family: slidefu-regular;
}

.result-popup {
  width: 600rpx;
  height: calc(600rpx * 170 / 323);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20rpx;
  justify-content: space-evenly;
}

.result-actions {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.result-title {
  font-size: 50rpx;
}

.result-btn {
  width: 260rpx;
  height: calc(260rpx * 35 / 122);
  background-image: url("@/assets/menu-btn.png");
  background-size: cover;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  padding: 0;
  margin: 0;
}
</style>