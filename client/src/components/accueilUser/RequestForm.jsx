import React, { useState } from 'react';

const RequestForm = ({ onSubmit, onClose, userId, businessId }) => {
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      user: { id: userId }, // Use the userId passed as a prop
      business: { id: businessId }, // Use the businessId passed as a prop
      date,
      status: 'Pending', // Default status as 'Pending'
      note,
    };
    onSubmit(requestData); // Send the data to the parent component
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Request Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-lg">Appointment Date</label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block text-lg">Note</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Submit Request
            </button>
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
