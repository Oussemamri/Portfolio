import React, { useState } from 'react';
import PageShell from '../components/common/PageShell';
import { projectList, ProjectCard } from '../components/Projects';
import '../assets/styles/components/projects.css';
import '../assets/styles/pages/projectsPage.css';

const filters = [
  { name: 'All',             value: 'all' },
  { name: 'Web Development', value: 'web' },
  { name: 'DevOps',          value: 'devops' },
  { name: 'Cloud',           value: 'cloud' },
];

const matchesFilter = (project, filter) =>
  Array.isArray(project.category)
    ? project.category.includes(filter)
    : project.category === filter;

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projectList
    : projectList.filter((p) => matchesFilter(p, activeFilter));

  return (
    <PageShell
      title="Work"
      subtitle="// projects I've designed and shipped"
      accent="#4FC08D"
    >
      <div className="project-filters">
        {filters.map((f) => (
          <button
            key={f.value}
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
    </PageShell>
  );
};

export default WorkPage;
