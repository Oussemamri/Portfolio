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
                                <span className="experience-date">02/2025 - Present</span>
                            </div>
                            <h4 className="experience-title">Software Engineer Working Student</h4>
                            <ul className="experience-description">
                                <li>Built an internal engineering document management system from requirements to production, later adopted company-wide.</li>
                                <li>Designed and operated a full-stack application using <strong>FastAPI</strong>, <strong>React</strong>, and <strong>PostgreSQL</strong>, deployed with <strong>Docker Compose</strong>, <strong>GitLab CI/CD</strong>, and <strong>Portainer</strong>.</li>
                                <li>Implemented core workflows including automated DOCX-to-PDF conversion, document versioning, and approval workflows.</li>
                                <li>Owned development and maintenance of multiple internal production applications, resolving incidents and improving system reliability.</li>
                                <li>Improved performance and fault tolerance by moving long-running tasks to <strong>Celery</strong> and <strong>Redis</strong>, and expanded test coverage with <strong>pytest</strong> and <strong>Playwright</strong>.</li>
                                <li>Integrated the <strong>Personio API</strong> with the central user service to synchronize employee data and automate account lifecycle, access control, notifications, and cross-application user provisioning.</li>
                                <li>Reworked monitoring across internal applications by migrating from <strong>Sentry</strong> to <strong>Grafana</strong> and <strong>Loki</strong>.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Happy Nation */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Happy Nation GmbH</h3>
                                <span className="experience-date">06/2024 - 12/2024</span>
                            </div>
                            <h4 className="experience-title">Full Stack Developer (Intern)</h4>
                            <ul className="experience-description">
                                <li>Built a full-stack citizen platform with <strong>Django REST Framework</strong>, <strong>React</strong>, and <strong>PostgreSQL</strong>, including <strong>JWT</strong> authentication, role-based access control, and an admin-gated account approval workflow.</li>
                                <li>Engineered a multi-step onboarding flow with ticket verification, brute-force protection, and automated transactional emails.</li>
                                <li>Designed a hierarchical stamp system with image upload, server-side compression using <strong>Pillow</strong>, <strong>S3</strong> storage integration, and usage-milestone email alerts.</li>
                                <li>Implemented an interactive digital passport with a custom flip-book UI using <strong>react-pageflip</strong>, preloading assets at startup with <strong>fflate</strong> compression to reduce load time.</li>
                                <li>Integrated the <strong>Brevo API</strong> for newsletter subscriptions and configurable stamp reminder notifications.</li>
                                <li>Containerized the platform with <strong>Docker</strong>, configured <strong>Nginx</strong> as a reverse proxy, deployed behind <strong>Cloudflare</strong>, and documented endpoints with <strong>Swagger</strong> using <strong>drf-yasg</strong>.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Talan - NestJS internship */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisia</h3>
                                <span className="experience-date">07/2023 - 09/2023</span>
                            </div>
                            <h4 className="experience-title">Software Engineering Intern – Full Stack Development</h4>
                            <ul className="experience-description">
                                <li>Delivered HR platform features including profile management, document workflows, leave tracking, and analytics dashboards using <strong>NestJS</strong>, <strong>React</strong>, and <strong>PostgreSQL</strong>.</li>
                                <li>Established a <strong>Jenkins</strong> CI/CD pipeline with <strong>Docker</strong> to streamline deployments and support more reliable release workflows.</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Talan - Symfony internship */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisia</h3>
                                <span className="experience-date">02/2023 - 05/2023</span>
                            </div>
                            <h4 className="experience-title">Software Engineering Intern – Full Stack Development</h4>
                            <ul className="experience-description">
                                <li>Created a task and meeting management platform with <strong>Symfony</strong>, <strong>Vue.js</strong>, and <strong>MySQL</strong>, including role-based access control and collaboration features for team coordination.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;