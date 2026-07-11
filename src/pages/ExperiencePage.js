import React from 'react';
import PageShell from '../components/common/PageShell';
import PageMeta from '../components/common/PageMeta';
import Companies from '../components/Companies';
import Experience from '../components/Experience';

const ExperiencePage = () => (
  <>
    <PageMeta
      title="Experience"
      description="Oussema Amri's professional experience: Rocket Factory Augsburg, Happy Nation Global, and Talan Tunisia — roles, companies, and impact as a full-stack engineer."
      path="/experience"
    />
    <PageShell
      title="Experience"
      subtitle="// companies, roles & impact"
      accent="#E0234E"
    >
      <Companies />
      <Experience />
    </PageShell>
  </>
);

export default ExperiencePage;
