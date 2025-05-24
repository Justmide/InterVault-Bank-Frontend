import React, { useContext, useEffect, useState } from 'react'; 
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { authContext } from '../../UseContext/AuthContext';
import InputBox from '../../Components/UserDashboard/InputBox';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmSubmitWrapper from '../../Components/SweetAlert/ConfirmSubmitWrapper';


const FormSchema = yup.object({
  year: yup.string().required("Date of Birth field is required"),
  month: yup.string().required("Month is required"),
  date: yup.string().required("Day is required"),
  phone: yup.string().required("Mobile Phone Number is required"),
  address: yup.string().required("Address is required"),
  nationality: yup.string().required("Country is required"),
  citizenship: yup.string().required("Citizenship is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup.string().required("Zipcode is required"),
});

const SetupAcc = () => {
  const { setupAcc } = useContext(authContext);
  const [idType, setIdType] = useState("");
  const users = JSON.parse(localStorage.getItem("customer"))
  
  console.log(users)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(FormSchema),
    mode: "onChange",
  });

  const onValidSubmit = (formData) => {
    const dob = `${formData.year}-${formData.month.padStart(2, "0")}-${formData.date.padStart(2, "0")}`;
    setupAcc({ ...formData, idType, dob });
    console.log(formData);
  
  };

  const handleCancelEdit = () => {
    console.log("User canceled edit");
  };

  const fadeInVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="lg:px-[120px] md:px-[80px] sm:px-[40px] px-[15px]">
      <div className="  p-1">
        <p className="text-left text-[15px] lg:text-[25px] sm:text-[18px] font-semibold lg:mb-7 sm:mb-4 mb-3">
          Please fill in your information...
        </p>

        <ConfirmSubmitWrapper onValidSubmit={onValidSubmit}>
          {(confirmHandler) => (
            <form onSubmit={handleSubmit(confirmHandler)} className="space-y-4">
              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                className="p-4 flex bg-gray-100 lg:p-7 flex-col gap-5"
              >
                <div className="w-full">
                <p className="pb-5 text-center ">
                    Form Number: {users.id}
                  </p>
                  <label
                    htmlFor="firstName"
                    className="font-semibold text-[14px] lg:text-[20px] ml-2 mb-1"
                  >
                    Your Full Name
                  </label>
                  <input
                    type="hidden"
                    value={users.id}
                    {...register("userId")}
                  />
                  <div className="capitalize text-center px-4 py-2 w-full rounded-xl bg-white border-2 border-gray-300">
                    {users.firstName} {""} {users.lastName}
                  </div>
                </div>

                <div className="w-full">
                  <label
                    id="dob"
                    className="font-semibold ml-2 mb-1 text-[14px] lg:text-[20px] block"
                  >
                    Date of Birth
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <select
                      {...register("date")}
                      className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-300 focus:border-blue-500"
                    >
                      <option value="">Date</option>
                      {[...Array(31)].map((_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, "0")}>
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <select
                      {...register("month")}
                      className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-300 focus:border-blue-500"
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, "0")}>
                          {new Date(0, i).toLocaleString("default", {
                            month: "short",
                          })}
                        </option>
                      ))}
                    </select>

                    <select
                      {...register("year")}
                      className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-300 focus:border-blue-500"
                    >
                      <option value="">Year</option>
                      {Array.from(
                        { length: 85 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(errors.date || errors.month || errors.year) && (
                    <p className="text-center text-red-400 text-sm mt-1">
                      {errors.date?.message ||
                        errors.month?.message ||
                        errors.year?.message}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                className="flex flex-col md:flex-row gap-6 md:gap-10 bg-gray-100 p-7 lg:mt-10 sm:mt-5 mt-3 w-full justify-center items-center"
              >
                <div className="py-2 flex lg:items-center lg:w-[15%] md:items-start justify-center">
                  <input
                    type="radio"
                    name="idCard"
                    value="Nin"
                    checked={idType === "Nin"}
                    onChange={() => setIdType("Nin")}
                    className="mr-2"
                  />
                  <label className="font-semibold text-[14px] lg:text-[16px]">
                    NIN
                  </label>
                </div>
                <div className="py-2 flex lg:items-right lg:w-[25%] md:w-[40%] sm:items-end">
                  <input
                    type="radio"
                    name="idCard"
                    value="govtId"
                    checked={idType === "govtId"}
                    onChange={() => setIdType("govtId")}
                    className="mr-2"
                  />
                  <label className="font-semibold text-[12px] lg:text-[16px]">
                    Valid Government ID
                  </label>
                </div>

                <AnimatePresence mode="wait">
                  {idType === "Nin" && (
                    <motion.div
                      key="nin"
                      initial={{ opacity: 2, x: -30 }}
                      animate={{ opacity: 3, x: 10 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.7 }}
                      className="flex items-center lg:w-[50%] w-full mr-[20px]"
                    >
                      <InputBox
                        {...register("ninNumber")}
                        placeholder="11 Digit Number"
                        type="text"
                        className="italic w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500"
                      />
                      {errors.ninNumber && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.ninNumber.message}
                        </p>
                      )}
                    </motion.div>
                  )}
                  {idType === "govtId" && (
                    <motion.div
                      key="govtId"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center lg:w-[50%] w-full mr-[0px]"
                    >
                      <InputBox
                        {...register("govtPin")}
                        placeholder="Government ID Number"
                        type="text"
                        className="italic w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500"
                      />
                      {errors.govtPin && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.govtPin.message}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                className="flex flex-col bg-gray-100 p-7 lg:mt-10 sm:mt-5 mt-3 gap-10"
              >
                <div className="flex flex-col lg:flex-row gap-[10%] lg:p-4">
                  <div className="lg:w-[45%] md:w-full mb-3">
                    <label
                      htmlFor="citizenship"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      Citizenship
                    </label>
                    <select
                      {...register("citizenship")}
                      className="px-4 py-2 w-full rounded-xl bg-white border border-gray-300 focus:border-blue-500"
                    >
                      <option value="">Select Citizenship</option>
                      <option value="Nigeria">Nigerian</option>
                      <option value="Ghana">Ghanaian</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.citizenship && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.citizenship.message}
                      </p>
                    )}
                  </div>
                  <div className="lg:w-[45%] md:w-full">
                    <label
                      htmlFor="nationality"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      Country
                    </label>
                    <select
                      {...register("nationality")}
                      className="px-4 py-2 w-full rounded-xl bg-white border border-gray-300 focus:border-blue-500"
                    >
                      <option value="">Select Country</option>
                      <option value="Nigeria">Nigerian</option>
                      <option value="Ghana">hanaian</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.nationality && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.nationality.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-[10%]">
                  <div className="lg:w-[45%] w-full mb-3">
                    <label
                      htmlFor="mobilePhone"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      Mobile Phone
                    </label>
                    <InputBox
                      {...register("phone")}
                      type="number"
                      placeholder="Mobile Phone"
                      className="px-4 py-2 w-full rounded-xl bg-white border-2 border-gray-300"
                    />
                    {errors.mobilePhone && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.mobilePhone.message}
                      </p>
                    )}
                  </div>
                  <div className="lg:w-[45%] w-full">
                    <label
                      htmlFor="secondaryPhone"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      Secondary Phone
                    </label>
                    <InputBox
                      {...register("secondaryPhone")}
                      placeholder="Secondary Phone"
                      className="px-4 py-2 w-full rounded-xl bg-white border-2 border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-[10%]">
                  <div className="lg:w-[45%] w-full mb-3">
                    <label
                      htmlFor="addressLine1"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      Address Line 1
                    </label>
                    <InputBox
                      {...register("address")}
                      type="text"
                      placeholder="Address Line 1"
                      className="px-4 py-2 w-full rounded-xl bg-white border-2 border-gray-300"
                    />
                    {errors.addressLine1 && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.addressLine1.message}
                      </p>
                    )}
                  </div>
                  <div className="lg:w-[45%] w-full">
                    <label
                      htmlFor="AddressLine2"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      Address Line 2
                    </label>
                    <InputBox
                      {...register("AddressLine2")}
                      type="text"
                      placeholder="Address Line 2"
                      className="px-4 py-2 w-full rounded-xl bg-white border-2 border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex sm:flex-col md:flex-row flex-col lg:flex-row gap-[10%]">
                  <div className="w-[33%] sm:w-full w-full mb-2">
                    <label
                      htmlFor="city"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      City
                    </label>
                    <input
                      {...register("city")}
                      placeholder="City"
                      className="px-4 py-2 w-full rounded-xl bg-white border-2 border-gray-300"
                    />
                    {errors.city && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="w-[33%] sm:w-full w-full mb-2">
                    <label
                      htmlFor="state"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      State
                    </label>
                    <input
                      {...register("state")}
                      placeholder="State"
                      className="px-4 py-2 w-full rounded-xl bg-white border-2 border-gray-300"
                    />
                    {errors.state && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div className="w-[33%] sm:w-full w-full">
                    <label
                      htmlFor="zipcode"
                      className="font-semibold ml-2 text-[14px] lg:text-[20px]"
                    >
                      Zipcode
                    </label>
                    <input
                      {...register("zipcode")}
                      placeholder="Zipcode"
                      className="px-4 py-2 w-full rounded-xl bg-white border-2 border-gray-300"
                    />
                    {errors.zipcode && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.zipcode.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ACCOUNT TYPE */}

              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                className="bg-gray-100 p-7 lg:mt-10 sm:mt-5 mt-3 w-full"
              >
                <div className="flex justify-center font-semibold w-full mb-4">
                  <p>Select Your Account Type</p>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4">
                  <div className="py-2 flex items-center w-full md:w-1/4 justify-center">
                    <input
                      type="radio"
                      name="accountType"
                      value="savings"
                      defaultChecked
                      disabled
                      className="mr-2"
                    />
                    <label className="font-semibold text-sm lg:text-base">
                      Savings
                    </label>
                  </div>
                  <div className="py-2 flex items-center w-full md:w-1/4 justify-center">
                    <input
                      type="radio"
                      name="accountType"
                      value="checkings"
                      disabled
                      className="mr-2"
                    />
                    <label className="font-semibold text-sm lg:text-base">
                      Checkings
                    </label>
                  </div>
                  <div className="py-2 flex items-center w-full md:w-1/4 justify-center">
                    <input
                      type="radio"
                      name="accountType"
                      value="business"
                      disabled
                      className="mr-2"
                    />
                    <label className="font-semibold text-sm lg:text-base text-gray-600">
                      Business
                    </label>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-center lg:mt-10 sm:mt-5 mb-5">
                <button
                  type="submit"
                  className={`px-6 py-3 font-semibold rounded-xl shadow-lg transition duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Vault Info"}
                </button>
              </div>
            </form>
          )}
        </ConfirmSubmitWrapper>
      </div>
    </section>
  );
};

export default SetupAcc;