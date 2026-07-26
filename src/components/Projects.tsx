import { contentItems, ContentItem } from '@/components/ArticleList';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

function linkIcon(url: string) {
  if (url.includes('github.com')) return <Github className="w-4 h-4" />;
  return <ExternalLink className="w-4 h-4" />;
}

function ProjectCard({ item }: { item: ContentItem }) {
  const { language, t } = useLanguage();
  const title = item.title[language];
  const summary = item.summary[language];
  const tags = item.tags[language];

  const links = [item.path, item.path2].filter(Boolean) as string[];

  return (
    <div className="group relative overflow-hidden p-6 rounded-2xl bg-white/70 dark:bg-dark-card/70 border border-blue-900/10 dark:border-blue-100/10 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      {/* 顶部渐变条（hover 显现，冷色） */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex items-center gap-2 shrink-0">
          {links.map((url) => (
            <a
              key={url}
              href={url}
              target={url.startsWith('http') ? '_blank' : undefined}
              rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-blue-100/60 dark:hover:bg-white/5 transition-colors"
              aria-label={`${title} ${t('link')}`}
            >
              {linkIcon(url)}
            </a>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">{summary}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary/90 dark:bg-primary/15 dark:text-primary/90"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.path && (
        <a
          href={item.path}
          target={item.path.startsWith('http') ? '_blank' : undefined}
          rel={item.path.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {t('visit')} <ArrowRight className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-2">{t('featuredProjects')}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t('featuredProjectsDesc')}</p>
          </div>

          <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`grid gap-6 md:grid-cols-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {contentItems
              .filter((item) => item.type === 'project')
              .map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
