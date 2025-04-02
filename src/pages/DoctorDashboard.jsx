// // // pages/DoctorDashboard.jsx
// // import React from "react";

// // const DoctorDashboard = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-100 p-4">
// //       <h1 className="text-3xl font-semibold mb-4">Doctor Dashboard</h1>
// //       {/*
// //         You can add components here:
// //         - Toggle availability
// //         - View scheduled appointments
// //       */}
// //       <p>Welcome to your doctor dashboard!</p>
// //     </div>
// //   );
// // };

// // export default DoctorDashboard;

// // src/pages/DoctorDashboard.jsx
// import React from "react";
// import { Link, Routes, Route } from "react-router-dom";

// // Import doctor sub-pages
// import DoctorOverview from "../components/doctor/DoctorOverview";
// import DoctorAppointments from "../components/doctor/DoctorAppointments";
// import DoctorSchedule from "../components/doctor/DoctorSchedule";
// import DoctorAvailability from "../components/doctor/DoctorAvailability";

// function DoctorDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top thin gradient bar */}
//       <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-2"></div>

//       <div className="flex">
//         {/* Sidebar remains at width w-64 */}
//         <div className="w-64 min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 shadow-md p-4">
//           <h2 className="text-xl font-bold mb-6 text-gray-800">
//             Doctor Dashboard
//           </h2>
//           <ul className="space-y-3">
//             <li>
//               <Link
//                 to="/doctor/dashboard"
//                 className="text-gray-700 hover:text-teal-600">
//                 Overview
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/doctor/dashboard/appointments"
//                 className="text-gray-700 hover:text-teal-600">
//                 Appointments
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/doctor/dashboard/schedule"
//                 className="text-gray-700 hover:text-teal-600">
//                 Schedule
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/doctor/dashboard/availability"
//                 className="text-gray-700 hover:text-teal-600">
//                 Set Availability
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 p-6 bg-white">
//           <Routes>
//             <Route index element={<DoctorOverview />} />
//             <Route path="appointments" element={<DoctorAppointments />} />
//             <Route path="schedule" element={<DoctorSchedule />} />
//             <Route path="availability" element={<DoctorAvailability />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorDashboard;

import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import DoctorOverview from "../components/doctor/DoctorOverview";
import DoctorAppointments from "../components/doctor/DoctorAppointments";
import DoctorSchedule from "../components/doctor/DoctorSchedule";
import DoctorAvailability from "../components/doctor/DoctorAvailability"; // optional

function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-2"></div>
      <div className="flex">
        <div className="w-64 min-h-screen bg-gradient-to-b from-blue-100 to-teal-100 shadow-md p-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Doctor Dashboard
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/doctor/dashboard"
                className="text-gray-700 hover:text-teal-600">
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/doctor/dashboard/appointments"
                className="text-gray-700 hover:text-teal-600">
                Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/doctor/dashboard/schedule"
                className="text-gray-700 hover:text-teal-600">
                Manage Schedule
              </Link>
            </li>
            <li>
              <Link
                to="/doctor/dashboard/availability"
                className="text-gray-700 hover:text-teal-600">
                Set Availability (Optional)
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 p-6 bg-white">
          <Routes>
            <Route index element={<DoctorOverview />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="schedule" element={<DoctorSchedule />} />
            <Route path="availability" element={<DoctorAvailability />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
