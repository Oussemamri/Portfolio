import React from 'react';
import '../assets/styles/components/languages.css';

const Languages = () => {
    const languages = [
        { name: 'English',  level: 'C1', width: '90%' },
        { name: 'German',   level: 'A2', width: '35%' },
        { name: 'French',   level: 'C1', width: '90%' },
        { name: 'Arabic',   level: 'C2', width: '100%' }
    ];

    return (
        <section id="languages" className="languages-section-standalone">
            <div className="languages-inner">
                <h2 className="languages-title">Languages</h2>
                <div className="languages-card">
                    <div className="language-items">
                        {languages.map((lang, idx) => (
                            <div key={idx} className="language-item">
                                <div className="language-name">{lang.name}</div>
                                <div className="language-level">
                                    <div className="level-bar">
                                        <div className="level-fill" style={{ '--level-width': lang.width }} />
                                    </div>
                                    <span className="proficiency">{lang.level}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Languages;
