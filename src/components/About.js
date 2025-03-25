import React from 'react';
import '../assets/styles/components/about.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <h2>About Me</h2>
            <div className="about-content">
                <div className="about-text">
                    <p>
                        I'm a Computer Science student currently pursuing my Master's degree at Hochschule Schmalkalden in Germany.
                        I specialize in software development with a focus on web development, DevOps, and AWS cloud technologies.
                    </p>
                    <p>
                        With practical experience in developing scalable applications using React, Spring Boot, and Django,
                        I enjoy working in Agile environments and automating CI/CD pipelines to streamline development processes.
                    </p>
                    <p>
                        I'm currently enhancing my cloud expertise by preparing for the AWS Certified Cloud Practitioner certification.
                    </p>
                </div>
                <div className="education">
                    <h3>Education</h3>
                    <div className="education-item">
                        <h4>Master's in Computer Science</h4>
                        <p>Hochschule Schmalkalden, Germany (2024-2025)</p>
                    </div>
                    <div className="education-item">
                        <h4>Master's in Computer Science</h4>
                        <p>Esprit School of Engineering, Tunisia (2020-2025)</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;