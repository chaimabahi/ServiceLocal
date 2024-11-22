import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent'



const UserAccueil = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default UserAccueil;