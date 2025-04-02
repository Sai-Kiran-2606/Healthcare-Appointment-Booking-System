// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function DoctorAvailabilityManagement() {
//   const [slots, setSlots] = useState([]);
//   const [newSlotStart, setNewSlotStart] = useState("");
//   const [newSlotEnd, setNewSlotEnd] = useState("");
//   const doctorId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const fetchSlots = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/doctors/${doctorId}/availability`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSlots(response.data);
//     } catch (error) {
//       console.error("Failed to fetch slots", error);
//     }
//   };

//   useEffect(() => {
//     fetchSlots();
//     const interval = setInterval(fetchSlots, 30000);
//     return () => clearInterval(interval);
//   }, [doctorId, token]);

//   const handleAddSlot = async (e) => {
//     e.preventDefault();
//     if (
//       !newSlotStart ||
//       !newSlotEnd ||
//       new Date(newSlotStart) >= new Date(newSlotEnd)
//     ) {
//       alert("Please provide a valid time slot.");
//       return;
//     }
//     // The datetime-local input returns a string in "YYYY-MM-DDTHH:mm" format.
//     const payload = {
//       doctor: { doctorId: parseInt(doctorId) },
//       startTime: newSlotStart,
//       endTime: newSlotEnd,
//       isAvailable: true,
//     };
//     try {
//       await axios.post(
//         `http://localhost:8080/doctors/${doctorId}/availability`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setNewSlotStart("");
//       setNewSlotEnd("");
//       fetchSlots();
//     } catch (error) {
//       console.error("Failed to add slot", error);
//       alert("Failed to add slot.");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Manage Availability</h2>
//       <form onSubmit={handleAddSlot} className="mb-6">
//         <div className="mb-3">
//           <label className="block mb-1">Start Time</label>
//           <input
//             type="datetime-local"
//             value={newSlotStart}
//             onChange={(e) => setNewSlotStart(e.target.value)}
//             className="border rounded px-3 py-2 w-full"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block mb-1">End Time</label>
//           <input
//             type="datetime-local"
//             value={newSlotEnd}
//             onChange={(e) => setNewSlotEnd(e.target.value)}
//             className="border rounded px-3 py-2 w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Add Slot
//         </button>
//       </form>
//       <h3 className="text-lg font-semibold mb-2">Available Slots</h3>
//       {slots.length > 0 ? (
//         <ul className="space-y-2">
//           {slots.map((slot) => (
//             <li key={slot.id} className="border p-2 rounded">
//               {slot.startTime} - {slot.endTime}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No slots available.</p>
//       )}
//     </div>
//   );
// }

// export default DoctorAvailabilityManagement;

// src/components/doctor/DoctorAvailabilityManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper to append ":00" if the string is "YYYY-MM-DDTHH:mm"
function ensureSeconds(dateString) {
  if (!dateString) return dateString;
  if (dateString.length === 16) {
    return dateString + ":00";
  }
  return dateString;
}

function DoctorAvailabilityManagement() {
  const [slots, setSlots] = useState([]);
  const [newSlotStart, setNewSlotStart] = useState("");
  const [newSlotEnd, setNewSlotEnd] = useState("");
  const doctorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchSlots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/doctors/${doctorId}/availability`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch slots", error);
    }
  };

  useEffect(() => {
    fetchSlots();
    const interval = setInterval(fetchSlots, 30000);
    return () => clearInterval(interval);
  }, [doctorId, token]);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (
      !newSlotStart ||
      !newSlotEnd ||
      new Date(newSlotStart) >= new Date(newSlotEnd)
    ) {
      alert("Please provide a valid time slot.");
      return;
    }

    // Convert "YYYY-MM-DDTHH:mm" -> "YYYY-MM-DDTHH:mm:ss"
    const finalStart = ensureSeconds(newSlotStart);
    const finalEnd = ensureSeconds(newSlotEnd);

    const payload = {
      doctor: { doctorId: parseInt(doctorId) },
      startTime: finalStart,
      endTime: finalEnd,
      isAvailable: true,
    };

    try {
      await axios.post(
        `http://localhost:8080/doctors/${doctorId}/availability`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewSlotStart("");
      setNewSlotEnd("");
      fetchSlots();
    } catch (error) {
      console.error("Failed to add slot", error);
      alert("Failed to add slot.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Availability</h2>
      <form onSubmit={handleAddSlot} className="mb-6">
        <div className="mb-3">
          <label className="block mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={newSlotStart}
            onChange={(e) => setNewSlotStart(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">End Time</label>
          <input
            type="datetime-local"
            value={newSlotEnd}
            onChange={(e) => setNewSlotEnd(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Slot
        </button>
      </form>
      <h3 className="text-lg font-semibold mb-2">Available Slots</h3>
      {slots.length > 0 ? (
        <ul className="space-y-2">
          {slots.map((slot) => (
            <li key={slot.id} className="border p-2 rounded">
              {slot.startTime} - {slot.endTime}
            </li>
          ))}
        </ul>
      ) : (
        <p>No slots available.</p>
      )}
    </div>
  );
}

export default DoctorAvailabilityManagement;
