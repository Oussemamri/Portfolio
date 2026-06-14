import React from 'react';
import PageShell from '../components/common/PageShell';
import Companies from '../components/Companies';
import Experience from '../components/Experience';

const ExperiencePage = () => (
  <PageShell
    title="Experience"
    subtitle="// companies, roles & impact"
    accent="#E0234E"
  >
    <Companies />
    <Experience />
  </PageShell>
);

export default ExperiencePage;
