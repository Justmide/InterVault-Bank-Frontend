import { useState, useRef } from "react";
import React from "react";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu
import PrimaryBtn from "./PrimaryBtn";
import Logo from '../assets/Images/intervault.jpg';

export default function Navbar({ sectionRefs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Privacy", id: "Privacy" },
    { label: "Checkings", id: "Checkings" },
    { label: "About Us", id: "About Us" },
    { label: "Faq", id: "Faq" },
    { label: "Find a Branch", id: "Find a Branch" },
  ];

  // Function to scroll to the section smoothly
  const handleScroll = (e, sectionId) => {
    e.preventDefault(); // Prevent default anchor behavior
    const section = sectionRefs[sectionId]?.current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full fixed z-50">
      {/* Top Utility Bar */}
      <nav className="bg-gray-100 text-gray-700 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-600 transition-colors duration-300">Personal</a>
            <a href="#" className="hover:text-red-600 transition-colors duration-300">Business</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-600 transition-colors duration-300">Search</a>
            <a href="#" className="hover:text-red-600 transition-colors duration-300">English</a>
          </div>
        </div>
      </nav>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-purple-700">
            <img src={Logo} alt="logo" loading="lazy" className="w-[120px] sm:w-[175px] md:w-[125px] lg:w-[200px]" />
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <li key={index} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className="relative px-[14.5px] py-2 text-gray-700 font-medium transition-all duration-500 ease-in-out
                    before:absolute before:-bottom-2 before:left-0 before:w-full before:h-1.5
                    before:bg-gradient-to-r before:from-blue-200 before:to-red-500
                    before:transform-gpu before:skew-x-[-20deg] before:scale-x-0 before:origin-left
                    hover:text-red-500 hover:before:scale-x-100 hover:before:shadow-lg hover:before:shadow-blue-500/50"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex space-x-1">
            <PrimaryBtn />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 flex gap-[6px] items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div>
              <PrimaryBtn />
            </div>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScroll(e, item.id)}
                    className="relative px-4 py-2 text-gray-700 font-medium transition-all duration-500 ease-in-out
                      before:absolute before:-bottom-2 before:left-0 before:w-full before:h-1.5
                      before:bg-gradient-to-r before:from-blue-100 before:to-red-500
                      before:transform before:skew-x-[-20deg] before:scale-x-0 before:origin-left
                      hover:text-white hover:before:scale-x-100 hover:before:shadow-lg hover:before:shadow-blue-500/50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}