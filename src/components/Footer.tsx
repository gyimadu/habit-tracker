import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 py-16 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t-2 pt-10">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">HABITS</h3>
          <p className="text-sm text-gray-600">© 2024 Habits-io</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-800 transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-gray-800 transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-gray-800 transition-colors cursor-pointer">Community</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-800 transition-colors cursor-pointer">About us</li>
              <li className="hover:text-gray-800 transition-colors cursor-pointer">How to Use</li>
              <li className="hover:text-gray-800 transition-colors cursor-pointer">Log in / Sign up</li>
              <li className="hover:text-gray-800 transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Follow Us</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-gray-800 transition-colors cursor-pointer">Twitter</li>
            <li className="hover:text-gray-800 transition-colors cursor-pointer">Instagram</li>
            <li className="hover:text-gray-800 transition-colors cursor-pointer">LinkedIn</li>
            <li className="hover:text-gray-800 transition-colors cursor-pointer">Facebook</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;