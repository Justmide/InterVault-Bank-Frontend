import React, { useState } from 'react'
import LoginBtn from '../Button/LoginBtn';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from "react-spinners";
import { div } from 'framer-motion/client';


const NoCardMessage = () => {
  const navigate = useNavigate()
    const [loading, setLoading] = useState(false); // State for loading
  const handleClick=()=>{
    setLoading(true)
    setTimeout(()=>{
      navigate("/setup")
    },3000)
  }
    return (
      <div
        className="w-full max-w-2xl h-[220px] mx-auto rounded-2xl 
        bg-gray-200 backdrop-blur-xl border border-white
        flex items-center justify-center text-center 
        text-black hover:scale-105 hover:shadow-xl transition-all duration-300 flex-col"
      >
        <p className="text-[15px] md:text-2xl font-semibold px-4 pb-3 ">
          Setup an account to get started
        </p>
        <div onClick={handleClick}>
          {loading ? (
            <div className='rounded-2xl border-2 border-black bg-black w-[170px] h-[50px] flex justify-center items-center'>
              <CircleLoader color="white" size={20} />
            </div>
          ) : (
            <LoginBtn text="Setup Account" />
          )}
        </div>
      </div>
    );
  }
  
  export default NoCardMessage;
  
