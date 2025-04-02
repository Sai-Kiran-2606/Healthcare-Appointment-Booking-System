// // src/components/patient/PatientProfile.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function PatientProfile() {
//   const [patientData, setPatientData] = useState({
//     patientId: "",
//     name: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     gender: ""
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const patientId = localStorage.getItem("userId"); // or from context
//         const response = await axios.get(
//           `http://localhost:8080/patients/${patientId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setPatientData(response.data);
//       } catch (err) {
//         console.error("Failed to fetch patient profile:", err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setPatientData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       // The backend requires patientId to identify which record to update
//       const response = await axios.put(
//         "http://localhost:8080/patients/update",
//         patientData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Failed to update profile:", err);
//       alert("Update failed!");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">My Profile</h2>
//       <form onSubmit={handleUpdate}>
//         <input
//           type="text"
//           name="name"
//           value={patientData.name}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="border rounded px-3 py-2 w-full mb-3"
//         />
//         <input
//           type="email"
//           name="email"
//           value={patientData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="border rounded px-3 py-2 w-full mb-3"
//         />
//         <input
//           type="password"
//           name="password"
//           value={patientData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="border rounded px-3 py-2 w-full mb-3"
//         />
//         <input
//           type="text"
//           name="phoneNumber"
//           value={patientData.phoneNumber}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           className="border rounded px-3 py-2 w-full mb-3"
//         />
//         <label className="block mb-1">Date of Birth</label>
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={patientData.dateOfBirth}
//           onChange={handleChange}
//           className="border rounded px-3 py-2 w-full mb-3"
//         />
//         <select
//           name="gender"
//           value={patientData.gender}
//           onChange={handleChange}
//           className="border rounded px-3 py-2 w-full mb-3"
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// }

// export default PatientProfile;

// src/components/patient/PatientProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function PatientProfile() {
  const [patientData, setPatientData] = useState({
    patientId: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8080/patients/${patientId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPatientData(response.data);
      } catch (err) {
        console.error("Failed to fetch patient profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setPatientData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:8080/patients/update", patientData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">My Profile (Patient)</h2>
        <form onSubmit={handleUpdate}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={patientData.name}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={patientData.email}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={patientData.password}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={patientData.phoneNumber}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={patientData.dateOfBirth}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientProfile;
