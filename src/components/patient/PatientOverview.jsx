// // src/components/patient/PatientOverview.jsx
// import React from "react";

// function PatientOverview() {
//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Welcome to Your Dashboard</h2>
//       <p className="text-gray-700">
//         Here you can see a summary or any relevant info.
//       </p>
//     </div>
//   );
// }

// export default PatientOverview;

// src/components/patient/PatientOverview.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientOverview() {
  const [patientName, setPatientName] = useState("");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const patientId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/patients/${patientId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPatientName(response.data.name);
      } catch (error) {
        console.error("Failed to fetch patient profile:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointments/patient/${patientId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const now = new Date();
        // Filter for upcoming appointments (SCHEDULED and in the future)
        const upcoming = response.data.filter(
          (appt) =>
            appt.status === "SCHEDULED" && new Date(appt.appointmentTime) > now
        );
        setUpcomingAppointments(upcoming);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchPatientProfile();
    fetchAppointments();
  }, [patientId, token]);

  const handleCancel = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:8080/appointments/cancel/${appointmentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Remove the canceled appointment from state
      setUpcomingAppointments((prev) =>
        prev.filter((appt) => appt.appointmentId !== appointmentId)
      );
      alert("Appointment canceled successfully.");
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert("Cancellation failed!");
    }
  };

  const handleUpdate = (appointment) => {
    // Navigate to booking page with query parameters to update appointment
    navigate(
      `/patient/dashboard/book?updateApptId=${
        appointment.appointmentId
      }&doctorName=${encodeURIComponent(appointment.doctor?.name)}`
    );
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Welcome, {patientName || "Patient"}!
      </h2>
      <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
      {upcomingAppointments.length > 0 ? (
        <div className="grid gap-4">
          {upcomingAppointments.map((appt) => (
            <div
              key={appt.appointmentId}
              className="border p-4 rounded shadow-sm">
              <p>
                <span className="font-medium">Appointment ID:</span>{" "}
                {appt.appointmentId}
              </p>
              <p>
                <span className="font-medium">Doctor:</span>{" "}
                {appt.doctor?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {new Date(appt.appointmentTime).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Status:</span> {appt.status}
              </p>
              {appt.status === "SCHEDULED" && (
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleUpdate(appt)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Update
                  </button>
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
        <p className="text-gray-700">No appointments found.</p>
      )}
    </div>
  );
}

export default PatientOverview;
