import React from 'react';
import '../assets/styles/components/experience.css';

const Experience = () => {
    return (
        <section className="experience-section" id="experience">
            <div className="container">
                <h2>Professional Experience</h2>
                
                <div className="experience-timeline">
                    {/* Rocket Factory Augsburg (RFA) */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Rocket Factory Augsburg (RFA)</h3>
                                <span className="experience-date">June 2025 - Present</span>
                            </div>
                            <h4 className="experience-title">Software Engineer – Avionics Systems</h4>
                            <ul className="experience-description">
                                <li>Architected vehicle parameter management platform using <strong>FastAPI</strong> and <strong>PyQt5</strong>, serving cross-functional engineering teams with real-time data validation and version control integration.</li>
                                <li>Engineered validation system for P&ID diagrams, cross-referencing electrical schematics with KiCad designs to ensure consistency across 500+ system components, eliminating manual verification errors.</li>
                                <li>Optimized parameter loading performance by <strong>20%</strong> through intelligent prefetch mechanism that preloads data during idle CPU cycles, improving engineer productivity.</li>
                                <li>Automated GitLab CI/CD pipeline to generate build artifacts for avionics teams, reducing deployment cycles from hours to minutes and eliminating manual packaging errors.</li>
                                <li>Implemented usage analytics dashboard providing visibility into parameter access patterns, enabling data-driven optimization of system architecture.</li>
                                <li>Established code quality standards through pre-commit hooks, automated testing (unit + integration), and systematic PR review process, achieving <strong>85%+ test coverage</strong>.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Happy Nation */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Happy Nation</h3>
                                <span className="experience-date">October 2024 - January 2025</span>
                            </div>
                            <h4 className="experience-title">Full Stack Developer</h4>
                            <ul className="experience-description">
                                <li>Developed Canvas-based digital artwork composition system generating 3,333 unique NFT passports with real-time drag-and-drop interface and automated thumbnail rendering pipeline.</li>
                                <li>Architected and deployed production platform on <strong>AWS</strong> (EC2, S3, CloudWatch, CodePipeline) with automated CI/CD, achieving <strong>98.5% uptime SLA</strong> and sub-200ms API response times.</li>
                                <li>Built reusable React component library and integrated Brevo API for newsletter management with <strong>Redis caching</strong> layer, reducing database load by <strong>80%</strong>.</li>
                                <li>Achieved <strong>88% test coverage</strong> using pytest/Jest with PR-based code review workflow, ensuring WCAG 2.1 accessibility compliance for all user-facing components.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Existing Talan Experience */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisie</h3>
                                <span className="experience-date">July 2024 - August 2024</span>
                            </div>
                            <h4 className="experience-title">Software Engineering Intern – Full Stack Development</h4>
                            <ul className="experience-description">
                                <li>Developed core HR platform features (profile management, document workflows, leave tracking) using <strong>NestJS</strong> and <strong>React</strong>, improving data accessibility through real-time analytics dashboard.</li>
                                <li>Implemented CI/CD pipeline with <strong>Jenkins</strong> and <strong>Docker</strong>, reducing deployment time by <strong>30%</strong> and enabling daily releases.</li>
                                <li>Collaborated in Scrum team to deliver sprint commitments, participating in daily standups, retrospectives, and sprint planning sessions.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisie</h3>
                                <span className="experience-date">July 2023 - August 2023</span>
                            </div>
                            <h4 className="experience-title">Software Engineering Intern – Full Stack Development</h4>
                            <ul className="experience-description">
                                <li>Built task and meeting management platform using <strong>Symfony</strong> and <strong>Vue.js</strong>, implementing role-based access control and real-time collaboration features.</li>
                                <li>Designed permission management system with granular update controls, enhancing security and team collaboration workflows.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;