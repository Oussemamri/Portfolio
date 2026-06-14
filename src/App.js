import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const Contact      = React.lazy(() => import('./pages/Contact'));
const SkillsPage   = React.lazy(() => import('./pages/SkillsPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ExperiencePage = React.lazy(() => import('./pages/ExperiencePage'));
const WorkPage     = React.lazy(() => import('./pages/WorkPage'));
const AboutPage    = React.lazy(() => import('./pages/AboutPage'));
const LanguagesPage = React.lazy(() => import('./pages/LanguagesPage'));

const PageFallback = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: '32px', height: '32px',
      border: '2px solid #e0e0e0', borderTopColor: '#0077cc',
      borderRadius: '50%', animation: 'spin 0.7s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/skills"     element={<SkillsPage />} />
            <Route path="/services"   element={<ServicesPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/work"       element={<WorkPage />} />
            <Route path="/about"      element={<AboutPage />} />
            <Route path="/languages"  element={<LanguagesPage />} />
          </Routes>
        </Suspense>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: { background: '#363636', color: '#fff' },
            success: { style: { background: '#4caf50' } },
            error:   { style: { background: '#f44336' } },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
