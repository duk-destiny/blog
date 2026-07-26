# MyBlog

基于 React + Vite + TypeScript + TailwindCSS 的个人博客，支持中/英文双语与暗色模式。

## 功能亮点

- **中/英双语**：编译期类型安全的 i18n 方案，`t()` 调用自动校验 key 合法性
- **暗色模式**：基于 Tailwind `class` 策略，一键切换日间/夜间主题
- **在线简历**：结构化展示个人技能、项目经历与专业评价
- **GitHub 集成**：展示 GitHub 贡献热力图，通过 utterances 接入评论区
- **粒子背景**：首页动态粒子画布效果
- **响应式布局**：适配桌面与移动端

## 技术栈

| 分类 | 技术 |
|---|---|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 6 |
| 样式 | TailwindCSS 3 + tailwind-merge + clsx |
| 路由 | react-router-dom 7 |
| 状态 | zustand |
| 国际化 | i18next + react-i18next |
| Markdown | react-markdown |
| 图标 | lucide-react |

## 项目结构

```
myblog/
├── i18n-tools/                  # 国际化工具链（独立目录）
│   ├── scanner.config.cjs       # i18next-scanner 扫描配置
│   └── generate-types.cjs       # 从 zh.json 生成 TS 类型声明
├── scripts/                     # 工程脚本
│   └── resume-version/           # 简历版本迭代（含脚本与说明 README）
│       ├── new-resume-version.mjs
│       └── README.md
├── public/                      # 静态资源
├── src/
│   ├── data/                   # 数据驱动内容
│   │   ├── resume.json         # 各版本在线简历（中英双语，自包含）
│   │   └── resume.ts          # 简历数据类型与导出
│   ├── assets/                  # 项目内资源
│   ├── assets/                  # 项目内资源
│   ├── components/              # 通用组件（Navbar、Hero、Projects、ParticleBackground 等）
│   ├── config/                  # 站点配置（siteConfig）
│   ├── contexts/                # React Context
│   ├── hooks/                   # 自定义 Hooks
│   │   └── useLanguage.ts       # 类型安全的 i18n Hook
│   ├── lib/                     # 工具函数
│   ├── locales/                 # 翻译文件
│   │   ├── zh.json              # 中文翻译（权威源，含 126 个 key）
│   │   └── en.json              # 英文翻译
│   ├── pages/                   # 页面组件（Home、About、Resume、Archive 等）
│   ├── services/                # API/服务层
│   ├── App.tsx                  # 根组件
│   ├── i18n.ts                  # i18next 初始化
│   ├── i18n-resources.d.ts      # 自动生成的类型声明（勿手动编辑）
│   ├── index.css                # 全局样式
│   └── main.tsx                 # 入口
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本（含 tsc 类型检查）
npm run build

# 仅类型检查
npm run check

# Lint
npm run lint
```

## 国际化工作流

本项目实现了编译期类型安全的 i18n 方案：**任何 `t()` 调用中的 key 必须存在于 `zh.json`，否则 `npm run check` 会报错。**

### 核心文件

| 文件 | 作用 |
|---|---|
| `src/locales/zh.json` | **中文翻译（权威源）**。所有 key 以此文件为准 |
| `src/locales/en.json` | 英文翻译，key 须与 zh.json 保持一致 |
| `src/i18n-resources.d.ts` | **自动生成**的类型声明，从 zh.json 提取 key 联合类型 |
| `src/hooks/useLanguage.ts` | 封装 `useTranslation()`，给 `t()` 注入类型约束 |
| `i18n-tools/scanner.config.cjs` | 扫描代码中 `t('key')` 调用，自动合并到 locale 文件 |
| `i18n-tools/generate-types.cjs` | 基于 zh.json 生成 `TranslationKeys` 类型 |

### 日常使用

```bash
# 扫描代码中的 t() 调用，合并缺失 key 到 zh.json / en.json
npm run i18n:scan

# 基于 zh.json 重新生成 TypeScript 类型声明
npm run i18n:types

# 一键执行上述两步
npm run i18n:sync

# 验证类型安全（确保没有使用不存在的 key）
npm run check
```

