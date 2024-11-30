import React, { useState } from "react";
import { addUser } from "../service/userService";
import "./addUser.css";
import { toast, ToastContainer } from "react-toastify";

const AddUser = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    deviceName: "",
    price: "",
    downPayment: "",
    emiTenure: "",
    interestRate: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      deviceName: "",
      price: "",
      downPayment: "",
      emiTenure: "",
      interestRate: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addUser(formData); // Await the parsed response
      console.log(result);

      if (result.ok) {
        resetForm();
        toast.success("User added successfully!"); // Success toast
        onClose(); // Close modal after success
      } else {
        // Handle errors returned from the API
        toast.error(result.error || "Failed to add user");
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      toast.error("Failed to add user");
    }
  };

  return (
    <div className="addUsermodal">
      <ToastContainer />
      <div className="form-container addUsermodalContainer">
      <div className="addUserHeading">
        <h3>Create User</h3>
      </div>
    
        <form className="addUserForm" onSubmit={handleSubmit}>
          {/* <label>Name</label> */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {/* <label>E-mail Address</label> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* <label>Phone No</label> */}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {/* <label>Address</label> */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {/* <label>Purchsed Device</label> */}
          <input
            type="text"
            name="deviceName"
            placeholder="Device Name"
            value={formData.deviceName}
            onChange={handleChange}
            required
          />
          {/* <label>Device Price</label> */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          {/* <label>Device Downpayment</label> */}
          <input
            type="number"
            name="downPayment"
            placeholder="Down Payment"
            value={formData.downPayment}
            onChange={handleChange}
            required
          />
          {/* <label>Emi Tenure</label> */}
          <input
            type="number"
            name="emiTenure"
            placeholder="EMI Tenure"
            value={formData.emiTenure}
            onChange={handleChange}
            required
          />
          {/* <label>Intrest Rate</label> */}
          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate"
            value={formData.interestRate}
            onChange={handleChange}
            required
          />
          <div className="addUserstatusUpdateModal">
            <button
              type="button"
              className="close"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Close
            </button>
            <button type="submit" className="update">
              Add Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
