import React from 'react';
import '../assets/styles/components/experience.css';

const Experience = () => {
    return (
        <section className="experience-section" id="experience">
            <div className="container">
                <h2>Professional Experience</h2>
                
                <div className="experience-timeline">
                    {/* New Happy Nation Internship */}
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Happy Nation</h3>
                                <span className="experience-date">October 2023 - January 2024</span>
                            </div>
                            <h4 className="experience-title">Full Stack Developer - Internship</h4>
                            <ul className="experience-description">
                                <li>Implemented user passport functionality, enabling users to collect digital stamps across the platform. Enhanced the authentication system with proactive JWT token refreshing for improved security.</li>
                                <li>Deployed and managed the application using AWS services including <strong>EC2</strong>, <strong>S3</strong>, <strong>ECR</strong>, <strong>IAM</strong>, <strong>AMI</strong>, <strong>CodePipeline</strong>, <strong>CodeBuild</strong>, <strong>CloudWatch</strong>, and <strong>Lambda</strong>.</li>
                                <li>Architected and implemented a dynamic frontend component system with 40% code reusability across the platform. Integrated the <strong>Brevo API</strong> into the Django backend, developing a scalable newsletter subscription service that increased customer engagement by 25%.</li>
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
                            <h4 className="experience-title">Human Resources Management Platform (RHP)</h4>
                            <ul className="experience-description">
                                <li>Developed and maintained key features such as profile management, document handling, and leave tracking using <strong>NestJS</strong> and <strong>React</strong>. Implemented a dynamic dashboard for real-time HR analytics.</li>
                                <li>Collaborated in a <strong>Scrum</strong> team to improve user experience and streamline HR processes, resulting in a 15% increase in efficiency. Enhanced the onboarding process by automating document verification.</li>
                                <li>Performed code reviews and implemented best practices to improve code quality and maintainability. Introduced a CI/CD pipeline to automate testing and deployment.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="experience-item">
                        <div className="experience-content">
                            <div className="experience-header">
                                <h3>Talan Tunisie</h3>
                                <span className="experience-date">July 2023 - August 2023</span>
                            </div>
                            <h4 className="experience-title">Project and Meeting Management Platform (Similar to Trello)</h4>
                            <ul className="experience-description">
                                <li>Designed and implemented task and meeting management features using <strong>Symfony</strong> and <strong>Vue.js</strong>, improving project tracking by 20%. Developed calendar integration for seamless scheduling.</li>
                                <li>Led the integration of permission and update management systems, enhancing security and user control. Created a role-based access control system to manage user permissions.</li>
                                <li>Participated in daily stand-ups and sprint planning to ensure timely delivery of project milestones. Facilitated retrospectives to identify and implement process improvements.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;