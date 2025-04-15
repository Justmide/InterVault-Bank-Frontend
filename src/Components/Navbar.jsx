import { useState } from "react";
import React from "react";
import { Menu, X } from "lucide-react";
import PrimaryBtn from "./PrimaryBtn";
import Logo from '../assets/Images/intervault.jpg';
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { div } from "framer-motion/client";

export default function Navbar({ sectionRefs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading ] = useState(false)

  const navItems = [
    { label: "Privacy", id: "Privacy" },
    { label: "Checkings", id: "Checkings" },
    { label: "About Us", id: "About Us" },
    { label: "Faq", id: "Faq" },
    { label: "Find a Branch", id: "Find a Branch" },
  ];
  const navigate = useNavigate()

  const handleClick = () =>{
    setLoading(true)
    setTimeout(() => {
      navigate('/signup'); // Navigate after the loading effect
    }, 2000);
  }
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = sectionRefs[sectionId]?.current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="w-full fixed z-50">
      {/* Top Bar */}
      <nav className="bg-gray-100 text-gray-700 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-600">
              Personal
            </a>
            <a href="#" className="hover:text-red-600">
              Business
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-600">
              Search
            </a>
            <a href="#" className="hover:text-red-600">
              English
            </a>
          </div>
        </div>
      </nav>

      {/* Main Nav */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-purple-700">
            <img
              src={Logo}
              alt="logo"
              loading="lazy"
              className="w-[120px] sm:w-[175px] md:w-[125px] lg:w-[200px]"
            />
          </a>

          {/* Desktop Links */}
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

          {/* Desktop CTA */}
          <div className="hidden md:flex space-x-1" onClick={handleClick}>
            {loading ? (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-900 z-5000">
                <CircleLoader color="#f40606" size={70} />
              </div>
            ) : (
              <PrimaryBtn />
            )}
          </div>

          {/* Mobile Menu Toggle (Icon Only) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Links */}
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
              <li>
                <div onClick={handleClick}>
                  {loading ? (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 z-5000">
                      <CircleLoader color="#f40606" size={70} />
                    </div>
                  ) : (
                    <PrimaryBtn />
                  )}
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
