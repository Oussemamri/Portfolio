import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaDownload, FaArrowUp } from 'react-icons/fa';
import { Boxes } from './common/BackgroundBoxes';
import '../assets/styles/components/footer.css';

const socialLinks = [
    { icon: <FaGithub />,   href: 'https://github.com/Oussemamri',        label: 'GitHub'   },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/oussema-amri', label: 'LinkedIn' },
    { icon: <FaEnvelope />, to: '/contact',                                label: 'Email'    },
];

const navLinks = [
    { label: 'Home',       to: '/'           },
    { label: 'Skills',     to: '/skills'     },
    { label: 'Services',   to: '/services'   },
    { label: 'Experience', to: '/experience' },
    { label: 'Work',       to: '/work'       },
    { label: 'About',      to: '/about'      },
    { label: 'Languages',  to: '/languages'  },
    { label: 'Contact',    to: '/contact'    },
];

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
    return (
        <section className="footer-section">
            <footer className="footer">

                {/* ── Animated background ── */}
                <Boxes />

                {/* ── Vignette overlay: hides boxes at edges, reveals in center ── */}
                <div className="footer-overlay" aria-hidden="true" />

                {/* ── Main content ── */}
                <div className="footer-inner">
                    <div className="footer-brand">
                        <span className="footer-brand-name">Oussema Amri</span>
                        <p className="footer-brand-desc">
                            Full-Stack Developer &amp; DevOps Engineer — crafting scalable apps
                            and elegant infrastructure.
                        </p>

                        <div className="footer-socials">
                            {socialLinks.map((link) => (
                                link.to ? (
                                    <Link key={link.label} to={link.to} className="footer-social-link" aria-label={link.label}>
                                        {link.icon}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="footer-social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                    >
                                        {link.icon}
                                    </a>
                                )
                            ))}
                        </div>

                        <nav className="footer-nav">
                            {navLinks.map((link) => (
                                <Link key={link.label} to={link.to} className="footer-nav-link">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <a
                            href={`${process.env.PUBLIC_URL}/cv/Oussema_Amri_CV.pdf`}
                            className="footer-cv-link"
                            download="Oussema_Amri_CV.pdf"
                        >
                            <FaDownload aria-hidden="true" /> Download CV
                        </a>
                    </div>

                    <div className="footer-bottom">
                        <button type="button" className="footer-back-to-top" onClick={scrollToTop} aria-label="Back to top">
                            <FaArrowUp aria-hidden="true" />
                        </button>
                        <p>&copy; {new Date().getFullYear()} Oussema Amri. All rights reserved.</p>
                        <p className="footer-built-with">Built with React &middot; deployed on Vercel</p>
                    </div>
                </div>

                {/* ── Decorative layer ── */}
                <div className="footer-bg-text" aria-hidden="true">OUSSEMA AMRI</div>

                <div className="footer-logo-box" aria-hidden="true">
                    <div className="footer-logo-inner">
                        <FaCode className="footer-logo-icon" />
                    </div>
                </div>

                <div className="footer-divider" aria-hidden="true" />
                <div className="footer-shadow"  aria-hidden="true" />

            </footer>
        </section>
    );
};

export default Footer;
