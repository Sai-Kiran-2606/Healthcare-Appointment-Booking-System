// // src/components/patient/DoctorList.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function DoctorList() {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8080/doctors", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // console.log(response.data);
//         setDoctors(response.data);
//       } catch (err) {
//         console.error("Failed to fetch doctors:", err);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Available Doctors</h2>
//       {doctors.length === 0 ? (
//         <p>No doctors found.</p>
//       ) : (
//         doctors.map((doc) => (
//           <div key={doc.doctorId} className="border p-2 mb-2 rounded shadow-sm">
//             <p><strong>Name:</strong> {doc.name}</p>
//             <p><strong>Specialization:</strong> {doc.specialization}</p>
//             <p><strong>Location:</strong> {doc.location}</p>
//             <p><strong>Rating:</strong> {doc.rating}</p>
//             <p>
//               <strong>Availability:</strong>{" "}
//               {doc.availabilityStatus ? "Available" : "Not Available"}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default DoctorList;

// src/components/patient/DoctorList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(response.data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors by name
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (doctorName) => {
    // Redirect to booking page with doctorName as a query param
    navigate(
      `/patient/dashboard/book?doctorName=${encodeURIComponent(doctorName)}`
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Doctors</h2>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring"
        />
      </div>

      {/* Doctor Cards in grid layout */}
      {filteredDoctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.doctorId}
              className="border p-4 rounded shadow-sm flex flex-col justify-between">
              <div>
                <p className="font-semibold text-2xl mb-1">Dr. {doc.name}</p>
                <p className="text-md">
                  <strong>Specialization:</strong> {doc.specialization}
                </p>
                <p className="text-md">
                  <strong>Location:</strong> {doc.location}
                </p>
                <p className="text-md">
                  <strong>Rating:</strong> {doc.rating}
                </p>
                <p className="text-md">
                  <strong>Availability:</strong>{" "}
                  {doc.availabilityStatus ? "Available" : "Not Available"}
                </p>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => handleBookAppointment(doc.name)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorList;
