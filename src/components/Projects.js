import React, { useState } from 'react';
import Card from './common/Card';
import '../assets/styles/components/projects.css';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    
    const projectList = [
        {
            title: 'Quiz Application',
            description: 'AI-driven quiz management system with adaptive learning algorithms that personalize quizzes based on user performance.',
            technologies: 'Django, Bootstrap, PostgreSQL',
            period: '2024/09 - 2024/11',
            link: '#',
            category: 'web'
        },
        {
            title: 'Collaboradoc - Real-Time Collaboration Platform',
            description: 'Document management system with versioning, real-time commenting features, and AI tools for automated content suggestions.',
            technologies: 'React, NestJS',
            period: '2024/01 - 2024/05',
            link: '#', 
            category: 'web'
        },
        {
            title: 'DevOps - Application Lifecycle Automation',
            description: 'CI/CD pipeline automation project with monitoring solutions for improved application reliability.',
            technologies: 'Jenkins, Maven, Git, SonarQube, Docker',
            period: '2024/01 - 2024/05',
            link: '#', 
            category: 'devops'
        },
        {
            title: 'Microservices Architecture',
            description: 'Designed and deployed a microservices architecture with service discovery and container management.',
            technologies: 'Spring Boot, Docker',
            period: '2023/09 - 2023/12',
            link: '#', 
            category: 'cloud'
        },
        {
            title: 'University Dormitory Management System',
            description: 'Web application for dormitory and event management with features for room booking and event scheduling.',
            technologies: 'Angular, Spring Boot',
            period: '2023/09 - 2023/12',
            link: '#', 
            category: 'web'
        }
    ];
    
    const filters = [
        { name: 'All', value: 'all' },
        { name: 'Web Development', value: 'web' },
        { name: 'DevOps', value: 'devops' },
        { name: 'Cloud', value: 'cloud' }
    ];
    
    const filteredProjects = activeFilter === 'all' 
        ? projectList 
        : projectList.filter(project => project.category === activeFilter);

    return (
        <section id="projects" className="projects-section">
            <h2>My Projects</h2>
            
            <div className="project-filters">
                {filters.map((filter, index) => (
                    <button 
                        key={index}
                        className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter.value)}
                    >
                        {filter.name}
                    </button>
                ))}
            </div>
            
            <div className="project-list">
                {filteredProjects.map((project, index) => (
                    <Card 
                        key={index} 
                        title={project.title} 
                        description={
                            <>
                                <p>{project.description}</p>
                                <p className="technologies"><strong>Technologies:</strong> {project.technologies}</p>
                                <p className="period"><strong>Period:</strong> {project.period}</p>
                            </>
                        }
                        link={project.link}
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;