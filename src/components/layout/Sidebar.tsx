'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ui/ThemeToggle';
import { Home, Star, Clock } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: <Home size={20} />, 
      soon: false 
    },
    { 
      name: 'Reputation', 
      href: '/reputation', 
      icon: <Star size={20} />, 
      soon: true 
    },
    { 
      name: 'Statistics', 
      href: '/statistics', 
      icon: <Clock size={20} />, 
      soon: true 
    },
  ];

  return (
    <div className="h-screen w-60 everett-font bg-white dark:bg-gray-800 flex flex-col p-4 border-r border-gray-100 dark:border-gray-700">
      <div className="flex justify-left ml-10 mb-6">
        {mounted && (
          <Link href="/" className="flex items-center">
            <Image 
              src={theme === 'dark' ? "/images/logo-black.png" : "/images/logo-black.png"} 
              alt="Logo" 
              width={60} 
              height={60} 
            />
          </Link>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={`flex items-center p-4 rounded-lg ${
                isActive 
                  ? 'bg-orange-50 text-orange-500 dark:bg-gray-700 dark:text-orange-400' 
                  : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`mr-3 ${isActive ? 'text-orange-500 dark:text-orange-400' : 'text-gray-400 dark:text-gray-500'}`}>
                {item.icon}
              </div>
              <span className="text-lg font-medium">{item.name}</span>
              {item.soon && (
                <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">SOON</span>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;