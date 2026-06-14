import React from 'react';
import PageShell from '../components/common/PageShell';
import Projects from '../components/Projects';

const WorkPage = () => (
  <PageShell
    title="Work"
    subtitle="// projects I've designed and shipped"
    accent="#4FC08D"
  >
    <Projects />
  </PageShell>
);

export default WorkPage;
