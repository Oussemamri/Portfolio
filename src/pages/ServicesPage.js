import React from 'react';
import PageShell from '../components/common/PageShell';
import Services from '../components/Services';

const ServicesPage = () => (
  <PageShell
    title="Services"
    subtitle="// what I build and how I can help"
    accent="#FF9900"
  >
    <Services />
  </PageShell>
);

export default ServicesPage;
