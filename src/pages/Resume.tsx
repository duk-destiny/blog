import { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { resumeData, resumeVersionKeys } from '@/data/resume';

export default function Resume() {
  const { t, language } = useLanguage();
  const [selectedVersion, setSelectedVersion] = useState<string>(resumeVersionKeys[0]);
  const data = resumeData[selectedVersion][language];

  const sectionTitle = (text: string) => (
    <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-slate-200 dark:border-slate-700 pb-2 mb-4 mt-10">
      {text}
    </h2>
  );

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto bg-white/70 dark:bg-dark-card/70 backdrop-blur-sm rounded-2xl border border-slate-900/10 dark:border-blue-100/10 shadow-sm p-8 md:p-12">
            {/* 标题与版本选择 */}
            <header className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">{t('resumeTitle')}</h1>
                <div className="flex items-center gap-2">
                  <label htmlFor="resume-version" className="text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap">
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
              </div>
            </header>

            {/* 个人信息 */}
            <section className="mb-2">
              <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">{data.displayName}</h2>
              <p className="mt-1 text-primary font-medium">{data.role}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {t('email')}：
                <a href={`mailto:${data.email}`} className="text-primary hover:underline">{data.email}</a>
                {' · '}GitHub：
                <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{data.github}</a>
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                {data.bio}
              </p>
            </section>

            {/* 专业技能 */}
            <section>
              {sectionTitle(t('professionalSkills'))}
              <div className="space-y-2">
                {data.skills.map((s, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="w-28 shrink-0 font-medium text-gray-700 dark:text-gray-200">{s.title}</span>
                    <span className="text-gray-600 dark:text-gray-300">{s.items}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 项目经历 */}
            <section>
              {sectionTitle(t('projectExperience'))}
              <div className="space-y-6">
                {data.projects.map((p, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{p.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {t('techStack')}：{p.stack} · {p.time}
                    </p>
                    <ul className="mt-2 list-disc pl-6 space-y-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {p.points.map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 个人评价 */}
            <section>
              {sectionTitle(t('personalEvaluation'))}
              <ul className="list-disc pl-6 space-y-1.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {data.evaluations.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

          </article>
        </div>
      </div>
    </Layout>
  );
}
