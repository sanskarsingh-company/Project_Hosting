import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../service/userService"; // Assuming this service exists
import "./createAdmin.css";
import IMG from '../../asset/auth-img/auth-logo.png'

const CreateAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminData = { name, email, password };
      await createAdmin(adminData);
      setMessage("Admin created successfully!");
      navigate("/"); // Redirect to home or user list
    } catch (error) {
      setMessage("Error creating admin");
    }
  };

  return (
    <div className="container">
      <div className="createAdminContainer">
        <div className="createAdminLeft">
          <div className="createAdminLogo">
            <img src={IMG} alt="" />
          </div>
          <div className="">
            <h3>Lending Guru</h3>
          </div>
        </div>

        <div className="createAdminright">
          <h2>Create Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className ="createAdminInput">
              <label>Admin Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter Name"
              />
            </div>
            <div className ="createAdminInput">
              <label>E-mail Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter E-mail Address"
              />
            </div>
            <div className ="createAdminInput">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
              />
            </div>
            <button type="submit">Create Admin</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
