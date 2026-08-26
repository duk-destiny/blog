import { useLanguage } from '@/hooks/useLanguage';
import { siteConfig } from '@/config/siteConfig';
import ScrambleText from './ScrambleText';
import Tilt from './Tilt';
import { Github, Mail, FileText, ChevronDown, Mouse, Code2, BookOpen, Calendar, Sparkles } from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();

  const stats = [
    { value: '9+', label: t('projects'), icon: Code2 },
    { value: '10+', label: t('notes'), icon: BookOpen },
    { value: '2026', label: t('started'), icon: Calendar },
    { value: '∞', label: t('learning'), icon: Sparkles },
  ];

  const socials = [
    { href: siteConfig.socialLinks.github, label: 'GitHub', icon: Github },
    { href: siteConfig.socialLinks.email, label: 'Email', icon: Mail },
    { href: siteConfig.socialLinks.csdn, label: 'CSDN', icon: BookOpen },
    ...(siteConfig.socialLinks.resume
      ? [{ href: siteConfig.socialLinks.resume, label: t('viewResume'), icon: FileText }]
      : []),
  ];

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* 姓名：鼠标 3D 倾斜跟随 + 字符解码 + 模糊聚焦入场 */}
          <Tilt max={14} scale={1.04} className="inline-block">
            <h1 className="font-serif text-4xl md:text-6xl font-extrabold tracking-tight mb-3 text-gray-900 dark:text-gray-100">
              <ScrambleText
                key={siteConfig.user.name[language]}
                text={siteConfig.user.name[language]}
                as="span"
                blur
                delay={150}
                duration={1100}
              />
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-6">
              <ScrambleText
                text={siteConfig.user.enName}
                as="span"
                scramble={false}
                blur
                delay={450}
              />
            </p>
          </Tilt>

          {/* 统计信息 + 鼠标 3D 倾斜跟随 + 错位出场 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10 stagger-fade">
            {stats.map((stat) => (
              <Tilt
                key={stat.label}
                max={10}
                scale={1.04}
                className="group p-4 rounded-xl bg-white/60 dark:bg-dark-card/60 border border-blue-900/10 dark:border-blue-100/10 hover:border-primary/50"
              >
                <div className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <stat.icon className="w-3.5 h-3.5 text-primary/80" />
                  <span>{stat.label}</span>
                </div>
              </Tilt>
            ))}
          </div>

          {/* 社交图标链接 + 鼠标 3D 倾斜跟随 + 错位出场 */}
          <div className="flex justify-center gap-3 mb-16 stagger-fade">
            {socials.map((s) => (
              <Tilt key={s.label} max={12} scale={1.06} className="inline-block">
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-900/15 dark:border-blue-100/15 text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary dark:hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                  <span className="text-sm">{s.label}</span>
                </a>
              </Tilt>
            ))}
          </div>

          {/* 滚动提示 */}
          <a
            href="#projects"
            className="inline-flex flex-col items-center text-gray-400 hover:text-primary transition-colors animate-bounce mt-[13rem]"
            aria-label={t('scroll')}
          >
            <span className="text-base mb-1">{t('scroll')}</span>
            <Mouse className="w-7 h-7 mb-1" />
            <ChevronDown className="w-7 h-7" />
          </a>
        </div>
      </div>
    </section>
  );
}
