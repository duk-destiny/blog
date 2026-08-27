#!/usr/bin/env node
/**
 * fetch-leetcode.mjs
 * ---------------------------------------------------------------------------
 * 抓取 LeetCode 提交日历（submissionCalendar），写入 src/data/leetcode-calendar.json
 *
 * 为什么需要它：
 *   leetcode.cn 的 API 有 Cloudflare 防护，Vercel / GitHub Actions 等国外服务器
 *   请求会返回 403（JS 挑战页面），只有本地网络能正常访问。因此采用「本地抓取
 *   一次 → 提交静态 JSON → 构建时打包进前端」的方式，运行时零外部请求。
 *
 * 用法：
 *   node scripts/fetch-leetcode/fetch-leetcode.mjs [用户名]
 *   npm run leetcode:update
 *
 * 注意：
 *   - 默认用户名从 src/config/siteConfig.ts 中 socialLinks.leetcode 提取
 *   - 生成结果写入 src/data/leetcode-calendar.json，请勿手动编辑该文件
 *   - 刷了新题后重新运行本脚本并提交，Vercel 重新构建即可更新刷题墙
 * ---------------------------------------------------------------------------
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../..');

// 从 siteConfig 提取默认用户名
function readDefaultUsername() {
  try {
    const file = fs.readFileSync(path.join(projectRoot, 'src/config/siteConfig.ts'), 'utf8');
    const m = file.match(/leetcode:\s*'([^']+)'/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

const username = process.argv[2] || readDefaultUsername();
if (!username) {
  console.error('❌ 未找到 LeetCode 用户名，请通过命令行参数传入：node scripts/fetch-leetcode/fetch-leetcode.mjs <username>');
  process.exit(1);
}

const url = `https://leetcode.cn/api/user_submission_calendar/${username}/`;
console.log(`⏳ 正在抓取 ${username} 的提交日历...`);

const res = await fetch(url, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Referer': `https://leetcode.cn/u/${username}/`,
  },
});

if (!res.ok) {
  console.error(`❌ 抓取失败：HTTP ${res.status}`);
  process.exit(1);
}

let cal = await res.json();
// leetcode.cn 返回的是 JSON 字符串（双重编码），做一次兜底解析
if (typeof cal === 'string') cal = JSON.parse(cal);

if (!cal || typeof cal !== 'object') {
  console.error('❌ 返回数据格式异常');
  process.exit(1);
}

const outDir = path.join(projectRoot, 'src/data');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'leetcode-calendar.json'),
  JSON.stringify({ fetchedAt: new Date().toISOString(), calendar: cal }, null, 2)
);

const entries = Object.entries(cal);
const total = entries.reduce((sum, [, c]) => sum + (Number(c) || 0), 0);
console.log(`✅ 已写入 src/data/leetcode-calendar.json`);
console.log(`   - 有提交记录的天数：${entries.length}`);
console.log(`   - 累计提交次数：${total}`);
