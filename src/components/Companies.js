import React from 'react';
import '../assets/styles/components/companies.css';
import rfaLogo from '../assets/images/companies/rfa.png';
import happyNationLogo from '../assets/images/companies/happy-nation.png';
import talanLogo from '../assets/images/companies/talan.png';

const Companies = () => {
    const companies = [
        {
            name: 'Rocket Factory Augsburg',
            role: 'Software Engineer',
            logo: rfaLogo,
            website: 'https://www.rfa.space/'
        },
        {
            name: 'Happy Nation',
            role: 'Full Stack Developer',
            logo: happyNationLogo,
            website: 'https://citizen.happynation.global/home'
        },
        {
            name: 'Talan',
            role: 'Software Engineering Intern',
            logo: talanLogo,
            website: 'https://www.talan.com/global/en'
        }
    ];

    return (
        <section className="companies-section">
            <div className="container">
                <h2>Companies I've Worked With</h2>
                <div className="companies-grid">
                    {companies.map((company, index) => (
                        <a 
                            key={index}
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="company-card"
                            aria-label={`Visit ${company.name} website`}
                        >
                            <div className="company-logo">
                                <img 
                                    src={company.logo} 
                                    alt={`${company.name} logo`}
                                    width="120"
                                    height="60"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `<div class="company-name-fallback">${company.name}</div>`;
                                    }}
                                />
                            </div>
                            <div className="company-info">
                                <h3>{company.name}</h3>
                                <p>{company.role}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Companies;
