import React from 'react';
import PageShell from '../components/common/PageShell';
import PageMeta from '../components/common/PageMeta';
import Skills from '../components/skills';

const SkillsPage = () => (
  <>
    <PageMeta
      title="Skills"
      description="Oussema Amri's technical stack: React, TypeScript, Python, FastAPI, Node.js, AWS, Docker, and the tools he uses to build full-stack products."
      path="/skills"
    />
    <PageShell
      title="Technical Stack"
      subtitle="// tools & technologies I work with"
      accent="#61DAFB"
    >
      <Skills />
    </PageShell>
  </>
);

export default SkillsPage;
