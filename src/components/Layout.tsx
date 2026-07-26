import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      {/* 动态粒子背景（放大版） */}
      <ParticleBackground />
      <Navbar />
      <main className="pt-16">
        {children}
        <Footer />
      </main>
    </div>
  );
}
