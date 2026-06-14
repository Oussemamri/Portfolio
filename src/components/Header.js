import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useScrollPosition from '../hooks/useScrollPosition';
import '../assets/styles/components/header.css';
import ChatWidget from '../components/ChatWidget/ChatWidget';
import logoImg from '../assets/images/logo_app.png';

const NAV_LINKS = [
  { label: 'Home',       to: '/'           },
  { label: 'Skills',     to: '/skills'     },
  { label: 'Services',   to: '/services'   },
  { label: 'Experience', to: '/experience' },
  { label: 'Work',       to: '/work'       },
  { label: 'About',      to: '/about'      },
  { label: 'Contact',    to: '/contact'    },
];

const Header = () => {
  const scrollPosition = useScrollPosition();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setHasScrolled(scrollPosition > 50);
  }, [scrollPosition]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`header ${hasScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src={logoImg} alt="OA" className="logo-img" />
            </Link>
          </div>

          <nav className="main-nav">
            <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`nav-link${location.pathname === to ? ' active' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="nav-link chat-button"
                  onClick={() => document.querySelector('.chat-toggle-button')?.click()}
                >
                  Chat with AI
                </button>
              </li>
            </ul>

            <div className="menu-icon" onClick={() => setMenuOpen(m => !m)}>
              <div className={`menu-line ${menuOpen ? 'active' : ''}`} />
              <div className={`menu-line ${menuOpen ? 'active' : ''}`} />
              <div className={`menu-line ${menuOpen ? 'active' : ''}`} />
            </div>
          </nav>
        </div>
      </header>

      <ChatWidget />
    </>
  );
};

export default Header;
