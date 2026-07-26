/**
 * i18next-scanner 配置
 * 运行：npm run i18n:scan
 *
 * 作用：扫描 src 下所有 `t('key')` 调用，自动把缺失的 key 合并进
 *      src/locales/{zh,en}.json。
 *        - 已有 key 的值保持不变（不会覆盖你的翻译）
 *        - 新增缺失 key 的默认值设为 key 本身（占位，便于后续翻译）
 *        - keepRemoved: true —— 保留未被字面量扫描到的 key（如动态分类 'frontend'）
 *
 * 说明：本文件只负责“收集 / 合并 key 骨架”，翻译文本仍需人工或翻译脚本填充。
 */
const path = require('path');

module.exports = {
  // 相对 npm 脚本运行目录（项目根）解析
  input: ['src/**/*.{ts,tsx}'],
  output: './',
  options: {
    debug: false,
    // 识别 react-i18next 的 t() 以及 i18n.t()
    func: {
      list: ['t', 'i18next.t', 'i18n.t'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
    },
    lngs: ['zh', 'en'],
    ns: ['translation'],
    defaultLng: 'zh',
    defaultNs: 'translation',
    // 缺失 key 默认填 key 本身作为占位（扫描后再翻译 en）
    defaultValue: function (/* lng, ns, key */) {
      return undefined; // 交由下方 resource 处理；用 key 占位见下方说明
    },
    resource: {
      loadPath: 'src/locales/{{lng}}.json',
      savePath: 'src/locales/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: 'auto',
    },
    // 扁平 key，不使用 . 作层级分隔符
    keySeparator: false,
    nsSeparator: false,
    // 保留未被扫描到的既有 key（动态 key 不会被扫描器识别）
    keepRemoved: true,
    // 缺失 key 时，value 回退为 key 字符串（占位）
    missingKeyNoValueFallbackToKey: true,
  },
};
