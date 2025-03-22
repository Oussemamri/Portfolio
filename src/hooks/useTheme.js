import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;