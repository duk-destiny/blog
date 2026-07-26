import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh.json';
import en from './locales/en.json';

const savedLang = localStorage.getItem('language');
const browserLang = navigator.language.substring(0, 2);
const defaultLang = savedLang || (browserLang === 'zh' ? 'zh' : 'en');

i18n.use(initReactI18next).init({
  lng: defaultLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

// 使用 addResourceBundle 而非 init({ resources })，
// 避免 TS 从 init 参数推导出具体 key 类型从而覆盖 CustomTypeOptions 模块增强
i18n.addResourceBundle('zh', 'translation', zh);
i18n.addResourceBundle('en', 'translation', en);

export default i18n;
