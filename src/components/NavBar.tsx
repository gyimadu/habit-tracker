import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 mx-auto mb-10 text-white px-4 py-2 shadow-md rounded-lg">
      <div className="container mx-10 flex items-center">
        <h1 className="text-lg font-bold">habits.io</h1>
      </div>
    </nav>
  );
};

export default NavBar;