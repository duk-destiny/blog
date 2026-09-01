// 站点配置
export const siteConfig = {
  // 站点信息
  siteName: {
    zh: '个人博客',
    en: 'Personal Blog'
  },
  // 用户信息
  user: {
    name: {
      zh: '和弦',
      en: 'issssa'
    },
    // 英文名（首屏副标题）
    enName: 'issssa',
    // 身份标签（首屏胶囊）
    roles: {
      zh: ['大模型应用工程师', 'Agent工程', '终身学习者','开源爱好者'],
      en: ['LLM Application Engineer', 'Agent / RAG Engineering', 'Lifelong Learner']
    },
    description1: {
      zh: '遇事不决，可问春风',
      en: 'When in doubt, ask the wind'
    },
    description2: {
      zh: '春风不解，即随本心',
      en: 'Spring wind does not understand, follow your heart instead'
    },
    // 个人格言（页脚）
    motto: {
      zh: '保持热爱。',
      en: 'Stay passionate.'
    },
    avatar: '/avatar.jpg'
  },
  // 社交媒体链接
  socialLinks: {
    github: 'https://github.com/duk-destiny',
    leetcode: 'yin-tian-51',
    csdn: 'https://blog.csdn.net/2401_87653039?type=blog',
    qq: 'https://qm.qq.com/q/U5wWcPNRKy',
    email: 'mailto:2775089477@qq.com',
    resume: '/resume'
  },
  // 评论区配置（使用 utterances）
  comments: {
    repo: 'duk-destiny/blog'
  },
  // 导航菜单
  navigation: [
    { key: 'home', label: 'home', href: '/', icon: 'Home' },
    {
      key: 'blog',
      label: 'blog',
      icon: 'BookOpen',
      children: [
        { key: 'allBlog', label: 'allBlog', href: '/all-blog', icon: 'BookOpen' },
        { key: 'archive', label: 'archive', href: '/archive', icon: 'FileText' },
        { key: 'categories', label: 'categories', href: '/categories', icon: 'Folder' },
      ],
    },
    { key: 'about', label: 'about', href: '/about', icon: 'User' },
    { key: 'resume', label: 'viewResume', href: '/resume', icon: 'FileUser' }
  ],
  // 颜色配置
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    dark: {
      bg: '#1a1a1a',
      card: '#2d2d2d',
      text: '#e0e0e0'
    }
  }
};
