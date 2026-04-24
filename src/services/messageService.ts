import { siteConfig } from '@/config/siteConfig';

export interface CommentItem {
  id: number;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  body: string;
  created_at: string;
  labels: string[];
}

async function fetchIssues(page = 1, perPage = 30) {
  const repo = siteConfig.comments.repo;
  const url = `https://api.github.com/repos/${repo}/issues?state=all&per_page=${perPage}&page=${page}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('获取评论失败:', response.status);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('获取评论失败:', error);
    return [];
  }
}

function convertToComment(issue: any): CommentItem {
  const labels = issue.labels ? issue.labels.map((l: any) => l.name || l) : [];
  
  return {
    id: issue.number,
    html_url: issue.html_url,
    user: {
      login: issue.user.login,
      avatar_url: issue.user.avatar_url,
      html_url: issue.user.html_url
    },
    body: issue.body || '',
    created_at: issue.created_at,
    labels
  };
}

export async function getAllComments(): Promise<CommentItem[]> {
  const issues = await fetchIssues();
  return issues.map(convertToComment);
}

export function getCommentsByLabel(label: string, comments: CommentItem[]) {
  return comments.filter(c => c.labels.includes(label));
}

export function getAllLabels(comments: CommentItem[]) {
  const labels = new Set<string>();
  comments.forEach(c => c.labels.forEach(l => labels.add(l)));
  return Array.from(labels).sort();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
