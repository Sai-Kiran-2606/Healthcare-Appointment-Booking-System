// // src/components/doctor/DoctorSchedule.jsx
// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import axios from "axios";

// function DoctorSchedule() {
//   const [date, setDate] = useState(new Date());
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [slots, setSlots] = useState([]);

//   const doctorId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   // Convert "HH:mm" to minutes from midnight
//   const timeToMinutes = (timeStr) => {
//     const [hh, mm] = timeStr.split(":").map(Number);
//     return hh * 60 + mm;
//   };

//   const fetchSlotsForDate = async (selectedDate) => {
//     try {
//       const yyyy = selectedDate.getFullYear();
//       const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
//       const dd = String(selectedDate.getDate()).padStart(2, "0");
//       const formattedDate = `${yyyy}-${mm}-${dd}`;

//       const response = await axios.get(
//         `http://localhost:8080/doctors/${doctorId}/availability?date=${formattedDate}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // Log the raw data you got from the backend
//       console.log("Slots from backend:", response.data);
//       setSlots(response.data);
//     } catch (error) {
//       console.error("Failed to fetch slots:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSlotsForDate(date);
//     // console.log("Slots from backend:", slots);
//   }, [date]);

//   const onCalendarChange = (newDate) => {
//     setDate(newDate);
//   };

//   // Create sub-slots between the given times.
//   // This example creates slots in increments of 30 minutes (or 60 if the total duration is a multiple of 60)
//   const createSubSlots = async (startMins, endMins, dayString) => {
//     let increment = 30;
//     const diff = endMins - startMins;
//     if (diff % 60 === 0) {
//       increment = 60;
//     }

//     let current = startMins;
//     while (current + increment <= endMins) {
//       const slotStartH = Math.floor(current / 60);
//       const slotStartM = current % 60;
//       const slotEnd = current + increment;
//       const slotEndH = Math.floor(slotEnd / 60);
//       const slotEndM = slotEnd % 60;

//       // Build zero-padded time strings
//       const startHH = String(slotStartH).padStart(2, "0");
//       const startMM = String(slotStartM).padStart(2, "0");
//       const endHH = String(slotEndH).padStart(2, "0");
//       const endMM = String(slotEndM).padStart(2, "0");

//       const startDateTime = `${dayString}T${startHH}:${startMM}`;
//       const endDateTime = `${dayString}T${endHH}:${endMM}`;

//       const payload = {
//         // The backend endpoint is POST /doctors/{doctorId}/availability
//         // Note: doctorId is passed via URL so we don’t need to include it in the payload’s doctor object if not desired.
//         doctor: { doctorId: parseInt(doctorId) },
//         startTime: startDateTime,
//         endTime: endDateTime,
//         isAvailable: true,
//       };
//       try {
//         await axios.post(
//           `http://localhost:8080/doctors/${doctorId}/availability`,
//           payload,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       } catch (error) {
//         console.error("Failed to create slot:", error);
//       }
//       current += increment;
//     }
//   };

//   const handleAddSlots = async (e) => {
//     e.preventDefault();
//     if (!startTime || !endTime) {
//       alert("Please select a start and end time.");
//       return;
//     }
//     const startMins = timeToMinutes(startTime);
//     const endMins = timeToMinutes(endTime);
//     if (endMins <= startMins) {
//       alert("End time must be after start time.");
//       return;
//     }
//     const diff = endMins - startMins;
//     if (diff % 30 !== 0) {
//       alert(
//         "The difference between start and end must be a multiple of 30 minutes."
//       );
//       return;
//     }
//     const yyyy = date.getFullYear();
//     const mm = String(date.getMonth() + 1).padStart(2, "0");
//     const dd = String(date.getDate()).padStart(2, "0");
//     const dayString = `${yyyy}-${mm}-${dd}`;
//     try {
//       await createSubSlots(startMins, endMins, dayString);
//       alert("Availability slots added successfully!");
//       setStartTime("");
//       setEndTime("");
//       fetchSlotsForDate(date);
//     } catch (error) {
//       console.error("Error while creating sub-slots:", error);
//       alert("Failed to create slots.");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Manage Schedule</h2>
//       <div className="flex flex-col md:flex-row gap-6">
//         <div>
//           <Calendar onChange={onCalendarChange} value={date} />
//           <p className="mt-4">Selected Date: {date.toDateString()}</p>
//         </div>
//         <div className="flex-1">
//           <form
//             onSubmit={handleAddSlots}
//             className="border p-4 rounded shadow-sm mb-4">
//             <h3 className="text-lg font-semibold mb-3">Add Availability</h3>
//             <div className="mb-3">
//               <label className="block mb-1 text-gray-700 font-medium">
//                 Start Time (HH:mm)
//               </label>
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="border rounded px-3 py-2 w-full"
//               />
//             </div>
//             <div className="mb-3">
//               <label className="block mb-1 text-gray-700 font-medium">
//                 End Time (HH:mm)
//               </label>
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="border rounded px-3 py-2 w-full"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//               Add Slots
//             </button>
//           </form>
//           <div className="border p-4 rounded shadow-sm">
//             <h3 className="text-lg font-semibold mb-3">Existing Slots</h3>
//             {slots.length > 0 ? (
//               <ul className="space-y-2">
//                 {slots.map((slot) => {
//                   // Now that slot.startTime is something like "2025-03-20T14:30:00"
//                   const startDate = new Date(slot.startTime);
//                   const endDate = new Date(slot.endTime);

