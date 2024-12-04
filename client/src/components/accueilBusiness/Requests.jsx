import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const Requests = () => {
  const [appointments, setAppointments] = useState([]);
  const { businessId } = useLocation().state || {};

  useEffect(() => {
    if (!businessId) return;

    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:9070/api/rendezvous/business/${businessId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [businessId]);

  const deleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9070/api/rendezvous/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar businessId={businessId} />
      <div className="flex-grow p-6 bg-purple-50 min-h-screen">
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">Appointments</h1>
                {appointments.length > 0 ? (
                  <ul className="space-y-4">
                  {appointments.map(({ id, date, user, note }) => (
        <li key={id} className="bg-gray-100 p-4 rounded-md shadow">
          <div className="flex justify-between">
            <span className="font-semibold text-purple-500">{user.fullName}</span>

            <button
              onClick={() => deleteAppointment(id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
          <div className="space-y-1">
            <span className="font-semibold">{user.phone}</span>
          </div>
          <p className="text-gray-600">{note || "No note provided"}</p>
          <p className="text-sm text-black-400">{new Date(date).toLocaleString()}</p>
        </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
