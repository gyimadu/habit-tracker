'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 72; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed w-full top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-gray-800">
            Grit
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => handleScrollToSection('features')}
              className={`hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Features
            </button>
            <button 
              onClick={() => handleScrollToSection('faq')}
              className={`hover:text-blue-600 transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              FAQ
            </button>
            <Link 
              href="/about" 
              className={`hover:text-blue-600 transition-colors ${pathname === '/about' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              About
            </Link>
            <Link
              href="/support"
              className={`hover:text-blue-600 transition-colors ${pathname === '/support' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Support
            </Link>
            {/* Auth Buttons */}
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-600 mr-2 hover:text-blue-600 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors"
              >
                Sign up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed top-[4rem] left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-95' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col space-y-5">
            <button 
              onClick={() => handleScrollToSection('features')}
              className={`text-lg hover:text-blue-600 transition-colors text-left ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Features
            </button>
            <button 
              onClick={() => handleScrollToSection('faq')}
              className={`text-lg hover:text-blue-600 transition-colors text-left ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              FAQ
            </button>
            <Link 
              href="/about" 
              className={`text-lg hover:text-blue-600 transition-colors ${pathname === '/about' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/support"
              className={`text-lg hover:text-blue-600 transition-colors ${pathname === '/support' ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            {/* Auth Buttons */}
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-600 text-lg mr-2 hover:text-blue-600 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signup"
                className="px-4 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}