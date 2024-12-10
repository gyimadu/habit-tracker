import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white fixed top-0 left-0 w-full border-b mb-10 text-white px-1 py-3">
      <div className="container flex items-center mx-5">
        <div className="bg-black px-4 py-1 rounded-lg">
          <h1 className="text-lg font-bold">HABITS</h1>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;