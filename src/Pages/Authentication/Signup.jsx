import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import coverImage from "../../assets/Images/peakpx.jpg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { authContext } from "../../UseContext/AuthContext";
import Navbar from "../../Components/NavBar/Navbar";
import Footer from "../../Components/LandingPage/Footer";
import { Link } from "react-router-dom";

const FormSchema = yup.object({
  firstName: yup.string().required("Firstname is required"),
  lastName: yup.string().required("Lastname is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  gender: yup.string().required("gender is required"),
});

const PasswordField = ({ register, errors }) => {
  const [type, setType] = useState("password");

  const handleToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="w-full flex flex-col">
      <label htmlFor="password" className="ml-2 mb-1">
        Password
      </label>
      <div className="relative w-full">
        <input
          {...register("password")}
          placeholder="Password"
          id="password"
          type={type}
          className="px-4 py-2 rounded rounded-br-2xl rounded-tl-2xl bg-white text-black w-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="button"
          onClick={handleToggle}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
        >
          <FontAwesomeIcon icon={type === "password" ? faEyeSlash : faEye} />
        </button>
      </div>
      {errors.password && (
        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
      )}
    </div>
  );
};

const Signup = () => {
  const { signup, submitting } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = (data) => {
    signup(data);
  };

  return (
    <section className="sect1 relative ">
      <Navbar />
      <div className="relative m-auto h-[780px] lg:h-[650px] md:h-[750px]">
        <motion.img
          src={coverImage}
          alt="Background"
          initial={{ opacity: 0 }}
          className="w-full object-cover h-[780px] lg:h-[650px] md:h-[750px]"
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 bg-gray-900 opacity-80"></div>

        <div className="absolute inset-0 flex items-center justify-center text-white z-10 px-4">
          <section className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto">
            {/* Left Section */}
            <motion.div
              className="hidden lg:block lg:w-1/2 pt-40 pl-20"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <p className="text-2xl font-semibold">JOIN FOR FREE</p>
              <p className="text-lg lg:text-2xl font-semibold leading-8 mt-4">
                Create your account in seconds, with{" "}
                <span className="slant-bg italic px-1">InterVault</span>,
                secure your finances for life.
              </p>
              <p className="mt-4 text-sm text-gray-200 italic">
                Join us by creating an account...
                <br /> Banking made simple. Sign up and get started.
              </p>
            </motion.div>

            {/* Right Section */}
            <motion.div
              className="lg:w-1/2 pt-10 md:pt-16 px-4 sm:px-6 md:px-10 lg:px-16"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <p className="text-2xl font-semibold italic mb-1 flex gap-1">
                Create an Account
                <span className="text-red-600">.</span>
                <span className="text-red-600 blink-dot">.</span>
              </p>
              <p className="text-gray-400 italics mb-6">
                Already safeguarding funds?{" "}
                <Link to="/login" className="slant-bg italic text-white px-1">Log in</Link>
              </p>
            
              <style>
                {`
                  .blink-dot {
                    animation: blink 1.5s infinite;
                  }
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                    .slant-bg {
                    position: relative;
                    display: inline-block;
                   z-index: 0;
                  }

                     .slant-bg::before {
                       content: '';
                           position: absolute;
                         top: 0;
                       left: -5%;
                      width: 110%;
                         height: 100%;
                    background-color: #7f1d1d; /* red-900 */
                     transform: skewX(-15deg);
                        z-index: -1;
                      border-radius: 4px;
                    }

                `}
              </style>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full"
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="w-full lg:w-1/2q">
                    <label htmlFor="firstName" className="ml-2 mb-1">
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      id="firstName"
                      placeholder="First Name"
                      className="px-4 py-2 w-full rounded rounded-br-2xl rounded-tl-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="lastName" className="ml-2 mb-1">
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      id="lastName"
                      placeholder="Last Name"
                      className="px-4 py-2 w-full rounded rounded-br-2xl rounded-tl-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="ml-2 mb-1">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className="px-4 py-2 w-full rounded rounded-br-2xl rounded-tl-2xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="w-full lg:w-1/2">
                    <label htmlFor="gender" className="ml-2 mb-1">
                      Gender
                    </label>
                    <select {...register("gender")} className="px-4 py-2 w-full rounded-xl bg-white border border-gray-300 focus:border-blue-500 text-black">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="idiot">Hermaphrodite</option>
                    </select>
                    {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>}
                  </div>
                  <div className="w-full lg:w-1/2">
                    <PasswordField register={register} errors={errors} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-[60%] md:w-[40%] lg:w-[55%] mx-auto block rounded rounded-br-2xl rounded-tl-2xl bg-red-500 hover:bg-red-700 text-white px-6 py-2 transition duration-200"
                >
                  {submitting ? "Creating account..." : "Register Account"}
                </button>
              </form>
            </motion.div>
          </section>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Signup;