//                   return (
//                     <li key={slot.id}>
//                       {startDate.toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}{" "}
//                       -{" "}
//                       {endDate.toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </li>
//                   );
//                 })}
//               </ul>
//             ) : (
//               <p className="text-gray-700">No slots for this date.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorSchedule;

// src/components/doctor/DoctorSchedule.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

// Helper to ensure we have seconds in the date/time string
function ensureSeconds(dateString) {
  if (!dateString) return dateString;
  if (dateString.length === 16) {
    return dateString + ":00";
  }
  return dateString;
}

function DoctorSchedule() {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slots, setSlots] = useState([]);

  const doctorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Convert "HH:mm" to minutes from midnight
  const timeToMinutes = (timeStr) => {
    const [hh, mm] = timeStr.split(":").map(Number);
    return hh * 60 + mm;
  };

  const fetchSlotsForDate = async (selectedDate) => {
    try {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;

      // We pass date as a query param; your backend must handle that if needed
      const response = await axios.get(
        `http://localhost:8080/doctors/${doctorId}/availability?date=${formattedDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Slots from backend:", response.data);
      setSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    }
  };

  useEffect(() => {
    fetchSlotsForDate(date);
    // eslint-disable-next-line
  }, [date]);

  const onCalendarChange = (newDate) => {
    setDate(newDate);
  };

  // Create sub-slots in increments of 30 or 60 minutes
  const createSubSlots = async (startMins, endMins, dayString) => {
    let increment = 30;
    const diff = endMins - startMins;
    if (diff % 60 === 0) {
      increment = 60;
    }

    let current = startMins;
    while (current + increment <= endMins) {
      const slotStartH = Math.floor(current / 60);
      const slotStartM = current % 60;
      const slotEnd = current + increment;
      const slotEndH = Math.floor(slotEnd / 60);
      const slotEndM = slotEnd % 60;

      // Build zero-padded time strings
      const startHH = String(slotStartH).padStart(2, "0");
      const startMM = String(slotStartM).padStart(2, "0");
      const endHH = String(slotEndH).padStart(2, "0");
      const endMM = String(slotEndM).padStart(2, "0");

      // "YYYY-MM-DDTHH:mm" (no seconds)
      const rawStartDateTime = `${dayString}T${startHH}:${startMM}`;
      const rawEndDateTime = `${dayString}T${endHH}:${endMM}`;

      // Append :00 so it becomes "YYYY-MM-DDTHH:mm:ss"
      const finalStart = ensureSeconds(rawStartDateTime);
      const finalEnd = ensureSeconds(rawEndDateTime);

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
      } catch (error) {
        console.error("Failed to create slot:", error);
      }
      current += increment;
    }
  };

  const handleAddSlots = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime) {
      alert("Please select a start and end time.");
      return;
    }
    const startMins = timeToMinutes(startTime);
    const endMins = timeToMinutes(endTime);
    if (endMins <= startMins) {
      alert("End time must be after start time.");
      return;
    }
    const diff = endMins - startMins;
    if (diff % 30 !== 0) {
      alert(
        "The difference between start and end must be a multiple of 30 minutes."
      );
      return;
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const dayString = `${yyyy}-${mm}-${dd}`;

    try {
      await createSubSlots(startMins, endMins, dayString);
      alert("Availability slots added successfully!");
      setStartTime("");
      setEndTime("");
      fetchSlotsForDate(date);
    } catch (error) {
      console.error("Error while creating sub-slots:", error);
      alert("Failed to create slots.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Manage Schedule</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <Calendar onChange={onCalendarChange} value={date} />
          <p className="mt-4">Selected Date: {date.toDateString()}</p>
        </div>
        <div className="flex-1">
          <form
            onSubmit={handleAddSlots}
            className="border p-4 rounded shadow-sm mb-4">
            <h3 className="text-lg font-semibold mb-3">Add Availability</h3>
            <div className="mb-3">
              <label className="block mb-1 text-gray-700 font-medium">
                Start Time (HH:mm)
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-gray-700 font-medium">
                End Time (HH:mm)
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Slots
            </button>
          </form>

          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Existing Slots</h3>
            {slots.length > 0 ? (
              <ul className="space-y-2">
                {slots.map((slot) => {
                  // The backend returns "YYYY-MM-DDTHH:mm:ss"
                  const startDate = new Date(slot.startTime);
                  const endDate = new Date(slot.endTime);

                  return (
                    <li key={slot.id} className="border p-2 rounded">
                      {startDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {endDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-700">No slots for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorSchedule;
