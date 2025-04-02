// src/components/doctor/DoctorAvailability.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function DoctorAvailability() {
  const [availability, setAvailability] = useState(true);
  const doctorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Optionally, fetch the current doctor's availability if available.
    // For this example, we assume the default value.
  }, [doctorId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ideally, fetch the full doctor object first and update only availabilityStatus.
      // For simplicity, we send doctorId and availabilityStatus.
      await axios.put(
        "http://localhost:8080/doctors/update",
        { doctorId, availabilityStatus: availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Availability updated successfully!");
    } catch (error) {
      console.error("Failed to update availability", error);
      alert("Update failed!");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Set Availability</h2>
      <form onSubmit={handleSubmit}>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            className="mr-2"
          />
          <span className="text-gray-700">Available for Consultations</span>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Availability
        </button>
      </form>
    </div>
  );
}

export default DoctorAvailability;
