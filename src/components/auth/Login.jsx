// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [role, setRole] = useState("PATIENT");
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post("http://localhost:8080/auth/login", formData);
//     const { token, role, userId } = res.data;
//     if (token && role !== "INVALID_CREDENTIALS") {
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("userId", userId);

//       if (role === "PATIENT") {
//         navigate("/patient/dashboard");
//       } else if (role === "DOCTOR") {
//         navigate("/doctor/dashboard");
//       }
//     } else {
//       alert("Invalid credentials!");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Login failed!");
//   }
// };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder={`${role} Email`}
//             value={formData.email}
//             onChange={handleChange}
//             className="border rounded px-3 py-2 w-full mb-3"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border rounded px-3 py-2 w-full mb-3"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             Login as {role}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("PATIENT");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit email & password to the backend
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        formData
      );
      const { token, role: userRole, userId } = res.data;

      if (token && userRole !== "INVALID_CREDENTIALS") {
        // Store auth data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("userId", userId);

        // Navigate based on role
        if (userRole === "PATIENT") {
          navigate("/patient/dashboard");
        } else if (userRole === "DOCTOR") {
          navigate("/doctor/dashboard");
        }
      } else {
        alert("Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="block mb-1 text-gray-700 font-medium">
              {role} Email
            </span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring"
              required
            />
          </label>
          <label className="block mb-6">
            <span className="block mb-1 text-gray-700 font-medium">
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white font-semibold rounded-md shadow hover:shadow-lg transition-transform transform hover:-translate-y-0.5">
            Login as {role}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
