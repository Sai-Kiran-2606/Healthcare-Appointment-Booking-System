// src/components/doctor/DoctorOverview.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorOverview() {
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

  const now = new Date();
  const todaysAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.appointmentTime);
    return apptDate.toDateString() === now.toDateString();
  });
  const upcomingAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.appointmentTime);
    return apptDate > now;
  });

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
  //   // Navigate to appointments page with query parameters for update
  //   navigate(
  //     `/doctor/dashboard/appointments?updateApptId=${appointment.appointmentId}`
  //   );
  // };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Doctor Overview</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Today's Appointments</h3>
        {todaysAppointments.length > 0 ? (
          <div className="grid gap-4">
            {todaysAppointments.map((appt) => (
              <div
                key={appt.appointmentId}
                className="border p-4 rounded shadow-sm">
                <p>
                  <strong>Patient:</strong> {appt.patient?.name || "N/A"}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(appt.appointmentTime).toLocaleTimeString()}
                </p>
                {appt.status === "SCHEDULED" && (
                  <div className="mt-3 flex space-x-2">
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
          <p className="text-gray-700">No appointments for today.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
        {upcomingAppointments.length > 0 ? (
          <div className="grid gap-4">
            {upcomingAppointments.map((appt) => (
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
                {appt.status === "SCHEDULED" && (
                  <div className="mt-3 flex space-x-2">
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
          <p className="text-gray-700">No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorOverview;
