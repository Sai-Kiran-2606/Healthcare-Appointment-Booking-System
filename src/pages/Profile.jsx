// // src/pages/Profile.jsx
// import React from "react";
// import PatientProfile from "../components/patient/PatientProfile";
// import DoctorProfile from "../components/doctor/DoctorProfile";

// function Profile() {
//   const role = localStorage.getItem("role");

//   return (
//     <div>
//       {role === "PATIENT" ? (
//         <PatientProfile />
//       ) : role === "DOCTOR" ? (
//         <DoctorProfile />
//       ) : (
//         <p>User role not defined.</p>
//       )}
//     </div>
//   );
// }

// export default Profile;

// src/pages/Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PatientProfile from "../components/patient/PatientProfile";
import DoctorProfile from "../components/doctor/DoctorProfile";

function Profile() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-50 p-4">
      {/* Back button at top left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
        &larr; Back
      </button>

      {/* Render the correct profile based on role */}
      {role === "PATIENT" && <PatientProfile />}
      {role === "DOCTOR" && <DoctorProfile />}
    </div>
  );
}

export default Profile;
