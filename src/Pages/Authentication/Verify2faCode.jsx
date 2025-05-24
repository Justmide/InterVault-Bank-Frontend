import React, { useState, useContext, useEffect } from "react";
import EmailVerification from "../../Components/Animations/EmailVerification";
import { authContext } from "../../UseContext/AuthContext";
import { toast } from "sonner";

const Verify2faCode = () => {
  const { verify2facode, submitting } = useContext(authContext);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
  const [user, setUser] = useState(null);

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("customer");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
        } else {
          throw new Error("Invalid user data structure");
        }
      } catch (error) {
        console.error("Failed to parse user data", error);
        toast.error("Invalid user data. Please log in again.");
        localStorage.removeItem("customer");
      }
    }
  }, []);

  // Handle input change for each OTP field
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on next input if the current one is filled
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Combine the OTP digits into a string
  
    try {
      if (user && otpCode.length === 6) {
        // Proceed to verify the OTP code
        const response = await verify2facode({ 
          email: user.email, 
          code: otpCode 
        });

      } else {
        toast.error("Invalid or incomplete OTP.");
      }
    } catch (error) {
      // Handle error if API request or any other part of the code fails
      toast.error(error?.message || "An error occurred while verifying OTP.");
    }
  };
  

  return (
    <div className="bg-white text-black flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md text-center bg-white rounded-2xl p-6">
        {/* Animation */}
        <div className="flex justify-center mb-6">
          <EmailVerification />
        </div>

        {/* Text */}
        <div>
          <p className="mb-2 text-[20px] lg:text-[27px] md:text-[30px] font-semibold">Authenticate Your Account</p>
        </div>
        <div>
          <p className="italic font-500">Enter the code sent to your email to continue..</p>
        </div>
        <p>
        {/* {email} */}
        </p>

        {/* OTP input fields */}
        <form onSubmit={handleSubmit} className="flex justify-center gap-2 mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              maxLength="1"
              className="px-4 py-2 rounded bg-white text-black w-12 h-12 text-center border-2 border-red-600 focus:ring-2 focus:ring-red-500"
            />
          ))}
        </form>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 py-2 px-6 bg-red-500 text-white rounded rounded-br-2xl rounded-tl-2xl bg-red-500 hover:bg-red-700 text-white px-6 py-2 transition duration-200"
        >
            {submitting ? 
            "Verifying OTP..." 
            : "Verify OTP" }
          
        </button>
      </div>
    </div>
  );
};

export default Verify2faCode;
