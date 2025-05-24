import React from 'react';
import VerifyAnimation from '../../Components/Animations/VerifyAnimation'; // Adjust path if needed
import { Link } from 'react-router-dom';

const VerifyAccount = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md text-center">
        {/* Animation */}
        <div className="flex justify-center mb-6">
          <VerifyAnimation />
        </div>

        {/* Headline */}
        <h2 className="text-red-500 text-2xl font-bold mb-2 sm:text-3xl lg:text-4xl">Verify Your Email</h2>
        <p className="text-black mb-6 text-sm sm:text-base">
          We've sent a verification link to your email. Please check your inbox or spam and follow the instructions to activate your account.
        </p>

        {/* Action buttons */}
        <div className="space-y-3">
          <button className="text-[14px] w-[80%] py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-xl transition duration-300">
            Resend Verification Email
          </button>
          <Link
            to="/login"
            className="block text-sm text-black hover:text-red-700  hover:underline transition sm:text-base"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
