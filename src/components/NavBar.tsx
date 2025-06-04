import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white z-50 sticky top-0 border-b w-full mb-0 md:mb-10 text-black px-1 py-3">
      <div className="container w-full max-w-6xl mx-auto flex justify-between items-center py-2 md:py-2">
        <h1 className="text-2xl md:text-3xl px-3 font-bold">Budd-E</h1>
      </div>
    </nav>
  );
};

export default NavBar;