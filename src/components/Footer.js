import React from 'react';
import '../assets/styles/components/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Oussema Amri. All rights reserved.</p>
                <div className="footer-links">
                    <a href="https://github.com/Oussemamri" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://linkedin.com/in/oussema-amri" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;