import { useEffect, useMemo, useRef, useState } from 'react';
import type { ContentItem } from '@/components/ArticleList';
import { getItemPrimaryLink } from '@/services/articleService';

const STEP = 320;        // 相邻节点水平间距
const CARD_W = 264;      // 卡片宽度
const CARD_H = 112;      // 卡片高度
const GAP = 26;          // 卡片与河流之间的间距
const VIEW_H = 560;      // 河流视图高度
const RIVER_Y = 292;     // 河流中心线 y 坐标
const WAVE = 52;         // 河流波动幅度
const MIN_WIDTH = 1280;  // 最小画布宽度（保证可拖拽）

interface ArchiveRiverProps {
  articles: ContentItem[];
  language: 'zh' | 'en';
}

export default function ArchiveRiver({ articles, language }: ArchiveRiverProps) {
  const [drawn, setDrawn] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, lastX: 0, lastTime: 0, vel: 0, moved: false });
  const rafRef = useRef<number | null>(null);

  // 挂载后触发河流绘制与节点出现动画
  useEffect(() => {
    const r1 = requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
    return () => {
      cancelAnimationFrame(r1);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const total = articles.length;

  const nodes = useMemo(() => {
    const width = Math.max(total * STEP, MIN_WIDTH);
    const start = 160;          // 预留卡片半宽 + 间距，避免左侧被截断
    const end = width - 160;    // 同理预留右侧
    return articles.map((item, i) => {
      const x = total === 1 ? width / 2 : start + (i * (end - start)) / Math.max(total - 1, 1);
      const y = RIVER_Y + Math.sin(i * 1.15) * WAVE;
      const side = i % 2 === 0 ? 'top' : 'bottom';
      return { item, x, y, side, i, width };
    });
  }, [articles, total]);

  const totalWidth = nodes.length ? nodes[0].width : MIN_WIDTH;

  // 经过所有节点锚点的平滑河流曲线
  const pathD = useMemo(() => {
    if (!nodes.length) return '';
    const pts = nodes.map((n) => ({ x: n.x, y: n.y }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1];
      const c = pts[i];
      const mx = (p.x + c.x) / 2;
      d += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`;
    }
    return d;
  }, [nodes]);

  const stopInertia = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopInertia();
    dragState.current = {
      active: true,
      startX: e.clientX,
      lastX: e.clientX,
      lastTime: performance.now(),
      vel: 0,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    if (!s.active) return;
    const dx = e.clientX - s.lastX;
    if (Math.abs(e.clientX - s.startX) > 6) s.moved = true;
    s.lastX = e.clientX;
    const now = performance.now();
    const dt = Math.max(now - s.lastTime, 1);
    s.lastTime = now;
    s.vel = (dx / dt) * 16.7; // 归一化到 60fps 每帧位移
    if (scrollerRef.current) scrollerRef.current.scrollLeft -= dx;
  };

  const endDrag = () => {
    const s = dragState.current;
    s.active = false;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const animate = () => {
      if (Math.abs(s.vel) < 0.5) return;
      scroller.scrollLeft -= s.vel;
      s.vel *= 0.94;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  // 拖拽结束后抑制误触发的卡片点击跳转
  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };

  return (
    <div
      ref={scrollerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
      data-testid="archive-river-scroller"
      className="archive-river-scroller overflow-x-auto overflow-y-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ height: VIEW_H }}
    >
      <div className="relative" style={{ width: totalWidth, height: VIEW_H }}>
        {/* 河流 SVG：宽底 + 亮线双层，stroke-dashoffset 从无到有画出 */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={totalWidth}
          height={VIEW_H}
          viewBox={`0 0 ${totalWidth} ${VIEW_H}`}
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={drawn ? 0 : 1}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary/25 dark:stroke-primary/20 transition-[stroke-dashoffset] duration-[1800ms] ease-in-out"
          />
          <path
            d={pathD}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={drawn ? 0 : 1}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary transition-[stroke-dashoffset] duration-[1800ms] ease-in-out"
          />
          {/* 节点圆点 */}
          {nodes.map((n) => (
            <circle
              key={n.item.id}
              cx={n.x}
              cy={n.y}
              r={5}
              className="fill-primary"
              style={{ opacity: drawn ? 1 : 0, transition: 'opacity .4s ease', transitionDelay: `${n.i * 90}ms` }}
            />
          ))}
        </svg>

        {/* 博客卡片：左右交替分布在河流两侧 */}
        {nodes.map((n) => {
          const centerX = n.x - CARD_W / 2;
          const centerY =
            n.side === 'top'
              ? n.y - 12 - CARD_H / 2 - GAP
              : n.y + 12 + CARD_H / 2 + GAP;
          return (
            <div
              key={n.item.id}
              className="absolute"
              style={{
                left: centerX,
                top: centerY - CARD_H / 2,
                width: CARD_W,
                height: CARD_H,
                opacity: drawn ? 1 : 0,
                transform: drawn ? 'translateY(0)' : `translateY(${n.side === 'top' ? -18 : 18}px)`,
                transition: 'opacity .5s ease, transform .5s ease',
                transitionDelay: `${n.i * 90}ms`,
              }}
            >
              <a
                href={getItemPrimaryLink(n.item)}
                target={getItemPrimaryLink(n.item).startsWith('http') ? '_blank' : undefined}
                rel={getItemPrimaryLink(n.item).startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block w-full h-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-card shadow-sm hover:shadow-lg hover:border-primary/60 dark:hover:border-primary/60 transition-all"
              >
                <div className="text-xs font-medium text-primary mb-1.5">{n.item.date}</div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {n.item.title[language]}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(n.item.tags[language] || []).slice(0, 2).map((tag, ti) => (
                    <span key={ti} className="px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
