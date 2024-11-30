import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authontext";
import "./navBat.css";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navLeft">
            <Link to="/">
              <h3>NavBar</h3>
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse align-items-center justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user && user.role === "admin" && (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">
                        <Link to="/createAdmin">Create Admin</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="/createTeam">Create Team Member</Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

            </ul>
      
            <ul className="d-flex logoutBtnMain">
              <li  className="nav-item d-flex logoutBtn">
                {user ? (
                  <>
                    <button onClick={logout}>Logout</button>
                  </>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
