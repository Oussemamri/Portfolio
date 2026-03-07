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
                            Full-Stack Software Engineer with over 3 years of experience developing scalable applications 
                            for the fintech and aerospace sectors. Currently a Software Engineer at Rocket Factory Augsburg (RFA), 
                            specializing in Python, TypeScript/JavaScript, and modern cloud architectures (AWS).
                        </p>
                        <p>
                            Track record of delivering high-performance systems with measurable impact: 20% performance gains 
                            through optimization, 98.5% uptime for production platforms, and 80% reduction in database load 
                            through caching strategies.
                        </p>
                        <p>
                            Proficient in CI/CD automation, microservices design, and Agile development methodologies. 
                            Currently based in Munich, Germany.
                        </p>
                    </div>
                    <div className="education">
                        <h3>Education</h3>
                        <div className="education-item">
                            <h4>Engineering Degree in Computer Science (M.Eng. equivalent)</h4>
                            <p>ESPRIT School of Engineering, Tunisia (09/2022 – 06/2025)</p>
                        </div>
                        <div className="education-item">
                            <h4>Exchange Semester – Master in Computer Science</h4>
                            <p>Hochschule Schmalkalden, Germany (10/2024 – 03/2025)</p>
                        </div>
                        <div className="education-item">
                            <h4>Preparatory Institute for Engineering Studies</h4>
                            <p>Intensive Mathematics, Physics & Computer Science (09/2020 – 06/2022)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;