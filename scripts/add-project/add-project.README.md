# 脚本 2：add-project（首页精选项目）

交互式添加「首页精选项目」，一次性录入中英文信息，脚本会自动更新
`src/content/projects.json` 与 `src/content/projects.ts`，首页「精选项目」随即生效。

## 使用方法

```bash
# 方式一：npm 脚本
npm run project:add

# 方式二：直接运行
node scripts/add-project.mjs
```

运行后会逐项提示输入（直接回车使用方括号中的默认值）：

```
📝 添加新的精选项目（中英文）

项目中文名:
项目英文名:
中文简介:
英文简介:
发布日期 (YYYY-MM-DD) (2026-07-26):
分类键 (.../other) (practicalProjects):
阅读分钟数 (10):
中文标签 (逗号分隔) (项目):
英文标签 (逗号分隔) (Project):
主链接 (https://...):
次链接/仓库 (https://...):
```

## 字段说明

| 字段 | 说明 |
|------|------|
| 项目中文名 / 英文名 | 卡片标题，双语必填 |
| 中文 / 英文简介 | 卡片描述 |
| 发布日期 | `YYYY-MM-DD` |
| 分类键 | 建议用 `src/locales` 已有键：`frontend` / `css` / `buildTools` / `performance` / `practicalProjects` / `learningNotes` / `other` |
| 阅读分钟数 | 数字 |
| 中文 / 英文标签 | 英文逗号分隔，如 `React, 前端, H5` |
| 主链接 / 次链接 | 项目地址、GitHub 仓库等（`https://` 开头），留空则不显示图标 |

## 数据存储

- 权威数据：`src/content/projects.json`（可手动备份 / 版本管理）。
- 生成数据：`src/content/projects.ts`（由脚本重写，**请勿手改**）。
- 新项目 `id` 自动取当前最大值 +1，类型为 `project`，首页 `Projects.tsx` 仅展示 `type === 'project'` 的条目。

## 关联说明

- 精选项目同时会出现在「笔记列表 / 归档 / 分类 / 标签」中。
- 想移除某项目：编辑 `src/content/projects.json` 删除对应条目，再运行
  `npm run project:add`（任意输入后脚本会重写；或手动删除后运行一次生成脚本即可）。
