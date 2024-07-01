import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/actions";

const NavComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/"));
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="" alt="Logo" />
      </div>

      <div className="nav-links">
        <a href="/">HOME</a>
        <a href="/offerte">OFFERTE</a>
        <a href="/business">BUSINESS</a>
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            SALE
          </button>
          {isOpen && (
            <div className="dropdown-menu">
              <a href="/premium" className="dropdown-item">
                SALE PREMIUM
              </a>
              <a href="/prenota-una-sala" className="dropdown-item">
                PRENOTA UNA SALA
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="button">
        <a href="/login">LOGIN</a>
      </div>
      {/* <div className="button">
        <a href="/user-dashboard">PROFILO</a>
      </div> */}

      {user ? (
        user.user_type === "user" ? (
          <>
            <Link to="/profile">{user.first_name}</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : user.user_type === "admin" ? (
          <>
            <p>{user.first_name}</p>
            <button onClick={logout}>Logout</button>
          </>
        ) : null
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavComponent;
