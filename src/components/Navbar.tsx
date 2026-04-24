import { useState, useEffect } from 'react';
import { Moon, Sun, Github } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { siteConfig } from '@/config/siteConfig';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件，添加导航栏背景
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ 
        isScrolled 
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent' 
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <a href="/" className="hover:text-primary transition-colors">
            个人博客
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href={siteConfig.socialLinks.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
