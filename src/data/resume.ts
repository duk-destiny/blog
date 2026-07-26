import data from './resume.json';

export type ResumeContent = {
  label: string;
  displayName: string;
  role: string;
  bio: string;
  email: string;
  github: string;
  skills: { title: string; items: string }[];
  projects: { name: string; stack: string; time: string; points: string[] }[];
  evaluations: string[];
};

export type ResumeData = Record<string, { zh: ResumeContent; en: ResumeContent }>;

export const resumeData: ResumeData = data as ResumeData;

export const resumeVersionKeys: string[] = Object.keys(resumeData);
