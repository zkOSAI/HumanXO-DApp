'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted) {
      console.log('Current theme:', theme);
    }
  }, [theme, mounted]);
  
  if (!mounted) return <div className="h-10 w-20" />;
  
  return (
    <div className="flex items-center p-1 rounded-full bg-gray-100 dark:bg-gray-800 w-20">
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center justify-center h-8 w-8 rounded-full transition-transform duration-300 ${
          theme === 'light' ? 'bg-white shadow-sm' : ''
        }`}
        aria-label="Light mode"
      >
        <span className="text-gray-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 3C10.8065 4.19347 10.136 5.81217 10.136 7.5C10.136 9.18783 10.8065 10.8065 12 12C13.1935 13.1935 14.8122 13.864 16.5 13.864C18.1878 13.864 19.8065 13.1935 21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.9891 21.1743 10.2442 20.8271C8.49927 20.4798 6.89474 19.6226 5.63604 18.364C4.37733 17.1053 3.5202 15.5007 3.17294 13.7558C2.82567 12.0109 3.0039 10.2004 3.68508 8.55585C4.36627 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center justify-center h-8 w-8 rounded-full ml-1 transition-transform duration-300 ${
          theme === 'dark' ? 'bg-orange-500 shadow-sm' : ''
        }`}
        aria-label="Dark mode"
      >
        <span className={`${theme === 'dark' ? 'text-white' : 'text-orange-500'}`}>
          <Sun size={16} />
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;