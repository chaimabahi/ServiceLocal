import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const Requests = () => {
  const [appointments, setAppointments] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const { businessId } = location.state || {}; 

  useEffect(() => {
    if (!businessId) return;

    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:9070/api/rendezvous/business/${businessId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [businessId]);

  const deleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9070/api/rendezvous/${appointmentId}/business/${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-purple-50">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Demandes de Rendez-vous</h1>
        {appointments.length === 0 ? (
          <p className="text-purple-600">Aucune demande de rendez-vous pour le moment.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="p-6 bg-purple-100 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-purple-800">{appointment.user.fullName} a demandé un rendez-vous</h3>
                <p className="text-purple-600">Email: {appointment.user.email}</p>
                <p className="text-purple-600">Téléphone: {appointment.user.phone}</p>
                <p className="text-purple-600">
                  Date du rendez-vous: {new Date(appointment.date).toLocaleString()}
                </p>
                <p className="text-purple-600">Statut: {appointment.status}</p>
                <p className="text-purple-600">Note: {appointment.note || "Aucune note supplémentaire."}</p>
                <button
                  onClick={() => deleteAppointment(appointment.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;
