import React, { useState, useEffect } from 'react';
import { CircleLoader } from "react-spinners"; // Import spinner
import Navbar from './Components/Navbar';
import LandingPage from "./Pages/LandingPage";


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10); // Show spinner for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        // Full-screen loading spinner
        <div className="flex items-center justify-center h-screen w-full bg-gray-900">
          <CircleLoader color="#f40606" size={70} />
        </div>
      ) : (
        // Only show the content after loading
        <>
        {/* <BrowserRoute> */}
          <Navbar />
          <LandingPage />
          {/* </BrowserRoute> */}
        </>
      )}
    </div>
  );
};

export default App;
