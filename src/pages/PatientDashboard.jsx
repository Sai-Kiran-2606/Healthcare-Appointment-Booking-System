// // src/pages/PatientDashboard.jsx
// import React from "react";
// import { Link, Route, Routes } from "react-router-dom";
// import DoctorList from "../components/patient/DoctorList";
// import AppointmentBooking from "../components/patient/AppointmentBooking";
// import AppointmentList from "../components/patient/AppointmentList";
// import PatientOverview from "../components/patient/PatientOverview"; // <--- new or existing overview page

// function PatientDashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-200 p-4">
//         <h2 className="text-2xl font-bold mb-6">Hi, profile name</h2>
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/patient/dashboard"
//               className="text-blue-700 hover:underline">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/patient/dashboard/doctors"
//               className="text-blue-700 hover:underline">
//               Doctors
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/patient/dashboard/book"
//               className="text-blue-700 hover:underline">
//               Book Appointment
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/patient/dashboard/appointments"
//               className="text-blue-700 hover:underline">
//               My Appointments
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <Routes>
//           {/* “Dashboard” page (overview) */}
//           <Route index element={<PatientOverview />} />
//           <Route path="doctors" element={<DoctorList />} />
//           <Route path="book" element={<AppointmentBooking />} />
//           <Route path="appointments" element={<AppointmentList />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default PatientDashboard;

// src/pages/PatientDashboard.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";

// Import your patient sub-pages
import PatientOverview from "../components/patient/PatientOverview";
import DoctorList from "../components/patient/DoctorList";
import AppointmentBooking from "../components/patient/AppointmentBooking";
import AppointmentList from "../components/patient/AppointmentList";

function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Thin gradient bar with blue-teal colors */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-2"></div>

      <div className="flex">
        {/* Sidebar remains w-64 and full height, with a blue-teal gradient */}
        <div className="w-64 min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 shadow-md p-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Patient Dashboard
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/patient/dashboard"
                className="text-gray-700 hover:text-teal-600">
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/patient/dashboard/doctors"
                className="text-gray-700 hover:text-teal-600">
                Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/patient/dashboard/book"
                className="text-gray-700 hover:text-teal-600">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link
                to="/patient/dashboard/appointments"
                className="text-gray-700 hover:text-teal-600">
                My Appointments
              </Link>
            </li>
          </ul>
        </div>

        {/* Main content area with a white background for a card-like look */}
        <div className="flex-1 p-6 bg-white">
          <Routes>
            <Route index element={<PatientOverview />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="book" element={<AppointmentBooking />} />
            <Route path="appointments" element={<AppointmentList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
