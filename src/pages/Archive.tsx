import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Layout from '@/components/Layout';
import { getArticlesByArchive } from '@/services/articleService';

// 月份名称映射
const monthNames = {
  '01': { zh: '一月', en: 'January' },
  '02': { zh: '二月', en: 'February' },
  '03': { zh: '三月', en: 'March' },
  '04': { zh: '四月', en: 'April' },
  '05': { zh: '五月', en: 'May' },
  '06': { zh: '六月', en: 'June' },
  '07': { zh: '七月', en: 'July' },
  '08': { zh: '八月', en: 'August' },
  '09': { zh: '九月', en: 'September' },
  '10': { zh: '十月', en: 'October' },
  '11': { zh: '十一月', en: 'November' },
  '12': { zh: '十二月', en: 'December' }
};

export default function Archive() {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const archive = getArticlesByArchive();

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 
              ref={ref as React.RefObject<HTMLHeadingElement>}
              className={`text-4xl font-bold mb-12 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {t('archive')}
            </h1>
            
            <div className="space-y-8 animate-fade-up">
              {Object.entries(archive).map(([year, months], yearIndex) => (
                <div key={year} className="animate-fade-up" style={{ animationDelay: `${yearIndex * 0.1}s` }}>
                  <h2 className="text-2xl font-bold mb-4">{year}</h2>
                  <div className="space-y-4 ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-6">
                    {Object.entries(months).map(([monthKey, articles], monthIndex) => {
                      const [, month] = monthKey.split('-');
                      return (
                        <div key={monthKey} className="animate-fade-up" style={{ animationDelay: `${(yearIndex * 0.1) + (monthIndex * 0.05)}s` }}>
                          <h3 className="text-lg font-semibold mb-2">
                            {monthNames[month as keyof typeof monthNames][language]}
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                              ({articles.length} {articles.length === 1 ? t('article') : t('articles')})
                            </span>
                          </h3>
                          <ul className="space-y-3">
                            {articles.map((article, articleIndex) => (
                              <li key={article.id} className="animate-fade-up" style={{ animationDelay: `${(yearIndex * 0.1) + (monthIndex * 0.05) + (articleIndex * 0.02)}s` }}>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <a 
                                      href={article.path} 
                                      className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex-1"
                                    >
                                      {article.title[language]}
                                    </a>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                      {article.date}
                                    </span>
                                  </div>
                                  {/* 显示标签 */}
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {article.tags[language].map((tag, tagIndex) => (
                                      <span key={tagIndex} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-dark-card rounded-full text-gray-600 dark:text-gray-400">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
