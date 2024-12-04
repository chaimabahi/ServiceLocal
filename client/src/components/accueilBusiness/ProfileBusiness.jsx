import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const ProfileBusiness = () => {
  const [business, setBusiness] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBusiness, setUpdatedBusiness] = useState({});
  const { businessId } = useLocation().state || {};
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!businessId || !token) return;

    axios
      .get(`http://localhost:9070/api/businesses/${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBusiness(response.data);
        setUpdatedBusiness(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Error fetching business information.');
      });
  }, [businessId, token]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:9070/api/businesses/update/${businessId}`, updatedBusiness, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert('Business updated successfully!');
        setBusiness(updatedBusiness);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
        alert('Error updating business.');
      });
  };

  if (!business) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar businessId={businessId} />
      <div className="flex-grow p-6 bg-purple-50 min-h-screen">
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
            {isEditing ? 'Edit Business Profile' : 'Business Profile'}
          </h1>
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              {Object.entries(updatedBusiness)
                .filter(([key]) => key !== 'password') 
                .map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-purple-700 mb-1 capitalize">
                      {key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={value || ''}
                      onChange={handleChange}
                      className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 mt-1"
                    />
                  </div>
                ))}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md shadow-lg transition-all"
                >
                  Update Business
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {Object.entries(business)
                .filter(([key]) => key !== 'password') // Exclude the password field
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-purple-700 font-semibold capitalize">
                      {key.replace(/([a-z])([A-Z])/g, '$1 $2')}:
                    </span>
                    <span className="text-gray-800">{value || 'N/A'}</span>
                  </div>
                ))}
              <div className="text-center mt-8">
                <button
                  onClick={handleEditToggle}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-md shadow-lg transition-all"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBusiness;
