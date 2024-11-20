
import React from 'react';
import {Search } from 'lucide-react';
import ServiceCard from './ServiceCard';

const MainContent = () => (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for services"
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 mr-2"></div>
          <div>
            <div className="text-sm">Username</div>
            <div className="text-xs text-gray-500">Senior Electrician</div>
          </div>
        </div>
      </div>
  
      <div className="mb-8">
        <div className="flex space-x-8">
          <span className="text-gray-900 border-b-2 border-purple-500 pb-2">Suggestions</span>
          <span className="text-gray-400">New</span>
        </div>
      </div>
  
      <div className="grid grid-cols-3 gap-6">
        <ServiceCard highlighted={true} />
        {[...Array(8)].map((_, i) => (
          <ServiceCard key={i} highlighted={false} />
        ))}
      </div>
    </div>
  );

  export default MainContent;