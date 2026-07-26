import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import GitHubContributions from '@/components/GitHubContributions';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <GitHubContributions />
      <Projects />
    </Layout>
  );
}
