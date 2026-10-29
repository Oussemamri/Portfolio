import React from 'react';
import SectionHeader from './common/SectionHeader';
import '../assets/styles/components/experience.css';

const Experience = () => {
    return (
        <section className="experience-section" id="experience">
            <div className="container">
                <SectionHeader eyebrow="// role timeline" title="Professional Experience" accent="#E0234E" />

                <div className="experience-timeline">
                    {/* Rocket Factory Augsburg (RFA) */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Rocket Factory Augsburg (RFA)</h3>
                                <span className="experience-date">06/2025 - Present</span>
                            </div>
                            <h4 className="experience-title">Software Engineer — Working Student</h4>
                            <ul className="experience-description">
                                <li>Sole engineer on two internal tools (~42,000 lines combined) used daily by Systems Engineering, Propulsion, Avionics, Launch, and Operations teams; rebuilt both from single-file legacy scripts into tested, layered applications and shipped 10 tagged releases over 10 months.</li>
                                <li>Rebuilt the Vehicle Parameters Database tool (v1 to v2, 102 files) on a layered <strong>FastAPI</strong> + <strong>PyQt5</strong> architecture: a 5-router REST API with <strong>Pydantic</strong> v2 models, JWT sessions over GitLab PAT login, and 4-tier role-based access (Reporter to Owner) with automatic 401 retry.</li>
                                <li>Cut VPD startup from roughly 90 seconds to under 10 by batching Git tree reads with <strong>pygit2</strong> and layering three caches; reduced commit size with a delta store that pushes only changed parameters instead of the full dictionary.</li>
                                <li>Decomposed the P&amp;ID tag-management tool from three monolithic scripts (one god class, no tests) into six single-responsibility packages, and wrote an S-expression parser that recovers schematic components KiCad silently drops on XML export; vectorized the validation pipeline in <strong>pandas</strong> for a 10–100× speedup on large schematics.</li>
                                <li>Built 17+ PyQt5 dialogs with 180 ms debounced real-time search and an 18-column lazy-loaded ParameterTreeModel; maintained a <strong>GitLab CI/CD</strong> pipeline across 4 branches, a Windows installer wizard (<strong>PyInstaller</strong>), and a self-update system.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bouygues Telecom */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Bouygues Telecom</h3>
                                <span className="experience-date">June 2024 to May 2025</span>
                            </div>
                            <h4 className="experience-title">Frontend Engineer Intern</h4>
                            <p className="experience-summary">Developed and maintained internal business applications at Bouygues Telecom, working with the frontend team on the Wholesale and CDP back-office tools.</p>
                            <ul className="experience-description">
                                <li>Built <strong>React</strong> and <strong>TypeScript</strong> interfaces with reusable components and forms supporting business workflows.</li>
                                <li>Maintained the CDP back-office, fixing defects and improving user journeys.</li>
                                <li>Integrated <strong>Node.js</strong> APIs, including data validation, loading states and error handling.</li>
                                <li>Contributed to <strong>Jest</strong> tests, <strong>Git</strong> code reviews and <strong>GitLab CI</strong> pipelines, with development tracked in <strong>Jira</strong>.</li>
                            </ul>
                            <p className="experience-summary"><strong>Skills:</strong> React, TypeScript, JavaScript, REST APIs, Jest, Git, GitLab CI/CD and Jira.</p>
                        </div>
                    </div>

                    {/* Talan - 2023 internship */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisia</h3>
                                <span className="experience-date">06/2023 - 12/2023</span>
                            </div>
                            <h4 className="experience-title">Software Engineering Intern — Full-Stack Development</h4>
                            <ul className="experience-description">
                                <li>Developed HR platform features including profile management, document workflows, leave tracking, and analytics dashboards using <strong>NestJS</strong>, <strong>React</strong>, and <strong>PostgreSQL</strong>.</li>
                                <li>Established a <strong>Jenkins</strong> CI/CD pipeline with <strong>Docker</strong> to streamline deployments and support more reliable release workflows.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
