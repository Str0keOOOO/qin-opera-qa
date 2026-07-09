# 秦腔问答

一款以秦腔文化知识为主题的闯关答题小程序。项目基于 uni-app、Vue 3 和 TypeScript 开发，围绕基础知识、经典剧目、音乐唱腔、名家名派、文化传承等内容设计问答关卡，适合用于秦腔文化科普、课堂互动和移动端趣味学习场景。

## 项目特点

- 秦腔主题知识问答，当前题库包含 5 个模块、25 个关卡、125 道题。
- 闯关式学习流程，模块和关卡会按完成进度逐步解锁。
- 答题结果即时反馈，答错可重新开始，答对全部题目后记录关卡完成状态。
- 本地保存学习进度，刷新或重新进入应用后仍可保留已完成关卡。
- 适配 uni-app 多端构建，可运行 H5，也可构建到微信、支付宝、百度、QQ 等小程序平台。
- 内置点击、成功、失败音效，并使用秦腔风格视觉素材提升沉浸感。

## 技术栈

- uni-app
- Vue 3
- TypeScript
- Vite
- uni-ui
- Sass

## 快速开始

### 环境要求

- Node.js 18 或更高版本
- pnpm 或 npm

推荐使用 pnpm，因为仓库中已包含 `pnpm-lock.yaml`。

### 安装依赖

```bash
pnpm install
```

如果使用 npm：

```bash
npm install
```

### 本地运行 H5

```bash
pnpm dev:h5
```

或：

```bash
npm run dev:h5
```

启动后根据终端输出访问本地地址。

### 类型检查

```bash
pnpm type-check
```

或：

```bash
npm run type-check
```

## 构建发布

### H5 构建

```bash
pnpm build:h5
```

### 微信小程序构建

```bash
pnpm build:mp-weixin
```

构建小程序前，请根据目标平台配置 `src/manifest.json` 中对应平台的 `appid` 等信息。微信小程序构建产物可使用微信开发者工具导入预览和上传。

## 常用脚本

| 脚本 | 说明 |
| --- | --- |
| `dev:h5` | 运行 H5 开发环境 |
| `build:h5` | 构建 H5 版本 |
| `dev:mp-weixin` | 运行微信小程序开发构建 |
| `build:mp-weixin` | 构建微信小程序版本 |
| `dev:mp-alipay` | 运行支付宝小程序开发构建 |
| `build:mp-alipay` | 构建支付宝小程序版本 |
| `type-check` | 执行 TypeScript 类型检查 |

更多平台脚本可查看 `package.json`。

## 项目结构

```text
.
├── src
│   ├── component          # 通用按钮组件
│   ├── composable         # 题库、进度、音效逻辑
│   ├── data
│   │   └── qa.json        # 秦腔问答题库
│   ├── pages
│   │   ├── start          # 开始页
│   │   ├── home           # 模块首页
│   │   ├── menu           # 关卡目录页
│   │   └── quiz           # 答题页
│   ├── types              # 题库类型定义
│   ├── App.vue            # 应用生命周期与字体加载
│   ├── main.ts            # 应用入口
│   ├── manifest.json      # uni-app 应用与平台配置
│   └── pages.json         # 页面路由配置
├── package.json
├── vite.config.ts
└── README.md
```

## 题库维护

题库文件位于 `src/data/qa.json`，数据结构如下：

```json
[
  {
    "moduleId": 1,
    "moduleName": "一·基础知识",
    "levels": [
      {
        "levelId": 1,
        "levelName": "第一关",
        "questions": [
          {
            "question": "题目内容",
            "options": ["选项 A", "选项 B", "选项 C", "选项 D"],
            "answer": 1
          }
        ]
      }
    ]
  }
]
```

维护题库时注意：

- `moduleId` 和 `levelId` 使用数字编号，并保持同一层级内唯一。
- 每道题固定 4 个选项。
- `answer` 使用 1 到 4 的数字，分别对应 `options` 中第 1 到第 4 个选项。
- 关卡解锁逻辑依赖连续编号：第 1 关默认解锁，后续关卡需完成前一关后解锁。
- 模块解锁逻辑依赖连续编号：第 1 个模块默认解锁，后续模块需完成前一模块全部关卡后解锁。

## 进度与音效

- 学习进度保存在本地缓存中，缓存键为 `qa_progress`。
- 进度逻辑位于 `src/composable/useProgress.ts`。
- 题库读取逻辑位于 `src/composable/useQaData.ts`。
- 点击、成功、失败音效逻辑位于 `src/composable/useAudio.ts`。

## 页面流程

```text
开始页 -> 模块首页 -> 关卡目录 -> 答题页
```

用户完成某一关全部题目后，系统会标记当前关卡完成，并解锁下一关或下一个模块。

## 注意事项

- `src/manifest.json` 中的 `appid` 当前为占位配置，正式发布前需要替换为实际平台应用 ID。
- 字体通过远程地址加载，离线环境下可能回退到系统默认字体。
- 项目中存在较多内联图片和音频资源，后续如需优化包体积，可将资源迁移到静态文件或 CDN。
