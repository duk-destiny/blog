import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

interface GitHubCommentsProps {
  path: string;
  title: string;
}

export default function GitHubComments({ path, title }: GitHubCommentsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const commentsRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    if (!commentsRef.current || scriptLoadedRef.current) return;

    const container = commentsRef.current;

    // 加载 utterances 脚本
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', siteConfig.comments.repo);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', theme === 'dark' ? 'photon-dark' : 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
      scriptLoadedRef.current = true;
    };

    script.onerror = (error) => {
      console.warn('Error loading utterances script:', error);
    };

    try {
      container.appendChild(script);
    } catch (e) {
      console.warn('Error appending script:', e);
    }

    // 清理函数
    return () => {
      // 不清理脚本，让它保持在页面中
      // 这样可以避免重复加载和 DOM 操作错误
    };
  }, [theme]); // 只在主题变化时重新渲染

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">{t('commentsTitle')}</h2>
      <div ref={commentsRef} className="comments-container min-h-[200px]">
        {!isLoaded && (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500 dark:text-gray-400">加载评论中...</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {t('loginToComment')}
      </p>
    </div>
  );
}
