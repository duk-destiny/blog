import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Layout from '@/components/Layout';
import { getTags, getArticlesByTag, getTagCounts } from '@/services/articleService';
import { ContentItem } from '@/components/ArticleList';

export default function Tags() {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [tags, setTags] = useState<string[]>([]);
  const [tagCounts, setTagCounts] = useState<{ [key: string]: number }>({});
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 当语言变化时，更新标签列表和计数
  useEffect(() => {
    const newTags = getTags(language);
    const newTagCounts = getTagCounts(language);
    setTags(newTags);
    setTagCounts(newTagCounts);
  }, [language]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(prev => prev === tag ? null : tag);
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
              {t('tags')}
            </h1>
            
            <div className="animate-fade-up">
              {/* 标签云 */}
              <div className="flex flex-wrap gap-2 mb-10">
                {tags.length > 0 ? (
                  tags.map((tag, index) => {
                    const count = tagCounts[tag] || 0;
                    const isSelected = selectedTag === tag;
                    
                    return (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 ${ 
                          isSelected 
                            ? 'bg-primary text-white shadow-md' 
                            : 'bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-card/80 hover:shadow-sm' 
                        }`}
                        style={{ animationDelay: `${index * 0.02}s` }}
                      >
                        {tag}
                        <span className="ml-2 text-xs">{count}</span>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">{t('noTags')}</p>
                )}
              </div>
              
              {/* 选中标签的文章列表 */}
              {selectedTag && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {t('articles')} {t('taggedWith')} "{selectedTag}"
                  </h2>
                  <ul className="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                    {getArticlesByTag(selectedTag, language).map((article, index) => 
                      renderArticleItem(article, index)
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
