import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BS from "../assets/Login.png";
import { Circle } from "lucide-react";

const BusinessRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    type: "",
    shopName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (Object.values(formData).some((field) => field.trim() === "")) {
      alert("Please fill in all fields.");
      return;
    }
    navigate("/detailsBusiness", { state: { formData } });
  };
  const handleBack = () => {
    navigate(-1); 
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="bg-gray-100 flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
        <div className="text-center">
          <img src={BS} alt="Services Illustration" className="max-w-full mb-4" />

          {/* Circles Section */}
          <div className="flex space-x-4 justify-center mt-4">
            <div className="bg-gray-500 rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>
            <div className="bg-black rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>
            <div className="bg-gray-500 rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Create an Account</h1>
        <form>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="profession"
              placeholder="Profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="type"
              placeholder="Self or Company"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="shopName"
              placeholder="Name of shop/Company"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between">
          <button
              onClick={handleBack}
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

export default BusinessRegister;
