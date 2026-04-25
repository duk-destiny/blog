import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { useLanguage } from '@/hooks/useLanguage';

interface ContributionData {
  date: string;
  count: number;
  level: number;
}

function getGitHubUsername(repo: string): string {
  const match = repo.match(/^([^\/]+)\/[^\/]+$/);
  return match ? match[1] : '';
}

export default function GitHubContributions() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [contributionData, setContributionData] = useState<ContributionData[]>([]);
  const username = getGitHubUsername(siteConfig.comments.repo);
  const { t } = useLanguage();

  useEffect(() => {
    if (!username) return;

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then(res => res.json())
      .then(json => {
        if (json.contributions) {
          const today = new Date();
          const oneYearAgo = new Date(today);
          oneYearAgo.setFullYear(today.getFullYear() - 1);

          const recentData = json.contributions
            .filter((item: any) => {
              const date = new Date(item.date);
              return date >= oneYearAgo && date <= today;
            })
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

          setContributionData(recentData);
        }
      })
      .catch(err => console.error('Failed to fetch contributions:', err));
  }, [username]);

  useEffect(() => {
    if (!canvasRef.current || contributionData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = 12;
    const cellGap = 3;
    const weeks = 52;
    const days = 7;

    canvas.width = weeks * (cellSize + cellGap) + 50;
    canvas.height = days * (cellSize + cellGap) + 30;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = {
      empty: '#ebedf0',
      level1: '#9be9a8',
      level2: '#40c463',
      level3: '#30a14e',
      level4: '#216e39'
    };

    const levelColors = [colors.empty, colors.level1, colors.level2, colors.level3, colors.level4];

    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#768390';

    const dayLabels = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];
    dayLabels.forEach((label, i) => {
      if (label) {
        ctx.fillText(label, 0, 20 + i * (cellSize + cellGap) + cellSize - 2);
      }
    });

    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() - (today.getDay()));

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (weeks * 7) + 7);

    const dataMap = new Map();
    contributionData.forEach(item => {
      dataMap.set(item.date, item);
    });

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let lastMonth = -1;

    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < days; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + (week * 7) + day);

        const dateStr = currentDate.toISOString().split('T')[0];
        const data = dataMap.get(dateStr);

        const x = 35 + week * (cellSize + cellGap);
        const y = 20 + day * (cellSize + cellGap);

        if (data) {
          ctx.fillStyle = levelColors[data.level] || colors.empty;
        } else {
          ctx.fillStyle = colors.empty;
        }

        ctx.beginPath();
        ctx.roundRect(x, y, cellSize, cellSize, 2);
        ctx.fill();

        if (day === 0 && week > 0) {
          const month = currentDate.getMonth();
          if (month !== lastMonth) {
            ctx.fillStyle = '#768390';
            ctx.fillText(monthLabels[month], x, 12);
            lastMonth = month;
          }
        }
      }
    }
  }, [contributionData]);

  if (!username) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          {t('configureRepo')}
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('githubContributions')}</h2>
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          <canvas ref={canvasRef} className="mx-auto" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#ebedf0' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#9be9a8' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#40c463' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#30a14e' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#216e39' }} />
        </div>
        <span>More</span>
      </div>
      <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        {t('viewMore')}：<a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{username}</a>
      </p>
    </div>
  );
}
