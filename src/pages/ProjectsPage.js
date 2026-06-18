import React, { useState } from 'react';
import { FaServer, FaGlobe, FaCloud } from 'react-icons/fa';
import { projectList, ProjectCard } from '../components/Projects';
import '../assets/styles/components/projects.css';
import '../assets/styles/pages/projectsPage.css';

const filters = [
    { name: 'All',             value: 'all' },
    { name: 'Web Development', value: 'web' },
    { name: 'DevOps',          value: 'devops' },
    { name: 'Cloud',           value: 'cloud' },
];

const ProjectsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = activeFilter === 'all'
        ? projectList
        : projectList.filter(p =>
            Array.isArray(p.category)
                ? p.category.includes(activeFilter)
                : p.category === activeFilter
        );

    return (
        <main className="projects-page">
            <div className="projects-page-header">
                <p className="projects-page-eyebrow">Work</p>
                <h1 className="projects-page-title">All Projects</h1>
                <p className="projects-page-sub">
                    Every project I've shipped — web apps, DevOps pipelines, and cloud infrastructure.
                </p>
            </div>

            <div className="project-filters">
                {filters.map((f, i) => (
                    <button
                        key={i}
                        className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f.value)}
                    >
                        {f.name}
                    </button>
                ))}
            </div>

            <div className="project-list projects-page-grid">
                {filtered.map((project, i) => (
                    <ProjectCard key={i} {...project} />
                ))}
            </div>
        </main>
    );
};

export default ProjectsPage;
