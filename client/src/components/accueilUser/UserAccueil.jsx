import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent'
import { useLocation } from "react-router-dom";


const UserAccueil = () => {
  const location = useLocation();
  const { userId } = location.state || {}; 

  // Use the userId in your component
  console.log(userId);  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={userId}/>
      <MainContent user={userId} /> {/* Pass userId as a prop */}
    </div>
  );
};

export default UserAccueil;