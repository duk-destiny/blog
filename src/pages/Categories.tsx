import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Layout from '@/components/Layout';
import { getCategories, getArticlesByCategory } from '@/services/articleService';
import { ContentItem } from '@/components/ArticleList';

export default function Categories() {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  const renderArticleItem = (article: ContentItem, index: number) => {
    return (
      <li key={article.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
        <a 
          href={article.path} 
          className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex justify-between"
        >
          <span>{article.title[language]}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{article.date}</span>
        </a>
      </li>
    );
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 
              ref={ref as React.RefObject<HTMLHeadingElement>}
              className={`text-4xl font-bold mb-12 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {t('categories')}
            </h1>
            
            <div className="space-y-6 animate-fade-up">
              {categories.map((category, index) => {
                const categoryArticles = getArticlesByCategory(category);
                return (
                  <div key={category} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-dark-card rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card/80 transition-all duration-300"
                    >
                      <h2 className="text-xl font-semibold">{t(category)}</h2>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {categoryArticles.length} {categoryArticles.length === 1 ? t('article') : t('articles')}
                      </span>
                    </button>
                    
                    {selectedCategory === category && (
                      <ul className="mt-2 ml-4 space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        {categoryArticles.map((article, articleIndex) => 
                          renderArticleItem(article, articleIndex)
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
