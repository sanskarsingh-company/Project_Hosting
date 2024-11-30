import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTeamMember } from "../service/userService";
import IMG from '../../asset/auth-img/auth-logo.png'
import "./createTeamMember.css";

const CreateTeamMember = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teamMemberData = { name, email, password };
      await createTeamMember(teamMemberData);
      setMessage("Team member created successfully!");
      navigate("/"); // Redirect to home or user list
    } catch (error) {
      setMessage("Error creating team member");
    }
  };

  return (
    <div className="container">
      <div className="createTeamContainer">
        <div className="createTeamLeft">
        <div className="createTeamLogo">
            <img src={IMG} alt="" />
          </div>
          <div className="">
            <h3>Lending Guru</h3>
          </div>
        </div>
        <div className="createTeamright">
          <h2>Create Member</h2>
          <form onSubmit={handleSubmit}>
            <div className="createTeamInput">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter Name"
              />
            </div>
            <div className="createTeamInput">
              <label>E-mai Addressl</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter E-mail Address"
              />
            </div>
            <div className="createTeamInput">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
              />
            </div>
            <button type="submit">Create Team Member</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateTeamMember;
