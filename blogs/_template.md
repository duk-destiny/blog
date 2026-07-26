---
title:
  zh: 文章中文标题
  en: Article English Title
summary:
  zh: 一句话摘要（中文）
  en: One-line summary (English)
date: 2026-01-01          # 发布日期 YYYY-MM-DD
category: frontend        # 分类键，需存在于 src/locales 中
readTime: 10              # 预计阅读分钟数
tags:
  zh: [标签1, 标签2]
  en: [Tag1, Tag2]
slug: my-article-slug     # 可选，默认取文件名（不含 .md）
body:
  en: |                   # 可选：英文正文。省略则英文复用中文正文
    英文正文写在这里（Markdown）……
---

# 正文标题

在这里用 Markdown 书写**中文正文**。

- 列表项 A
- 列表项 B

```ts
console.log('hello');
```

> 引用块示例。

| 列1 | 列2 |
| --- | --- |
| a   | b   |
