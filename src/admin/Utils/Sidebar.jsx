import React from "react";
import "./common.css";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";

const Sidebar = () => {
  const { user } = UserData();

  const basePath = user?.role === "teacher" ? `/teacher/${user._id}` : "/admin";

  return (
    <div className="sidebar">
      <ul>
        {/* Home Link */}
        <li>
          <Link to={`${basePath}/dashboard`}>
            <div className="icon">
              <AiFillHome />
            </div>
            <span>Home</span>
          </Link>
        </li>

        {/* Courses Link */}
        <li>
          <Link to={`${basePath}/course`}>
            <div className="icon">
              <FaBook />
            </div>
            <span>Courses</span>
          </Link>
        </li>

        {/* Users Link (Visible only for Admin) */}
        {user?.role === "admin" && (
          <li>
            <Link to="/admin/users">
              <div className="icon">
                <FaUserAlt />
              </div>
              <span>Users</span>
            </Link>
          </li>
        )}

        {/* Logout Link */}
        <li>
          <Link to="/account">
            <div className="icon">
              <AiOutlineLogout />
            </div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
