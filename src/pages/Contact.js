import React from 'react';
import ContactComponent from '../components/Contact';

// This page route simply renders the shared Contact component (EmailJS-based).
const Contact = () => {
  return (
    <main>
      <ContactComponent />
    </main>
  );
};

export default Contact;