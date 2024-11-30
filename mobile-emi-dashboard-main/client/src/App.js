import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/navBar/navBar";
import UserList from "./components/userList/userList";
import AddUser from "./components/addUser/addUser";
import UserDetails from "./components/userDetails/userDetails";
import AddDevice from "./components/addDevice/addDevice";
import LoginPage from "./components/login/Login";
import CreateAdmin from "./components/createAdmin/CreateAdmin";
import CreateTeamMember from "./components/createUser/CreateTeamMember";
import { AuthProvider } from "./components/context/Authontext"; // AuthContext Provider
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"; // ProtectedRoute
import NotFound from "./components/notFound/NotFound";
import { ToastContainer } from "react-toastify";


const Routing = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute element={<UserList />} />} />
      <Route
        path="/addUser"
        element={<ProtectedRoute element={<AddUser />} />}
      />
      <Route
        path="/:id"
        element={<ProtectedRoute element={<UserDetails />} />}
      />
      <Route
        path="/user/:id/addDevice"
        element={<ProtectedRoute element={<AddDevice />} />}
      />
      <Route
        path="/createAdmin"
        element={<ProtectedRoute element={<CreateAdmin />} />}
      />
      <Route
        path="/createTeam"
        element={<ProtectedRoute element={<CreateTeamMember />} />}
      />
      <Route path="*" 
      element={<ProtectedRoute element={<NotFound />}/>}
      />
    </Routes>
  );
};

const App = () => {
  const location = useLocation(); // Use useLocation to get the current path

  return (
      // <NotificationProvider>
      <>
      <ToastContainer/>
      <AuthProvider>
        {/* Conditionally render NavBar only if the current path is not '/login' */}
        {location.pathname !== "/login" && <NavBar />}

        <Routing />
    </AuthProvider>
      </>
      // </NotificationProvider>
  );
};

export default App;
