import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/hooks/useLanguage';
import Layout from '@/components/Layout';

type SkillItem = string | { key: string };
type SkillGroup = { titleKey: string; items: SkillItem[] };

const skillGroups: SkillGroup[] = [
  { titleKey: 'skillProgrammingLang', items: ['Python', 'C++'] },
  { titleKey: 'skillLLMFrameworks', items: ['LangChain', 'LangGraph', 'AutoGen'] },
  { titleKey: 'skillModelService', items: ['FastAPI', 'LangServe', 'Gradio'] },
  { titleKey: 'skillRetrievalRAG', items: [
    { key: 'aboutHybridSearch' },
    { key: 'aboutKnowledgeGraph' },
    { key: 'aboutReflectionLoop' },
    { key: 'aboutTraceability' }
  ]},
  { titleKey: 'skillToolchain', items: ['MCP', 'Skill', 'Tool', { key: 'aboutMultiStepWorkflow' }] },
  { titleKey: 'skillAIDev', items: ['Codex', 'WorkBuddy', 'CC'] },
  { titleKey: 'skillAlgorithms', items: [
    { key: 'aboutDeepLearning' }, 'Transformer', { key: 'aboutCloudTraining' }
  ]},
];

type ProjectEntry = {
  nameKey: string;
  descKey: string;
  stackKey: string;
  statusKey: string;
};

const projects: ProjectEntry[] = [
  {
    nameKey: 'aboutProjectName',
    descKey: 'aboutProjectDesc',
    stackKey: 'aboutProjectStack',
    statusKey: 'aboutProjectStatus',
  },
];

export default function About() {
  const { t } = useLanguage();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: abilityRef, isVisible: abilityVisible } = useScrollAnimation();
  const { ref: projectRef, isVisible: projectVisible } = useScrollAnimation();
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation();

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
              <img
                src="/avatar.jpg"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg mx-auto mb-5"
              />
              <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">{t('displayName')}</h1>
              <p className="mt-2 text-primary font-medium">{t('aboutRole')}</p>
              <p className="mt-4 max-w-xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('aboutBio')}
              </p>
            </div>

            {/* 专业能力 */}
            <section
              ref={abilityRef as React.RefObject<HTMLElement>}
              className={`mb-12 ${abilityVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {sectionTitle(t('professionalSkills'))}
              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.titleKey} className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 w-28 shrink-0">
                      {t(group.titleKey as any)}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, i) => {
                        const text = typeof item === 'string' ? item : t(item.key as any);
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

            {/* 项目经历 */}
            <section
              ref={projectRef as React.RefObject<HTMLElement>}
              className={`mb-12 ${projectVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {sectionTitle(t('projectExperience'))}
              <div className="space-y-4">
                {projects.map((p) => (
                  <div
                    key={p.nameKey}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white/50 dark:bg-dark-card/50 hover:border-primary/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{t(p.nameKey as any)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{t(p.descKey as any)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span className="font-medium">{t('techStack')}：</span>{t(p.stackKey as any)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">{t('status')}：</span>{t(p.statusKey as any)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 联系方式 */}
            <section
              ref={contactRef as React.RefObject<HTMLElement>}
              className={`${contactVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {sectionTitle(t('contact'))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:2775089477@qq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-primary">✉</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('email')}</p>
                      <p className="text-gray-700 dark:text-gray-300">2775089477@qq.com</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://github.com/duk-destiny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-primary">↗</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                      <p className="text-gray-700 dark:text-gray-300">github.com/duk-destiny</p>
                    </div>
                  </div>
                </a>
              </div>
              <p className="mt-10 text-center text-gray-500 dark:text-gray-400 italic">
                "Be so good they can't ignore you."
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
