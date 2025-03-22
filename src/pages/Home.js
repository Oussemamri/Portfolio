import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import usePageTransition from '../hooks/usePageTransition';

const Home = () => {
    usePageTransition();
    
    return (
        <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
        </main>
    );
};

export default Home;