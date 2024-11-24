import React from "react";
import { useSave } from "./SaveContext"; // Import the custom hook to use the Save context
import SideBar from "./Sidebar";

const Save = () => {
  const { savedBusinesses } = useSave(); // Access the saved businesses from context

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Businesses</h2>
        {savedBusinesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <p className="text-lg">No businesses saved yet!</p>
            <p className="mt-2 text-sm">Start exploring and save your favorite businesses!</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBusinesses.map((business, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {business.name}
                </h3>
                <p className="text-gray-600">{business.profession}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Save;
