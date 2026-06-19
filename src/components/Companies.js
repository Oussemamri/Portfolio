import React from 'react';
import '../assets/styles/components/companies.css';
import rfaLogo      from '../assets/images/companies/rfa.png';
import happyNationLogo from '../assets/images/companies/happy-nation.png';
import talanLogo    from '../assets/images/companies/talan.png';

const COMPANIES = [
    {
        num:     '01',
        name:    'Rocket Factory Augsburg',
        short:   'RFA',
        role:    'Software Engineer — Working Student',
        period:  '05 / 2025 — 04 / 2026',
        sector:  ['Aerospace', 'Munich'],
        accent:  '#E63946',
        logo:    rfaLogo,
        website: 'https://www.rfa.space/',
    },
    {
        num:     '02',
        name:    'Happy Nation Global',
        short:   'Happy Nation',
        role:    'Full-Stack Developer — Intern',
        period:  '01 / 2025 — 05 / 2025',
        sector:  ['Civic Tech', 'Berlin'],
        accent:  '#22C55E',
        logo:    happyNationLogo,
        website: 'https://citizen.happynation.global/home',
    },
    {
        num:     '03',
        name:    'Talan Tunisia',
        short:   'Talan',
        role:    'Software Engineering Intern',
        period:  '2023 & 2024',
        sector:  ['Consulting', 'Tunisia'],
        accent:  '#F59E0B',
        logo:    talanLogo,
        website: 'https://www.talan.com/global/en',
    },
];

const Companies = () => (
    <section className="co-section">
        {/* subtle scan-line texture */}
        <div className="co-texture" aria-hidden="true" />

        <div className="co-inner">
            <header className="co-header">
                <span className="co-eyebrow">{'// where I\'ve worked'}</span>
                <div className="co-title-row">
                    <h2 className="co-title">Companies</h2>
                    <span className="co-counter">03 engagements</span>
                </div>
            </header>

            <div className="co-list">
                {COMPANIES.map((co, i) => (
                    <a
                        key={co.num}
                        href={co.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="co-entry"
                        aria-label={`Visit ${co.name}`}
                        style={{ '--co-accent': co.accent, '--co-delay': `${i * 90}ms` }}
                    >
                        {/* big watermark number */}
                        <span className="co-num" aria-hidden="true">{co.num}</span>

                        {/* logo */}
                        <div className="co-logo-wrap">
                            <img
                                src={co.logo}
                                alt={`${co.name} logo`}
                                width="100"
                                height="50"
                                loading="lazy"
                            />
                        </div>

                        {/* name + role */}
                        <div className="co-body">
                            <h3 className="co-name">{co.name}</h3>
                            <span className="co-role">{co.role}</span>
                        </div>

                        {/* period + tags */}
                        <div className="co-meta">
                            <span className="co-period">{co.period}</span>
                            <div className="co-tags">
                                {co.sector.map(tag => (
                                    <span key={tag} className="co-tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* hover CTA */}
                        <span className="co-cta" aria-hidden="true">Visit ↗</span>

                        {/* animated left border */}
                        <span className="co-bar" aria-hidden="true" />
                    </a>
                ))}
            </div>
        </div>
    </section>
);

export default Companies;
