// // src/components/patient/AppointmentList.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AppointmentList() {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const patientId = localStorage.getItem("userId"); // or fetch from context
//         const response = await axios.get(
//           `http://localhost:8080/appointments/patient/${patientId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setAppointments(response.data);
//       } catch (err) {
//         console.error("Failed to fetch appointments:", err);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const handleCancel = async (appointmentId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:8080/appointments/cancel/${appointmentId}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // Remove the canceled appointment from the local state
//       setAppointments((prev) => prev.filter((a) => a.appointmentId !== appointmentId));
//     } catch (err) {
//       console.error("Failed to cancel appointment:", err);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">My Appointments</h2>
//       {appointments.length === 0 ? (
//         <p>No appointments found.</p>
//       ) : (
//         appointments.map((appt) => (
//           <div key={appt.appointmentId} className="border p-2 mb-2 rounded shadow-sm">
//             <p><strong>Appointment ID:</strong> {appt.appointmentId}</p>
//             <p><strong>Doctor:</strong> {appt.doctor?.name}</p>
//             <p><strong>Time:</strong> {appt.appointmentTime}</p>
//             <p><strong>Status:</strong> {appt.status}</p>
//             {appt.status === "SCHEDULED" && (
//               <button
//                 onClick={() => handleCancel(appt.appointmentId)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default AppointmentList;

// src/components/patient/AppointmentList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8080/appointments/patient/${patientId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(response.data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/appointments/cancel/${appointmentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Remove from local state
      setAppointments((prev) =>
        prev.filter((a) => a.appointmentId !== appointmentId)
      );
      alert("Appointment canceled.");
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
      alert("Cancellation failed!");
    }
  };

  const handleUpdate = (appt) => {
    // Navigate to booking page with ?updateApptId=xxx and doc name
    navigate(
      `/patient/dashboard/book?updateApptId=${
        appt.appointmentId
      }&doctorName=${encodeURIComponent(appt.doctor?.name)}`
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {appointments.map((appt) => (
            <div
              key={appt.appointmentId}
              className="border p-4 rounded shadow-sm">
              <p className="mb-1">
                <strong>Appointment ID:</strong> {appt.appointmentId}
              </p>
              <p className="mb-1">
                <strong>Doctor:</strong> {appt.doctor?.name}
              </p>
              <p className="mb-1">
                <strong>Time:</strong>{" "}
                {new Date(appt.appointmentTime).toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {appt.status}
              </p>
              <div className="flex space-x-2">
                {/* Update if SCHEDULED */}
                {appt.status === "SCHEDULED" && (
                  <button
                    onClick={() => handleUpdate(appt)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Update
                  </button>
                )}
                {/* Cancel if SCHEDULED */}
                {appt.status === "SCHEDULED" && (
                  <button
                    onClick={() => handleCancel(appt.appointmentId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
