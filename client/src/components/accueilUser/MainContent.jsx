import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const MainContent = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch services data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:9070/api/businesses/all") // Update with your actual backend URL
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  // Filter services based on the search term
  const filteredServices = services.filter(
    (service) =>
      service.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for services"
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        {/* User Profile */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 mr-2"></div>
          <div>
            <div className="text-sm">Username</div>

          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-8">
          <span className="text-gray-900 border-b-2 border-purple-500 pb-2">
            Suggestions
          </span>
          <span className="text-gray-400">New</span>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-3 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <Link to={`/business/${service.id}`}>
            <ServiceCard
              key={service.id || index}
              highlighted={index === 0} // Highlight the first card as an example
              profession={service.profession}
              businessName={service.businessName}
              rating={service.rating || 4.3} // Provide a default rating
            />
            </Link>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No services found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
