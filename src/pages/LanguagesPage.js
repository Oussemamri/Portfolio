import React from 'react';
import PageShell from '../components/common/PageShell';
import Languages from '../components/Languages';

const LanguagesPage = () => (
  <PageShell
    title="Languages"
    subtitle="// human languages I speak"
    accent="#FFD21E"
  >
    <Languages />
  </PageShell>
);

export default LanguagesPage;
