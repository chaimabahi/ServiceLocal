import React from "react";
import imageUrl from "../assets/user.png";

const ServiceCard = ({ highlighted, profession, businessName, rating = 4.3 }) => (
  <div className={`p-4 rounded-lg ${highlighted ? "bg-purple-500" : "border border-gray-200"}`}>
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div className={`mt-2 text-sm ${highlighted ? "text-white" : "text-purple-500"}`}>
        {profession}
      </div>
      <div className="flex items-center mt-1">
        <span className={highlighted ? "text-white" : "text-gray-700"}>{businessName}</span>
        <span className={`ml-2 ${highlighted ? "text-white" : "text-gray-600"}`}>{rating}</span>
        <span className="text-yellow-400 ml-1">★</span>
      </div>
    </div>
  </div>
);

export default ServiceCard;
