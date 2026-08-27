# 脚本 1：add-blog（博客 Markdown 解析）

把写好的 Markdown 博客放到 `blogs/` 目录，运行本脚本即可自动解析并生成
应用所需的博客数据（`src/content/blogs.ts`），无需手动改代码。

## 前置依赖

- 已安装 `js-yaml`（开发依赖，已加入 `package.json`，首次请先 `npm install`）

## 使用方法

```bash
# 方式一：npm 脚本
npm run blog:add

# 方式二：直接运行
node scripts/add-blog/add-blog.mjs
```

## Markdown 文件格式

每个 `.md` 文件需要带 YAML frontmatter（参考 `blogs/_template.md`）：

```markdown
---
title:
  zh: 中文标题
  en: English Title
summary:
  zh: 中文摘要
  en: English summary
date: 2026-07-26          # 发布日期 YYYY-MM-DD
category: frontend        # 分类键，需存在于 src/locales 中
readTime: 12              # 可选，预计阅读分钟数
tags:
  zh: [React, 前端]
  en: [React, Frontend]
slug: my-article-slug     # 可选，默认取文件名（不含 .md）
body:                     # 可选，英文正文；省略则英文复用中文正文
  en: |
    English markdown body...
---

# 正文标题

在这里用 Markdown 书写**中文正文**……
```

要点：

- **中文正文**：frontmatter 之后的 Markdown 内容即为「中文正文」。
- **英文正文**：在 `body.en` 中提供；若省略，英文版会复用中文正文。
- **slug**：决定文章唯一标识，缺省取文件名。建议保持唯一、语义化（如 `react-imperative-modal`）。
- **以 `_` 开头的文件**（如 `blogs/_template.md`）会被脚本忽略，可用作模板。

## 生成结果

- 输出文件：`src/content/blogs.ts`（自动生成，**请勿手改**）。
- 文章按 `date` 倒序排列，自动分配 `id`（从 1001 起），`path` 为 `/article/{id}`。
- 应用内 `ArticleList` 会合并 `blogItems` 与精选项目，博客会显示在
  「笔记列表 / 归档 / 分类 / 标签」页面，详情页 `/article/{id}` 用 `react-markdown` 渲染正文。

## 关联说明

- 想在首页也展示最新文章？可在 `src/pages/Home.tsx` 引用 `blogItems` 增加一个列表区块。
- 分类 `category` 必须是 `src/locales/zh.json` / `en.json` 里已有的键，否则详情页会显示原文。
- 新增标签建议在 `src/components/ArticleList.tsx` 的 `tagColors` 中补一个颜色。
