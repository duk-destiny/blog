import { useState, createContext, useContext } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ArticleList from '@/components/ArticleList';
import GitHubContributions from '@/components/GitHubContributions';

// 创建搜索上下文
const SearchContext = createContext({
  searchQuery: '',
  setSearchQuery: (query: string) => { }
});

// 搜索上下文钩子
export function useSearch() {
  return useContext(SearchContext);
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 滚动到文章列表
    setTimeout(() => {
      const articleSection = document.getElementById('articles');
      if (articleSection) {
        articleSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <Layout>
        <Hero />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <GitHubContributions />
            </div>
          </div>
        </section>
        <ArticleList searchQuery={searchQuery} />
      </Layout>
    </SearchContext.Provider>
  );
}
