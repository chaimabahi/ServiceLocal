import React from 'react';
import { Home, LayoutDashboard, Bookmark, MessageSquare, Settings, HelpCircle, Phone, Moon, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-purple-500 rounded-lg"></div>
        <span className="ml-2 text-xl font-semibold">Task Makerr</span>
      </div>

      <div className="mb-8">
        <div className="text-gray-400 mb-4">Menu</div>
        <nav className="space-y-4">
          <Link to="/" className="flex items-center text-purple-500 bg-purple-50 px-4 py-2 rounded-lg">
            <Home size={20} />
            <span className="ml-3">Home</span>
          </Link>
          <Link to="/requests" className="flex items-center text-gray-600 px-4 py-2">
            <LayoutDashboard size={20} />
            <span className="ml-3">Requests</span>
          </Link>
          <Link to="/saved" className="flex items-center text-gray-600 px-4 py-2">
            <Bookmark size={20} />
            <span className="ml-3">Saved</span>
          </Link>
          {/* Fix: Add closing tag for Link and pass the userId */}
          <div className="flex items-center text-gray-600 px-4 py-2">
            <Settings size={20} />
            <span className="ml-3">Settings</span>
          </div>
        </nav>
      </div>

      <div className="mb-8">
        <div className="text-gray-400 mb-4">Support</div>
        <div className="space-y-4">
          <div className="flex items-center text-gray-600 px-4 py-2">
            <HelpCircle size={20} />
            <span className="ml-3">Need help?</span>
          </div>
          <div className="flex items-center text-gray-600 px-4 py-2">
            <Phone size={20} />
            <span className="ml-3">Contact us!</span>
          </div>
        </div>
      </div>

      <div className="pt-8 space-y-4">
        <div className="flex items-center text-gray-600 px-4 py-2">
          <Moon size={20} />
          <span className="ml-3">Dark Mode</span>
        </div>
        <div className="flex items-center text-gray-600 px-4 py-2">
          <LogOut size={20} />
          <span className="ml-3">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
