import React, { useEffect } from 'react'
import NavLogin from '../../Components/NavBar/NavLogin'
import HDBG from '../../assets/Images/HD-BG.png'
import DashboardHero from '../../Components/UserDashboard/DashboardHero';



const Dashboard = () => {

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("customer"));

    if (!users) {
      toast.error("You need to login to access this page");
      navigate("/landingpage");
      return;
    }

    const displayName = document.getElementById("firstName");
    if (!displayName) {
      toast.error("You need to login to access this page");
      navigate("/login");
      return;
    }

    // Safely set the display name
    displayName.textContent = users.firstName || "User";
  }, [])
  return (
    <div>
      {/* NAVBAR  */}
      <section>
      <NavLogin />
      </section>

      {/* HERO SECTION */}
      <section className='w-full relative'>
  {/* Background Image */}
  <div className='w-full'>
    <img 
      src={HDBG}
      alt="Hero Background" 
      className='w-full object-cover h-[450px]'
    />
  </div>

  {/* Overlay */}
    <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

  {/* Text Content */}
  <div className="mt-[73em] lg:mt-[43em] md:mt-[63em] sm:mt-[65em] pt-10 absolute inset-0 z-20 flex flex-col justify-center px-8">
    <p className="text-white text-[15px] lg:text-[35px] md:text-[30px] sm:text-[24px] font-bold mb-4">
      The Vault Missed You, <span id='firstName' className='capitalize italic text-red-700'></span>{" "}!
    </p>
<div>
    <DashboardHero />
    </div>
  </div>

</section>


</div>
  )
}

export default Dashboard
