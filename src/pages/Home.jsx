// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to the Appointment Booking System
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        A quick, modern way to schedule appointments with your doctor.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/register"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white font-semibold rounded-md shadow hover:shadow-lg transition-transform transform hover:-translate-y-0.5">
          Register
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 text-white font-semibold rounded-md shadow hover:shadow-lg transition-transform transform hover:-translate-y-0.5">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
