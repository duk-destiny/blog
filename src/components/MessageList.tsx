import { useState } from 'react';
import { CommentItem } from '@/services/messageService';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const labelColors: Record<string, string> = {
  comment: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  feedback: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  question: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  suggestion: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
};

function getLabelColor(label: string): string {
  return labelColors[label] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
}

interface MessageListProps {
  comments: CommentItem[];
  loading: boolean;
  onLabelClick?: (label: string) => void;
}

export default function MessageList({ comments, loading, onLabelClick }: MessageListProps) {
  const { t } = useLanguage();
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(null);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">{t('noComments')}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedComment(comment)}
          >
            <div className="flex items-start gap-4">
              <a
                href={comment.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={comment.user.avatar_url}
                  alt={comment.user.login}
                  className="w-12 h-12 rounded-full hover:opacity-80 transition-opacity"
                />
              </a>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={comment.user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {comment.user.login}
                  </a>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {comment.body}
                </p>
                {comment.labels.length > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {comment.labels.map((label) => (
                        <span
                          key={label}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(label)}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onLabelClick?.(label);
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-primary transition-colors" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedComment && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedComment(null)}
        >
          <div
            className="bg-white dark:bg-dark-card rounded-2xl max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedComment(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-6">
              <a
                href={selectedComment.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={selectedComment.user.avatar_url}
                  alt={selectedComment.user.login}
                  className="w-16 h-16 rounded-full hover:opacity-80 transition-opacity"
                />
              </a>
              <div>
                <a
                  href={selectedComment.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold hover:text-primary transition-colors"
                >
                  {selectedComment.user.login}
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(selectedComment.created_at)}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                {selectedComment.body}
              </p>
            </div>
            {selectedComment.labels.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {selectedComment.labels.map((label) => (
                  <span
                    key={label}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getLabelColor(label)}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
            <a
              href={selectedComment.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('viewOnGithub')}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
