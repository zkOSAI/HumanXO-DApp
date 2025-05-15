// src/components/ui/ThemeToggle.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Wait until mounted to avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="h-6 w-6" />;
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <span className="text-yellow-400">☀️</span>
      ) : (
        <span>🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle;