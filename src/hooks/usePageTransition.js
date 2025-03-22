import { useEffect } from 'react';

const usePageTransition = () => {
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero');
      const aboutSection = document.getElementById('about');
      const scrollPosition = window.scrollY;
      
      if (!heroSection || !aboutSection) return;
      
      const heroHeight = heroSection.offsetHeight;
      
      // Check if we're scrolling past the hero section
      if (scrollPosition > heroHeight * 0.3) {
        heroSection.classList.add('transitioning');
      } else {
        heroSection.classList.remove('transitioning');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default usePageTransition;