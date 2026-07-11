import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/common/PageShell';
import PageMeta from '../components/common/PageMeta';
import '../assets/styles/pages/notFound.css';

const NotFound = () => (
  <>
  <PageMeta title="404 — Page Not Found" description="This page doesn't exist." noindex />
  <PageShell
    title="404"
    subtitle="// this page doesn't exist"
    accent="#ff6b6b"
  >
    <div className="not-found-content">
      <p className="not-found-message">
        The page you're looking for was moved, renamed, or never existed.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn primary">Back to Home</Link>
        <Link to="/work" className="btn secondary">View Work</Link>
      </div>
    </div>
  </PageShell>
  </>
);

export default NotFound;
