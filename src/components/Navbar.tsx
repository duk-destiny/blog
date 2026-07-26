import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Moon, Sun, Github, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/siteConfig';

type NavItem = (typeof siteConfig.navigation)[number];

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme();
  const { t, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const isParentActive = (item: NavItem) =>
    'children' in item && item.children ? item.children.some((c) => isActive(c.href)) : false;

  const baseItem = 'px-4 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap';
  const activeItem = 'bg-primary/10 text-primary font-medium';
  const idleItem =
    'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-blue-100/50 dark:hover:bg-white/5';

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-2 py-1.5">
      {/* 桌面端导航 */}
      <div className="hidden md:flex items-center gap-1">
        {siteConfig.navigation.map((item) => {
          if ('children' in item && item.children) {
            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`${baseItem} ${isParentActive(item) ? activeItem : idleItem} flex items-center gap-1`}
                >
                  {t(item.label as any)}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 pt-1.5 z-10">
                    <div className="w-36 rounded-xl bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md border border-slate-900/10 dark:border-blue-100/10 shadow-lg overflow-hidden py-1">
                      {item.children.map((child) => (
                        <RouterLink
                          key={child.key}
                          to={child.href}
                          onClick={() => setDropdownOpen(false)}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(child.href)
                              ? 'text-primary font-medium bg-primary/5'
                              : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-blue-100/50 dark:hover:bg-white/5'
                          }`}
                        >
                          {t(child.label as any)}
                        </RouterLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }
          return (
            <RouterLink
              key={item.key}
              to={(item as any).href}
              className={`${baseItem} ${isActive((item as any).href) ? activeItem : idleItem}`}
            >
              {t(item.label as any)}
            </RouterLink>
          );
        })}
      </div>

      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-100/50 dark:hover:bg-white/5 transition-colors"
        aria-label={menuOpen ? t('closeMenu') : t('menu')}
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="hidden md:block w-px h-5 bg-slate-300/60 dark:bg-slate-600/60 mx-1" />

      {/* 右侧三个图标 */}
      <div className="flex items-center gap-0.5">
        <a
          href={siteConfig.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-blue-100/50 dark:hover:bg-white/5 transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-blue-100/50 dark:hover:bg-white/5 transition-colors"
          aria-label={t('toggleLanguage')}
        >
          <Globe className="w-5 h-5" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-blue-100/50 dark:hover:bg-white/5 transition-colors"
          aria-label={t('toggleTheme')}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* 移动端下拉 */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 w-56 rounded-2xl bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border border-slate-900/10 dark:border-blue-100/10 shadow-lg overflow-hidden">
          <div className="flex flex-col p-2">
            {siteConfig.navigation.map((item) => {
              if ('children' in item && item.children) {
                return (
                  <div key={item.key}>
                    <button
                      onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                      className={`w-full px-3 py-2.5 text-sm rounded-md transition-colors flex items-center justify-between ${
                        isParentActive(item)
                          ? 'text-primary font-medium bg-primary/10'
                          : 'text-gray-700 dark:text-gray-200 hover:text-primary'
                      }`}
                    >
                      {t(item.label as any)}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileBlogOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileBlogOpen && (
                      <div className="ml-3 border-l-2 border-primary/20 pl-3 mt-1 mb-1 space-y-0.5">
                        {item.children.map((child) => (
                          <RouterLink
                            key={child.key}
                            to={child.href}
                            onClick={() => setMenuOpen(false)}
                            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive(child.href)
                                ? 'text-primary font-medium bg-primary/5'
                                : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                            }`}
                          >
                            {t(child.label as any)}
                          </RouterLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <RouterLink
                  key={item.key}
                  to={(item as any).href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm rounded-md transition-colors ${
                    isActive((item as any).href)
                      ? 'text-primary font-medium bg-primary/10'
                      : 'text-gray-700 dark:text-gray-200 hover:text-primary'
                  }`}
                >
                  {t(item.label as any)}
                </RouterLink>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
