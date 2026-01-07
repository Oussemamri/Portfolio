import React from 'react';
import '../assets/styles/components/skills.css';

const Skills = () => {
    const skillCategories = [
        {
            category: 'Programming Languages',
            skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML/CSS'],
            icon: 'fa-code'
        },
        {
            category: 'Frameworks & Libraries',
            skills: ['React', 'Node.js', 'NestJS', 'Django', 'FastAPI', 'Spring Boot', 'PyQt5', 'Express.js'],
            icon: 'fa-layer-group'
        },
        {
            category: 'DevOps & Cloud',
            skills: ['Docker', 'Jenkins', 'GitLab CI/CD', 'Git', 'AWS (EC2, S3, Lambda, CodePipeline, CloudWatch)'],
            icon: 'fa-infinity'
        },
        {
            category: 'Databases',
            skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
            icon: 'fa-database'
        },
        {
            category: 'AI/ML Tools',
            skills: ['OpenAI API', 'Gemini API', 'Hugging Face Transformers', 'GitHub Copilot', 'Prompt Engineering'],
            icon: 'fa-robot'
        },
        {
            category: 'Tools & Practices',
            skills: ['Jira', 'Postman', 'Swagger', 'Agile/Scrum', 'REST API Design', 'TDD', 'Code Review'],
            icon: 'fa-tools'
        },
        {
            category: 'Architecture',
            skills: ['Microservices', 'Event-Driven Systems', 'MVC', 'Client-Server'],
            icon: 'fa-sitemap'
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