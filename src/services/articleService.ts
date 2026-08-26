import { contentItems } from '@/components/ArticleList';
import { ContentItem } from '@/components/ArticleList';

// 按年份和月份归档
export function getArticlesByArchive() {
  const archive: { [key: string]: { [key: string]: ContentItem[] } } = {};

  contentItems.forEach(item => {
    const [year, monthRaw] = item.date.split('-');
    const month = (monthRaw ?? '').padStart(2, '0');
    const yearKey = year;
    const monthKey = `${year}-${month}`;

    if (!archive[yearKey]) {
      archive[yearKey] = {};
    }

    if (!archive[yearKey][monthKey]) {
      archive[yearKey][monthKey] = [];
    }

    archive[yearKey][monthKey].push(item);
  });

  // 按年份和月份降序排序
  const sortedArchive = Object.entries(archive)
    .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
    .reduce((acc, [year, months]) => {
      acc[year] = Object.entries(months)
        .sort(([monthA], [monthB]) => monthB.localeCompare(monthA))
        .reduce((monthAcc, [month, items]) => {
          // 同一月份内按日期降序（最新在前）
          monthAcc[month] = [...items].sort((a, b) => b.date.localeCompare(a.date));
          return monthAcc;
        }, {} as { [key: string]: ContentItem[] });
      return acc;
    }, {} as { [key: string]: { [key: string]: ContentItem[] } });

  return sortedArchive;
}

// 内容主跳转链接：有部署链接用部署链接，否则用仓库链接，都没有则用 path（如博客内部页）
export function getItemPrimaryLink(item: ContentItem): string {
  const candidates = [item.path, item.path2].filter(Boolean) as string[];
  const deploy = candidates.find((u) => u.startsWith('http') && !u.includes('github.com'));
  if (deploy) return deploy;
  const repo = candidates.find((u) => u.startsWith('http') && u.includes('github.com'));
  if (repo) return repo;
  return item.path;
}

// 获取所有分类
export function getCategories() {
  const categories = new Set<string>();
  contentItems.forEach(item => categories.add(item.category));
  return Array.from(categories).sort();
}

// 按分类获取内容
export function getArticlesByCategory(category: string) {
  return contentItems.filter(item => item.category === category);
}

// 获取所有标签（按语言分类）
export function getTags(language: 'zh' | 'en' = 'zh') {
  const tags = new Set<string>();
  contentItems.forEach(item => {
    item.tags[language].forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// 获取所有标签（包含所有语言）
export function getAllTags() {
  const tags = new Set<string>();
  contentItems.forEach(item => {
    item.tags.zh.forEach(tag => tags.add(tag));
    item.tags.en.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// 按标签获取内容
export function getArticlesByTag(tag: string, language: 'zh' | 'en') {
  return contentItems.filter(item => item.tags[language].includes(tag));
}

// 统计每个标签的内容数量
export function getTagCounts(language: 'zh' | 'en' = 'zh') {
  const tagCounts: { [key: string]: number } = {};
  
  contentItems.forEach(item => {
    item.tags[language].forEach(tag => {
      if (tagCounts[tag]) {
        tagCounts[tag]++;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });
  
  return tagCounts;
}
