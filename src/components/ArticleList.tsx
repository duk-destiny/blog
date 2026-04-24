import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/siteConfig';
import { Github, ExternalLink } from 'lucide-react';

export interface ContentItem {
  id: number;
  type: 'article' | 'project' | 'blog' | 'other';
  path: string;
  path2?: string; // 第二个路径
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  date: string;
  category: string;
  readTime?: number;
  tags: { zh: string[]; en: string[] };
}

// 导出内容数据供其他组件使用
export const contentItems: ContentItem[] = [
  {
    id: 1,
    type: 'project',
    path: '/article/1',
    path2: '/project/1',
    title: {
      zh: '个人博客网站',
      en: 'Personal Blog Website'
    },
    summary: {
      zh: '基于react，tailwindcss和docsify的个人博客网站',
      en: 'Personal blog website built with React, tailwindcss, and docsify'
    },
    date: '2026-04-25',
    category: 'frontend',
    readTime: 10,
    tags: {
      zh: ['React', '前端', '个人博客'],
      en: ['React', 'Frontend', 'Personal Blog']
    }
  },
    {
    id: 2,
    type: 'project',
    path: '/article/1',
    path2: '/project/1',
    title: {
      zh: '个人笔记',
      en: 'Personal Notes'
    },
    summary: {
      zh: '学习笔记',
      en: 'Learning notes'
    },
    date: '2026-04-25',
    category: 'frontend',
    readTime: 10,
    tags: {
      zh: ['docsify', '前端', '个人笔记'],
      en: ['docsify', 'Frontend', 'Personal Notes']
    }
  },
];

interface ArticleListProps {
  searchQuery: string;
}

export default function ArticleList({ searchQuery }: ArticleListProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { t, language } = useLanguage();

  // 过滤内容：只按搜索词过滤
  const filteredItems = contentItems.filter(item => {
    const matchesSearch = !searchQuery ||
      item.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section id="articles" className="py-16 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className={`text-3xl font-bold mb-12 text-center ${titleVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            {searchQuery ? t('searchResults', searchQuery) : '精选内容'}
          </h2>

          {/* 搜索结果为空提示 */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20 animate-fade-up">
              <p className="text-xl text-gray-500 dark:text-gray-400">{t('noArticles')}</p>
            </div>
          )}

          {/* 内容卡片 */}
          <div className="space-y-8">
            {filteredItems.map((item, index) => (
              <ContentCard
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 标签颜色映射
const tagColors = {
  'React': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'TypeScript': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Tailwind CSS': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'Vite': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  '前端': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'CSS': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  '新特性': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  '类型系统': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  '博客': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'Frontend': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'New Features': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'Type System': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  'Blog': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    '大模型': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'LLM': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  'GPT': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  'AI': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  '机器学习': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300'
};

function ContentCard({ item, index }: { item: ContentItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const { t, language } = useLanguage();

  const delayClasses = [
    '',
    'animate-fade-up-delay-100',
    'animate-fade-up-delay-200',
    'animate-fade-up-delay-300',
    'animate-fade-up-delay-400',
    'animate-fade-up-delay-500'
  ];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`p-6 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${isVisible ? `animate-fade-up ${delayClasses[index % 6]}` : 'opacity-0'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold">
          {item.title[language]}
        </h3>
        <div className="flex gap-2">
          {/* 第一个路径图标 */}
          {item.path && (
            <a
              href={item.path}
              target={item.path.startsWith('http') ? '_blank' : undefined}
              rel={item.path.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              {item.path.includes('github.com') ? (
                <Github className="w-5 h-5" />
              ) : item.path.startsWith('http') ? (
                <ExternalLink className="w-5 h-5" />
              ) : null}
            </a>
          )}
          {/* 第二个路径图标 */}
          {item.path2 && (
            <a
              href={item.path2}
              target={item.path2.startsWith('http') ? '_blank' : undefined}
              rel={item.path2.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              {item.path2.includes('github.com') ? (
                <Github className="w-5 h-5" />
              ) : item.path2.startsWith('http') ? (
                <ExternalLink className="w-5 h-5" />
              ) : null}
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {item.summary[language]}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.tags[language].map((tag, tagIndex) => (
          <span 
            key={tagIndex} 
            className={`px-3 py-1 text-sm rounded-full ${tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-700 dark:bg-dark-card dark:text-gray-400'}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
