import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import type { TranslationKeys } from '@/i18n-resources';
import { siteConfig } from '@/config/siteConfig';

type Language = 'zh' | 'en';

export function useLanguage() {
  const { t: rawT, i18n: i18nInstance } = useTranslation();

  const language = i18nInstance.language as Language;

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    i18nInstance.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // 类型安全包装：只接受 TranslationKeys 联合类型的 key，其余参数透传给 rawT
  const t = (key: TranslationKeys, ...args: any[]) => (rawT as any)(key, ...args);

  // 动态设置 HTML lang 和页面标题
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    const name = siteConfig.user.name[language];
    const site = siteConfig.siteName[language];
    document.title = `${name} | ${site}`;
  }, [language]);

  return {
    language,
    toggleLanguage,
    t
  };
}

export { i18n };
