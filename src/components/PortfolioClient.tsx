'use client';

import { Header, Hero, About, Skills, Projects, Contact, Footer } from '@/components';
import { PortfolioData } from '@/types';

interface PortfolioClientProps {
  data: PortfolioData;
}

export function PortfolioClient({ data }: PortfolioClientProps) {
  return (
    <>
      <Header />
      <main>
        <Hero user={data.user} />
        <About user={data.user} readme={data.readme} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Contact user={data.user} />
      </main>
      <Footer user={data.user} />
    </>
  );
}
