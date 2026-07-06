import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaHome, FaCode, FaBriefcase, FaHistory,
    FaFolder, FaUser, FaEnvelope, FaRobot
} from 'react-icons/fa';
import '../assets/styles/components/header.css';
import ChatWidget from '../components/ChatWidget/ChatWidget';
import logoImg from '../assets/images/logo_app.webp';
import useScrollPosition from '../hooks/useScrollPosition';

const NAV_LINKS = [
    { label: 'Home',       to: '/',           Icon: FaHome      },
    { label: 'Skills',     to: '/skills',     Icon: FaCode      },
    { label: 'Services',   to: '/services',   Icon: FaBriefcase },
    { label: 'Experience', to: '/experience', Icon: FaHistory   },
    { label: 'Work',       to: '/work',       Icon: FaFolder    },
    { label: 'About',      to: '/about',      Icon: FaUser      },
    { label: 'Contact',    to: '/contact',    Icon: FaEnvelope  },
];

const SPRING = { type: 'spring', stiffness: 350, damping: 30 };

const Header = () => {
    const location = useLocation();
    const scrollY = useScrollPosition();
    const scrolled = scrollY > 60;

    return (
        <>
            <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
                <div className="header-row">
                    {/* Logo */}
                    <Link to="/" className="header-logo" aria-label="Home">
                        <img src={logoImg} alt="OA" className="logo-img" />
                    </Link>

                    {/* Desktop glass pill nav */}
                    <nav className="nav-pill" aria-label="Main navigation">
                        {NAV_LINKS.map(({ label, to }) => {
                            const isActive = location.pathname === to;
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`nav-item${isActive ? ' nav-item--active' : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-lamp"
                                            className="nav-lamp"
                                            initial={false}
                                            transition={SPRING}
                                        />
                                    )}
                                    <span className="nav-label">{label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* AI Chat button — right column */}
                    <div className="header-right">
                        <button
                            className="ai-chat-btn"
                            onClick={() => document.querySelector('.chat-toggle-button')?.click()}
                            aria-label="Open AI Chat"
                        >
                            <FaRobot aria-hidden="true" />
                            <span className="ai-chat-label">AI Chat</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile bottom pill nav — icons only */}
            <nav className="mobile-nav" aria-label="Mobile navigation">
                <div className="mobile-nav-pill">
                    {NAV_LINKS.map(({ label, to, Icon }) => {
                        const isActive = location.pathname === to;
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`mobile-item${isActive ? ' mobile-item--active' : ''}`}
                                aria-label={label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="mobile-lamp"
                                        className="nav-lamp"
                                        initial={false}
                                        transition={SPRING}
                                    />
                                )}
                                <span className="mobile-icon">
                                    <Icon size={17} aria-hidden="true" />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <ChatWidget />
        </>
    );
};

export default Header;
