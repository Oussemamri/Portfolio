import React from 'react';
import PageShell from '../components/common/PageShell';
import PageMeta from '../components/common/PageMeta';
import About from '../components/About';

const AboutPage = () => (
  <>
    <PageMeta
      title="About"
      description="Oussema Amri is a full-stack software engineer based in Munich, Germany, with a background from ESPRIT School of Engineering and Hochschule Schmalkalden."
      path="/about"
    />
    <PageShell
      title="About"
      subtitle="// background, education & values"
      accent="#3178C6"
    >
      <About />
    </PageShell>
  </>
);

export default AboutPage;
