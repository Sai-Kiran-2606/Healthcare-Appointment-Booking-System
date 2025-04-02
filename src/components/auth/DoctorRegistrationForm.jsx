// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const DoctorRegisterForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     specialization: "GENERAL_MEDICINE",
//     location: "",
//     rating: 0,
//     experienceYears: 0,
//     availabilityStatus: true
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const value = e.target.name === "rating" || e.target.name === "experienceYears"
//       ? parseFloat(e.target.value)
//       : e.target.value;
//     setFormData((prev) => ({ ...prev, [e.target.name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Replace with your actual backend URL
//       const res = await axios.post("http://localhost:8080/auth/register/doctor", formData);
//       console.log("Doctor registered:", res.data);
//       alert("Doctor registered successfully!");
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
//       <label className="block mb-1">Specialization</label>
//       <select
//         name="specialization"
//         value={formData.specialization}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       >
//         <option value="CARDIOLOGY">CARDIOLOGY</option>
//         <option value="DERMATOLOGY">DERMATOLOGY</option>
//         <option value="NEUROLOGY">NEUROLOGY</option>
//         <option value="PEDIATRICS">PEDIATRICS</option>
//         <option value="ORTHOPEDICS">ORTHOPEDICS</option>
//         <option value="GENERAL_MEDICINE">GENERAL_MEDICINE</option>
//       </select>
//       <input
//         type="text"
//         name="location"
//         placeholder="Location"
//         value={formData.location}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       />
//       <label className="block mb-1">Rating</label>
//       <input
//         type="number"
//         name="rating"
//         value={formData.rating}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       />
//       <label className="block mb-1">Experience (Years)</label>
//       <input
//         type="number"
//         name="experienceYears"
//         value={formData.experienceYears}
//         onChange={handleChange}
//         className="border rounded px-3 py-2 w-full mb-3"
//       />
//       <div className="flex items-center mb-3">
//         <input
//           type="checkbox"
//           name="availabilityStatus"
//           checked={formData.availabilityStatus}
//           onChange={() => setFormData((prev) => ({
//             ...prev,
//             availabilityStatus: !prev.availabilityStatus
//           }))}
//           className="mr-2"
//         />
//         <label>Available for Appointments</label>
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//       >
//         Register as Doctor
//       </button>
//     </form>
//   );
// };

// export default DoctorRegisterForm;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "GENERAL_MEDICINE", // Must match an enum value
    location: "",
    rating: 0,
    experienceYears: 0,
    availabilityStatus: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert rating/experience to number
    const processedValue =
      name === "rating" || name === "experienceYears"
        ? parseFloat(value)
        : value;

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/register/doctor",
        formData
      );
      console.log("Doctor registered:", res.data);
      alert("Doctor registered successfully!");
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
          required
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
          placeholder="your@clinic.com"
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

      {/* Specialization */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">
          Specialization
        </label>
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring">
          <option value="CARDIOLOGY">CARDIOLOGY</option>
          <option value="DERMATOLOGY">DERMATOLOGY</option>
          <option value="NEUROLOGY">NEUROLOGY</option>
          <option value="PEDIATRICS">PEDIATRICS</option>
          <option value="ORTHOPEDICS">ORTHOPEDICS</option>
          <option value="GENERAL_MEDICINE">GENERAL_MEDICINE</option>
        </select>
      </div>

      {/* Location */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">Location</label>
        <input
          type="text"
          name="location"
          placeholder="City or Clinic Location"
          value={formData.location}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Rating */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">Rating</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Experience (Years) */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-700 font-medium">
          Experience (Years)
        </label>
        <input
          type="number"
          name="experienceYears"
          value={formData.experienceYears}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
        />
      </div>

      {/* Availability Status */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          name="availabilityStatus"
          checked={formData.availabilityStatus}
          onChange={() =>
            setFormData((prev) => ({
              ...prev,
              availabilityStatus: !prev.availabilityStatus,
            }))
          }
          className="mr-2"
        />
        <label className="text-gray-700 font-medium">
          Available for Appointments
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white font-semibold rounded-md shadow hover:shadow-lg transition-transform transform hover:-translate-y-0.5">
        Register as Doctor
      </button>
    </form>
  );
};

export default DoctorRegisterForm;
