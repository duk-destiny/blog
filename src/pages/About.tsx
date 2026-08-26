import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/hooks/useLanguage';
import Layout from '@/components/Layout';
import { siteConfig } from '@/config/siteConfig';
import type { TranslationKeys } from '@/i18n-resources';
import { Github, Mail, BookOpen } from 'lucide-react';

type SkillItem = string | { key: TranslationKeys };
type SkillGroup = { titleKey: TranslationKeys; items: SkillItem[] };

const skillGroups: SkillGroup[] = [
  { titleKey: 'skillProgrammingLang', items: ['Python', 'C++', 'TypeScript'] },
  { titleKey: 'skillLLMFrameworks', items: ['LangChain', 'LangGraph', 'AutoGen'] },
  { titleKey: 'skillModelServiceAPI', items: ['FastAPI', 'LangServe', 'Gradio'] },
  {
    titleKey: 'skillRetrievalRAG',
    items: [
      { key: 'aboutHybridSearch' },
      { key: 'aboutKnowledgeGraph' },
      { key: 'aboutReflectionLoop' },
      { key: 'aboutTraceability' },
    ],
  },
  {
    titleKey: 'skillVisionAI',
    items: ['YOLOv8', 'ONNX Runtime', 'OpenCV', { key: 'aboutDetectTrack' }],
  },
  {
    titleKey: 'skillDeployment',
    items: ['AMD ROCm', 'Ollama', 'llama.cpp', { key: 'aboutOfflineInference' }],
  },
  { titleKey: 'skillToolchain', items: ['MCP', 'Skill', 'Tool', { key: 'aboutMultiStepWorkflow' }] },
  { titleKey: 'skillAIDev', items: ['Codex', 'WorkBuddy', 'CC'] },
  { titleKey: 'skillFrontend', items: ['React', 'Vue', 'Tailwind CSS', 'Vite'] },
  {
    titleKey: 'skillAlgorithms',
    items: [{ key: 'aboutDeepLearning' }, 'Transformer', { key: 'aboutCloudTraining' }],
  },
];

const journey: { time: string; titleKey: TranslationKeys; descKey: TranslationKeys }[] = [
  { time: '2026.04', titleKey: 'aboutJ1Title', descKey: 'aboutJ1Desc' },
  { time: '2026.07', titleKey: 'aboutJ2Title', descKey: 'aboutJ2Desc' },
  { time: '2026.07', titleKey: 'aboutJ3Title', descKey: 'aboutJ3Desc' },
  { time: 'now', titleKey: 'aboutJ4Title', descKey: 'aboutJ4Desc' },
];

const interests: TranslationKeys[] = [
  'aboutInterest1',
  'aboutInterest2',
  'aboutInterest3',
  'aboutInterest4',
  'aboutInterest5',
  'aboutInterest6',
];

export default function About() {
  const { t } = useLanguage();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: journeyRef, isVisible: journeyVisible } = useScrollAnimation();
  const { ref: interestsRef, isVisible: interestsVisible } = useScrollAnimation();
  const { ref: abilityRef, isVisible: abilityVisible } = useScrollAnimation();

  const sectionTitle = (text: string) => (
    <h2 className="font-serif text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100 flex items-center gap-2">
      <span className="w-1.5 h-6 rounded-full bg-primary" />
      {text}
    </h2>
  );

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* 个人简介 */}
            <div
              ref={heroRef as React.RefObject<HTMLDivElement>}
              className={`text-center mb-14 ${heroVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              <div className="relative inline-block mb-5">
                <img
                  src={siteConfig.user.avatar}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg ring-4 ring-primary/20"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white dark:border-gray-800" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">{t('displayName')}</h1>
              <p className="mt-2 text-primary font-medium">{t('aboutRole')}</p>
              <p className="mt-4 max-w-xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('aboutBio')}
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href={siteConfig.socialLinks.csdn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  <BookOpen size={16} />
                  CSDN
                </a>
                <a
                  href={siteConfig.socialLinks.email}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  <Mail size={16} />
                  {t('email')}
                </a>
              </div>
            </div>

            {/* 学习旅程 */}
            <section
              ref={journeyRef as React.RefObject<HTMLElement>}
              className={`mb-12 ${journeyVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {sectionTitle(t('aboutJourney'))}
              <p className="text-sm text-gray-500 dark:text-gray-400 -mt-3 mb-6">{t('aboutJourneySubtitle')}</p>
              <div className="relative border-l border-slate-200 dark:border-slate-700 ml-2 pl-6 space-y-8">
                {journey.map((item) => (
                  <div key={item.titleKey} className="relative">
                    <span className="absolute -left-[30.5px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {item.time === 'now' ? t('aboutNow') : item.time}
                      </span>
                      <h3 className="font-serif text-base font-semibold text-gray-800 dark:text-gray-100">
                        {t(item.titleKey)}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 兴趣与方向 */}
            <section
              ref={interestsRef as React.RefObject<HTMLElement>}
              className={`mb-12 ${interestsVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {sectionTitle(t('aboutInterests'))}
              <p className="text-sm text-gray-500 dark:text-gray-400 -mt-3 mb-5">{t('aboutInterestsSubtitle')}</p>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((key) => (
                  <span
                    key={key}
                    className="px-4 py-1.5 rounded-full text-sm border border-primary/30 bg-primary/5 text-primary/90 hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-default"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </section>

            {/* 专业能力 */}
            <section
              ref={abilityRef as React.RefObject<HTMLElement>}
              className={`mb-12 ${abilityVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {sectionTitle(t('professionalSkills'))}
              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.titleKey} className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-32 shrink-0">
                      {t(group.titleKey)}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, i) => {
                        const text = typeof item === 'string' ? item : t(item.key);
                        return (
                          <span
                            key={typeof item === 'string' ? item : item.key + i}
                            className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                          >
                            {text}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
