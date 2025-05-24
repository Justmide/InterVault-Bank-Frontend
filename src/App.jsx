import React, { useState, useEffect } from 'react';
import { CircleLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./Pages/LandingPage";
import Signup from './Pages/Authentication/Signup';
import AuthProvider from './UseContext/AuthContext';
import { Toaster } from "sonner";
import VerifyAccount from './Pages/Authentication/VerifyAccount';
import AccountVerification from './Pages/Authentication/AccountVerification';
import Login from './Pages/Authentication/Login';
import Verify2faCode from './Pages/Authentication/Verify2faCode';
import Dashboard from './Pages/Protected/Dashboard';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css';
import ProtectedRoute from './Components/ProtectedRoute';
import SetupAcc from './Pages/Protected/SetupAcc';
import ProgressBar from './Components/SweetAlert/ProgressBar';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full bg-white">
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
              <Route path="/login" element={<Login />} />
              <Route path="/VerifyAccount" element={<VerifyAccount />} />
              <Route path='verify/:token' element={<AccountVerification />} />
              <Route path='verify2facode' element={<Verify2faCode />} /> 
              {/* PROTECTED ROUTE  */}
              <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/setup' element={<SetupAcc />} />
              <Route path="/loading" element={<ProgressBar />} />
              </Route>
              <Route path='*' element={<h1>Working on It</h1>} />
            </Routes>
          </AuthProvider>
        </Router>
      )}
    </div>
  );
};

export default App;
