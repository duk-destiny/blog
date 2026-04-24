import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

type Language = 'zh' | 'en';

export function useLanguage() {
  const { t, i18n: i18nInstance } = useTranslation();

  const language = i18nInstance.language as Language;

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    i18nInstance.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return {
    language,
    toggleLanguage,
    t
  };
}

export { i18n };
