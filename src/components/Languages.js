import React from 'react';
import SectionHeader from './common/SectionHeader';
import '../assets/styles/components/languages.css';

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const PROFICIENCY_LABELS = {
    'A1': 'Beginner',
    'A2': 'Elementary',
    'B1': 'Intermediate',
    'B2': 'Upper Intermediate',
    'C1': 'Advanced',
    'C2': 'Mastery',
};

const languages = [
    { name: 'English', level: 'C1' },
    { name: 'French',  level: 'C1' },
    { name: 'German',  level: 'A2' },
    { name: 'Arabic',  level: 'C2' },
];

const Languages = () => (
    <section id="languages" className="languages-section-standalone">
        <div className="languages-inner">
            <SectionHeader eyebrow="// CEFR proficiency" title="Languages" accent="#FFD21E" />
            <div className="language-cards">
                {languages.map((lang, idx) => {
                    const levelIdx = CEFR_LEVELS.indexOf(lang.level);
                    return (
                        <div key={idx} className="lang-card">
                            <div className="lang-card-header">
                                <span className="lang-name">{lang.name}</span>
                                <span className="lang-label">{PROFICIENCY_LABELS[lang.level]}</span>
                            </div>
                            <div className="lang-dots">
                                {CEFR_LEVELS.map((lvl, i) => {
                                    const cls =
                                        i < levelIdx ? 'achieved' :
                                        i === levelIdx ? 'current' : '';
                                    return (
                                        <span
                                            key={lvl}
                                            className={`lang-dot${cls ? ' ' + cls : ''}`}
                                            style={{ '--dot-index': i }}
                                        >
                                            {lvl}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

export default Languages;
