import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="dot"></span>
        MediRoute
      </NavLink>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/book" className={({ isActive }) => (isActive ? "active" : "")}>
            Book Appointment
          </NavLink>
        </li>
        <li>
          <NavLink to="/appointments" className={({ isActive }) => (isActive ? "active" : "")}>
            My Appointments
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors" className={({ isActive }) => (isActive ? "active" : "")}>
            Doctors
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;