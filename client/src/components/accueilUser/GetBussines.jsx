import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "./Sidebar"; 
import { Heart } from "lucide-react";
import { useSave } from "./SaveContext"; 

const GetBussines = () => {
  const { id } = useParams();  

  const [business, setBusiness] = useState(null);
  const { saveBusiness } = useSave(); 

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
      </div>
    </div>
  );
};

export default GetBussines;
