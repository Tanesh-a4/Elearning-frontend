import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../index";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // State for user list
  const [selectedRoles, setSelectedRoles] = useState({}); // State for role changes
  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      console.log(data.users); // Debug: Check users in API response
      setUsers(data.users);

      // Initialize role state
      const initialRoles = data.users.reduce((acc, user) => {
        acc[user._id] = user.role || "user"; // Fallback to "user" if role is undefined
        return acc;
      }, {});
      setSelectedRoles(initialRoles);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Redirect if the current user is not a superadmin
  if (user?.mainrole !== "superadmin") return navigate("/");

  

  // Update user role
  const updateRole = async (id) => {
    const newRole = selectedRoles[id];
    try {
      const { data } = await axios.put(
        `${server}/api/user/${id}`,
        { role: newRole },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchUsers(); // Refresh users list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role.");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/user/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchUsers(); // Refresh users list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  // Handle role change in dropdown
  const handleRoleChange = (id, role) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [id]: role,
    }));
  };

  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        <table border="black">
          <thead>
            <tr>
              <td>Sr.No</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Update Role</td>
              <td>Requesting Access For</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((e, i) => (
                <tr key={e?._id}>
                  <td>{i + 1}</td>
                  <td>{e?.name || "No Name"}</td>
                  <td>{e?.email || "No Email"}</td>
                  <td>
                    {e?.role === "user"
                      ? "User"
                      : e?.role === "admin"
                      ? "Admin"
                      : e?.role === "teacher"
                      ? "Teacher"
                      : "Unknown"}
                  </td>
                  <td>
                    <select
                      value={selectedRoles[e?._id] || e?.role || "user"}
                      onChange={(event) =>
                        handleRoleChange(e._id, event.target.value)
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                    </select>
                    <button
                      onClick={() => updateRole(e?._id)}
                      className="common-btn"
                    >
                      Update Role
                    </button>
                  </td>
                  <td>{e?.role !== "admin" && e?.designation}</td>
                  <td>
                    {e?.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(e?._id)}
                        className="common-btn delete-btn"
                      >
                        Delete
                      </button>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;
