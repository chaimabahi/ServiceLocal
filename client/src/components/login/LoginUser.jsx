import React from "react";
import BS from "../assets/Login.png";
import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const LoginUser = () => { 

  const navigate = useNavigate(); 

  const handleNext = () => {
    navigate("/detailsBusiness");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="bg-gray-100 flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
        <div className="text-center">
          <img
            src={BS}
            alt="Services Illustration"
            className="max-w-full mb-4"
          />
          
          {/* Circles Section */}
          <div className="flex space-x-4 justify-center mt-4">
            {/* Gray Circle 1 */}
            <div className="bg-gray-500 rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>

            {/* Black Circle */}
            <div className="bg-black rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>

            {/* Gray Circle 2 */}
            <div className="bg-gray-500 rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6">Connect to your profil</h1>
          <p className="text-gray-700 mb-6">user profile</p>
          <form>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext} 
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser; 
