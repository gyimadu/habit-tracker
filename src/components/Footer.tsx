import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 mx-auto w-full md:grid-cols-3 gap-8 border-t-2 pt-10">
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-800">Zuno</h3>
                <p className="text-sm text-gray-600">© 2024 Zuno-io</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">  
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
        </div>
    </footer>
  );
};

export default Footer;