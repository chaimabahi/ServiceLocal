import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export const AdminDashboard = () => {
  const location = useLocation();
  const businessId = location.state?.businessId; // Get businessId from location state

  console.log("AdminDashboard businessId:", businessId); // Debugging line

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar businessId={businessId} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
            <span className="text-sm text-gray-500">Business ID: {businessId}</span>
          </div>
        </header>

        {/* Content */}
        <div className="py-6 px-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard!</h2>
      <p>Manage your business here. Your business ID is <strong>{businessId}</strong>.</p>
   
          <Outlet context={{ businessId }} /> {/* Pass businessId to Outlet */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
