import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* Left - Logo */}
        <div className="flex items-center">
          <img
            src="/images/Logo DSS RGB-01.png" 
            alt="DSS Logo"
            className="h-20 w-auto"
          />
        </div>

        {/* Center - Menu items (Desktop) */}
        <ul className="hidden md:flex items-center gap-10 text-white text-[16px] font-medium tracking-wide">
          <li className="hover:text-[#0078f0] cursor-pointer">Home</li>
          <li className="hover:text-[#0078f0] cursor-pointer">About Us</li>
          <li className="hover:text-[#0078f0] cursor-pointer">Works</li>
          <li className="hover:text-[#0078f0] cursor-pointer">Sections</li>
        </ul>

        {/* Right - CTA Button (Desktop) */}
        <div className="hidden md:block">
          <button className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-[#0078f0] hover:text-white transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white text-3xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg w-full px-6 py-6 flex flex-col gap-6 text-white">
          <p className="hover:text-[#0078f0]">Home</p>
          <p className="hover:text-[#0078f0]">Medium</p>
          <p className="hover:text-[#0078f0]">Voices</p>
          <p className="hover:text-[#0078f0]">Sections</p>

          <button className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-[#0078f0] hover:text-white transition">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
