import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Moon, Sun, Search, Github, Home, FileText, Folder, Tag, Link, Globe, User, MessageSquare } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/siteConfig';
import { useSearch } from '@/pages/Home';

interface SidebarProps {
  onSearch?: (query: string) => void;
}

// 图标映射
const IconMap: Record<string, React.ElementType> = {
  Home,
  FileText,
  Folder,
  Tag,
  Link,
  User,
  MessageSquare
};

export default function Sidebar({ onSearch }: SidebarProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { setSearchQuery } = useSearch();
  const [searchQuery, setLocalSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchQuery);
  };

  // 检测屏幕尺寸，在移动端自动隐藏侧边栏
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-dark-card shadow-lg lg:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* 侧边栏 */}
      <aside
        className={`fixed top-0 left-0 h-screen w-80 bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-bg transition-all duration-300 z-40 border-r border-gray-200 dark:border-gray-700 overflow-hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="h-full overflow-y-auto py-12 px-8">
          {/* 用户信息区域 */}
          <div className="mb-10 text-center">
            {/* 头像 */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-lg opacity-30"></div>
              <img
                src={siteConfig.user.avatar}
                alt="头像"
                className="relative w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
              />
            </div>

            {/* 用户名 */}
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              {siteConfig.user.name[language]}
            </h1>

            {/* 描述 */}
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {siteConfig.user.description1[language]}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {siteConfig.user.description2[language]}
            </p>
          </div>

          {/* 搜索框 */}
          <div className="mb-10">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-card border border-transparent focus:border-primary focus:bg-white dark:focus:bg-dark-card transition-all duration-300 outline-none"
              />
            </form>
          </div>

          {/* 导航链接 */}
          <nav className="mb-10">
            <ul className="space-y-2">
              {siteConfig.navigation.map((item, index) => {
                const IconComponent = IconMap[item.icon] || Home;
                return (
                  <li key={item.key} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <RouterLink
                      to={item.href}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-300 group"
                      onClick={() => {
                        // 只在移动端点击时关闭侧边栏
                        if (window.innerWidth < 1024) {
                          setIsSidebarOpen(false);
                        }
                      }}
                    >
                      <IconComponent className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-lg font-medium">{t(item.label)}</span>
                    </RouterLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 底部操作区 */}
          <div className="flex items-center justify-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
            {/* GitHub链接 */}
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-300 group"
            >
              <Github className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            </a>

            {/* 语言切换按钮 */}
            <button
              onClick={toggleLanguage}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-300 group"
              aria-label="切换语言"
            >
              <Globe className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary group-hover:rotate-180 transition-all duration-500" />
            </button>

            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-300 group"
              aria-label="切换主题"
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary group-hover:rotate-180 transition-all duration-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-primary group-hover:rotate-180 transition-all duration-500" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* 遮罩层（移动端） */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
