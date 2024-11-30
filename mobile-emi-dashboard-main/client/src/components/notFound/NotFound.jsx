import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  // Go back to the previous page
  const goBack = () => {
    navigate(-1); // This navigates to the previous page in history
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={goBack} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
