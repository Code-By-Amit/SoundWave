import { useState, useEffect } from 'react'

export const LoadingDots = () => {
    const [dots, setDots] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500); // Adjust speed here (500ms for each dot)
  
      return () => clearInterval(interval);
    }, []);
  
    return <span>{dots}</span>;
  };