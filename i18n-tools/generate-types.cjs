/**
 * 生成 src/i18n-resources.d.ts
 * 运行：npm run i18n:types
 *
 * 作用：读取 src/locales/zh.json，生成 react-i18next 的类型声明（模块增强）。
 *      生成后，任何 `t('不存在的key')` 都会在 `tsc` 编译时报错，
 *      从根源上防止“漏翻 / 拼错 key 却静默显示原文”。
 *
 * 采用“显式 key 联合类型”而非 `typeof json`，以规避 TS 对 JSON 模块导入的
 * 增量缓存与解析歧义，保证类型与 zh.json 实际内容 100% 一致。
 *
 * 注意：该文件会随 locale 变化重新生成，无需手工编辑。
 */
const fs = require('fs');
const path = require('path');

const zhPath = path.resolve(__dirname, '..', 'src', 'locales', 'zh.json');
const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
const keys = Object.keys(zh);

const union = keys.map((k) => `  | ${JSON.stringify(k)}`).join('\n');

const dts = `import 'i18next';

// 该文件由 i18n-tools/generate-types.cjs 自动生成，请勿手工编辑。
type TranslationKeys =
${union};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: Record<TranslationKeys, string>;
    };
  }
}

export type { TranslationKeys };
`;

const outPath = path.resolve(__dirname, '..', 'src', 'i18n-resources.d.ts');
fs.writeFileSync(outPath, dts, 'utf8');
console.log('[i18n:types] generated', path.relative(process.cwd(), outPath), '(' + keys.length + ' keys)');
