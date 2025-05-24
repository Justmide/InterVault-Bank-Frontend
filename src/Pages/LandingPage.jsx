import React, { useRef } from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import coverImage from "../assets/Images/peakpx.jpg";
import LoginBtn from '../Components/Button/LoginBtn';
import SearchBox from '../Components/LandingPage/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from "@fortawesome/free-solid-svg-icons";
import saving from "../assets/Images/saving.png";
import loan from "../assets/Images/loan.png";
import support from "../assets/Images/support.png";
import checking from "../assets/Images/checking.png";
import padlock from "../assets/Images/padlock.png";
import SecondaryBtn from '../Components/Button/SecondaryBtn';
import Navbar from "../Components/NavBar/Navbar";
import building from "../assets/Images/building.jpg"
import business from "../assets/Images/discussion.jpg"
import supportloan from "../assets/Images/loan service.jpg"
import insurance from "../assets/Images/insurance.jpg"
import UserCounter from '../Components/LandingPage/UserCounter';
import ImageCarousel from '../Components/LandingPage/ImageCarousel';
import FaqAccordion from '../Components/LandingPage/FaqAccord';
import Testimonial1 from '../Components/LandingPage/Testimonial';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from "react-spinners";
import { useState } from 'react';
import Footer from '../Components/LandingPage/Footer';
import "../index.css"

const useScrollFadeIn = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.02 });
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  return { ref, variants, inView };
};

const SectionWrapper = ({ children }) => {
  const { ref, variants, inView } = useScrollFadeIn();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};


