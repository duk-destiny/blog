import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/hooks/useLanguage';
import { contentItems } from '@/components/ArticleList';
import { Calendar, Folder, Hash } from 'lucide-react';

export default function AllBlog() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { t, language } = useLanguage();

  const sortedItems = [...contentItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`text-3xl font-bold mb-4 text-center ${
              titleVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            {t('allBlog')}
          </h1>
          <p
            className={`text-center text-gray-500 dark:text-gray-400 mb-12 ${
              titleVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            {sortedItems.length} {t('contentCount')}
          </p>

          <div className="space-y-4">
            {sortedItems.map((item, index) => (
              <BlogCard
                key={item.id}
                item={item}
                index={index}
                t={t}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function BlogCard({
  item,
  index,
  t,
  language,
}: {
  item: (typeof contentItems)[number];
  index: number;
  t: (key: any) => string;
  language: 'zh' | 'en';
}) {
  const { ref, isVisible } = useScrollAnimation();

  const delayClasses = [
    '',
    'animate-fade-up-delay-100',
    'animate-fade-up-delay-200',
    'animate-fade-up-delay-300',
    'animate-fade-up-delay-400',
    'animate-fade-up-delay-500',
  ];

  const tagColors: Record<string, string> = {
    React: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    TypeScript:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'Tailwind CSS':
      'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
    Vite: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    前端: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    CSS: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    新特性:
      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    类型系统:
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    博客: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Frontend:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'New Features':
      'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    'Type System':
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    Blog: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    大模型:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    LLM: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    GPT: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    AI: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    机器学习:
      'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  };

  return (
    <Link
      to={item.path}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={`block p-5 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 ${
        isVisible
          ? `animate-fade-up ${delayClasses[index % 6]}`
          : 'opacity-0'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">
            {item.title[language]}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
            {item.summary[language]}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {item.date}
        </span>
        <span className="flex items-center gap-1">
          <Folder className="w-3.5 h-3.5" />
          {t(item.category as any)}
        </span>
        <span className="flex items-center gap-1">
          <Hash className="w-3.5 h-3.5" />
          {item.tags[language].slice(0, 3).join(', ')}
          {item.tags[language].length > 3 && '...'}
        </span>
      </div>
    </Link>
  );
}
