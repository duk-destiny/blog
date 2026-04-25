import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref, isVisible } = useScrollAnimation();
  const { t, language } = useLanguage();

  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-xl font-bold mb-4 md:mb-0">
              {siteConfig.siteName[language]}
            </div>
            <div className="flex space-x-6">
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300 hover:-translate-y-1"
              >
                GitHub
              </a>
              <a
                href={siteConfig.socialLinks.qq}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300 hover:-translate-y-1"
              >
                QQ
              </a>
              <a
                href={siteConfig.socialLinks.email}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300 hover:-translate-y-1"
              >
                Email
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>{t('footerCopyright', currentYear.toString())}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
