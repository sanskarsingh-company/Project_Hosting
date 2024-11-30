// export default UserDetails;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../service/userService";
import "./userDetails.css"; // Assuming you're using an external CSS file
import IMG from "../../asset/details-img/mobile.png";
import EmiStatusModal from "../emiStatusModal/EmiStatusModal";
import { updateEmiStatus } from "../service/userService";
import AddDeviceModal from "../addDevice/addDevice";
import { ToastContainer, toast } from "react-toastify";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(""); // Store selected device name
  const [deviceDetails, setDeviceDetails] = useState(null); // Store the device details to display after form submit

  const [selectedEmi, setSelectedEmi] = useState(null); // Selected EMI for updating
  const [newStatus, setNewStatus] = useState(""); // New status selected in modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  const [adduser, setaddUser] = useState(null);
  const [isaddModalOpen, setIsaddModalOpen] = useState(false);

  const openModal = () => setIsaddModalOpen(true);
  const closeModal = () => setIsaddModalOpen(false);

  useEffect(() => {
    fetchUserById(id)
      .then((data) => {
        setUser(data);
        setaddUser(data);
      })
      .catch(() => console.error("Failed to fetch user details"));
  }, [id]);

  const handleDeviceSelect = (event) => {
    setSelectedDevice(event.target.value); // Update selected device on dropdown change
  };

  const handleDeviceAdded = (newDevice) => {
    toast.success("Device added successfully!");
    setaddUser((prevUser) => ({
      ...prevUser,
      devices: [...prevUser.devices, newDevice],
    }));
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const device = user.devices.find((d) => d.deviceName === selectedDevice);
    setDeviceDetails(device); // Set the selected device details only after form submit
  };

  const handleOpenModal = (emi) => {
    console.log("Opening modal for EMI:", emi);
    setSelectedEmi(emi);
    setIsModalOpen(true);
    console.log("Modal is now open:", isModalOpen); // This might not reflect immediately due to state batching
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmi(null);
    setNewStatus(""); // Reset the status on close
  };

  // Handle status change in the modal
  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateEmiStatus = async () => {
    console.log("Attempting to update EMI status:", newStatus, selectedEmi);

    if (!newStatus || !selectedEmi) return;

    try {
      // Make sure this function is correctly defined and returns the expected value
      const updatedEmi = await updateEmiStatus(selectedEmi._id, newStatus);
      console.log("Updated EMI:", updatedEmi);

      // Update the EMI in the local state
      const updatedEmiDetails = deviceDetails.emiDetails.map((emi) =>
        emi._id === selectedEmi._id ? { ...emi, status: newStatus } : emi
      );

      // Update the device details with the new EMI details
      setDeviceDetails({ ...deviceDetails, emiDetails: updatedEmiDetails });

      // Close the modal after success
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update EMI status:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer />
      <div className="userDetailcontainer container">
        <div className="userDetailHeader">
          <h2>{user.name}</h2>
          <p>EMI Detail's</p>
        </div>

        {/* <div className="addDeviceButton">
          <Link to={`/user/${id}/addDevice`}>
            <button>Add Device</button>
          </Link>
        </div> */}

        <div>
          <div className="addDeviceButton">
            <button onClick={openModal}>Add Device</button>
          </div>
          <AddDeviceModal
            onDeviceAdded={handleDeviceAdded}
            isOpen={isaddModalOpen}
            onClose={closeModal}
          />
        </div>

        <div className="userDetailSeletor">
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="userDetailSeletorLeft">
                  <h3>Choose Model</h3>
                  <form onSubmit={handleSubmit} className="deviceSelectForm">
                    <select
                      name="device"
                      id="device"
                      onChange={handleDeviceSelect}
                      value={selectedDevice || ""}
                    >
                      <option className="option" value="">
                        Select
                      </option>
                      {user.devices.map((device) => (
                        <option
                          className="option"
                          key={device.deviceName}
                          value={device.deviceName}
                        >
                          {device.deviceName}
                        </option>
                      ))}
                    </select>
                    <button type="submit">Get Emi Details</button>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-md-6  col-sm-6 d-flex justify-content-center">
                <div className="userDetailSeletorRight">
                  <div className="userDetailSeletorRightHeading">
                    <h3>{user.name}'s Contact Details</h3>
                  </div>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Address: {user.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display selected device details only after form submit */}
      {deviceDetails && (
        <div className="deviceDetails ">
          <div className="container text-center">
            <div className="row">
              <div className=" col-lg-6 col-md-6 col-sm-6 d-flex align-items-center justify-content-center ">
                <div className="devieImge">
                  <img src={IMG} alt="Device" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="DeviceDetailsleft">
                  <h3>{deviceDetails.deviceName}</h3>

                  <div className="deviceDetailsLeftcontainer">
                    <p>Price: {deviceDetails.price}/-</p>
                    <p>Downpayment: {deviceDetails.downPayment}/-</p>
                    <p>EMI Tenure: {deviceDetails.emiTenure} months</p>
                    <p>Interest Rate: {deviceDetails.interestRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="detailTable container mt-5">
            {/* EMI Details Table */}
            <table className="table table-dark table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Due Date</th>
                  <th>Penalty</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {deviceDetails.emiDetails.map((emi, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(emi.dueDate).toLocaleDateString()}</td>
                    <td>{emi.penalty}</td>
                    <td>{emi.amount}</td>
                    <td>{emi.status}</td>
                    <td>
                      <button
                        onClick={() => {
                          console.log("EMI object clicked:", emi); // Debugging line
                          handleOpenModal(emi);
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <EmiStatusModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              emi={selectedEmi}
              onSubmit={handleUpdateEmiStatus}
              newStatus={newStatus}
              handleStatusChange={handleStatusChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
