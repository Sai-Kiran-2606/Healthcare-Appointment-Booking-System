// src/components/doctor/DoctorAppointments.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointments/doctor/${doctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };
    fetchAppointments();
  }, [doctorId, token]);

  const handleCancel = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:8080/appointments/cancel/${appointmentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) =>
        prev.filter((a) => a.appointmentId !== appointmentId)
      );
      alert("Appointment canceled successfully.");
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert("Cancellation failed!");
    }
  };

  // const handleUpdate = (appointment) => {
  //   navigate(
  //     `/doctor/dashboard/appointments?updateApptId=${appointment.appointmentId}`
  //   );
  // };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">All Appointments</h2>
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {appointments.map((appt) => (
            <div
              key={appt.appointmentId}
              className="border p-4 rounded shadow-sm">
              <p>
                <strong>Patient:</strong> {appt.patient?.name || "N/A"}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(appt.appointmentTime).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {appt.status}
              </p>
              {appt.status === "SCHEDULED" && (
                <div className="flex space-x-2 mt-2">
                  {/* <button
                    onClick={() => handleUpdate(appt)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Update
                  </button> */}
                  <button
                    onClick={() => handleCancel(appt.appointmentId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No appointments available.</p>
      )}
    </div>
  );
}

export default DoctorAppointments;
