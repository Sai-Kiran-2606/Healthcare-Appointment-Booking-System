// src/components/doctor/DoctorProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function DoctorProfile() {
  const [doctorData, setDoctorData] = useState({
    doctorId: "",
    name: "",
    email: "",
    password: "",
    specialization: "",
    location: "",
    rating: 0,
    experienceYears: 0,
    availabilityStatus: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8080/doctors/${doctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDoctorData(response.data);
      } catch (err) {
        console.error("Failed to fetch doctor profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setDoctorData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:8080/doctors/update", doctorData, {
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
        <h2 className="text-xl font-bold mb-4">My Profile (Doctor)</h2>
        <form onSubmit={handleUpdate}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={doctorData.name}
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
              value={doctorData.email}
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
              value={doctorData.password}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Specialization */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Specialization
            </label>
            <select
              name="specialization"
              value={doctorData.specialization}
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
            <label className="block mb-1 font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={doctorData.location}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={doctorData.rating}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Experience */}
          <div className="mb-3">
            <label className="block mb-1 font-medium text-gray-700">
              Experience (Years)
            </label>
            <input
              type="number"
              name="experienceYears"
              value={doctorData.experienceYears}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            />
          </div>

          {/* Availability */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="availabilityStatus"
              checked={doctorData.availabilityStatus}
              onChange={() =>
                setDoctorData((prev) => ({
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

export default DoctorProfile;
