import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import { Boxes } from './common/BackgroundBoxes';
import '../assets/styles/components/footer.css';

const socialLinks = [
    { icon: <FaGithub />,   href: 'https://github.com/Oussemamri',         label: 'GitHub'   },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/oussema-amri',   label: 'LinkedIn' },
    { icon: <FaEnvelope />, href: '#contact',                                label: 'Email'    },
];

const navLinks = [
    { label: 'Skills',      href: '#skills'      },
    { label: 'Experience',  href: '#experience'  },
    { label: 'Projects',    href: '#projects'    },
    { label: 'About',       href: '#about'       },
    { label: 'Contact',     href: '#contact'     },
];

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
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="footer-social-link"
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>

                        <nav className="footer-nav">
                            {navLinks.map((link) => (
                                <a key={link.label} href={link.href} className="footer-nav-link">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Oussema Amri. All rights reserved.</p>
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
