import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** 最大倾斜角度（度） */
  max?: number;
  /** 悬停时的放大系数 */
  scale?: number;
  /** 透视距离（px），越小立体感越强 */
  perspective?: number;
};

export default function Tilt({
  children,
  className = '',
  max = 12,
  scale = 1.04,
  perspective = 800,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const reset = () => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
    });
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1，左→右
    const py = (e.clientY - rect.top) / rect.height; // 0..1，上→下
    const rotateY = (px - 0.5) * 2 * max; // 左右倾斜
    const rotateX = (0.5 - py) * 2 * max; // 上下倾斜（鼠标上移则顶部后仰）
    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
    });
  };

  // 尊重“减少动效”偏好：仅做静止包裹，不绑定鼠标跟随
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={ref}
      onMouseMove={reduceMotion ? undefined : handleMove}
      onMouseLeave={reduceMotion ? undefined : reset}
      className={className}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        transition:
          'transform 0.15s ease-out, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
