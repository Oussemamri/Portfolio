import React from 'react';
import PageMeta from '../components/common/PageMeta';
import ContactComponent from '../components/Contact';

// This page route simply renders the shared Contact component (EmailJS-based).
const Contact = () => {
  return (
    <main>
      <PageMeta
        title="Contact"
        description="Get in touch with Oussema Amri — full-stack software engineer in Munich, Germany. Reach out via the contact form, email, GitHub, or LinkedIn."
        path="/contact"
      />
      <ContactComponent />
    </main>
  );
};

export default Contact;