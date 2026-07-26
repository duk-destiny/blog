---
title:
  zh: 使用 React 实现一个可命令式调用的弹窗
  en: Building an Imperatively Callable Modal with React
summary:
  zh: 从 visible 状态到 useImperativeHandle，梳理几种弹窗实现方式
  en: From visible state to useImperativeHandle, comparing several modal implementations
date: 2026-07-26
category: frontend
readTime: 12
tags:
  zh: [React, H5, 前端]
  en: [React, H5, Frontend]
slug: react-imperative-modal
---

# 引言

在日常 H5 开发中，弹窗是很常见的需求。本文对比几种实现方式，并重点介绍如何用 `useImperativeHandle` 做「命令式调用」。

## 基础实现：受控 visible

最直观的做法是用 `useState` 控制显隐：

```tsx
const [visible, setVisible] = useState(false);
```

父组件通过 `setVisible(true)` 打开弹窗。缺点是需要把状态层层透传。

## 命令式调用：useImperativeHandle

把弹窗封装成命令式 API，通过 `ref` 暴露 `open` / `close`：

```tsx
useImperativeHandle(ref, () => ({
  open: () => setVisible(true),
  close: () => setVisible(false),
}));
```

> 提示：本文为示例内容，由 `add-blog` 脚本解析生成，用于验证 Markdown 渲染效果。

## 小结

- 受控方式适合简单场景；
- 命令式方式适合在任意位置快速唤起弹窗。

祝你编码愉快！
