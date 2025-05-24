import { useContext, useState } from "react";
import React from "react";
import { Menu, X } from "lucide-react";
import PrimaryBtn from "../Button/PrimaryBtn";
import Logo from '../../assets/Images/interTrans.png';
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import Notification from "../LandingPage/Notification";
import avatar from "../../assets/Images/avatar.png";
import { authContext } from "../../UseContext/AuthContext";


export default function NavLogin({ sectionRefs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
   const { logout, submitting } = useContext(authContext)

  const navItems = [
    { label: "Dashboard", to: "Dashboard" },
    { label: "Transactions", to: "Transactions" },
    { label: "Wallets", t0: "Wallets" },
    { label: "Settings", to: "Settings" },
  ];
  
  
  const handleClick = () => {
      setLoading(true);
      setTimeout(() => {
          navigate('/signup'); // Navigate after the loading effect
        }, 2000);
    };
    
    const onSubmit = ()=>{
        console.log("logging out");
        logout()
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
    <header className="w-full fixed z-[5000] bg-transparent">
      {/* Main Nav */}
      <nav className="bg-gray-900  backdrop-blur-[5px] w-full flex px-3">
      <div className="w-full md:w-1/2 max-w-7xl flex">
          {/* Logo */}
          <a href="/Dashboard" className="w-full md:w-full items-center flex text-2xl font-bold text-purple-700">
            <img
              src={Logo}
              alt="logo"
              loading="lazy"
              className="w-[200px] sm:w-[175px] md:w-[125px] lg:w-[200px]"
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex w-3/4 mx-auto">
            {navItems.map((item, index) => (
              <li key={index} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className="relative px-[14.5px] py-2 sm:text-[17px] md:text-[14px] lg:text-[16px] text-white font-medium transition-all duration-500 ease-in-out
                    before:absolute before:-bottom-2 before:left-0 before:w-full before:h-1.5
                    before:bg-gradient-to-r before:from-blue-200 before:to-red-500
                    before:transform-gpu before:skew-x-[-20deg] before:scale-x-0 before:origin-left
                    hover:text-red-500 hover:before:scale-x-100 hover:before:shadow-lg hover:before:shadow-blue-500/50 text-center"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop CTA */}
        <div className="flex gap-[10px] w-1/2 max-w-7xl mx-auto justify-end items-center px-3 py-4">
  <div className="hidden md:block">
    {/* Hide below 768px */}
    <PrimaryBtn 
      text="Sign Out"
      background="Black"
      color="white"
      border="3px solid white"
      disabled={submitting}
      onClick={onSubmit}
    />
  </div>
  {/* notification Bell */}
  <div>
    <Notification 
    background="Black"
     border="3px solid white"
    />
  </div>
  {/* IMAGE DISPLAY */}
  <div className="border-2 border-white lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] rounded-full overflow-hidden">
    <img 
      src={avatar}
      alt="avatar" 
      loading="lazy"
      className="object-cover w-full h-full"
    />
  </div>
</div>

        {/* Mobile Menu Toggle (Icon Only) */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Links */}
        <div
          className={`md:hidden absolute top-full left-0 w-full h-[450px] bg-white shadow-md z-50 transform transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0 pointer-events-none'}
            backdrop-blur-md drop-shadow-lg
          `}
        >
          <ul className="flex flex-col items-center space-y-7 py-[70px] gap-[15px]">
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
                  <div className="fixed inset-0 flex justify-center items-center bg-gray-900 z-[9999]">
                    <CircleLoader color="#f40606" size={70} />
                  </div>
                ) : (
                  <PrimaryBtn 
                  text="Sign Out"
                  background="Black"
                  color="white"
                  border="3px solid white"
                  disabled={submitting}
                  onClick={onSubmit}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
