import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Layout from '@/components/Layout';
import { contentItems, ContentItem } from '@/components/ArticleList';
import ReactMarkdown from 'react-markdown';

/* ========== 工具函数 ========== */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** 从 Markdown 正文中提取 # / ## / ### 标题作为 TOC */
function extractToc(md: string): TocItem[] {
  const headingRe = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let m: RegExpExecArray | null;
  while ((m = headingRe.exec(md)) !== null) {
    const level = m[1].length;
    const text = m[2].trim();
    items.push({ id: slugify(text), text, level });
  }
  return items;
}

/* ========== Markdown 渲染 + 自动标题 ID ========== */

function MarkdownBody({ text }: { text: string }) {
  if (!text || typeof text !== 'string') {
    return <p className="text-gray-500">暂无正文内容</p>;
  }

  return (
    <div className="markdown-body">
      <ReactMarkdown
        components={{
          h1: ({ children, ...props }) => {
            const id = slugify(String(children));
            return <h1 id={id} {...props}>{children}</h1>;
          },
          h2: ({ children, ...props }) => {
            const id = slugify(String(children));
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }) => {
            const id = slugify(String(children));
            return <h3 id={id} {...props}>{children}</h3>;
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

/* ========== 侧边目录 ========== */

function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break; // 取第一个可见的
          }
        }
      },
      { rootMargin: '-60px 0px -70% 0px', threshold: 0 }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="toc-sidebar text-sm">
      <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">目录</h4>
      <ul className="space-y-1.5 border-l-2 border-gray-200 dark:border-gray-700">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: (item.level - 1) * 12 + 8 }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block py-0.5 transition-colors hover:text-primary ${
                activeId === item.id
                  ? 'text-primary font-medium border-l-2 -ml-[2px] border-primary pl-[calc(var(--pl)-1px)]'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ========== 文章页主体 ========== */

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [article, setArticle] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundArticle = contentItems.find((a) => a.id === parseInt(id));
      setArticle(foundArticle || null);
      setLoading(false);
    }
  }, [id]);

  // 根据语言抽取目录
  const tocItems = useMemo(() => {
    if (!article?.body) return [];
    const md = article.body[language] || article.body.zh || '';
    return extractToc(md);
  }, [article, language]);

  // ---- 加载态 ----
  if (loading) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4 text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">{t('loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // ---- 找不到文章 ----
  if (!article) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4 text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">{t('articleNotFound')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex gap-10">
            {/* ====== 正文区 ====== */}
            <article className="flex-1 min-w-0 max-w-3xl">
              <h1
                ref={ref as React.RefObject<HTMLHeadingElement>}
                className={`text-4xl font-bold mb-4 ${isVisible ? 'animate-fade-up' : ''}`}
              >
                {article.title[language]}
              </h1>

              <div
                className={`flex flex-wrap gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400 ${
                  isVisible ? 'animate-fade-up animate-fade-up-delay-100' : ''
                }`}
              >
                <span>{article.date}</span>
                <span>•</span>
                <span>
                  {article.readTime} {t('readTime')}
                </span>
                <span>•</span>
                <span>{t(article.category as any)}</span>
              </div>

              <div className={isVisible ? 'animate-fade-up animate-fade-up-delay-200' : ''}>
                {/* 摘要 */}
                <section className="mb-8">
                  <h2 className="text-lg font-semibold mb-2">{t('summary')}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{article.summary[language]}</p>
                </section>

                {/* 正文 Markdown */}
                <section className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">{t('content')}</h2>
                  {article.body ? (
                    <MarkdownBody
                      text={article.body[language] || article.body.zh || ''}
                    />
                  ) : (
                    <>
                      <p>{t('articleContentPlaceholder')}</p>
                      <p>{t('articleContentPlaceholder2')}</p>
                      <p>{t('articleContentPlaceholder3')}</p>
                    </>
                  )}
                </section>

                {/* 标签 */}
                <section className="mb-8">
                  <h2 className="text-lg font-semibold mb-2">{t('tags')}</h2>
                  <div className="flex flex-wrap gap-2">
                    {article.tags[language].map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </article>

            {/* ====== 侧边目录 ====== */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
