// components/shared/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in at all
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    // Logged in but not with the required role
    return <Navigate to="/login" replace />;
  }

  // If token & role match, allow access
  return children;
};

export default ProtectedRoute;
