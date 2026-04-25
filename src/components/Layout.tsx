import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      {/* 动态渐变背景 */}
      <div className="fixed inset-0 -z-10">
        {/* 浅色模式背景 */}
        <div className="absolute inset-0 animate-gradient-shift-light"></div>
        {/* 深色模式背景 */}
        <div className="absolute inset-0 animate-gradient-shift-dark hidden dark:block"></div>
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes gradient-shift-light {
            0%, 100% {
              background: linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%);
            }
            33% {
              background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fef3c7 100%);
            }
            66% {
              background: linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #eff6ff 100%);
            }
          }
          @keyframes gradient-shift-dark {
            0%, 100% {
              background: linear-gradient(135deg, #0f172a 0%, #1f2937 50%, rgba(124, 58, 237, 0.2) 100%);
            }
            33% {
              background: linear-gradient(135deg, #064e3b 0%, #1f2937 50%, rgba(217, 70, 239, 0.2) 100%);
            }
            66% {
              background: linear-gradient(135deg, rgba(217, 70, 239, 0.2) 0%, #1f2937 50%, #0f172a 100%);
            }
          }
          .animate-gradient-shift-light {
            animation: gradient-shift-light 15s ease infinite;
            background-size: 400% 400%;
          }
          .animate-gradient-shift-dark {
            animation: gradient-shift-dark 15s ease infinite;
            background-size: 400% 400%;
          }
        `}} />
      </div>
      <Sidebar onSearch={handleSearch} />
      <main className="lg:ml-80">
        <div className="lg:pl-8 lg:pr-16">
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}
