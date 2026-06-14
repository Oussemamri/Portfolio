import React from 'react';
import './PageShell.css';

const PageShell = ({ title, subtitle, accent = 'var(--primary-color)', children }) => (
  <div className="page-shell">
    <div className="page-shell-banner" style={{ '--shell-accent': accent }}>
      <div className="page-shell-pattern" aria-hidden="true" />
      <div className="page-shell-banner-inner">
        <span className="page-shell-meta">{'// portfolio'}</span>
        <h1 className="page-shell-title">{title}</h1>
        {subtitle && <p className="page-shell-subtitle">{subtitle}</p>}
        <div className="page-shell-rule" />
      </div>
    </div>
    <div className="page-shell-content">{children}</div>
  </div>
);

export default PageShell;
