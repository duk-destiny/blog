import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/hooks/useLanguage';
import Layout from '@/components/Layout';
import GitHubComments from '@/components/GitHubComments';
import MessageList from '@/components/MessageList';
import { getAllComments, getAllLabels, getCommentsByLabel, CommentItem } from '@/services/messageService';

export default function Messages() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllComments().then(data => {
      setComments(data);
      setLabels(getAllLabels(data));
      setLoading(false);
    });
  }, []);

  const filteredComments = activeLabel
    ? getCommentsByLabel(activeLabel, comments)
    : comments;

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1
              ref={ref as React.RefObject<HTMLHeadingElement>}
              className={`text-4xl font-bold mb-8 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
            >
              {t('messageTitle')}
            </h1>

            <div className="animate-fade-up mb-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                {t('messageDesc')}
              </p>
            </div>

            {labels.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!activeLabel
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    onClick={() => setActiveLabel(null)}
                  >
                    {t('all')} ({comments.length})
                  </button>
                  {labels.map((label) => {
                    const count = getCommentsByLabel(label, comments).length;
                    return (
                      <button
                        key={label}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeLabel === label
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        onClick={() => setActiveLabel(activeLabel === label ? null : label)}
                      >
                        {label} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="animate-fade-up mb-8">
              <MessageList
                comments={filteredComments}
                loading={loading}
                onLabelClick={(label) => setActiveLabel(label)}
              />
            </div>

            <GitHubComments path="/friends" title={t('messageTitle')} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
