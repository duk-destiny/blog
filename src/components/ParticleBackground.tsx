import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

// 冷色系粒子：蓝 / 靛 / 青 / 天蓝
const PALETTE = ['#3b82f6', '#6366f1', '#22d3ee', '#0ea5e9'];

/**
 * 动态粒子背景（手写 canvas，冷色调）
 * - 粒子缓慢漂浮并连线成「星座网」
 * - 冷色（蓝/靛/青），呼应清爽冷调
 * - 鼠标靠近时粒子轻微排斥
 * - 跟随亮/暗主题，尊重 prefers-reduced-motion
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isDark = document.documentElement.classList.contains('dark');

    const darkObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.2 + 2.0,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }));
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = 190;
      const baseAlpha = isDark ? 0.6 : 0.42;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 160 && dm > 0) {
          const force = ((160 - dm) / 160) * 0.8;
          p.vx += (dxm / dm) * force * 0.05;
          p.vy += (dym / dm) * force * 0.05;
        }

        p.vx = Math.max(-1.2, Math.min(1.2, p.vx));
        p.vy = Math.max(-1.2, Math.min(1.2, p.vy));

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // 外层柔光
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = baseAlpha * 0.12;
        ctx.fill();

        // 实心粒子
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = baseAlpha;
        ctx.fill();

        // 邻近连线
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = baseAlpha * (1 - d / linkDist) * 0.55;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    if (prefersReduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      darkObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
      {/* 冷色渐变底色 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/40 dark:from-blue-950/25 dark:via-transparent dark:to-cyan-950/15" />
      {/* 纸张纹理（中性，冷暖皆宜） */}
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen" />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      {/* 细腻网格 + 中心渐隐（冷色描边） */}
      <div className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30 bg-[radial-gradient(transparent_1px,rgba(30,58,138,0.05)_1px)] dark:bg-[radial-gradient(transparent_1px,rgba(186,230,253,0.04)_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
    </div>
  );
}
