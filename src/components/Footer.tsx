import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/siteConfig';
import { Github, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12">
      {/* 顶部渐变分隔条 */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-5">
          <p className="font-serif text-lg font-medium text-gray-700 dark:text-gray-200">
            “{siteConfig.user.motto[language]}”
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={siteConfig.socialLinks.email}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
            <a
              href={siteConfig.socialLinks.qq}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> QQ
            </a>
          </div>

          <p className="text-xs text-gray-400">
            © {year} {siteConfig.user.name[language]}. {t('footerCopyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
