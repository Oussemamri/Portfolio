import React, { Suspense } from 'react';
import Hero from '../components/Hero';
import ScrollReveal from '../components/common/ScrollReveal';
import usePageTransition from '../hooks/usePageTransition';

const Skills = React.lazy(() => import('../components/Skills'));
const About = React.lazy(() => import('../components/About'));
const Companies = React.lazy(() => import('../components/Companies'));
const Experience = React.lazy(() => import('../components/Experience'));
const Projects = React.lazy(() => import('../components/Projects'));
const Contact = React.lazy(() => import('../components/Contact'));
const Languages = React.lazy(() => import('../components/Languages'));

const SectionFallback = () => (
    <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '36px', height: '36px', border: '3px solid #e0e0e0', borderTopColor: '#333', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

const Home = () => {
    usePageTransition();
    
    return (
        <main>
            <Hero />
            <Suspense fallback={<SectionFallback />}>
                <ScrollReveal animation="fade-up" duration={800}>
                    <Skills />
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100} duration={800}>
                    <Companies />
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100} duration={800}>
                    <Experience />
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100} duration={800}>
                    <Projects />
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100} duration={800}>
                    <About />
                </ScrollReveal>
                <ScrollReveal animation="fade-up" delay={100} duration={800}>
                    <Contact />
                </ScrollReveal>
                <ScrollReveal animation="fade-up" duration={600}>
                    <Languages />
                </ScrollReveal>
            </Suspense>
        </main>
    );
};

export default Home;