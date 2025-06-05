'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link href="/" className="text-lg md:text-2xl font-bold text-blue-600">
              Grit
            </Link>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Grit. All rights reserved.
            </div>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-500 hover:text-gray-700 text-sm">
              About
            </Link>
            <Link href="/support" className="text-gray-500 hover:text-gray-700 text-sm">
              Support
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;