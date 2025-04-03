import React from 'react';
import '../assets/styles/components/hero.css';
// Import background image
import backgroundImage from '../assets/images/Background.jpg';

const Hero = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            // Using a smoother scroll approach
            window.scrollTo({
                top: aboutSection.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    };

    return (
        <section 
            className="hero" 
            id="home"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
                // Changed from 0.7 to 0.4/0.5 to make it lighter
            }}
        >
            <div className="hero-content">
                <h1>Oussema Amri</h1>
                <h2>Software Developer</h2>
                <p>Highly motivated Computer Science student specializing in web development, DevOps, and AWS</p>
                <div className="hero-buttons">
                    <a href="#projects" className="btn primary">View My Work</a>
                    <a href="#contact" className="btn secondary">Contact Me</a>
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