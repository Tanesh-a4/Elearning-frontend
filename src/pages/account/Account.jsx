import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for making API requests
import "./Account.css";

  
const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  const applyToBecomeTeacher = async () => {
    try {
      // Make an API call to update the user's designation to "teacher"
      const response = await axios.patch(
        `http://localhost:5000/api/users/${user._id}`, // Adjust the URL for your API
        { designation: "teacher" },
        {
          headers: {
            token: localStorage.getItem("token"),  // Use the token if needed
          },
        }
      );
      toast.success("Request Sent for Updation ");  // Show success message
      setUser((prevUser) => ({ ...prevUser, designation: "teacher" }));  // Update user data locally
    } catch (error) {
      toast.error("Failed to apply as teacher");
    }
  };

  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name - {user.name}</strong>
            </p>
            <p>
              <strong>Email - {user.email}</strong>
            </p>

            <button
  onClick={() =>
    navigate(`/${user._id}/dashboard`)
  }
  className="common-btn"
>
  <MdDashboard />
  Dashboard
</button>


            <br />
            {/* Display Apply to Become a Teacher button only for users without a designation */}
            {user.designation=== 'user' && user.role==="user" && (
               <div className="teacher-apply">
                <p>Become a teacher on our platform.</p>
                <button onClick={applyToBecomeTeacher} className="common-btn">
                  Apply to Become a Teacher
                </button>
              </div>
            )}

            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="common-btn"
              >
                <MdDashboard />
                Admin Dashboard
              </button>
            )}
            {user.role === "teacher" && (
              <button
                onClick={() => navigate(`/teacher/${user._id}/dashboard`)}
                className="common-btn"
              >
                <MdDashboard />
                Teacher Dashboard
              </button>
            )}
            <br />
            <button
              onClick={logoutHandler}
              className="common-btn"
            >
              <IoMdLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
