import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Lottie from 'react-lottie'; 
import animationData from './assets/dash.json'; 

const AdminDashboard = () => {
  const location = useLocation();
  const businessId = location.state?.businessId;

  console.log("AdminDashboard businessId:", businessId);

  // Lottie animation options
  const lottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex h-screen bg-white-50">
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
         
          {/* Lottie Animation */}
          <div className="w-full max-w-md mx-auto mb-6">
            <Lottie options={lottieOptions} height={600} width={750} />
          </div>

          <Outlet context={{ businessId }} /> {/* Pass businessId to Outlet */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
