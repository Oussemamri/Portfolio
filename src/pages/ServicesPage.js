import React from 'react';
import PageShell from '../components/common/PageShell';
import PageMeta from '../components/common/PageMeta';
import Services from '../components/Services';

const ServicesPage = () => (
  <>
    <PageMeta
      title="Services"
      description="Web application development, API & backend engineering, performance optimization, and technical consulting from Oussema Amri, a Munich-based full-stack engineer."
      path="/services"
    />
    <PageShell
      title="Services"
      subtitle="// what I build and how I can help"
      accent="#FF9900"
    >
      <Services />
    </PageShell>
  </>
);

export default ServicesPage;
