import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import { StatPanel } from './StatPanel';


export const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto pt-24 pb-8 px-8">
          <StatPanel/>
          <Outlet />
        </main>
      </div>
   
  );
}

export default AdminDashboard;