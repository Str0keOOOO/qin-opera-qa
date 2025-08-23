import {ref, computed, type Ref} from 'vue';
import raw from '@/data/qa.json';
import type {
    Module,
    ModuleItem,
    LevelItem,
    Question
} from '@/types/qa';

export function useQaData() {
    const qaData = ref<Module[]>(raw as Module[]);

    function useModules() {
        return computed<ModuleItem[]>(() =>
            qaData.value.map(m => ({moduleId: m.moduleId, moduleName: m.moduleName}))
        );
    }

    function useLevels(moduleId: Ref<number>) {
        return computed<LevelItem[]>(() => {
            const mod = qaData.value.find(m => m.moduleId === moduleId.value);
            return mod
                ? mod.levels.map(l => ({
                    levelId: l.levelId,
                    levelName: l.levelName
                }))
                : [];
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