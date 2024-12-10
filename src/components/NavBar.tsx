import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="transparent border-b mx-10 mb-10 text-white px-1 py-3">
      <div className="container flex items-center">
        <div className="bg-black px-4 py-1 rounded-lg">
          <h1 className="text-xl font-bold">HABITS</h1>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;