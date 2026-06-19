import React from 'react';
import '../assets/styles/components/about.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-grid">

                {/* Col 1, Row 1 — "ABOUT" headline */}
                <div className="about-cell cell-about-title">
                    <span>ABOUT</span>
                </div>

                {/* Col 2, Row 1 — descriptor */}
                <div className="about-cell cell-top-descriptor">
                    <p className="descriptor-label">Full-Stack Engineer</p>
                    <p className="descriptor-sub">Munich, Germany</p>
                </div>

                {/* Col 3, Rows 1–4 — large portrait photo */}
                <div className="about-cell cell-photo-main">
                    <img src={`${process.env.PUBLIC_URL}/about_me_img.png`} alt="Oussema Amri" />
                </div>

                {/* Col 1, Row 2 — visual separator */}
                <div className="about-cell cell-separator">
                    <span className="sep-line" />
                </div>

                {/* Col 2, Row 2 — manifesto tagline */}
                <div className="about-cell cell-tagline">
                    <p>
                        THE BEST CODE IS THE CODE THAT SOLVES
                        REAL PROBLEMS — RELIABLY, READABLY,
                        AND WITHOUT DRAMA.
                    </p>
                </div>

                {/* Col 1, Row 3 — "ME" headline */}
                <div className="about-cell cell-me-title">
                    <span>ME</span>
                </div>

                {/* Col 2, Row 3 — bio */}
                <div className="about-cell cell-bio">
                    <p className="bio-name">Oussema Amri</p>
                    <p>
                        Full-Stack Software Engineer currently at{' '}
                        <strong>Rocket Factory Augsburg</strong>, where I own the design,
                        development, and maintenance of internal applications used company-wide.
                        I work across the entire stack — React frontends, FastAPI services,
                        PostgreSQL schemas, and Docker deployments.
                    </p>
                    <p>
                        Previously built a civic platform at <strong>Happy Nation Global</strong>{' '}
                        and contributed to HR platform features at <strong>Talan Tunisia</strong>.
                        Comfortable taking features from requirements to production and keeping them running.
                    </p>
                    <p>
                        Diplôme d'Ingénieur in Computer Science (equiv. M.Sc., Bac+5), ESPRIT School of Engineering.
                        Academic exchange at <strong>Philipps-Universität Marburg</strong>, Germany (10/2024 – 03/2026).
                    </p>
                </div>

                {/* Col 1, Row 4 — location */}
                <div className="about-cell cell-location">
                    <p className="location-city">Munich,<br />Germany</p>
                    <p className="location-open">Open to on-site, hybrid &amp; remote</p>
                </div>

                {/* Col 2, Row 4 — email CTA */}
                <div className="about-cell cell-email-cta">
                    <p className="email-label">Get in touch</p>
                    <a href="mailto:amriouseema@gmail.com" className="email-link">
                        AMRIOUSEEMA@GMAIL.COM
                    </a>
                </div>

            </div>
        </section>
    );
};

export default About;
