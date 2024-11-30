import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDeviceModal = ({ isOpen, onClose, onDeviceAdded }) => {
  const { id } = useParams();
  const [deviceData, setDeviceData] = useState({
    deviceName: "",
    price: "",
    downPayment: "",
    emiTenure: "",
    interestRate: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setDeviceData({
      ...deviceData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setDeviceData({
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
      const response = await fetch(`/addDevice/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...deviceData,
          price: Number(deviceData.price),
          downPayment: Number(deviceData.downPayment),
          emiTenure: Number(deviceData.emiTenure),
          interestRate: Number(deviceData.interestRate),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // toast.success("Device added successfully!");
        onDeviceAdded(result.device); // Update parent state
        resetForm(); // Clear form fields
      } else {
        const result = await response.json();
        toast.error(result.error || "Failed to add device.");
      }
    } catch (error) {
      toast.error("Error: Failed to add device.");
    }
  };

  return (
    <div className="modal">
      <ToastContainer />
      <div className="modalContainer">
        <h2>Add Device</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="deviceName"
            placeholder="Device Name"
            value={deviceData.deviceName}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={deviceData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="downPayment"
            placeholder="Down Payment"
            value={deviceData.downPayment}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="emiTenure"
            placeholder="EMI Tenure (months)"
            value={deviceData.emiTenure}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate (%)"
            value={deviceData.interestRate}
            onChange={handleChange}
            required
          />
          <div className="statusUpdateModal">
            <button
              type="button"
              className="close"
              onClick={() => {
                resetForm(); // Reset form when closing the modal
                onClose();
              }}
            >
              Close
            </button>
            <button type="submit" className="update">Add Device</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;
