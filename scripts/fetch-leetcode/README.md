# LeetCode 刷题日历抓取脚本（fetch-leetcode）

在本地抓取 LeetCode 提交日历（`submissionCalendar`），生成静态数据
`src/data/leetcode-calendar.json`，供首页「LeetCode 刷题墙」热力图直接读取。

## 为什么需要这个脚本

LeetCode 中国站（`leetcode.cn`）的 API 有 Cloudflare 防护：

- **本地网络**（国内直连）：可以正常访问 ✅
- **Vercel / GitHub Actions 等国外服务器**：请求被拦截，返回 `403`（"Just a moment..." JS 挑战页）❌

因此刷题数据**无法在服务器端实时拉取**，只能：

1. 在本地运行本脚本抓取一次；
2. 把生成的 JSON 提交到仓库；
3. Vercel 构建时把数据打包进前端，**运行时零外部请求**。

> 想换成国外可访问的数据源？若你改用 `leetcode.com`（国际版）账号刷题，
> 服务器端直接调用 `https://leetcode.com/api/user_submission_calendar/{username}/` 即可，
> 本脚本在本地抓 `leetcode.cn` 的方案就不需要了。

## 使用方法

```bash
# 方式一：npm 脚本（推荐）
npm run leetcode:update

# 方式二：直接运行（用户名默认从 src/config/siteConfig.ts 的 socialLinks.leetcode 提取）
node scripts/fetch-leetcode/fetch-leetcode.mjs

# 方式三：显式指定用户名
node scripts/fetch-leetcode/fetch-leetcode.mjs yin-tian-51
```

运行成功后输出：

```
⏳ 正在抓取 yin-tian-51 的提交日历...
✅ 已写入 src/data/leetcode-calendar.json
   - 有提交记录的天数：94
   - 累计提交次数：991
```

## 更新流程（刷了新题后）

```bash
npm run leetcode:update   # 1. 本地抓取最新数据
git add src/data/leetcode-calendar.json
git commit -m "chore: update leetcode calendar"
git push                  # 3. 触发 Vercel 重新部署
```

部署完成后，线上刷题墙即更新。

## 数据格式

`src/data/leetcode-calendar.json`（请勿手动编辑）：

```jsonc
{
  "fetchedAt": "2026-08-27T12:00:00.000Z",   // 抓取时间
  "calendar": {
    "1751817600": 5,   // 键：某天 00:00 UTC 的时间戳（秒）
    "1751904000": 12   // 值：当天成功提交次数
  }
}
```

## 前端如何消费

`src/components/LeetCodeContributions.tsx` 直接 `import` 该 JSON：

```ts
import leetcodeData from '@/data/leetcode-calendar.json';
```

组件用同样的数据绘制 52 周 GitHub 风格热力图（Canvas），并统计
「累计提交 / 刷题天数 / 近 7 天提交」，逻辑与 GitHub 贡献图保持一致。

## 相关脚本索引

| 脚本 | 说明 | 命令 |
|------|------|------|
| `add-blog` | 解析博客 Markdown | `npm run blog:add` |
| `add-project` | 添加首页精选项目 | `npm run project:add` |
| `fetch-leetcode` | 抓取 LeetCode 刷题日历（本工具） | `npm run leetcode:update` |
| `resume-version` | 克隆简历新版本 | `npm run resume:new` |
