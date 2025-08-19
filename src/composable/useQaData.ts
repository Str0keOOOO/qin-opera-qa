import {ref, computed, type Ref} from 'vue';
import raw from '@/data/qa.json';
import type {
    Module,
    ModuleItem,
    Level,
    Question
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

    function useQuestions(moduleId: Ref<number>, levelId: Ref<number>) {
        return computed<Question[]>(() => {
            const mod = qaData.value.find(m => m.moduleId === moduleId.value);
            const level = mod?.levels.find(l => l.levelId === levelId.value);
            return level?.questions ?? [];
        });
    }

    return {
        qaData,
        useModules,
        useLevels,
        useQuestions
    };
}