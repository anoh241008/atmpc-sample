import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function MainPageNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-xs tracking-wide transition duration-300 pb-0.5 ${
      isActive
        ? "font-bold text-green-700 border-b-2 border-green-700"
        : "text-gray-500 border-b-2 border-transparent hover:text-green-700 hover:border-green-400"
    }`;

  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="lg:container mx-auto max-w-[1200px] px-2 pt-3">
        <nav className="bg-white flex items-center justify-between py-3 px-5 rounded-2xl shadow-md border border-gray-100">

          {/* Logo */}
          <h1 className="font-extrabold text-green-700 text-lg sm:text-base md:text-lg tracking-tight">
            ATMPC
          </h1>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex lg:gap-8 md:gap-5 text-sm tracking-wide items-center">
            <NavLink className={navLinkClass} to="/">Home</NavLink>
            <NavLink className={navLinkClass} to="/aboutus">About</NavLink>
            <NavLink className={navLinkClass} to="/services">Services</NavLink>
            <NavLink className={navLinkClass} to="/projects">Projects</NavLink>
            <NavLink className={navLinkClass} to="/news&event">News</NavLink>
            <NavLink className={navLinkClass} to="/contact">Contact</NavLink>
          </div>

          {/* Right Side (Search + Button) */}
          <div className="hidden md:flex gap-3 items-center">
            <div className="relative">
              <input
                className="outline-none bg-gray-100 rounded-xl text-xs text-gray-500 px-9 py-2 w-52 focus:ring-2 focus:ring-green-200 transition"
                placeholder="Search Projects and Services"
              />
              <svg
                className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </div>

            <button className="bg-green-700 text-white py-2 px-5 text-xs rounded-full font-bold hover:bg-green-800 transition duration-300 shadow-sm">
              Join Us
            </button>
          </div>

          {/* Hamburger Button (Mobile Only) */}
          <button
            className="md:hidden text-gray-600 hover:text-green-700 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white mt-2 rounded-2xl shadow-lg border border-gray-100 px-6 py-5 flex flex-col gap-4 text-sm text-gray-500 tracking-wide">
            <NavLink className={navLinkClass} to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink className={navLinkClass} to="/aboutus" onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink className={navLinkClass} to="/services" onClick={() => setIsOpen(false)}>Services</NavLink>
            <NavLink className={navLinkClass} to="/projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
            <NavLink className={navLinkClass} to="/news&event" onClick={() => setIsOpen(false)}>News</NavLink>
            <NavLink className={navLinkClass} to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>

            {/* Mobile Search */}
            <div className="relative mt-1">
              <input
                className="bg-gray-100 rounded-xl text-xs text-gray-500 px-9 py-2.5 outline-none w-full focus:ring-2 focus:ring-green-200 transition"
                placeholder="Search Projects and Services"
              />
              <svg
                className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </div>

            {/* Mobile Button */}
            <button className="bg-green-700 text-white py-2.5 px-4 text-xs rounded-full font-bold mt-1 hover:bg-green-800 transition duration-300">
              Join Us
            </button>
          </div>
        )}
      </div>
    </div>
  );
}