import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import usePageTransition from '../hooks/usePageTransition';

const Home = () => {
    // Initialize the page transition effect
    usePageTransition();
    
    return (
        <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
        </main>
    );
};

export default Home;