'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Home',
      path: '/mobile/home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      name: 'Workouts',
      path: '/mobile/workouts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672v-1.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.5c0 .563-.115 1.109-.322 1.672a4.5 4.5 0 0 1-1.653 1.715 9.041 9.041 0 0 0-2.861 2.4c-.498.634-1.225 1.08-2.031 1.08H6.633Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.367 10.25c-.806 0-1.533.446-2.031 1.08a9.041 9.041 0 0 0-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 0 1-.322 1.672v1.5a.75.75 0 0 0 .75.75h2.5a.75.75 0 0 0 .75-.75v-1.5c0-.563.115-1.109.322-1.672a4.5 4.5 0 0 0 1.653-1.715 9.041 9.041 0 0 1 2.861-2.4c.498-.634 1.225-1.08 2.031-1.08h.633Z" />
        </svg>
      )
    },
    {
      name: 'Progress',
      path: '/mobile/progress',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              className={`flex flex-col items-center py-2 px-4 ${
                pathname === tab.path
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span className="text-xs mt-1">{tab.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Slide-up Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            <nav className="space-y-4">
              <Link
                href="/support"
                className="block text-gray-700 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-gray-700 hover:text-gray-900 py-2"
              >
                Sign out
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileLayout; 