import React from 'react';
import '../assets/styles/components/hero.css';

const Hero = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="hero" id="home">
            <div className="hero-container">
                <div className="hero-text">
                    <h1>Oussema Amri</h1>
                    <h2>Software Engineer | Full-Stack Developer</h2>
                    <p>Based in Augsburg, Bavaria, Germany | Specializing in scalable applications, cloud architecture, and DevOps automation</p>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn primary">View My Work</a>
                        <a href="#contact" className="btn secondary">Contact Me</a>
                    </div>
                </div>
                <div className="hero-visual">
                    {/* The images are handled via CSS background for the hover effect */}
                </div>
            </div>

            <div className="scroll-indicator" onClick={scrollToAbout}>
                <span>Explore More</span>
                <div className="chevron"></div>
            </div>
        </section>
    );
};

export default Hero;