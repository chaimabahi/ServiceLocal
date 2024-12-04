import React from "react";
import { useSave } from "./SaveContext"; // Import the custom hook to use the Save context
import SideBar from "./Sidebar";

const Save = () => {
  const { savedBusinesses } = useSave(); // Access the saved businesses from context

  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700">
      <SideBar />
      <div className="flex-1 p-8 bg-white bg-opacity-80 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center tracking-wide">
          Saved Businesses 
        </h2>
        {savedBusinesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-700">
            <p className="text-xl font-medium">No businesses saved yet! </p>
            <p className="mt-3 text-sm text-purple-700">Start exploring and save your favorite businesses!</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedBusinesses.map((business, index) => (
              <li
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-bold text-purple-700 mb-3 text-center">
                  {business.name}
                </h3>
                <p className="text-center text-purple-600">{business.profession}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Save;
