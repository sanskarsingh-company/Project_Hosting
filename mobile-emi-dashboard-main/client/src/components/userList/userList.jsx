import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser } from "../service/userService";
import AddUser from "../addUser/addUser";
import "./userList.css";
import { toast, ToastContainer } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [isaddModalOpen, setIsaddModalOpen] = useState(false); // Modal open state
  const navigate = useNavigate();

  const openModal = () => setIsaddModalOpen(true);
  const closeModal = () => setIsaddModalOpen(false);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  const calculateRunningEMI = (devices) => {
    let runningEMICount = 0;
    devices.forEach((device) => {
      const hasUnpaidEMI = device.emiDetails.some(
        (emi) => emi.status === "Unpaid"
      );
      if (hasUnpaidEMI) {
        runningEMICount++;
      }
    });
    return runningEMICount;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="addBtnHeader">
          <button className="addUserBtn" onClick={openModal}>Add User</button>
          <AddUser isOpen={isaddModalOpen} onClose={closeModal} />
        </div>

        <div className="table-container">
          <table className="table table-dark table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>User Id</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Total Devices</th>
                <th>Running Emi</th>
                {/* <th>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} onClick={() => handleUserClick(user._id)}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.devices.length}</td>
                  <td>{calculateRunningEMI(user.devices)}</td>
                  {/* <td>
                <div className={`device-status ${getOverallStatusClass(user.devices)}`}>
                  {getOverallStatusClass(user.devices).replace("-", " ")}
                </div>
              </td> */}
                  <td>
                    <i
                      className="fas fa-trash delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user._id);
                      }}
                      title="Delete User"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
