'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, X, Star, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from '../ui/ThemeToggle';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  console.log(moreMenuOpen);
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
  const toggleMoreMenu = () => {
    setMoreMenuOpen(!moreMenuOpen);
    console.log("toggle");
    console.log(moreMenuOpen);
  };

  const closeMoreMenu = () => {
    setMoreMenuOpen(!moreMenuOpen);
    console.log("toggle");
    console.log(moreMenuOpen);
  };
  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <div className='fixed w-full bottom-4 px-6'>
          <button
            // onClick={() => setOpen(!open)}
            className="h-20 w-full z-50 bg-gray-200 text-white rounded-3xl flex items-center justify-between space-x-5 p-7"
          >
            <div>
              <Link href="/" className="flex flex-col items-center justify-center">
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

            {/* Dashboard Button */}
            <div>
              <Link
                href="/dashboard"
                className={`flex flex-col items-center justify-center px-2 ${pathname === '/dashboard' ? 'text-orange-500' : 'text-gray-500'
                  }`}
              >
                <Home size={20} />
                <span className="text-xs mt-1">Dashboard</span>
              </Link>
            </div>

            {/* Reputation Button */}
            <div>
              <Link
                href="/reputation"
                className={`flex flex-col items-center justify-center px-2 ${pathname === '/reputation' ? 'text-orange-500' : 'text-gray-500'
                  }`}
              >
                <Star size={20} />
                <span className="text-xs mt-1">Reputation</span>
              </Link>
            </div>

            {/* More Button */}
            <div>
              <button
                onClick={() => toggleMoreMenu()}
                className={`flex-1 flex flex-col items-center justify-center ${pathname === '/more' ? 'text-orange-500' : 'text-gray-500'
                  }`}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="5" cy="12" r="1"></circle>
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                </svg>
                <span className="text-xs mt-1">More</span>
              </button>
            </div>
            {/* {open ? <X size={24} /> : <Menu size={24} />} */}
          </button>
        </div>
      )}

      <div
        className={`fixed inset-0 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${moreMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="relative h-12 w-14">
                  <Image
                    src="/images/logo-black.png"
                    alt="HumanXO Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              <span className="text-lg font-semibold">zkOS</span>
            </div>
            <button onClick={closeMoreMenu} className="p-2">
              <X size={24} />
            </button>
          </div>

          {/* Menu items with highlight for active */}
          <div className="flex-1">
            {/* Dashboard item with orange background when active */}
            <Link
              href="/dashboard"
              className={`flex items-center p-4 rounded-lg mb-2 ${pathname === '/dashboard' ? 'bg-orange-100 text-orange-500' : ''
                }`}
              onClick={closeMoreMenu}
            >
              <Home size={20} className="mr-3" />
              <span>Dashboard</span>
            </Link>

            {/* Other menu items */}
            {navigation.slice(1).map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center p-4 rounded-lg mb-2 ${isActive ? 'bg-orange-100 text-orange-500' : ''
                    }`}
                  onClick={closeMoreMenu}
                >
                  <IconComponent size={20} className="mr-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* More menu items can be added here */}
          </div>

          {/* Connect Wallet button at bottom */}
          <button
            className="bg-orange-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors w-full mt-4"
          >
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${isMobile
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
                    className={`flex items-center p-3 rounded-lg transition-colors ${isActive
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