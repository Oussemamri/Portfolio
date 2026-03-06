import React, { useRef, useCallback } from 'react';
import '../assets/styles/components/skills.css';

/* ── SVG icon components ───────────────────────────────────── */
const IconCode = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
);
const IconServer = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.738 5.1a3.38 3.38 0 0 1 2.7-1.35h7.124c1.063 0 2.063.5 2.7 1.35l2.588 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008zm0-6h.008v.008h-.008zm-3 6h.008v.008h-.008zm0-6h.008v.008h-.008z" />
    </svg>
);
const IconDatabase = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
);
const IconCloud = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.5 4.5 0 0 0 2.25 15" />
    </svg>
);
const IconBrain = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
    </svg>
);
const IconCog = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.248a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.282c-.062-.373-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.248a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

/* ── Spotlight card with mouse-tracking blob ───────────────── */
const SpotlightCard = ({ children }) => {
    const cardRef = useRef(null);
    const blobRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current || !blobRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        blobRef.current.style.transform = `translate(${x - 100}px, ${y - 100}px)`;
        blobRef.current.style.opacity = '1';
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (blobRef.current) blobRef.current.style.opacity = '0';
    }, []);

    return (
        <div
            className="m-card-spotlight"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="inner">
                <div className="content">{children}</div>
            </div>
            <div className="blob" ref={blobRef} />
        </div>
    );
};

/* ── Main component ────────────────────────────────────────── */
const Skills = () => {
    const skillCategories = [
        {
            category: 'Frontend',
            skills: ['React','Next', 'Vue', 'TypeScript', 'JavaScript'],
            Icon: IconCode
        },
        {
            category: 'Backend',
            skills: ['Python', 'FastAPI', 'Django', 'NestJS', 'Spring Boot', 'Node.js', 'SQL'],
            Icon: IconServer
        },
        {
            category: 'Database',
            skills: ['PostgreSQL', 'MongoDB', 'Redis'],
            Icon: IconDatabase
        },
        {
            category: 'DevOps',
            skills: ['AWS', 'Docker', 'Jenkins', 'GitLab CI/CD'],
            Icon: IconCloud
        },
        {
            category: 'AI & ML',
            skills: ['Claude Code','Copilot','OpenAI/Gemini APIs', 'Hugging Face', 'Prompt Engineering'],
            Icon: IconBrain
        },
        {
            category: 'Software Engineering',
            skills: ['Microservices', 'Event-Driven Systems', 'REST API Design', 'TDD', 'Agile/Scrum'],
            Icon: IconCog
        }
    ];

    return (
        <section id="skills" className="skills-section">
            <div className="skills-inner">
                <h2 className="skills-title">Technical Stack</h2>

                <div className="skills-grid">
                    {skillCategories.map((cat, idx) => (
                        <SpotlightCard key={idx}>
                            <div className="card-header">
                                <div className="icon-box">
                                    <cat.Icon />
                                </div>
                                <h3>{cat.category}</h3>
                            </div>
                            <div className="badges">
                                {cat.skills.map((skill, i) => (
                                    <span key={i} className="badge">{skill}</span>
                                ))}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;