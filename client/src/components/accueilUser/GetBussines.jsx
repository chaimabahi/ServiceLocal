import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation to access state
import axios from "axios";
import SideBar from "./Sidebar";
import { Heart } from "lucide-react";
import { useSave } from "./SaveContext";
import RequestForm from "./RequestForm"; // Import the new RequestForm component

const GetBussines = () => {
  const { id } = useParams();
  const location = useLocation();
  const { userId } = location.state || {}; 

  console.log("GetBussines - User ID:", userId); // Ensure it logs correctly

  const [business, setBusiness] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false); // State to toggle form visibility
  const { saveBusiness } = useSave();

  if (!userId) {
    // Handle the case if userId is not available
    console.error("User ID is not available.");
  }

  useEffect(() => {
    if (!id) return;

    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9070/api/businesses/${id}`);
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business details", error);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  const handleSave = () => {
    if (business) {
      saveBusiness(business); // Save the business when the heart icon is clicked
      alert(`${business.name} has been saved!`); // Notify the user
    }
  };

  const handleRequest = (requestData) => {
    axios.post("http://localhost:9070/api/rendezvous", requestData)
      .then(() => {
        alert("Request sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending rendezvous request", error);
        alert("Failed to send request. Please try again.");
      });
  };

  const toggleRequestForm = () => {
    setShowRequestForm(!showRequestForm); // Toggle the visibility of the form
  };

  if (!business) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Business details */}
      <div className="flex-1 max-w-4xl mx-auto my-8 p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        <button onClick={handleSave} className="text-red-500 hover:text-red-700 mb-4">
          <Heart size={24} />
        </button>
        <h1 className="text-3xl font-semibold text-center mb-4">{business.name}</h1>
        <div className="text-xl font-medium mb-2">
          <strong>Profession:</strong> {business.profession}
        </div>
        <div className="text-xl font-medium mb-2">
          <strong>Type:</strong> {business.type}
        </div>
        <div className="text-xl font-medium mb-2">
          <strong>Shop Name:</strong> {business.shopName}
        </div>
        <div className="text-xl font-medium mb-2">
          <strong>Contact:</strong> {business.email}
        </div>

        {/* Request button */}
        <div className="text-center mt-6">
          <button
            onClick={toggleRequestForm}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Request Appointment
          </button>
        </div>
      </div>

      {/* Conditionally render the request form */}
      {showRequestForm && userId && (
        <RequestForm
          onSubmit={handleRequest} // Handle form submission
          onClose={toggleRequestForm} // Close the form on cancel
          userId={userId} // Pass the userId
          businessId={business.id} // Pass the business ID
        />
      )}
    </div>
  );
};

export default GetBussines;
