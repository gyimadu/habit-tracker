import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white fixed top-0 left-0 w-full border-b mb-20 md:mb-10 text-black px-1 py-4">
      <div className="container flex justify-between items-center mx-2">
        <h1 className="text-lg px-3 font-bold">HABITS</h1>
      </div>
    </nav>
  );
};

export default NavBar;