// // src/components/patient/AppointmentBooking.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";

// function AppointmentBooking() {
//   const [doctorName, setDoctorName] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");
//   const [updateApptId, setUpdateApptId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [doctors, setDoctors] = useState([]);

//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     // Pre-fill doctor name from query params if provided
//     const docNameParam = searchParams.get("doctorName");
//     if (docNameParam) {
//       setDoctorName(docNameParam);
//     }
//     const updateId = searchParams.get("updateApptId");
//     if (updateId) {
//       setUpdateApptId(updateId);
//     }

//     // Fetch all doctors (assumes GET /doctors is available)
//     const token = localStorage.getItem("token");
//     axios.get("http://localhost:8080/doctors", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => setDoctors(res.data))
//     .catch((err) => console.error("Failed to fetch doctors:", err));
//   }, [searchParams]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     const patientId = localStorage.getItem("userId");

//     // Look up the doctor object by matching name (you may want to use a select input)
//     const matchedDoctor = doctors.find(
//       (doc) => doc.name.toLowerCase() === doctorName.toLowerCase()
//     );
//     if (!matchedDoctor) {
//       alert("No doctor found with that name.");
//       setLoading(false);
//       return;
//     }

//     // Build payload; note that the HTML datetime-local input returns a string in "YYYY-MM-DDTHH:mm" format.
//     const payload = {
//       doctor: { doctorId: matchedDoctor.doctorId },
//       patient: { patientId: parseInt(patientId) },
//       appointmentTime: appointmentTime  // e.g. "2025-03-20T14:30"
//     };

//     try {
//       await axios.post("http://localhost:8080/appointments/book", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Appointment booked successfully!");
//       setDoctorName("");
//       setAppointmentTime("");
//       setUpdateApptId(null);
//     } catch (error) {
//       console.error("Failed to book/update appointment:", error);
//       alert(
//         (error.response && error.response.data) ||
//         "Booking failed! Please check the time slot."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-4 shadow rounded">
//       <h2 className="text-xl font-bold mb-4">
//         {updateApptId ? "Update Appointment" : "Book an Appointment"}
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="block mb-1 font-medium text-gray-700">Doctor Name</label>
//           <input
//             type="text"
//             value={doctorName}
//             onChange={(e) => setDoctorName(e.target.value)}
//             className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
//             placeholder="e.g. Dr. John Smith"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block mb-1 font-medium text-gray-700">Appointment Date &amp; Time</label>
//           <input
//             type="datetime-local"
//             value={appointmentTime}
//             onChange={(e) => setAppointmentTime(e.target.value)}
//             className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           {loading ? "Processing..." : (updateApptId ? "Update Appointment" : "Book Appointment")}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AppointmentBooking;

// src/components/patient/AppointmentBooking.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

// Helper to append ":00" if the string is "YYYY-MM-DDTHH:mm"
function ensureSeconds(dateString) {
  if (!dateString) return dateString; // Guard for empty strings
  if (dateString.length === 16) {
    // e.g. "2025-03-20T14:30"
    return dateString + ":00"; // becomes "2025-03-20T14:30:00"
  }
  return dateString;
}

function AppointmentBooking() {
  const [doctorName, setDoctorName] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [updateApptId, setUpdateApptId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const docNameParam = searchParams.get("doctorName");
    if (docNameParam) {
      setDoctorName(docNameParam);
    }
    const updateId = searchParams.get("updateApptId");
    if (updateId) {
      setUpdateApptId(updateId);
    }

    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Failed to fetch doctors:", err));
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("userId");

    const matchedDoctor = doctors.find(
      (doc) => doc.name.toLowerCase() === doctorName.toLowerCase()
    );
    if (!matchedDoctor) {
      alert("No doctor found with that name.");
      setLoading(false);
      return;
    }

    // Append ":00" if needed, so "YYYY-MM-DDTHH:mm" becomes "YYYY-MM-DDTHH:mm:ss"
    const finalTime = ensureSeconds(appointmentTime);

    const payload = {
      doctor: { doctorId: matchedDoctor.doctorId },
      patient: { patientId: parseInt(patientId) },
      appointmentTime: finalTime,
    };

    try {
      await axios.post("http://localhost:8080/appointments/book", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Appointment booked successfully!");
      setDoctorName("");
      setAppointmentTime("");
      setUpdateApptId(null);
    } catch (error) {
      console.error("Failed to book/update appointment:", error);
      alert(
        (error.response && error.response.data) ||
          "Booking failed! Please check the time slot."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {updateApptId ? "Update Appointment" : "Book an Appointment"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium text-gray-700">
            Doctor Name
          </label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            placeholder="e.g. Dr. John Smith"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium text-gray-700">
            Appointment Date &amp; Time
          </label>
          <input
            type="datetime-local"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {loading
            ? "Processing..."
            : updateApptId
            ? "Update Appointment"
            : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default AppointmentBooking;
