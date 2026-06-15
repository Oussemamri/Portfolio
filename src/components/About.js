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
                            Full-Stack Software Engineer with hands-on experience building production systems
                            across the aerospace and civic tech sectors. Currently contributing as a Software Engineer
                            at Rocket Factory Augsburg, where I own the design, development, and maintenance
                            of internal applications used company-wide.
                        </p>
                        <p>
                            I work across the entire stack — from React frontends and FastAPI services to
                            PostgreSQL schemas and Docker deployments — with a focus on writing clean, maintainable
                            code that solves real operational problems. I'm comfortable taking features from
                            requirements to production and keeping them running reliably.
                        </p>
                        <p>
                            Passionate about developer tooling, CI/CD automation, and AI-assisted workflows.
                            Open to frontend, backend, and full-stack roles. Based in Munich, Germany —
                            available for on-site, hybrid, or remote positions.
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