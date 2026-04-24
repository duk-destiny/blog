import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Layout from '@/components/Layout';
import { contentItems, ContentItem } from '@/components/ArticleList';
import GitHubComments from '@/components/GitHubComments';

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [article, setArticle] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundArticle = contentItems.find(a => a.id === parseInt(id));
      setArticle(foundArticle || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center py-20">
              <p className="text-xl text-gray-500 dark:text-gray-400">加载中...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center py-20">
              <p className="text-xl text-gray-500 dark:text-gray-400">{t('articleNotFound')}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 
              ref={ref as React.RefObject<HTMLHeadingElement>}
              className={`text-4xl font-bold mb-4 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {article.title[language]}
            </h1>
            
            <div className={`flex flex-wrap gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400 ${isVisible ? 'animate-fade-up animate-fade-up-delay-100' : 'opacity-0'}`}>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime} {t('readTime')}</span>
              <span>•</span>
              <span>{t(article.category)}</span>
            </div>
            
            <div className={`prose dark:prose-invert max-w-none ${isVisible ? 'animate-fade-up animate-fade-up-delay-200' : 'opacity-0'}`}>
              <div className="mb-8">
                <h2>{t('summary')}</h2>
                <p>{article.summary[language]}</p>
              </div>
              
              <div className="mb-8">
                <h2>{t('content')}</h2>
                <p>{t('articleContentPlaceholder')}</p>
                <p>{t('articleContentPlaceholder2')}</p>
                <p>{t('articleContentPlaceholder3')}</p>
              </div>
              
              <div className="mb-8">
                <h2>{t('tags')}</h2>
                <div className="flex flex-wrap gap-2">
                  {article.tags[language].map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-dark-card rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <GitHubComments 
              path={article.path} 
              title={article.title[language]} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
