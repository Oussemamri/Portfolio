import { useEffect } from 'react';

const usePageTransition = () => {
  useEffect(() => {
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.getElementById('about');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      if (heroSection && aboutSection) {
        // Calculate how much of the hero section has been scrolled past
        const scrollPercentage = (scrollPosition / viewportHeight) * 100;
        
        // Apply a parallax effect to the hero content
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollPercentage * 0.5}px)`;
          heroContent.style.opacity = Math.max(1 - scrollPercentage / 50, 0);
        }
        
        // Apply entrance animation to about section
        if (scrollPosition > viewportHeight * 0.5) {
          aboutSection.classList.add('in-view');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default usePageTransition;