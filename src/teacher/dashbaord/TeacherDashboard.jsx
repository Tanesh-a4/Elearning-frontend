import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../admin/Utils/Layout";
import { UserData } from "../../context/UserContext";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user, teacherDashboardData, fetchTeacherDashboard } = UserData();
    console.log(teacherDashboardData)
  useEffect(() => {
    if (user && user.role !== "teacher") {
      navigate("/"); // Redirect non-teachers to the homepage or appropriate page
    } else {
      fetchTeacherDashboard(); // Fetch dashboard data for teachers
    }
  }, [user, navigate]);

  return (
    <div>
      <Layout>
      <div className="main-content">
          <div className="dashboard">
            {teacherDashboardData ? (
              <>
                <div className="card-dashboard">
                  <h2 className="h2">Total Courses</h2>
                  <p>{teacherDashboardData.totalCourses}</p>
                </div>
                <div className="card-dashboard">
                  <h2 className="h2">Total revenue</h2>
                  <p>{teacherDashboardData.totalRevenue}</p>
                </div>
                <div className="card-dashboard">
                  <h2 className="h2">Enrolled Students</h2>
                  <p>{teacherDashboardData.totalStudents}</p>
                </div>
              </>
            ) : (
              <p>Loading dashboard data...</p>
            )}
          </div>
        </div>
        
      </Layout>
    </div>
  );
};

export default TeacherDashboard;
