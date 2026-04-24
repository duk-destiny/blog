import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh.json';
import en from './locales/en.json';

const savedLang = localStorage.getItem('language');
const browserLang = navigator.language.substring(0, 2);
const defaultLang = savedLang || (browserLang === 'zh' ? 'zh' : 'en');

i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en }
  },
  lng: defaultLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
