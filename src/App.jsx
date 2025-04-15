import React, { useState, useEffect } from 'react';
import { CircleLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import Signup from './Pages/Authentication/Signup';
// import Footer from './Components/Footer';
// import Navbar from './Components/Navbar';
import AuthProvider from './UseContext/AuthContext';
import { Toaster } from "sonner";
import VerifyAccount from './Pages/Authentication/VerifyAccount';
import AccountVerification from './Pages/Authentication/AccountVerification';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full bg-gray-900">
          <CircleLoader color="#f40606" size={70} />
        </div>
      ) : (
        <Router>
          <AuthProvider>
            <Toaster
              richColors
              visibleToasts={2}
              position="top-right"
              closeButton
            />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/VerifyAccount" element={<VerifyAccount />} />
              <Route path='verify/:token' element={<AccountVerification />} />
              <Route path='*' element={<h1>Working on It</h1>} />
            </Routes>
          </AuthProvider>
        </Router>
      )}
    </div>
  );
};

export default App;
