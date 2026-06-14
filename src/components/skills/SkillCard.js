import React, { useRef, useCallback } from 'react';

const SkillCard = ({ category, CategoryIcon, accent, skills, index }) => {
  const cardRef  = useRef(null);
  const blobRef  = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !blobRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    blobRef.current.style.transform = `translate(${e.clientX - rect.left - 110}px, ${e.clientY - rect.top - 110}px)`;
    blobRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (blobRef.current) blobRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      className="sk-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--accent': accent, '--delay': `${index * 80}ms` }}
    >
      <div className="sk-blob" ref={blobRef} />

      <div className="sk-inner">
        <div className="sk-header">
          <span className="sk-category-icon">
            <CategoryIcon />
          </span>
          <h3 className="sk-category-name">{category}</h3>
          <span className="sk-count">{skills.length}</span>
        </div>

        <div className="sk-divider" />

        <div className="sk-badges">
          {skills.map(({ name, Icon, color }) => (
            <span
              key={name}
              className="sk-badge"
              style={{ '--brand': color }}
            >
              <Icon className="sk-badge-icon" aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