### 添加新翻译

1. 在代码中添加 `t('myNewKey')`
2. 运行 `npm run i18n:scan`（新的 key 会自动写入 `zh.json` 和 `en.json`）
3. 在 `en.json` 中填写对应的英文翻译
4. 运行 `npm run i18n:types` 重新生成类型
5. 运行 `npm run check` 确保无类型错误

> **提示**：`npm run i18n:sync` 会同时执行步骤 2 和 4。

### 类型安全机制

```
zh.json ──generate-types──▶ TranslationKeys 联合类型 ──useLanguage.ts──▶ t(key) 类型约束
                                                                  │
                                                        t("不存在的key")
                                                              │
                                                        tsc 编译报错 ❌
```

- **普通 key**：`t('home')` —— 直接类型校验
- **动态 key**（如分类名）：`t(category as any)` —— 使用 `as any` 绕过类型检查，因为分类名来自数据而非 locale 文件

### 动态 key 说明

以下场景使用 `as any` 绕过类型检查（这些 key 由数据驱动，不在 `zh.json` 中）：

- `Navbar.tsx`：导航菜单标签由 `siteConfig.ts` 配置
- `Categories.tsx`：分类名来自文章数据
- `Article.tsx`：文章分类标签

这些动态 key 的值由 `i18next-scanner` 的 `keepRemoved: true` 保留，不会被扫描器清除。

## 在线简历版本管理

在线简历（`/resume`）支持**多版本共存、随时回看**。所有版本内容以自包含的中英双语数据形式存放在 `src/data/resume.json`，页面右上角的下拉框可切换查看任意历史版本。

### 数据结构

```jsonc
{
  "v1": {
    "zh": { "label": "第一版 · 2026 开源实战版（2026.07）", "displayName": "…", "role": "…", "bio": "…", "email": "…", "github": "…", "skills": [{ "title": "…", "items": "…" }], "projects": [{ "name": "…", "stack": "…", "time": "…", "points": ["…"] }], "evaluations": ["…"] },
    "en": { /* 同上，英文 */ }
  }
  // v2、v3 … 历史版本均保留在此，下拉框可随时切换
}
```

> 简历内容已从 i18n 抽离为独立 JSON；`About` 页复用的 `skill*` / `about*` 等共享 key 仍保留在 `locales/` 中。

### 迭代一个新版本

使用内置脚本，基于**最新版本**克隆出一份完整骨架（含 zh/en 双语文案），写入 `resume.json`，然后你只需编辑新版本块里的具体文案：

```bash
# 自动生成下一个版本号（如 v2），并交互式询问中英文标签
npm run resume:new

# 指定版本号
npm run resume:new v2

# 直接带上中英文标签
npm run resume:new v2 "第二版 · 秋招版" "v2 · Fall Edition"
```

脚本逻辑（详见 `scripts/resume-version/README.md`，脚本位于 `scripts/resume-version/new-resume-version.mjs`）：
1. 解析 `resume.json`，取当前最大 `vN` 算出下一个版本号（或采用你指定的）
2. 深拷贝最新版本的 `zh` / `en` 全部内容作为新版本骨架
3. 写入新的中英文标签
4. 回写文件并打印后续编辑指引

生成后，刷新页面即可在简历页右上角下拉框看到并切换该版本。**所有历史版本都保留在文件中，可随时回看。**

> 注意：简历文案已不在 `locales/` 中，因此新增/修改简历内容**不需要**走 `i18n:scan` / `i18n:types` 流程，直接编辑 `src/data/resume.json` 即可。

## 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # tsc 类型检查 + Vite 生产构建
npm run preview      # 预览生产构建
npm run check        # 仅 tsc 类型检查（不构建）
npm run lint         # ESLint 检查
npm run i18n:scan    # 扫描 t() 调用，合并 key 到 locale 文件
npm run i18n:types   # 生成 TranslationKeys 类型声明
npm run i18n:sync    # scan + types 一键执行
npm run resume:new    # 简历版本迭代：克隆最新版本生成新骨架
```
