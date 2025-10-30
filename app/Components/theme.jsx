'use client';
import { useEffect, useState } from 'react';

export default function ThemeController({ children }) {
  const [theme, setTheme] = useState(null); 

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light'; 
    setTheme(storedTheme);
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    
    setTheme(newTheme); 
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (theme === null) {
    return null; 
  }

  return children({ toggleTheme, theme });
}