import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const MainContent = ({ user }) => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const servicesPerPage = 12; // Number of services per page
  const navigate = useNavigate();

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

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handleServiceClick = (serviceId) => {
    if (serviceId) {
      navigate(`/business/${serviceId}`, { state: { userId: user } });
    } else {
      console.error("Service ID is missing!");
    }
  };

  // Get the services for the current page
  const startIndex = (currentPage - 1) * servicesPerPage;
  const currentServices = filteredServices.slice(
    startIndex,
    startIndex + servicesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex-1 p-8">
  <div className="flex justify-between items-center mb-8 relative">
    <input
      type="text"
      placeholder="Search for services"
      className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  </div>



      <div className="mb-8">
        <div className="flex space-x-8">
          <span className="text-gray-900 border-b-2 border-purple-500 pb-2">Suggestions</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {currentServices.length > 0 ? (
          currentServices.map((service, index) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-lg ${
                pageNumber === currentPage
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContent;
