import React, { useState } from 'react';
import Card from './common/Card';
import '../assets/styles/components/projects.css';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    
    const projectList = [
        {
            title: 'Personal Portfolio Website',
            description: 'Responsive portfolio website with React frontend and Express.js backend. Features include an AI-powered chat assistant, dynamic project filtering, and contact form with email integration.',
            technologies: 'React, Express.js, Docker, AWS (EC2, S3, Lambda, CodePipeline)',
            period: '2025/01 - 2025/03',
            link: 'https://oussemaamri.com',
            repos: [
                { name: 'Frontend', url: 'https://github.com/Oussemamri/Portfolio' },
                { name: 'Backend', url: 'https://github.com/Oussemamri/portfolio-backend' }
            ],
            category: ['web', 'devops', 'cloud']
        },
        {
            title: 'Quiz Application',
            description: 'AI-driven quiz management system with adaptive learning algorithms that personalize quizzes based on user performance.',
            technologies: 'Django, Bootstrap, PostgreSQL',
            period: '2024/09 - 2024/11',
            link: '#',
            repos: [
                { name: 'Repository', url: 'https://github.com/Oussemamri/MindTrack-django' }
            ],
            category: 'web'
        },
        {
            title: 'Collaboradoc - Real-Time Collaboration Platform',
            description: 'Document management system with versioning, real-time commenting features, and AI tools for automated content suggestions.',
            technologies: 'React, NestJS',
            period: '2024/01 - 2024/05',
            link: '#', 
            repos: [
                { name: 'Frontend', url: 'https://github.com/Oussemamri/CollaboraDocFront' },
                { name: 'Backend', url: 'https://github.com/Oussemamri/CollaboraDocBack' }
            ],
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
            repos: [
                { name: 'Frontend', url: 'https://github.com/wadhahzoldyck/FoyerFront' },
                { name: 'Backend', url: 'https://github.com/wadhahzoldyck/GestionFoyerBack' }
            ],
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
        : projectList.filter(project => {
            if (Array.isArray(project.category)) {
                return project.category.includes(activeFilter);
            }
            return project.category === activeFilter;
        });

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
                                {project.repos && (
                                    <div className="repo-links">
                                        <p><strong>GitHub:</strong></p>
                                        <div className="github-buttons">
                                            {project.repos.map((repo, repoIndex) => (
                                                <a 
                                                    key={repoIndex}
                                                    href={repo.url}
                                                    className="github-link"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaGithub /> {repo.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
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