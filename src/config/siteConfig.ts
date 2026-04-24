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
    description1: {
      zh: '遇事不决，可问春风',
      en: 'When in doubt, ask the wind'
    },
    description2: {
      zh: '春风不解，即随本心',
      en: 'Spring wind does not understand, follow your heart instead'
    },
    avatar: '/avatar.jpg'
  },
  // 社交媒体链接
  socialLinks: {
    github: 'https://github.com/duk-destiny',
    qq: 'https://qm.qq.com/q/U5wWcPNRKy',
    email: 'mailto:2775089477@qq.com'
  },
  // 评论区配置（使用 utterances）
  comments: {
    repo: 'duk-destiny/blog',
  },
  // 导航菜单
  navigation: [
    { key: 'home', label: 'home', href: '/', icon: 'Home' },
    { key: 'archive', label: 'archive', href: '/archive', icon: 'FileText' },
    { key: 'categories', label: 'categories', href: '/categories', icon: 'Folder' },
    { key: 'tags', label: 'tags', href: '/tags', icon: 'Tag' },
    { key: 'message', label: 'message', href: '/message', icon: 'MessageSquare' },
    { key: 'about', label: 'about', href: '/about', icon: 'User' }
  ],
  // 分类配置
  categories: [
    { key: 'all', label: 'all' },
    { key: 'frontend', label: 'frontend' },
    { key: 'css', label: 'css' },
    { key: 'buildTools', label: 'buildTools' },
    { key: 'performance', label: 'performance' }
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
