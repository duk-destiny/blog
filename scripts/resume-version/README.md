# 简历版本迭代脚本

基于最新的简历版本，克隆出一份新的版本骨架（含 `zh` / `en` 双语文案），写入 `src/data/resume.json`。
所有历史版本都保留在文件中，简历页（`/resume`）右上角的下拉框可随时切换查看。

## 用法

```bash
# 自动生成下一个版本号（如 v2），并交互式询问中英文标签
node scripts/resume-version/new-resume-version.mjs

# 指定版本号
node scripts/resume-version/new-resume-version.mjs v2

# 直接带上中英文标签（非交互）
node scripts/resume-version/new-resume-version.mjs v2 "第二版 · 秋招版" "v2 · Fall Edition"
```

也可使用 npm 快捷命令：`npm run resume:new`（参数同上）。

## 脚本逻辑

1. 解析 `src/data/resume.json`，取当前最大的 `vN` 计算出下一个版本号（或采用你通过参数指定的版本号）。
2. 深拷贝最新版本的 `zh` / `en` 全部内容，作为新版本的初始骨架。
3. 用你提供（或交互输入）的中英文标签写入新版本的 `label` 字段。
4. 回写 `src/data/resume.json` 并打印后续编辑指引。

## 生成之后

脚本只生成骨架，内容需要你手动编辑：

- 打开 `src/data/resume.json`，找到新生成的 `vN` 块。
- 修改其中的 `displayName`、`role`、`bio`、`email`、`github`、`skills`、`projects`、`evaluations` 等双语文案。
- 保存后刷新页面，即可在简历页下拉框中看到并切换到该版本。

## 数据格式

```jsonc
{
  "v1": {
    "zh": {
      "label": "第一版 · 2026 开源实战版（2026.07）",
      "displayName": "issssa · 和弦",
      "role": "大模型应用工程师 · AI 工程方向",
      "bio": "…",
      "email": "2775089477@qq.com",
      "github": "github.com/duk-destiny",
      "skills": [{ "title": "编程语言", "items": "Python、C++" }],
      "projects": [{ "name": "…", "stack": "…", "time": "…", "points": ["…"] }],
      "evaluations": ["…"]
    },
    "en": { /* 同上，英文 */ }
  }
  // v2、v3 … 历史版本均保留在此
}
```

> 简历文案已独立于 i18n（`src/locales/`），因此**无需**走 `i18n:scan` / `i18n:types` 流程，直接编辑 `src/data/resume.json` 即可。
