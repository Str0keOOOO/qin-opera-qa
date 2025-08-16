import {ref, computed, type Ref} from 'vue';
import raw from '@/data/qa.json';
import type {
    Module,
    ModuleItem,
    Level,
    Question,
    QuestionWithoutAnswer
} from '@/types/qa';

export function useQaData() {
    const qaData = ref<Module[]>(raw as Module[]);

    function useModules() {
        return computed<ModuleItem[]>(() =>
            qaData.value.map(m => ({moduleId: m.moduleId, module: m.module}))
        );
    }

    function useLevels(moduleId: Ref<number>) {
        return computed<Level[]>(() => {
            const mod = qaData.value.find(m => m.moduleId === moduleId.value);
            return mod?.levels ?? [];
        });
    }

    function getQuestions(moduleId: number, levelId: number): Question[] {
        return getLevels(moduleId).find(l => l.levelId === levelId)?.questions ?? [];
    }

    function getQuizQuestions(moduleId: number, levelId: number): QuestionWithoutAnswer[] {
        return getQuestions(moduleId, levelId).map(q => ({
            question: q.question,
            options: q.options
        }));
    }

    function checkAnswer(question: Question, userChoice: 1 | 2 | 3 | 4) {
        return question.answer === userChoice;
    }

    return {
        qaData,
        useModules,
        useLevels,
        getQuestions,
        getQuizQuestions,
        checkAnswer
    };
}