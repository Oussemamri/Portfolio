import React from 'react';
import { SKILL_CATEGORIES } from './skills.data';
import SkillCard from './SkillCard';
import './Skills.css';

const Skills = () => (
  <section id="skills" className="skills-section">
    <div className="skills-inner">
      <h2 className="skills-heading">Technical Stack</h2>
      <p className="skills-subheading">{'// tools & technologies I work with'}</p>

      <div className="skills-grid">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <SkillCard key={cat.category} index={idx} {...cat} />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
