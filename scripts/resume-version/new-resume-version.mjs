#!/usr/bin/env node
/**
 * 简历版本迭代脚本
 *
 * 用法：
 *   node scripts/resume-version/new-resume-version.mjs                 # 自动生成下一个版本号，并交互式询问中英文标签
 *   node scripts/resume-version/new-resume-version.mjs v2             # 指定版本号
 *   node scripts/resume-version/new-resume-version.mjs v2 "第二版说明" "v2 description"   # 直接带上中英文标签
 *   echo "第二版说明`n v2 description" | node scripts/resume-version/new-resume-version.mjs   # 管道传入标签
 *
 * 作用：基于最新的简历版本，克隆出一份新版本骨架（含 zh / en 双语文案），
 * 写入 src/data/resume.json。所有历史版本都保留在文件中，页面下拉框可随时切换查看。
 * 生成后请手动编辑新版本的内容（姓名、技能、项目、评价等）。
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESUME_PATH = resolve(__dirname, '../../src/data/resume.json');

function readResume() {
  return JSON.parse(readFileSync(RESUME_PATH, 'utf-8'));
}

function getLatestVersionKey(data) {
  const versionKeys = Object.keys(data).filter((k) => /^v\d+$/.test(k));
  const maxNum = versionKeys.reduce((max, k) => {
    const n = parseInt(k.slice(1), 10);
    return Number.isNaN(n) ? max : Math.max(max, n);
  }, 0);
  return { latest: `v${maxNum}`, next: `v${maxNum + 1}` };
}

// 读取管道 / 重定向传入的 stdin 内容（按行）。若为标准交互终端则返回空数组。
function readStdinLines() {
  if (process.stdin.isTTY) return [];
  let raw = '';
  try {
    raw = readFileSync(0, 'utf-8');
  } catch {
    return [];
  }
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function ask(rl, question) {
  return (await rl.question(question)).trim();
}

async function main() {
  const [argKey, argZh, argEn] = process.argv.slice(2);

  const data = readResume();
  const { latest, next } = getLatestVersionKey(data);
  const newKey = argKey || next;

  if (!/^v\d+$/.test(newKey)) {
    console.error(`版本号格式应为 v 加数字，例如 v2，收到：${newKey}`);
    process.exit(1);
  }
  if (data[newKey]) {
    console.error(`版本 ${newKey} 已存在，请换一个版本号。`);
    process.exit(1);
  }
  if (!data[latest]) {
    console.error('未找到任何已有版本（v1）作为模板。');
    process.exit(1);
  }

  // 优先使用命令行参数，其次使用管道传入的 stdin 行，最后才交互式询问
  const stdinLines = readStdinLines();
  let stdinIdx = 0;
  let zhLabel = argZh || stdinLines[stdinIdx++] || '';
  let enLabel = argEn || stdinLines[stdinIdx++] || '';

  if (!zhLabel || !enLabel) {
    if (process.stdin.isTTY) {
      const rl = createInterface({ input: process.stdin, output: process.stdout });
      try {
        if (!zhLabel) zhLabel = await ask(rl, '请输入新版本的中文标签（如「第二版 · 2026 秋招版」）：');
        if (!enLabel) enLabel = await ask(rl, '请输入新版本的英文标签（如「v2 · 2026 Fall Edition」）：');
      } finally {
        rl.close();
      }
    } else {
      // 非交互终端且没有足够的管道输入：给出明确错误而非静默退出
      console.error('中英文标签均不能为空。请通过参数传入，或用 echo 管道提供两行标签。');
      process.exit(1);
    }
  }

  if (!zhLabel || !enLabel) {
    console.error('中英文标签均不能为空。');
    process.exit(1);
  }

  // 克隆最新版本的完整内容作为新版本骨架
  const cloned = JSON.parse(JSON.stringify(data[latest]));
  cloned.zh.label = zhLabel;
  cloned.en.label = enLabel;

  data[newKey] = cloned;

  writeFileSync(RESUME_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8');

  console.log('');
  console.log(`已基于 ${latest} 创建新版本 ${newKey}：`);
  console.log(`   中文标签：${zhLabel}`);
  console.log(`   英文标签：${enLabel}`);
  console.log('');
  console.log('接下来请编辑 src/data/resume.json 中新增的 ' + newKey + ' 块，');
  console.log('   修改姓名、职位、技能、项目、个人评价等双语文案。');
  console.log('   保存后刷新页面，即可在右上角下拉框切换查看该版本。');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
