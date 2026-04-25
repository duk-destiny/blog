import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/siteConfig';
import { Github, FileText, Code, Calendar, BookOpen } from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 顶部个人信息 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {siteConfig.user.name[language]}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {siteConfig.user.description1[language]}
              </p>
            </div>
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-4 md:mt-0 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-dark-card cursor-default">
              <div className="text-2xl font-bold mb-2">10+</div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{t('projects')}</span>
                <a
                  href="/archive"
                  className="hover:text-primary transition-colors"
                  title={t('viewProjects')}
                >
                  <Code className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-dark-card cursor-default">
              <div className="text-2xl font-bold mb-2">10+</div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{t('notes')}</span>
                <a
                  href="/archive"
                  className="hover:text-primary transition-colors"
                  title={t('viewNotes')}
                >
                  <FileText className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-dark-card cursor-default">
              <div className="text-2xl font-bold mb-2">2026</div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{t('started')}</span>
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-dark-card cursor-default">
              <div className="text-2xl font-bold mb-2">∞</div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{t('learning')}</span>
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 引言 */}
          <div className="text-center mb-8">
            <p className="text-xl italic text-gray-600 dark:text-gray-300">
              {t('heroQuote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
