'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Zuno
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/#features" 
              className={`hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Features
            </Link>
            <Link 
              href="/#faq" 
              className={`hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              FAQ
            </Link>
            <Link 
              href="/about" 
              className={`hover:text-blue-600 transition-colors ${pathname === '/about' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`block transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}>-</span>
            <span className={`block transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}>-</span>
            <span className={`block transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}>-</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed top-[4.5rem] left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/#features" 
              className={`text-lg hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#faq" 
              className={`text-lg hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/about" 
              className={`text-lg hover:text-blue-600 transition-colors ${pathname === '/about' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}