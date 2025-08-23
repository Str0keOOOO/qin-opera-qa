// qa 数据根类型
export type QaData = Module[];

// 模块
export interface Module {
    moduleId: number;
    moduleName: string;        // 模块名称（含序号与标题）
    levels: Level[];
}

// 关卡
export interface Level {
    levelId: number;
    levelName: string;     // 关卡名称（含序号与标题）
    questions: Question[];
}

// 题目
export interface Question {
    question: string;
    options: [string, string, string, string]; // 固定四个选项
    answer: 1 | 2 | 3 | 4;                     // 正确选项序号（1-based）
}

// 派生便捷类型
export type ModuleItem = Pick<Module, 'moduleId' | 'moduleName'>;
export type LevelItem = Pick<Level, 'levelId' | 'levelName'>;