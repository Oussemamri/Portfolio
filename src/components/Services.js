import React, { useRef, useCallback } from 'react';
import '../assets/styles/components/services.css';

const IconMonitor = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
    </svg>
);

const IconTerminal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25" />
    </svg>
);

const IconRocket = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M15.59 14.37a6 6 0 0 1-5.84 2.58m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.9 14.9 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.9 14.9 0 0 0-2.58 5.84m2.699 2.7a15 15 0 0 1-2.448-2.448m-2.24 2.39a4.49 4.49 0 0 0-1.757 4.306 4.5 4.5 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
    </svg>
);

const IconLightbulb = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M12 18v-5.25m0 0a6 6 0 0 0 1.5-.189m-1.5.189a6 6 0 0 1-1.5-.189m3.75 7.478a12.1 12.1 0 0 1-4.5 0m3.75 2.383a14.4 14.4 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
);

const IconCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

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

const services = [
    {
        title: 'Web Application Development',
        description: 'Custom web applications built with React, Next.js, and TypeScript. From MVPs to enterprise solutions.',
        Icon: IconMonitor,
        items: ['Single Page Applications (SPA)', 'Server-Side Rendering (SSR)', 'Progressive Web Applications (PWA)']
    },
    {
        title: 'API & Backend Development',
        description: 'Scalable REST and GraphQL APIs with Node.js, PostgreSQL, and MongoDB. Secure and performant.',
        Icon: IconTerminal,
        items: ['RESTful API Design', 'GraphQL API Design', 'Authentication & Security']
    },
    {
        title: 'Performance Optimization',
        description: 'Speed up your applications with code splitting, lazy loading, and caching strategies.',
        Icon: IconRocket,
        items: ['Core Web Vitals Optimization', 'Bundle Size Reduction', 'Lighthouse Score Improvement']
    },
    {
        title: 'Consulting & Technical Audit',
        description: 'Technical advice and strategic support to optimize your technology choices and architecture.',
        Icon: IconLightbulb,
        items: ['Code and architecture audit', 'Tailored technology choices', 'Team mentoring and training']
    }
];

const Services = () => {
    return (
        <section id="services" className="services-section">
            <div className="services-inner">
                <h2 className="services-title">Services Offered</h2>
                <p className="services-subtitle">Comprehensive development solutions for your business</p>

                <div className="services-grid">
                    {services.map((service, idx) => (
                        <SpotlightCard key={idx}>
                            <div className="service-icon-box">
                                <service.Icon />
                            </div>
                            <h3 className="service-card-title">{service.title}</h3>
                            <p className="service-card-desc">{service.description}</p>
                            <ul className="service-items">
                                {service.items.map((item, i) => (
                                    <li key={i}>
                                        <span className="check-icon"><IconCheck /></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;