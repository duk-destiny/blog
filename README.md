# Personal Blog

一个基于 React + TypeScript + Tailwind CSS 构建的现代化个人博客系统。

## ✨ 特性

- ⚡️ **Vite 驱动** - 极速开发体验和构建速度
- 🌗 **暗黑模式** - 支持明暗主题切换
- 🌍 **国际化** - 完整的中英文双语支持
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 📝 **Markdown 渲染** - 原生支持 Markdown 文章格式
- 💬 **评论系统** - 集成 GitHub Issues 评论功能
- 🎯 **TypeScript** - 完整的类型安全
- 🔍 **搜索功能** - 支持文章搜索和分类浏览
- 📊 **归档系统** - 按日期、分类、标签管理文章

## 🛠️ 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 3
- **路由**: React Router v7
- **状态管理**: Zustand
- **国际化**: i18next + react-i18next
- **图标**: Lucide React
- **Markdown**: react-markdown

## 📦 安装与运行

```bash
# 克隆项目
git clone https://github.com/duk-destiny/personal-blog.git
cd personal-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # 组件
│   ├── ArticleList.tsx  # 文章列表
│   ├── Navbar.tsx       # 导航栏
│   ├── Sidebar.tsx      # 侧边栏
│   ├── Footer.tsx       # 页脚
│   └── ...
├── pages/               # 页面
│   ├── Home.tsx         # 首页
│   ├── About.tsx        # 关于页
│   ├── Archive.tsx      # 归档页
│   ├── Categories.tsx   # 分类页
│   ├── Tags.tsx         # 标签页
│   └── ...
├── config/              # 配置文件
│   └── siteConfig.ts    # 站点配置
├── hooks/               # 自定义 Hooks
│   ├── useLanguage.ts   # 语言切换
│   ├── useTheme.ts      # 主题切换
│   └── useScrollAnimation.ts  # 滚动动画
├── services/            # 服务层
├── locales/             # 国际化文件
│   ├── zh.json          # 中文翻译
│   └── en.json          # 英文翻译
└── App.tsx              # 应用入口
```

## ⚙️ 配置

在 `src/config/siteConfig.ts` 中修改站点信息：

```typescript
export const siteConfig = {
  siteName: { zh: '个人博客', en: 'Personal Blog' },
  user: {
    name: { zh: '和弦', en: 'issssa' },
    avatar: '/avatar.jpg'
  },
  socialLinks: {
    github: 'https://github.com/your-username',
    email: 'mailto:your-email@example.com'
  },
  comments: {
    repo: 'your-username/your-repo'  // GitHub 评论仓库
  }
}
```

## 🚀 部署

### Vercel

```bash
npm i -g vercel
vercel
```

### GitHub Pages

构建后部署 `dist` 目录到 `gh-pages` 分支：

```bash
npm run build
cd dist
git init
git add .
git commit -m "deploy"
git push -f git@github.com:username/repo.git main:gh-pages
```

## 📝 许可

MIT License