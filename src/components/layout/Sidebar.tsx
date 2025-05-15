'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ui/ThemeToggle';

const Sidebar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'dashboard-icon' },
    { name: 'Reputation', href: '/reputation', icon: 'reputation-icon' },
    { name: 'Statistics', href: '/statistics', icon: 'statistics-icon' },
  ];

  return (
    <div className="h-screen w-32 bg-white dark:bg-gray-900 flex flex-col justify-between p-4 border-r border-gray-200 dark:border-gray-800">
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/images/logo-black.png" alt="HumanXO Logo" width={40} height={40} />
        </div>
        
        {/* Navigation */}
        <nav className="space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center p-2 rounded-lg text-xs ${
                  isActive 
                    ? 'bg-orange-100 text-orange-500 dark:bg-gray-800 dark:text-orange-400' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="h-5 w-5 mb-1">
                  {/* Replace with actual icons */}
                  <span className="block h-full w-full bg-current opacity-70" />
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Theme Toggle */}
      <div className="flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;