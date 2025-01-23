import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState(""); // State to track email validation errors

  const validateEmail = (email) => {
    // Regex for specific domains (Gmail, Yahoo, Outlook, etc.)
    const emailRegex = /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Check if the email is valid
    if (!validateEmail(inputEmail)) {
      setEmailError("Please enter a valid email (e.g., Gmail, Yahoo, Outlook).");
    } else {
      setEmailError(""); // Clear error if valid
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Invalid email address. Please fix it before submitting.");
      return; // Prevent form submission if email is invalid
    }
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {/* Display email validation error */}
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={btnLoading} className="common-btn">
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
