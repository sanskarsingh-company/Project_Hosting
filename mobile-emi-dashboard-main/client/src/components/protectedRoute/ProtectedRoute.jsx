import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authontext"; // Import your AuthContext

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext); // Access user from context

  // If the user is not authenticated, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected component
  return element;
};

export default ProtectedRoute;
