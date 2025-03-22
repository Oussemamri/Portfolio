import React from 'react';
import '../assets/styles/components/skills.css';

const Skills = () => {
    const skillCategories = [
        {
            category: 'Programming Languages',
            skills: ['Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'C'],
            icon: 'fa-code'
        },
        {
            category: 'Frameworks & Libraries',
            skills: ['React', 'Vue.js', 'Angular', 'NodeJS', 'NestJS', 'ExpressJS', 'Spring Boot', 'Django', '.NET'],
            icon: 'fa-layer-group'
        },
        {
            category: 'Development Tools',
            skills: ['Git', 'Jira', 'Docker', 'Vagrant', 'Postman', 'Swagger'],
            icon: 'fa-tools'
        },
        {
            category: 'IDEs & Environments',
            skills: ['PhpStorm', 'Visual Studio Code', 'Visual Studio', 'IntelliJ IDEA'],
            icon: 'fa-laptop-code'
        },
        {
            category: 'Databases',
            skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
            icon: 'fa-database'
        },
        {
            category: 'DevOps',
            skills: ['Jenkins', 'Prometheus', 'Grafana', 'Nexus', 'JUnit', 'Jest'],
            icon: 'fa-infinity'
        },
        {
            category: 'AWS Services',
            skills: [
                'EC2', 'ECR', 'ECS', 'IAM', 'S3', 
                'Lambda', 'CloudFormation', 'CodePipeline', 
                'CodeBuild', 'CodeDeploy', 'AMI', 'CloudWatch',
                'Route 53', 'RDS', 'Elastic Beanstalk'
            ],
            icon: 'fa-aws'
        }
    ];

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <h2>Technical Skills</h2>
                <div className="skills-container">
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className="skill-category">
                            <div className="skill-header">
                                <i className={`${category.icon === 'fa-aws' ? 'fab' : 'fas'} ${category.icon}`}></i>
                                <h3>{category.category}</h3>
                            </div>
                            <div className="skills-grid">
                                {category.skills.map((skill, index) => (
                                    <div key={index} className="skill-item">
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="languages-section">
                    <h3>Languages</h3>
                    <div className="language-items">
                        <div className="language-item">
                            <div className="language-name">English</div>
                            <div className="language-level">
                                <div className="level-bar">
                                    <div className="level-fill" style={{ width: '90%' }}></div>
                                </div>
                                <span className="proficiency">C1</span>
                            </div>
                        </div>
                        <div className="language-item">
                            <div className="language-name">German</div>
                            <div className="language-level">
                                <div className="level-bar">
                                    <div className="level-fill" style={{ width: '35%' }}></div>
                                </div>
                                <span className="proficiency">A2</span>
                            </div>
                        </div>
                        <div className="language-item">
                            <div className="language-name">French</div>
                            <div className="language-level">
                                <div className="level-bar">
                                    <div className="level-fill" style={{ width: '90%' }}></div>
                                </div>
                                <span className="proficiency">C1</span>
                            </div>
                        </div>
                        <div className="language-item">
                            <div className="language-name">Arabic</div>
                            <div className="language-level">
                                <div className="level-bar">
                                    <div className="level-fill" style={{ width: '100%' }}></div>
                                </div>
                                <span className="proficiency">C2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;