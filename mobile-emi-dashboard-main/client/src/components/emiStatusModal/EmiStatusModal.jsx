// EmiStatusModal.jsx
import React from "react";
import "./modal.css";

const EmiStatusModal = ({
  isOpen,
  onClose,
  emi,
  onSubmit,
  newStatus,
  handleStatusChange,
}) => {
  if (!isOpen) return null; // Don't render if the modal is not open

  // Determine the options based on the current EMI status
  const statusOptions =
    emi?.status === "Paid"
      ? [{ value: "Unpaid", label: "Unpaid" }]
      : [{ value: "Paid", label: "Paid" }];

  return (
    <div className="modal">
      <div className="modalContainer">
        <h2>Update EMI Status</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(); // Call the function to update the status
          }}
        >
          <label>Current Status: {emi?.status}</label>
          <select value={newStatus} onChange={handleStatusChange}>
            <option value="">Select Status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="statusUpdateModal">
            <button type="button" className="close" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="update">Update Status</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmiStatusModal;
