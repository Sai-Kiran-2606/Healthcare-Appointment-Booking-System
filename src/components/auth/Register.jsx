// import React, { useState } from "react";
// import PatientRegisterForm from "./PatientRegistrationForm";
// import DoctorRegisterForm from "./DoctorRegistrationForm";

// const Register = () => {
//   const [role, setRole] = useState("PATIENT");

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//         <div className="flex justify-center mb-4">
//           <button
//             onClick={() => setRole("PATIENT")}
//             className={`px-4 py-2 mx-2 rounded ${
//               role === "PATIENT" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             Patient
//           </button>
//           <button
//             onClick={() => setRole("DOCTOR")}
//             className={`px-4 py-2 mx-2 rounded ${
//               role === "DOCTOR" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             Doctor
//           </button>
//         </div>

//         {role === "PATIENT" ? <PatientRegisterForm /> : <DoctorRegisterForm />}
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import PatientRegisterForm from "./PatientRegistrationForm";
import DoctorRegisterForm from "./DoctorRegistrationForm";

const Register = () => {
  const [role, setRole] = useState("PATIENT");

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Role Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setRole("PATIENT")}
            className={`px-4 py-2 mx-2 rounded font-semibold transition-colors ${
              role === "PATIENT"
                ? "bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white"
                : "bg-gray-200 text-gray-700"
            }`}>
            Patient
          </button>
          <button
            onClick={() => setRole("DOCTOR")}
            className={`px-4 py-2 mx-2 rounded font-semibold transition-colors ${
              role === "DOCTOR"
                ? "bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white"
                : "bg-gray-200 text-gray-700"
            }`}>
            Doctor
          </button>
        </div>

        {/* Conditionally Render Form */}
        {role === "PATIENT" ? <PatientRegisterForm /> : <DoctorRegisterForm />}
      </div>
    </div>
  );
};

export default Register;
