'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, X, Star, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from '../ui/ThemeToggle';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Reputation', href: '/reputation', icon: Star },
    { name: 'Statistics', href: '/statistics', icon: BarChart2 },
  ];

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-md"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
          isMobile 
            ? `fixed top-0 left-0 h-full z-40 ${open ? 'w-64 opacity-100' : 'w-0 opacity-0'}`
            : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="p-6 flex justify-center">
          {/* Replace with your actual logo image */}
          <Link href={"/"} className="flex items-center">
            <div className="relative h-12 w-14">
              <Image 
                src="/images/logo-black.png" 
                alt="HumanXO Logo" 
                fill
                className="object-contain"
              />
            </div>
          </Link>
          
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-gray-700'
                    }`}
                    onClick={() => isMobile && setOpen(false)}
                  >
                    <IconComponent size={18} className="mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <ThemeToggle />
      </div>
      
      {/* Overlay for mobile */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}