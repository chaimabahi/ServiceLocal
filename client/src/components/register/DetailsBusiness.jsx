import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BS from "../assets/details.png"
import { Circle } from 'lucide-react';



const DetailsBusiness = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...location.state?.formData, // Pre-fill data from the previous step
    businessName: "",
    businessType: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:9070/api/businesses/register", formData);
      alert("Business registered successfully!");
      navigate("/business-login"); // Navigate to a success page or reset
    } catch (error) {
      console.error("Error registering business:", error);
      alert("Registration failed.");
    }
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
          
          
          
          {/* Gray Circle 2 */}
          <div className="bg-gray-500 rounded-full flex items-center justify-center w-3 h-3">
            <Circle className="text-white" size={0} />
          </div>

          {/* Black Circle */}
          <div className="bg-black rounded-full flex items-center justify-center w-3 h-3">
            <Circle className="text-white" size={0} />
          </div>
        </div>
      </div>
    </div>


      {/* Right Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Complete Registration</h1>
        <form>
          <div className="mb-4">
            <input
              type="text"
              name="businessName"
              placeholder="Business Registration Name"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="businessType"
              placeholder="Business Type"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailsBusiness;
