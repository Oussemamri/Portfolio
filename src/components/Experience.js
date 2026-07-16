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
                                <span className="experience-date">06/2025 - 04/2026</span>
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

                    {/* Happy Nation */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Happy Nation Global</h3>
                                <span className="experience-date">06/2024 - 06/2025</span>
                            </div>
                            <h4 className="experience-title">Full-Stack Developer — Intern</h4>
                            <ul className="experience-description">
                                <li>Designed and deployed a full-stack civic platform on <strong>AWS</strong> using <strong>Django REST Framework</strong>, <strong>React</strong>, and <strong>PostgreSQL</strong>, with multi-step onboarding, ticket verification, and brute-force protection.</li>
                                <li>Built a media pipeline with <strong>Pillow</strong> image compression and <strong>S3</strong> storage; integrated <strong>Brevo</strong> for transactional emails and reached a 95% Lighthouse SEO score.</li>
                                <li>Configured <strong>GitHub Actions</strong> CI/CD to build Docker images, push to <strong>Amazon ECR</strong>, and deploy to <strong>EC2</strong> with zero manual steps; provisioned S3, IAM, CloudFront, Nginx, and Cloudflare Tunnel.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Talan - 2024 internship */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisia</h3>
                                <span className="experience-date">06/2024 - 08/2024</span>
                            </div>
                            <h4 className="experience-title">Software Engineering Intern — Full-Stack Development</h4>
                            <ul className="experience-description">
                                <li>Extended HR platform features (profile management, document workflows, leave tracking, dashboards) using <strong>NestJS</strong>, <strong>Vue.js</strong>, <strong>PostgreSQL</strong>, <strong>Docker</strong>, and <strong>Jenkins</strong> CI/CD.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Talan - 2023 internship */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisia</h3>
                                <span className="experience-date">06/2023 - 08/2023</span>
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