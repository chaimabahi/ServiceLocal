import React, { useState } from "react";
import BS from "../assets/Login.png";
import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9070/api/users/login", {
        email,
        password,
      });
  
      // Save token in localStorage or Redux
      localStorage.setItem("token", response.data.token);  // Save token to local storage
  
      // Handle successful login (e.g., navigate to another page)
      console.log(response.data.message);  // Show success message
      navigate("/UserAccueil");
    } catch (err) {
      // Handle login error
      setError("Invalid email or password");
    }
  };
  
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
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
          <h1 className="text-2xl font-semibold mb-6">Connect to your profile</h1>
          <p className="text-gray-700 mb-6">User profile</p>
          <form onSubmit={handleNext}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="submit"
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