const LandingPage = () => {
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();


  const privacyRef = useRef(null);
  const checkingsRef = useRef(null);
  const aboutUsRef = useRef(null);
  const faqRef = useRef(null);
  const testimonialRef = useRef(null);

  const handleClick =()=>{
    setLoading(true); 

    setTimeout(() => {
      navigate('/signup'); // Navigate after the loading effect
    }, 2000); 
  }

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',   
        inline: 'nearest'   });
    }
  };

  const sectionRefs = {
    "Privacy": privacyRef,
    "Checkings": checkingsRef,
    "About Us": aboutUsRef,
    "Faq": faqRef,
    "Find a Branch": testimonialRef
  };
  return (
    <>
      <Navbar onLinkClick={scrollToSection} sectionRefs={sectionRefs} />
      {/* <div>
      <Navbar />
      </div>
      <div className='z-50'>
      <Navbar />
      </div> */}
      <section className="sect1 relative">
        <div className="relative">
          {/* Background Image */}
          <motion.img
            src={coverImage}
            alt="background Image"
            className="lg:w-full lg:h-[690px] md:h-[720px] sm:h-[600px] h-[640px] object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

          {/* Content */}
          <div className="absolute inset-0 inline-flex items-center justify-center text-white z-10 px-7 flex-col">
            <section className="flex">
              {/* Left Section */}
              <motion.div
                className="leftSect hidden lg:block lg:w-[40%] h-full pt-[180px] pl-[175px] md:pl-[130px]"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="rounded-sm w-[230px] h-[170px] bg-amber-50">
                  <p className="border-b-[1.8px] p-3 text-[20px] text-gray-800 font-semibold text-center">
                    <FontAwesomeIcon icon={faLock} /> Online Banking
                  </p>
                  <div className="pt-[10px] px-3 flex justify-center">
                    <div onClick={handleClick} role='button'>
                     {loading ? (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 z-5000">
                           <CircleLoader color="#f40606" size={70} />
                          </div>  
                      ) :(
                    <LoginBtn text="Secure Login" />
                      )}
                    </div>
                    
                  </div>
                  <div className="text-center font-semibold italic gap-11 pt-3 px-3 text-black underline text-[15px]">
                    <a href="#">Set up in 1 Minute</a>
                  </div>
                </div>
                <div className="mt-[20px] pt-3">
                  <SearchBox />
                </div>
              </motion.div>

              {/* Right Section */}
              <motion.div
                className="rightsect lg:w-[60%] md:w-[100%] h-full lg:pt-[180px] md:pt-[70px] sm:pt-[40px] pt-[60px] md:text-center lg:pl-[45px] md:pl-[5px] lg:pr-[45px] md:pr-[5px]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="mx-auto headingTags lg:pr-[50px] md:pr-[5px] lg:pl-[50px] md:pl-[5px]">
                  <p className="mt-9 text-[16px] md:text-[16px] sm:text-[13px] lg:text-[20px] font-semibold pr-[5px] text-center">
                    24/7 Mobile & Online Banking for Secure, Convenient Access
                    to Your Accounts
                  </p>
                </div>
                <div className="subhead lg:pr-[50px] md:pr-[5px] lg:pl-[50px] md:pl-[5px] mt-5">
                  <p className="lg:text-[18px] md:text-[17px] sm:text-[15px] text-[15px] font-sans italic pl-[2px] text-center">
                    Enjoy seamless transactions, effortless bill payments, and
                    round-the-clock account access with an intuitive mobile and
                    online banking experience.
                  </p>
                </div>
                <div className="flex pt-3 lg:pl-[50px] md:justify-center md:pb-[50px] sm:justify-center lg:justify-center justify-center ">
                  <div onClick={handleClick}>
                    {loading ? (
                      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
                        <CircleLoader color="#f40606" size={70} />
                      </div>
                    ) : (
                      <LoginBtn text="Apply Today" />
                    )}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Features Section */}
            <motion.section
            className="flex mt-[50px] w-full h-[180px] backdrop-blur-[55px] relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* White Transparent Overlay */}
              <div className="absolute inset-0 bg-white/65 rounded-sm"></div>

              {/* Scrollable Content */}
              <div className="relative z-10 w-full h-[170px] overflow-x-auto whitespace-nowrap flex">
                <motion.div
                  className="flex md:w-[120%] lg:w-full space-x-6 px-4"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {/* Feature Boxes */}
                  {[
                    { img: saving, text: "Savings Accounts" },
                    { img: loan, text: "Loans & Credit Services" },
                    { img: checking, text: "Checking Accounts"},
                    { img: support, text: "24/7 Customer Support" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="cursor-pointer lg:w-[25%] inline-flex flex-col pt-[40px] min-w-[200px]"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-center items-center">
                        <img src={item.img} alt="" className="w-[50px]" />
                      </div>
                      <p className="text-center text-[17px] text-black font-semibold">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section ref={privacyRef} id="Privacy">
      <SectionWrapper>
        <motion.div
          className="w-full h-[450px] bg-[#f0f0f0]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-[100%] flex justify-center pt-[70px]">
            <img src={padlock} alt="secure lock" className="w-[70px]" />
          </div>
          <div className="text-gray-700 text-center text-[20px] lg:text-[30px] md:text-[25px] font-sans font-bold pt-2">
            <p>Safeguard Your Finances from Fraud</p>
          </div>
          <div className="pt-5 text-center text-gray-800 text-[16px] lg:tet-[20px] md:text-[18px] italic font-light">
            <p>
              Fraudsters utilize sophisticated tactics to access and exploit your personal and financial information.
            </p>
          </div>
          <div className="flex justify-center w-full pt-10">
            <SecondaryBtn text="Learn More" />
          </div>
        </motion.div>
        </SectionWrapper>
      </section>

      {/* Checkings Section */}
      <section ref={checkingsRef} id="Checkings">
        <motion.div
          className="w-full h-[550px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ImageCarousel />
        </motion.div>
      </section>

      {/* About Us Section */}
      <section ref={aboutUsRef} id="About Us">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full text-center text-[40px] text-gray-800 font-bold pt-5">
            <p>InterVault Bank</p>
          </div>
          <div className="w-full bg-white py-10 px-4 space-y-20">
            {/* PERSONAL BANKING */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <img
                  src={building}
                  alt="office"
                  className="w-full max-w-[500px] h-auto rounded-3xl shadow-md"
                  loading="lazy"
                />
              </div>
              <div className="pt-4 ">
                <div className="text-sm pb-2 font-semibold border-b-4 border-red-700 w-fit lg:mx-0 text-gray-700">
                  <p>👤 PERSONAL BANKING</p>
                </div>
                <div className="pt-4 text-[20px] lg:text-[40px] font-bold leading-snug lg:text-left text-gray-900">
                  <p>InterVault Bank: Banking Made Simple & Secure</p>
                </div>
                <div className="text-[15px] text-gray-800 font-medium italic pt-4">
                  <p>
                    At InterVault Bank, we believe in effortless banking that
                    fits your lifestyle. Whether you're withdrawing funds,
                    making deposits, or ensuring your financial security, we’ve
                    designed our services to offer convenience, safety, and
                    peace of mind.
                  </p>
                  <ul className="list-none pt-4 space-y-2">
                    <li>
                      ✅ <strong>Mobile Deposits</strong> – Deposit checks from
                      anywhere, anytime.
                    </li>
                    <li>
                      ✅ <strong>Custom Alerts</strong> – Stay informed with
                      real-time updates on your account.
                    </li>
                    <li>
                      ✅ <strong>Secure Touch Login</strong> – Quick, safe
                      access without worrying about passwords.
                    </li>
                    <li>
                      ✅ <strong>Paperless Statements</strong> – Access
                      easy-to-read electronic statements anytime.
                    </li>
                  </ul>
                  <p className="pt-4">
                    At InterVault Bank, your financial well-being is our
                    priority. Experience banking built for you.
                  </p>
                </div>
              </div>
            </div>

            {/* BUSINESS BANKING */}
            <div className="flex flex-col lg:flex-row items-center gap-10 px-4 lg:px-16">
              <div className="w-full lg:w-1/2">
                <div className="text-[16px] pb-2 font-semibold border-b-4 border-red-700 w-fit text-gray-800 mb-4">
                  💼 BUSINESS BANKING
                </div>
                <h2 className="text-[20px] lg:text-[40px] font-bold leading-snug text-gray-900">
                  InterVault Bank: Powering Business Growth with Secure
                  Financial Solutions
                </h2>
                <div className="text-[15px] text-gray-700 font-medium italic pt-4 leading-relaxed">
                  <p>
                    Whether you're a startup or a seasoned enterprise,
                    InterVault Bank offers tailored financial tools to help your
                    business thrive. Our business banking solutions combine
                    efficiency, innovation, and world-class security.
                  </p>
                  <br />
                  <strong className="text-gray-800">
                    Designed for Ambition, Built for Success
                  </strong>
                  <br />
                  <br />✅ <strong>Business Checking</strong> – Simplified
                  accounts with powerful management tools.
                  <br />✅ <strong>ACH & Wire Transfers</strong> – Fast, secure
                  money movement for your business.
                  <br />✅ <strong>Payroll Support</strong> – Hassle-free
                  payroll integration with top software.
                  <br />✅ <strong>Multi-user Access</strong> – Collaborate
                  securely with your financial team.
                  <br />
                  <br />
                  Let InterVault Bank be your partner in progress — where
                  business banking meets next-level innovation.
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src={business}
                  alt="Two colleagues discussing business"
                  className="w-full max-w-[550px] h-auto rounded-3xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* INSURANCE */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-10 px-4 lg:px-16">
              <div className="w-full lg:w-1/2">
                <div className="text-[16px] pb-2 font-semibold border-b-4 border-red-700 w-fit text-gray-800 mb-4">
                  🛡️ INSURANCE SERVICES
                </div>
                <h2 className="text-[20px] lg:text-[40px] font-bold leading-snug text-gray-900">
                  Protect What Matters Most with InterVault Insurance
                </h2>
                <div className="text-[15px] text-gray-700 font-medium italic pt-4 leading-relaxed">
                  <p>
                    Life is unpredictable, but your future doesn’t have to be.
                    InterVault Insurance offers a range of protection plans for
                    individuals and businesses alike. Whether you're
                    safeguarding your home, vehicle, health, or business assets,
                    we've got you covered.
                  </p>
                  <br />✅ <strong>Auto & Home Insurance</strong> – Coverage
                  that brings peace of mind.
                  <br />✅ <strong>Life & Health Insurance</strong> – Plans that
                  protect your loved ones.
                  <br />✅ <strong>Business Risk Protection</strong> – Secure
                  your company from unforeseen challenges.
                  <br />
                  <br />
                  Choose InterVault for comprehensive, affordable, and
                  personalized insurance solutions.
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src={insurance}
                  alt="Family protected by insurance"
                  className="w-full max-w-[550px] h-auto rounded-3xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* LOANS */}
            <div className="flex flex-col lg:flex-row items-center gap-10 px-4 lg:px-16">
              <div className="w-full lg:w-1/2">
                <div className="text-[16px] pb-2 font-semibold border-b-4 border-red-700 w-fit text-gray-800 mb-4">
                  💰 LOAN SERVICES
                </div>
                <h2 className="text-[20px] lg:text-[40px] font-bold leading-snug text-gray-900">
                  Empower Your Dreams with Flexible InterVault Loans
                </h2>
                <div className="text-[15px] text-gray-700 font-medium italic pt-4 leading-relaxed">
                  <p>
                    Whether you’re planning your next big move, buying a home,
                    or expanding your business, InterVault's tailored loan
                    options can help you get there. We offer competitive rates
                    and a transparent process from start to finish.
                  </p>
                  <br />✅ <strong>Personal Loans</strong> – Fast approval for
                  everyday financial needs.
                  <br />✅ <strong>Auto & Mortgage Loans</strong> – Drive or
                  move into your future today.
                  <br />✅ <strong>Business Loans</strong> – Fuel your growth
                  with capital that moves with you.
                  <br />
                  <br />
                  Start building your future today with InterVault’s easy,
                  secure loan services.
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src={supportloan}
                  alt="Customer receiving loan services"
                  className="w-full max-w-[550px] h-auto rounded-3xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* fourth section  */}
      <section className="w-full pt-[50px]">
        <div className="">
          <UserCounter />
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} id="Faq">
        <motion.div
          className="px-1 md:px-0 py-12 bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <FaqAccordion />
        </motion.div>
      </section>

      {/* Testimonial Section */}
      <section ref={testimonialRef}>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Testimonial1 />
        </motion.div>
      </section>

      {/* footer  */}
      <div>
           <Footer />
      </div>
    </>
  );
};

export default LandingPage;
