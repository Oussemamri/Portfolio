import React, { useState } from 'react';
import { FaGithub, FaGlobe, FaServer, FaCloud } from 'react-icons/fa';
import '../assets/styles/components/projects.css';

const categoryConfig = {
    web:    { icon: <FaGlobe />,  bg: '#eef2ff', border: '#c7d2fe', color: '#4338ca', label: 'Web' },
    devops: { icon: <FaServer />, bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', label: 'DevOps' },
    cloud:  { icon: <FaCloud />,  bg: '#fdf4ff', border: '#e9d5ff', color: '#7c3aed', label: 'Cloud' },
};

const primaryCategory = (category) => Array.isArray(category) ? category[0] : category;

const ProjectCard = ({ title, description, technologies, period, repos, category }) => {
    const cat = primaryCategory(category);
    const cfg = categoryConfig[cat] || categoryConfig.web;

    return (
        <div className="project-card">
            <div className="project-card-header">
                <div
                    className="project-icon"
                    style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
                >
                    {cfg.icon}
                </div>
                <span
                    className="project-category-badge"
                    style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
                >
                    {cfg.label}
                </span>
            </div>

            <h3 className="project-title">{title}</h3>
            <p className="project-description">{description}</p>

            <div className="project-tech-list">
                {technologies.split(', ').map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                ))}
            </div>

            <div className="project-footer">
                <span className="project-period">{period}</span>
                {repos && (
                    <div className="project-repo-links">
                        {repos.map((repo, i) => (
                            <a
                                key={i}
                                href={repo.url}
                                className="project-github-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub /> {repo.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

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
            repos: [
                { name: 'Repository', url: 'https://github.com/Oussemamri/MindTrack-django' }
            ],
            category: 'web'
        },
        {
            title: 'Collaboradoc — Real-Time Collaboration Platform',
            description: 'Document management system with versioning, real-time commenting features, and AI tools for automated content suggestions.',
            technologies: 'React, NestJS',
            period: '2024/01 - 2024/05',
            repos: [
                { name: 'Frontend', url: 'https://github.com/Oussemamri/CollaboraDocFront' },
                { name: 'Backend', url: 'https://github.com/Oussemamri/CollaboraDocBack' }
            ],
            category: 'web'
        },
        {
            title: 'DevOps — Application Lifecycle Automation',
            description: 'CI/CD pipeline automation project with monitoring solutions for improved application reliability.',
            technologies: 'Jenkins, Maven, Git, SonarQube, Docker',
            period: '2024/01 - 2024/05',
            category: 'devops'
        },
        {
            title: 'Microservices Architecture',
            description: 'Designed and deployed a microservices architecture with service discovery and container management.',
            technologies: 'Spring Boot, Docker',
            period: '2023/09 - 2023/12',
            category: 'cloud'
        },
        {
            title: 'University Dormitory Management System',
            description: 'Web application for dormitory and event management with features for room booking and event scheduling.',
            technologies: 'Angular, Spring Boot',
            period: '2023/09 - 2023/12',
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
            if (Array.isArray(project.category)) return project.category.includes(activeFilter);
            return project.category === activeFilter;
        });

    return (
        <section id="projects" className="projects-section">
            <div className="projects-glow" aria-hidden="true" />
            <h2>My Projects</h2>
            <p className="projects-subtitle">
                A collection of projects built with intention — from web apps to DevOps pipelines and cloud infrastructure.
            </p>

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
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
