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
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100">
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
