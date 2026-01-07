import React from 'react';
import '../assets/styles/components/about.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2>About Me</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>
                            Software Engineer with 2+ years of experience building scalable full-stack applications in aerospace and fintech sectors. 
                            Currently working at Rocket Factory Augsburg (RFA) on mission-critical avionics systems.
                        </p>
                        <p>
                            Specialized in Python, TypeScript/JavaScript, and modern cloud architectures (AWS). Track record of delivering high-performance 
                            systems with measurable impact: 20% performance gains through optimization, 98.5% uptime for production platforms, and 80% 
                            reduction in database load through caching strategies.
                        </p>
                        <p>
                            Proficient in CI/CD automation, microservices design, and Agile development methodologies. Currently based in Augsburg, Bavaria, Germany.
                        </p>
                    </div>
                    <div className="education">
                        <h3>Education</h3>
                        <div className="education-item">
                            <h4>Engineering Degree in Computer Science (M.Eng. equivalent)</h4>
                            <p>ESPRIT School of Engineering, Tunisia (2022-2025)</p>
                        </div>
                        <div className="education-item">
                            <h4>Exchange Semester – Master in Computer Science</h4>
                            <p>Hochschule Schmalkalden, Germany (2024-2026)</p>
                        </div>
                        <div className="education-item">
                            <h4>Preparatory Institute for Engineering Studies</h4>
                            <p>Intensive Mathematics, Physics & Computer Science (2020-2022)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;