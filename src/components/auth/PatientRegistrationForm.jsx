// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const PatientRegisterForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     gender: ""
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Replace with your actual backend URL
//       const res = await axios.post("http://localhost:8080/auth/register/patient", formData);
//       console.log("Patient registered:", res.data);
//       alert("Patient registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Registration failed!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         placeholder="Full Name"
//         value={formData.name}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email Address"
//         value={formData.email}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       />
//       <input
//         type="text"
//         name="phoneNumber"
//         placeholder="Phone Number"
//         value={formData.phoneNumber}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       />
//       <label className="block mb-1">Date of Birth</label>
//       <input
//         type="date"
//         name="dateOfBirth"
//         value={formData.dateOfBirth}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       />
//       <select
//         name="gender"
//         value={formData.gender}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       >
//         <option value="">Select Gender</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//       >
//         Register as Patient
//       </button>
//     </form>
//   );
// };

// export default PatientRegisterForm;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/register/patient",
        formData
      );
      console.log("Patient registered:", res.data);
      alert("Patient registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Email Address */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="e.g. 123-456-7890"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Date of Birth */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">
          Date of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block mb-1 text-gray-700 font-medium">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white font-semibold rounded-md shadow hover:shadow-lg transition-transform transform hover:-translate-y-0.5">
        Register as Patient
      </button>
    </form>
  );
};

export default PatientRegisterForm;
