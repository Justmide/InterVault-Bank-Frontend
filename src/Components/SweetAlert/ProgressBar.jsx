import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProgressBar() {
  const [value, setValue] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const rafRef = useRef(null);
  const navigate = useNavigate(); // ✅ Correct hook usage

  useEffect(() => {
    const duration = 120000; // 2 minutes
    const totalSteps = 100;
    const interval = duration / totalSteps;

    const step = () => {
      setValue(prev => {
        const next = prev + 1;

        if (next >= 100) {
          cancelAnimationFrame(rafRef.current);
          setShowToast(true);

          // Delay navigation slightly so toast is visible
          setTimeout(() => {
            const loggedUser =JSON.parse(localStorage.getItem("customer"))
            const userId = loggedUser?.id
            if (userId) {
              navigate(`/dashboard?userId=${userId}`);
            } else {
              console.error("User ID is missing. Cannot navigate to dashboard.");
            }
          }, 1500);

          return 100;
        }

        rafRef.current = requestAnimationFrame(() => setTimeout(step, interval));
        return next;
      });
    };

    rafRef.current = requestAnimationFrame(() => setTimeout(step, interval));

    return () => cancelAnimationFrame(rafRef.current);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white rounded shadow-lg">
        <p className="mb-5 text-center">Just a minute...</p>

        {/* Toast */}
        {showToast && (
          <div
            className="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded transition-opacity duration-700 ease-out opacity-100 animate-fade-in-down"
            role="alert"
          >
            <strong className="font-bold">Success:</strong>
            <span className="block sm:inline ml-1">The Vault is yours!</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-2xl h-6 overflow-hidden">
          <div
            className="bg-red-600 h-full text-white text-sm font-bold flex items-center justify-center transition-[width] duration-100 ease-linear"
            style={{ width: `${value}%` }}
          >
            {value}%
          </div>
        </div>

        {/* Toast animation */}
        <style>
          {`
            @keyframes fade-in-down {
              0% {
                opacity: 0;
                transform: translateY(-10px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-in-down {
              animation: fade-in-down 0.6s ease-out forwards;
            }
          `}
        </style>
      </div>
    </div>
  );
}
