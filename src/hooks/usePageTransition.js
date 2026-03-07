import { useEffect } from 'react';

const PARALLAX_FACTOR = 0.5;
const FADE_DIVISOR = 50;
const ABOUT_REVEAL_THRESHOLD = 0.5;

const usePageTransition = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined;
    }
    
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero');
      const aboutSection = document.getElementById('about');

      if (!heroSection || !aboutSection) {
        return;
      }

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Calculate how much of the hero section has been scrolled past.
      const scrollPercentage = (scrollPosition / viewportHeight) * 100;

      // Apply a parallax effect to the hero content.
      const heroContent = heroSection.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPercentage * PARALLAX_FACTOR}px)`;
        heroContent.style.opacity = Math.max(1 - scrollPercentage / FADE_DIVISOR, 0);
      }

      // Apply entrance animation to about section.
      if (scrollPosition > viewportHeight * ABOUT_REVEAL_THRESHOLD) {
        aboutSection.classList.add('in-view');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default usePageTransition;