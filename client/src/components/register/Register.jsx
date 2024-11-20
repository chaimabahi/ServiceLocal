import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../assets/Login.png";
import { Circle, Hand } from "lucide-react";

const Register = () => {
  const [accountType, setAccountType] = useState(""); // Track selected account type
  const navigate = useNavigate();

  const handleNext = () => {
    if (accountType === "Business") {
      navigate("/business-register"); 
    } else if (accountType === "User") {
      navigate("/user-register"); 
    } else {
      alert("Please select an account type.");
    }
  };
  const handleLog = () => {
    navigate("/loginuser");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="bg-gray-100 flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
        <div className="text-center">
          <img
            src={Login}
            alt="Services Illustration"
            className="max-w-full mb-4"
          />
          
          {/* Circles Section */}
          <div className="flex space-x-4 justify-center mt-4">
            {/* Black Circle */}
            <div className="bg-black rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>
            {/* Gray Circle 1 */}
            <div className="bg-gray-500 rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>


            {/* Gray Circle 2 */}
            <div className="bg-gray-500 rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4">Create an account</h1>
          <p className="text-gray-600 mb-6">Choose account type</p>
          <div className="space-y-4">
            <button
              className={`${
                accountType === "User"
                  ? "border-2 border-purple-500 bg-gray-300"
                  : "bg-gray-200"
              } hover:bg-gray-300 rounded-md py-2 px-4 flex items-center justify-between w-full`}
              onClick={() => setAccountType("User")}
            >
              <span>User Account</span>
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              className={`${
                accountType === "Business"
                  ? "border-2 border-purple-500 bg-gray-300"
                  : "bg-gray-200"
              } hover:bg-gray-300 rounded-md py-2 px-4 flex items-center justify-between w-full`}
              onClick={() => setAccountType("Business")}
            >
              <span>Business Account</span>
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Label at the Bottom */}
          <label className="block text-gray-600 text-center mt-4">
            I agree to all terms, privacy policies, and fees
          </label>

          {/* Horizontal Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="w-1/2 bg-[#8a4a9c] text-white py-3 rounded-md hover:bg-[#7a0b99] transition mr-2"
              onClick={handleNext}
            >
              Next
            </button>
            <button
              type="button"
              className="w-1/2 bg-[#a9a8a8] text-white py-3 rounded-md hover:bg-[#3c3c3c] transition ml-2"
              onClick={handleLog}
            >
              Login 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
