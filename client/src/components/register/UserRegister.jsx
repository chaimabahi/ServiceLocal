import React, { useState } from "react";
import BS from "../assets/Login.png";
import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const UserRegister = () => {
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleNext = async () => {
    try {
      const response = await axios.post('http://localhost:9070/api/users/register', userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
      console.log(response.data); 
      toast.success("Registration successful!");  
      navigate("/user-login");  
    } catch (error) {

      if (error.response) {
        console.error("Response error:", error.response.data);  
        toast.error(`Error: ${error.response.data.message || 'Something went wrong'}`); 
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("No response from the server. Please try again later.");  
      } else {
        console.error("Error:", error.message);
        toast.error(`Error: ${error.message}`);  
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
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
     
          <div className="flex space-x-4 justify-center mt-4">
     
            <div className="bg-gray-500 rounded-full flex items-center justify-center w-3 h-3">
              <Circle className="text-white" size={0} />
            </div>

      
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
          <h1 className="text-2xl font-semibold mb-6">Create an account</h1>
          <p className="text-gray-700 mb-6">Create your user profile</p>
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                placeholder="FullName"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={userData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={userData.phone}
                onChange={handleChange}
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

     
      <ToastContainer 
        position="bottom-right" 
        autoClose={10000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default UserRegister;
