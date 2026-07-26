import { useEffect, useRef, useState } from 'react';

// 解码过程中闪现的随机字符集（符号 + 片假名，营造科技/赛博质感）
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$%&アイウエオカキクケコサシスセソタチツテトナニヌネノ';

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** 解码总时长（ms） */
  duration?: number;
  /** 启动延迟（ms） */
  delay?: number;
  /** 是否进行“字符解码”（逐字乱码落定）；关闭则仅做模糊聚焦 */
  scramble?: boolean;
  /** 是否叠加“模糊聚焦”入场（整体从模糊放大收拢） */
  blur?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export default function ScrambleText({
  text,
  className = '',
  duration = 1100,
  delay = 0,
  scramble = true,
  blur = true,
  as = 'span',
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<number>(0);
  const thresholdsRef = useRef<number[]>([]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 关闭解码 或 用户偏好减少动效：直接显示原文
    if (!scramble || reduceMotion) {
      setDisplay(text);
      return;
    }

    const total = text.length;
    if (total === 0) return;

    // 为每个字符计算“落定”时间点：从左到右的波浪式解码，带轻微随机抖动
    thresholdsRef.current = text.split('').map((ch, i) => {
      if (ch === ' ') return -1; // 空格直接落定
      const base = (i + 0.5) / total;
      const jitter = (Math.random() - 0.5) * 0.18;
      return Math.min(1, Math.max(0, base + jitter));
    });

    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      let out = '';
      for (let i = 0; i < total; i++) {
        const ch = text[i];
        if (ch === ' ') {
          out += ' ';
          continue;
        }
        if (progress >= thresholdsRef.current[i]) {
          out += ch;
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setDisplay(out);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    timerRef.current = window.setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, [text, duration, delay, scramble]);

  const Tag = as as any;
  return (
    <Tag
      className={`${blur ? 'scramble-blur' : ''} ${className}`.trim()}
      style={blur ? { animationDelay: `${delay}ms` } : undefined}
      aria-label={text}
    >
      {display}
    </Tag>
  );
}
