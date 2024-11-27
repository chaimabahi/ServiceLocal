import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import `useNavigate` for navigation
import ServiceCard from "./ServiceCard";

const MainContent = ({ user }) => { 
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize the navigation hook

  useEffect(() => {
    axios
      .get("http://localhost:9070/api/businesses/all")
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServiceClick = (serviceId) => {
    if (serviceId) {
      console.log("MainContent - User ID:", user);
      navigate(`/business/${serviceId}`, { state: { userId: user } }); // Pass userId correctly
    } else {
      console.error("Service ID is missing!");
    }
  };
  

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search for services"
          className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      <div className="mb-8">
        <div className="flex space-x-8">
          <span className="text-gray-900 border-b-2 border-purple-500 pb-2">Suggestions</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <div 
              key={service.id || index} 
              onClick={() => handleServiceClick(service.id)} 
              className="cursor-pointer"
            >
              <ServiceCard
                profession={service.profession}
                businessName={service.businessName}
                highlighted={index === 0}
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">No services found.</div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
