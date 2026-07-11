import React from 'react';
import PageShell from '../components/common/PageShell';
import PageMeta from '../components/common/PageMeta';
import Languages from '../components/Languages';

const LanguagesPage = () => (
  <>
    <PageMeta
      title="Languages"
      description="The human languages Oussema Amri speaks — English, French, German, and Arabic — with CEFR proficiency levels."
      path="/languages"
    />
    <PageShell
      title="Languages"
      subtitle="// human languages I speak"
      accent="#FFD21E"
    >
      <Languages />
    </PageShell>
  </>
);

export default LanguagesPage;
