import { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { resumeData, resumeVersionKeys } from '@/data/resume';
import { siteConfig } from '@/config/siteConfig';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Resume() {
  const { t, language } = useLanguage();
  const [selectedVersion, setSelectedVersion] = useState<string>(resumeVersionKeys[0]);
  const data = resumeData[selectedVersion][language];

  const skillTags = data.skills
    .flatMap((s) => s.items.split(/[、,]/))
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* 标题与版本选择 */}
            <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">{t('resumeTitle')}</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{data.label}</p>
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="resume-version"
                  className="text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap"
                >
                  {t('resumeVersionLabel')}
                </label>
                <select
                  id="resume-version"
                  value={selectedVersion}
                  onChange={(e) => setSelectedVersion(e.target.value)}
                  className="text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-bg text-gray-700 dark:text-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer"
                >
                  {resumeVersionKeys.map((v) => (
                    <option key={v} value={v}>
                      {resumeData[v][language].label}
                    </option>
                  ))}
                </select>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
              {/* 左侧信息卡 */}
              <aside className="lg:sticky lg:top-24 self-start">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-dark-card/70 backdrop-blur-sm p-6 text-center">
                  <img
                    src={siteConfig.user.avatar}
                    alt={data.displayName}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg ring-4 ring-primary/20 mx-auto"
                  />
                  <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100 mt-4">
                    {data.displayName}
                  </h2>
                  <p className="text-sm text-primary font-medium mt-1">{data.role}</p>

                  <div className="mt-5">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
                      {t('professionalSkills')}
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {skillTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* 右侧主体 */}
              <div className="space-y-6">
                {/* 项目经历 */}
                <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-dark-card/70 backdrop-blur-sm p-6">
                  <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-primary" />
                    {t('projectExperience')}
                  </h2>
                  <div className="mt-6 ml-2 space-y-8 relative border-l border-slate-200 dark:border-slate-700 pl-6">
                    {data.projects.map((p, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -left-[30.5px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {p.name}
                          </h3>
                          {p.link && (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline shrink-0"
                            >
                              GitHub
                              <ArrowUpRight size={12} />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{p.time}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {t('techStack')}：{p.stack}
                        </p>
                        <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {p.points.map((point, j) => (
                            <li key={j}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 个人评价 */}
                <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-dark-card/70 backdrop-blur-sm p-6">
                  <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-primary" />
                    {t('personalEvaluation')}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {data.evaluations.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
