import React from 'react';
import heroPhoto from '../assets/images/my_photo.png';
import '../assets/styles/components/hero.css';

const Hero = () => {
    const scrollToSkills = () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            window.scrollTo({
                top: skillsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="hero" id="home">
            <div className="hero-container">
                <div className="hero-text">
                    <h1>Oussema Amri</h1>
                    <h2>Full-Stack Developer JS &amp; TS</h2>
                    <p>Full-Stack Software Engineer open to frontend, backend, and full-stack opportunities. I build clean, scalable products that solve real business problems.</p>

                    <div className="hero-socials">
                        <a href="https://github.com/oussemaamri" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
                        </a>
                        <a href="https://linkedin.com/in/oussema-amri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.886 20.452H3.788V9h3.098v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg>
                        </a>
                    </div>

                    <div className="hero-buttons">
                        <a href="#contact" className="btn primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            Contact me
                        </a>
                        <a href={`${process.env.PUBLIC_URL}/cv/Oussema_Amri_CV.pdf`} className="btn secondary" download="Oussema_Amri_CV.pdf">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            Download CV
                        </a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-animated-element">
                        <div className="hero-image-blob">
                            <img
                                src={heroPhoto}
                                alt="Photo of Oussema Amri"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator" onClick={scrollToSkills} role="button" aria-label="Scroll to Technical Stack section">
                <span>Explore More</span>
                <div className="mouse"></div>
                <div className="chevrons">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;