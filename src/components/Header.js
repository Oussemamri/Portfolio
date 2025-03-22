import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollPosition from '../hooks/useScrollPosition';
import '../assets/styles/components/header.css';
import { scrollToElement } from '../utils/helpers';

const Header = () => {
    const scrollPosition = useScrollPosition();
    const [menuOpen, setMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    
    useEffect(() => {
        setHasScrolled(scrollPosition > 50);
    }, [scrollPosition]);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };
    
    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        handleLinkClick();
    };

    return (
        <header className={`header ${hasScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <a href="#home" onClick={scrollToTop}>
                        <h1>
                            <span className="logo-first">Oussema</span>
                            <span className="logo-last">Amri</span>
                        </h1>
                    </a>
                </div>
                
                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
                
                <nav className="main-nav">
                    <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                        <li><a href="#home" onClick={scrollToTop} className="nav-link">Home</a></li>
                        <li><a href="#about" onClick={handleLinkClick} className="nav-link">About</a></li>
                        <li><a href="#projects" onClick={handleLinkClick} className="nav-link">Work</a></li>
                        <li><a href="#contact" onClick={handleLinkClick} className="nav-link contact-btn">Contact</a></li>
                    </ul>
                </nav>
                
                <div className="theme-toggle">
                    <input type="checkbox" id="theme-toggle" className="theme-toggle-checkbox" />
                    <label htmlFor="theme-toggle" className="theme-toggle-label">
                        <i className="fas fa-sun"></i>
                        <i className="fas fa-moon"></i>
                    </label>
                </div>
            </div>
        </header>
    );
};

export default Header;