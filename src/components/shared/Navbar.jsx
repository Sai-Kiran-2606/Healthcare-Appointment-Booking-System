// // src/components/shared/Navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiUser, FiLogOut } from "react-icons/fi"; // Removed FiHome & FiCalendar

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear localStorage or any auth tokens
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("patientId");
//     localStorage.removeItem("doctorId");
//     // Redirect to login (or landing)
//     navigate("/");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 shadow-lg">
//       <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Brand: "MediQueue" */}
//         <div className="cursor-pointer">
//           <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white tracking-tight">
//             MediQueue
//           </span>
//         </div>

//         {/* Right side: only Profile & Logout now */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link
//             to="/profile"
//             className="text-white font-medium flex items-center hover:text-yellow-100 transition-colors duration-300">
//             <FiUser className="mr-1" />
//             Profile
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="flex items-center bg-white text-purple-600 font-semibold px-4 py-2 rounded-md shadow hover:shadow-lg hover:bg-gray-50 transition-transform transform hover:-translate-y-0.5">
//             <FiLogOut className="mr-1" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// src/components/shared/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  // Check if a token exists in localStorage to determine if the user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("patientId");
    localStorage.removeItem("doctorId");
    // Redirect to landing page (or login)
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 shadow-lg">
      <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand: "MediQueue" */}
        <div className="cursor-pointer">
          <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white tracking-tight">
            MediQueue
          </span>
        </div>

        {/* Right side: Conditional rendering based on login status */}
        {isLoggedIn ? (
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/profile"
              className="text-white font-medium flex items-center hover:text-yellow-100 transition-colors duration-300">
              <FiUser className="mr-1" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center bg-white text-purple-600 font-semibold px-4 py-2 rounded-md shadow hover:shadow-lg hover:bg-gray-50 transition-transform transform hover:-translate-y-0.5">
              <FiLogOut className="mr-1" />
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/login"
              className="text-white font-medium hover:text-yellow-100 transition-colors duration-300">
              Login
            </Link>
            <Link
              to="/register"
              className="text-white font-medium hover:text-yellow-100 transition-colors duration-300">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
