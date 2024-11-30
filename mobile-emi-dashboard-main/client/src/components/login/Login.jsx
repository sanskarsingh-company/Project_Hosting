// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginU } from "../service/userService"; // Call the login API
// import "./login.css";
// import { AuthContext } from "../context/Authontext";
// import authImg from "../../asset/auth-img/auth_side.png";
// import authImg2 from "../../asset/auth-img/auth-logo.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   // Function to validate email format
//   const validateEmail = (value) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
//     if (!emailRegex.test(value)) {
//       setEmailError("Please enter a valid email address");
//     } else {
//       setEmailError("");
//     }
//   };

//   // useEffect(() => {
//   //   if (login) {
//   //     // If user is already logged in, redirect to the home or dashboard page
//   //     navigate("/");
//   //   }
//   // }, [login, navigate]); // Run effect when user changes

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await fetch("/check-session", {
//           credentials: "include", // Ensures cookies are included in requests
//         });
//         if (response.ok) {
//           const data = await response.json();
//           // Handle logged-in state
//           login(data.role); // Update context with role
//         } else {
//           // Not logged in, navigate to login page
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error checking session:", error);
//       }
//     };
    
//     if (!login) {
//       checkSession(); // Only check if not already logged in
//     }
//   }, [login, navigate]);
  


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (emailError) return;
//     try {
//       const credentials = { email, password };
//       const { role } = await loginU(credentials); // Adjust your login function to only return role
  
//       login(role); // Update context without token
  
//       navigate("/"); // Redirect to home after successful login
      
//     } catch (err) {
//       toast.error("Invalid email or password", {
//         position: "top-right",
//         autoClose: 3000,
//         className: "toast-error",
//       });
//       setError("Something went wrong! Please try again.");
//     }
//   };
  
//   const isFormValid = email && password && !emailError;

//   return (
//     <>
//       <ToastContainer />

//       <div className="text-center">
//         <div className="row gap-0">
//           <div className="col leftauth">
//             <div className="auth-img">
//               <img src={authImg} alt="" />
//             </div>
//           </div>
//           <div className="col rightauth">
//             <div className="container">
//               <div className="header">
//                 <div className="header-img">
//                   <img src={authImg2} alt="" />
//                 </div>
//                 <div className="header-heading">
//                   <h1>Lending Guru</h1>
//                   <p>For simplify your emi management</p>
//                 </div>
//                 <div className="header-login">
//                   <h2>Log In</h2>
//                   {/* <p>Please log in to your account</p> */}
//                   <p>
//                     {error
//                       ? "Something went wrong! Please try again."
//                       : "Please log in to your account"}
//                   </p>
//                 </div>
//               </div>

//               <form onSubmit={handleLogin}>
//                 <div className="login-input">
//                     <input type="radio" placeholder="Admin"/>
//                 </div>
//                 <div className="login-input">
//                   <label>E-Mail Address</label>
//                   <input
//                     type="email"
//                     placeholder="Enter Your Email Address"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       validateEmail(e.target.value);
//                       validateEmail(e.target.value);
//                     }}
//                   />
//                   {emailError && <p className="error">{emailError}</p>}
//                 </div>

//                 <div className="login-input">
//                   <label>Password</label>
//                   <input
//                     type="Password"
//                     placeholder="Enter Your Password Here"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="login-input-checkbox">
//                   <input type="checkbox" />
//                   <label>Remember me</label>
//                 </div>

//                 <div className="loginBtn">
//                   <button
//                     type="submit"
//                     disabled={!isFormValid}
//                     style={{
//                       backgroundColor: isFormValid ? "#4E14BF" : "#E9E9E9",
//                     }}
//                   >
//                     Login
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPage;

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginU } from "../service/userService"; // Call the login API
import "./login.css";
import { AuthContext } from "../context/Authontext";
import authImg from "../../asset/auth-img/auth_side.png";
import authImg2 from "../../asset/auth-img/auth-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("ayushbhatt1425@gmail.com"); // Default Admin email
  const [password, setPassword] = useState("123456"); // Default Admin password
  const [role, setRole] = useState("admin"); // Default role is Admin
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === "admin") {
      setEmail("ayushbhatt1425@gmail.com");
      setPassword("123456");
    } else if (newRole === "team") {
      setEmail("team@gmail.com");
      setPassword("123456");
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailError) return;

    try {
      const credentials = { email, password };
      const { role } = await loginU(credentials);
      login(role); // Update context with role
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
        className: "toast-error",
      });
    }
  };

  const isFormValid = email && password && !emailError;

  return (
    <>
      <ToastContainer />

      <div className="text-center">
        <div className="row gap-0">
          <div className="col leftauth">
            <div className="auth-img">
              <img src={authImg} alt="Auth" />
            </div>
          </div>
          <div className="col rightauth">
            <div className="container">
              <div className="header">
                <div className="header-img">
                  <img src={authImg2} alt="Logo" />
                </div>
                <div className="header-heading">
                  <h1>Lending Guru</h1>
                  <p>For simplifying your EMI management</p>
                </div>
                <div className="header-login">
                  <h2>Log In</h2>
                  <p>Please log in to your account</p>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div className="login-inputs">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === "admin"}
                      onChange={() => handleRoleChange("admin")}
                    />
                    Admin
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      type="radio"
                      name="role"
                      value="team"
                      checked={role === "team"}
                      onChange={() => handleRoleChange("team")}
                    />
                    Team
                  </label>
                </div>

                <div className="login-input">
                  <label>E-Mail Address</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                  />
                  {emailError && <p className="error">{emailError}</p>}
                </div>

                <div className="login-input">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter Your Password Here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="login-input-checkbox">
                  <input type="checkbox" />
                  <label>Remember me</label>
                </div>

                <div className="loginBtn">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    style={{
                      backgroundColor: isFormValid ? "#4E14BF" : "#E9E9E9",
                    }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
