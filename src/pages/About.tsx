import { useLanguage } from '@/hooks/useLanguage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Layout from '@/components/Layout';

export default function About() {
  const { t } = useLanguage();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();
  const { ref: toolsRef, isVisible: toolsVisible } = useScrollAnimation();
  const { ref: educationRef, isVisible: educationVisible } = useScrollAnimation();

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 个人信息 */}
            <div
              ref={heroRef as React.RefObject<HTMLDivElement>}
              className={`text-center mb-16 ${heroVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              <div className="inline-block mb-6">
                <img
                  src="/avatar.jpg"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              </div>
              <h1 className="text-4xl font-bold mb-2">issssa</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{t('frontendLearner')}</p>
              <div className="w-32 h-1 bg-blue-500 mx-auto"></div>
            </div>

            {/* 核心技术栈 */}
            <div
              ref={skillsRef as React.RefObject<HTMLDivElement>}
              className={`mb-16 ${skillsVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="inline-block w-8 h-8 mr-3 text-blue-500">⚡</span>
                {t('coreSkills')}
              </h2>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">{t('frontendSkills')}</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">HTML5/CSS3</span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">JavaScript(ES6+)</span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">Vue3</span>
                </div>
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">{t('aiSkills')}</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">python</span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">langchain/dify</span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">function calling/Prompt engineering/RAG</span>
                </div>
              </div>
            </div>

            {/* 工具与平台 */}
            <div
              ref={toolsRef as React.RefObject<HTMLDivElement>}
              className={`mb-16 ${toolsVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="inline-block w-8 h-8 mr-3 text-blue-500">🔧</span>
                {t('toolsAndPlatforms')}
              </h2>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">{t('devTools')}</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm">trae/pycharm/visual studio code</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm">Git</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">{t('buildTools')}</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm">Vite</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm">npm/pnpm</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">{t('deployOps')}</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm">Docker</span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm">Vercel</span>
                </div>
              </div>
            </div>

            {/* 教育与竞赛经历
            <div 
              ref={educationRef as React.RefObject<HTMLDivElement>}
              className={`${educationVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="inline-block w-8 h-8 mr-3 text-blue-500">📚</span>
                教育与竞赛经历
              </h2>
              <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">中国地质大学（北京）</h3>
                    <p className="text-gray-600 dark:text-gray-400">安全工程 本科在读</p>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">2024.09 - 至今</div>
                </div>
              </div>
            </div> */}

            {/* 联系方式 */}
            <div className="mt-16 animate-fade-up">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="inline-block w-8 h-8 mr-3 text-blue-500">📧</span>
                {t('contact')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="mailto:2775089477@qq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-blue-500">📧</span>
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
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-blue-500">🐱</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                      <p className="text-gray-700 dark:text-gray-300">github.com/duk-destiny</p>
                    </div>
                  </div>
                </a>
                <a
                  href="/"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-blue-500">🌐</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('blog')}</p>
                      <p className="text-gray-700 dark:text-gray-300">issssa's blog</p>
                    </div>
                  </div>
                </a>
                <a
                  href="/notes"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-blue-500">📚</span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('knowledgeBase')}</p>
                      <p className="text-gray-700 dark:text-gray-300">issssa's notes</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* 名言 */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "Stay hungry, stay foolish."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
