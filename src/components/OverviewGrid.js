import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaBriefcase, FaHistory, FaFolderOpen, FaUser, FaGlobe, FaArrowRight } from 'react-icons/fa';
import './OverviewGrid.css';

const CARDS = [
  { num: '01', to: '/skills',      color: '#61DAFB', Icon: FaCode,       title: 'Technical Stack',  desc: 'React, Node.js, Python, AWS & more'       },
  { num: '02', to: '/services',    color: '#FF9900', Icon: FaBriefcase,  title: 'Services',         desc: 'Custom web apps, APIs & consulting'        },
  { num: '03', to: '/experience',  color: '#E0234E', Icon: FaHistory,    title: 'Experience',       desc: 'Companies, roles & impact'                 },
  { num: '04', to: '/work',        color: '#4FC08D', Icon: FaFolderOpen, title: 'Work',             desc: "Projects I've designed and shipped"        },
  { num: '05', to: '/about',       color: '#3178C6', Icon: FaUser,       title: 'About',            desc: 'Background, education & values'            },
  { num: '06', to: '/languages',   color: '#FFD21E', Icon: FaGlobe,      title: 'Languages',        desc: 'English · French · German · Arabic'        },
];

const OverviewGrid = () => (
  <section id="overview" className="overview-section">
    <div className="overview-inner">
      <div className="overview-heading-row">
        <span className="overview-label">{'// explore'}</span>
        <h2 className="overview-heading">The Portfolio</h2>
      </div>

      <div className="overview-grid">
        {CARDS.map(({ num, to, color, Icon, title, desc }, i) => (
          <Link
            key={to}
            to={to}
            className="ov-card"
            style={{ '--ov-accent': color, '--ov-delay': `${i * 70}ms` }}
          >
            <span className="ov-num" aria-hidden="true">{num}</span>

            <div className="ov-icon-wrap">
              <Icon className="ov-icon" aria-hidden="true" />
            </div>

            <h3 className="ov-title">{title}</h3>
            <p className="ov-desc">{desc}</p>

            <span className="ov-arrow">
              <FaArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default OverviewGrid;
