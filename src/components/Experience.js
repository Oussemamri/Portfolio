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
                                <span className="experience-date">February 2025 - Present</span>
                            </div>
                            <h4 className="experience-title">Full Stack Software Intern – Software Development</h4>
                            <ul className="experience-description">
                                <li>Built a Vehicle Parameter Management Platform (<strong>React/FastAPI/PostgreSQL</strong>) enabling 15+ engineering teams to configure, review, and collaborate on rocket vehicle parameters with real-time feedback loops.</li>
                                <li>Developed an interactive P&ID Visualization Dashboard for avionics diagrams, enabling engineers to navigate complex schematics, create revisions autonomously, and track KiCAD file changes with automated diff detection.</li>
                                <li>Designed a Python-based validation engine reconciling 500+ electrical schema components with business logic rules, eliminating manual verification errors.</li>
                                <li>Reduced dashboard load time by <strong>20%</strong> through React code-splitting with React.lazy(), component memoization with useMemo/useCallback, and TanStack Query for server-state caching.</li>
                                <li>Configured GitLab CI pipelines with <strong>Docker</strong> containerization for automated testing and deployment, integrated pytest unit tests and pre-commit hooks for code quality enforcement.</li>
                                <li>Achieved <strong>85%+ code coverage</strong> using pytest (backend) and Playwright (E2E frontend tests), implementing comprehensive test suites for parameter validation logic and UI workflows.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Happy Nation */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Happy Nation GmbH</h3>
                                <span className="experience-date">June 2024 - December 2024</span>
                            </div>
                            <h4 className="experience-title">Full Stack Developer (Intern)</h4>
                            <ul className="experience-description">
                                <li>Built a digital identity platform (<strong>React/Django/PostgreSQL</strong>) unifying community members through personalized NFT passports, featuring responsive interface with dynamic stamp collection, event ticketing, and purchasable art marketplace.</li>
                                <li>Architected and deployed production infrastructure on <strong>AWS</strong> (EC2, S3, CloudWatch, CodePipeline) with automated CI/CD workflows, achieving <strong>98.5% uptime</strong> and API response times under 200ms.</li>
                                <li>Built reusable React component library and integrated Brevo API for newsletter management with <strong>Redis</strong> caching layer, reducing PostgreSQL database queries by <strong>80%</strong>.</li>
                                <li>Achieved <strong>88% test coverage</strong> using pytest (backend) and Jest (frontend) with PR-based code reviews, implementing accessibility features following WCAG 2.1 guidelines.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Talan - NestJS internship */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisia</h3>
                                <span className="experience-date">July 2023 - September 2023</span>
                            </div>
                            <h4 className="experience-title">Software Engineering Intern – Full Stack Development</h4>
                            <ul className="experience-description">
                                <li>Developed HR platform features (profile management, document workflows, leave tracking) using <strong>NestJS/React/PostgreSQL</strong>, delivering a real-time analytics dashboard for workforce data visualization.</li>
                                <li>Configured <strong>Jenkins</strong> CI/CD pipeline with <strong>Docker</strong> containerization, reducing deployment time by <strong>30%</strong> and enabling automated daily production releases.</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Talan - Symfony internship */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisia</h3>
                                <span className="experience-date">February 2023 - May 2023</span>
                            </div>
                            <h4 className="experience-title">Software Engineering Intern – Full Stack Development</h4>
                            <ul className="experience-description">
                                <li>Built a task and meeting management platform using <strong>Symfony/Vue.js/MySQL</strong>, implementing Role-Based Access Control (RBAC) and real-time collaboration features for team coordination.</li>
                                <li>Designed granular permission management system with role-specific access controls, enhancing security for multi-user workflows and document sharing.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;