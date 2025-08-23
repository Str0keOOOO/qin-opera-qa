import {ref, computed} from 'vue';
import type {QaData} from '@/types/qa';
import qaData from '@/data/qa.json';

type ProgressStore = Record<number, number[]>;
const STORAGE_KEY = 'qa_progress';

function loadStore(): ProgressStore {
    try {
        const raw = uni.getStorageSync(STORAGE_KEY);
        if (!raw) return {};
        const obj = JSON.parse(raw);
        return obj || {};
    } catch {
        return {};
    }
}

function saveStore(store: ProgressStore) {
    uni.setStorageSync(STORAGE_KEY, JSON.stringify(store));
}

const storeRef = ref<ProgressStore>(loadStore());
const moduleLevelMap: Record<number, number[]> = {};
(qaData as QaData).forEach(m => {
    moduleLevelMap[m.moduleId] = m.levels.map(l => l.levelId);
});

export function useProgress() {
    function persist() {
        saveStore(storeRef.value);
    }

    function markLevelCompleted(moduleId: number, levelId: number) {
        const arr = storeRef.value[moduleId] || (storeRef.value[moduleId] = []);
        if (!arr.includes(levelId)) {
            arr.push(levelId);
            persist();
        }
    }

    function completedLevelIds(moduleId: number) {
        return storeRef.value[moduleId] || [];
    }

    function isLevelCompleted(moduleId: number, levelId: number) {
        return completedLevelIds(moduleId).includes(levelId);
    }

    function isLevelUnlocked(moduleId: number, levelId: number) {
        if (levelId === 1) return true;
        if (levelId <= 0) return false;
        return isLevelCompleted(moduleId, levelId - 1);
    }

    function isModuleCompleted(moduleId: number) {
        const all = moduleLevelMap[moduleId] || [];
        if (!all.length) return false;
        const done = completedLevelIds(moduleId);
        return all.every(id => done.includes(id));
    }

    function isModuleUnlocked(moduleId: number) {
        if (moduleId === 1) return true;
        return isModuleCompleted(moduleId - 1);
    }

    const completedModulesCount = computed(() =>
        Object.keys(moduleLevelMap)
            .map(id => Number(id))
            .filter(id => isModuleCompleted(id)).length
    );

    return {
        markLevelCompleted,
        isLevelCompleted,
        isLevelUnlocked,
        isModuleCompleted,
        isModuleUnlocked,
        completedModulesCount,
        store: storeRef
    };
}