import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({ eyebrow, title, subtitle, accent = 'var(--primary-color)' }) => (
  <div className="section-header" style={{ '--section-accent': accent }}>
    {eyebrow && <span className="section-header-eyebrow">{eyebrow}</span>}
    <h2 className="section-header-title">{title}</h2>
    {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    <span className="section-header-rule" aria-hidden="true" />
  </div>
);

export default SectionHeader;
