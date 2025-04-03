import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollPosition from '../hooks/useScrollPosition';
import '../assets/styles/components/header.css';
import { scrollToElement } from '../utils/helpers';
import ChatWidget from '../components/ChatWidget/ChatWidget'; // Add this import

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

    const handleLinkClick = (e) => {
        // If the link has an href attribute that starts with #
        if (e.currentTarget.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            scrollToElement(targetId);
        }
        setMenuOpen(false);
    };
    
    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        handleLinkClick(e);
    };

    return (
        <>
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
                    
                    <nav className="main-nav">
                        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                            <li><a href="#home" onClick={scrollToTop} className="nav-link">Home</a></li>
                            <li><a href="#about" onClick={handleLinkClick} className="nav-link">About</a></li>
                            <li><a href="#experience" onClick={handleLinkClick} className="nav-link">Experience</a></li>
                            <li><a href="#projects" onClick={handleLinkClick} className="nav-link">Work</a></li>
                            <li><a href="#skills" onClick={handleLinkClick} className="nav-link">Skills</a></li>
                            <li><a href="#contact" onClick={handleLinkClick} className="nav-link">Contact</a></li>
                            <li>
                                <button 
                                    className="nav-link chat-button"
                                    onClick={() => document.querySelector('.chat-toggle-button').click()}
                                >
                                    Chat with AI
                                </button>
                            </li>
                        </ul>
                        
                        <div className="menu-icon" onClick={toggleMenu}>
                            <div className={`menu-line ${menuOpen ? 'active' : ''}`}></div>
                            <div className={`menu-line ${menuOpen ? 'active' : ''}`}></div>
                            <div className={`menu-line ${menuOpen ? 'active' : ''}`}></div>
                        </div>
                    </nav>
                </div>
            </header>
            
            {/* Add ChatWidget here */}
            <ChatWidget />
        </>
    );
};

export default Header;