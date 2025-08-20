// src/composable/useProgress.ts
import {ref, computed} from 'vue';
import type {QaData} from '@/types/qa';
// 请按实际路径引入题库数据（需包含 modules->levels->levelId）
// 若已有 useQaData 能返回完整数据，可替换为对应调用。
import qaData from '@/data/qa.json'; // 调整路径

type ProgressStore = Record<number, number[]>; // moduleId -> 已完成 levelId 列表（去重）

const STORAGE_KEY = 'qa_progress_v1';

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

// 预计算模块 -> 关卡 ID 列表
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

    function isLevelCompleted(moduleId: number, levelId: number) {
        return (storeRef.value[moduleId] || []).includes(levelId);
    }

    function completedLevelIds(moduleId: number) {
        return storeRef.value[moduleId] || [];
    }

    function isModuleCompleted(moduleId: number) {
        const all = moduleLevelMap[moduleId] || [];
        if (!all.length) return false;
        const done = storeRef.value[moduleId] || [];
        return all.every(id => done.includes(id));
    }

    const completedModulesCount = computed(() =>
        Object.keys(moduleLevelMap)
            .map(id => Number(id))
            .filter(id => isModuleCompleted(id)).length
    );

    function resetAll() {
        storeRef.value = {};
        persist();
    }

    function reload() {
        storeRef.value = loadStore();
    }

    return {
        markLevelCompleted,
        isLevelCompleted,
        completedLevelIds,
        isModuleCompleted,
        completedModulesCount,
        resetAll,
        reload,
        store: storeRef
    };
}