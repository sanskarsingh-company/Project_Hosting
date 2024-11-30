import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession, logoutUser } from "../service/userService"; // Importing the services

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user session data
  const [loading, setLoading] = useState(true); // To prevent unnecessary redirects before session is checked
  const navigate = useNavigate();

  // Check the session when the app is loaded or URL is refreshed
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionUser = await checkSession(); // Check session from service
        if (sessionUser) {
          setUser({ role: sessionUser.role });
        }
      } catch (error) {
        console.log("Session expired or user is not authenticated.");
        setUser(null); // Ensure user is set to null if session is invalid
      } finally {
        setLoading(false); // Once session check is complete, stop loading
      }
    };

    fetchUser();
  }, []);

  const login = (role) => {
    setUser({ role });
    navigate("/"); // Redirect to home after login
  };

  const logout = async () => {
    await logoutUser(); // Logout using the service
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  // Display a loading state while session is being checked to avoid flickering
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
