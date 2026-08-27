import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { useLanguage } from '@/hooks/useLanguage';

interface SubmissionDay {
  date: string;
  count: number;
}

// LeetCode 提交次数 -> 热力图等级（0-4，与 GitHub 贡献图一致的色阶）
function toLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

export default function LeetCodeContributions() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [submissions, setSubmissions] = useState<SubmissionDay[]>([]);
  const [stats, setStats] = useState<{
    totalSub: number;
    activeDays: number;
    last7Sub: number;
  } | null>(null);
  const username = siteConfig.socialLinks.leetcode;
  const { t } = useLanguage();

  useEffect(() => {
    if (!username) return;

    // 本地开发走 vite proxy，线上走 vercel.json rewrite（均为同源，避免 CORS）
    fetch('/api/leetcode-submissions')
      .then(res => res.json())
      .then(text => {
        // leetcode.cn 返回的是 JSON 字符串（双重编码），做一次兜底解析
        const cal = typeof text === 'string' ? JSON.parse(text) : text;
        if (!cal || typeof cal !== 'object') return;
        const entries = Object.entries(cal) as [string, number][];

        const days: SubmissionDay[] = entries.map(([ts, count]) => {
          const date = new Date(Number(ts) * 1000);
          return {
            date: date.toISOString().split('T')[0],
            count: Number(count) || 0,
          };
        });
        setSubmissions(days);

        const now = Math.floor(Date.now() / 1000);
        const weekAgo = now - 7 * 24 * 3600;
        setStats({
          totalSub: entries.reduce((s, [, c]) => s + (Number(c) || 0), 0),
          activeDays: entries.length,
          last7Sub: entries
            .filter(([ts]) => Number(ts) >= weekAgo)
            .reduce((s, [, c]) => s + (Number(c) || 0), 0),
        });
      })
      .catch(err => console.error('Failed to fetch LeetCode data:', err));
  }, [username]);

  useEffect(() => {
    if (!canvasRef.current || submissions.length === 0) return;

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
      level4: '#216e39',
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
    endDate.setDate(endDate.getDate() - today.getDay());

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (weeks * 7) + 7);

    const dataMap = new Map<string, number>();
    submissions.forEach(item => {
      dataMap.set(item.date, item.count);
    });

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let lastMonth = -1;

    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < days; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + (week * 7) + day);

        const dateStr = currentDate.toISOString().split('T')[0];
        const count = dataMap.get(dateStr) || 0;

        const x = 35 + week * (cellSize + cellGap);
        const y = 20 + day * (cellSize + cellGap);

        ctx.fillStyle = levelColors[toLevel(count)] || colors.empty;

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
  }, [submissions]);

  if (!username) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          {t('configureLeetcode')}
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{t('leetcodeContributions')}</h2>
      {stats && (
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span>
            {t('totalSubmissions')} <b className="text-primary">{stats.totalSub}</b>
          </span>
          <span>
            {t('activeDays')} <b className="text-primary">{stats.activeDays}</b>
          </span>
          <span>
            {t('last7Days')} <b className="text-primary">{stats.last7Sub}</b>
          </span>
        </div>
      )}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          <canvas ref={canvasRef} data-testid="leetcode-canvas" className="mx-auto" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
        <span>{t('less')}</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#ebedf0' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#9be9a8' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#40c463' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#30a14e' }} />
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#216e39' }} />
        </div>
        <span>{t('more')}</span>
      </div>
      <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        {t('viewMore')}：<a href={`https://leetcode.cn/u/${username}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{username}</a>
      </p>
    </div>
  );
}
