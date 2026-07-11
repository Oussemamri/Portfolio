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
                                <span className="experience-date">05/2025 - 04/2026</span>
                            </div>
                            <h4 className="experience-title">Software Engineer — Working Student</h4>
                            <ul className="experience-description">
                                <li>Independently led the full refactoring and extension of two mission-critical internal tools used daily by Systems Engineering, Propulsion, Avionics, Launch, and Operations teams (~42,000 lines across both codebases).</li>
                                <li>Redesigned the Vehicle Parameters Database tool from a monolithic script into a layered <strong>FastAPI</strong> + <strong>PyQt5</strong> architecture with a 5-router REST API, JWT auth, and 4-tier role-based access control; shipped 10 production releases.</li>
                                <li>Cut tool startup from ~90s to ~6–8s via batch Git tree loading and 3-layer caching; eliminated O(n²) loops with vectorized <strong>pandas</strong> for a 10–100× speedup on large schematics.</li>
                                <li>Decomposed a 3,700-line legacy class into 6 single-responsibility Python packages; built Git integration (pygit2) with delta-store commits, an auto-update system, CI/CD pipelines, and Windows installers.</li>
                                <li>Delivered an internal engineering document management system (<strong>FastAPI</strong>, <strong>React</strong>, <strong>PostgreSQL</strong>) with automated DOCX-to-PDF conversion, versioning, and approval workflows, deployed via <strong>Docker Compose</strong> and <strong>GitLab CI/CD</strong>.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Happy Nation */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Happy Nation Global</h3>
                                <span className="experience-date">01/2025 - 05/2025</span>
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