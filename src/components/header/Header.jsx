import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css"; // Include your custom styles if necessary

const Header = ({ isAuth }) => {
  return (
    <header >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid mh-25">
          <Link className="navbar-brand" to="/">
            <img src="../../../logo2.svg" alt="QuikLearn Logo" id="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/courses">Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teachers">Teachers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faqs">FAQ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={isAuth ? "/account" : "/login"}>
                  {isAuth ? "Account" : "Login"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
