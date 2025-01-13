import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../index";
import Chart from "chart.js/auto";
import "./AdminDashboard.css";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [userDistribution, setUserDistribution] = useState([]);
  const [courseRegistrationStats, setCourseRegistrationStats] = useState([]);
  const userDistributionChartRef = useRef(null); // Ref for user distribution chart
  const courseRegistrationChartRef = useRef(null); // Ref for course registration chart

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    } else {
      fetchStats();
    }
  }, [user, navigate]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
      setUserDistribution(data.stats.userDistribution || []);
      setCourseRegistrationStats(data.stats.courseRegistrationStats || []);
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  }

  useEffect(() => {
    if (userDistribution.length > 0) {
      const roles = userDistribution.map((item) => item._id);
      const counts = userDistribution.map((item) => item.count);

      const ctx = document.getElementById("userDistributionChart4").getContext("2d");

      if (userDistributionChartRef.current) {
        userDistributionChartRef.current.destroy();
      }

      userDistributionChartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: roles,
          datasets: [
            {
              label: "User Distribution",
              data: counts,
              backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
            },
          ],
        },
      });
    }

    return () => {
      if (userDistributionChartRef.current) {
        userDistributionChartRef.current.destroy();
      }
    };
  }, [userDistribution]);

  useEffect(() => {
    if (courseRegistrationStats.length > 0) {
      const courseTitles = courseRegistrationStats.map((course) => course.title);
      const userCounts = courseRegistrationStats.map((course) => course.registrationCount);

      const ctx = document.getElementById("courseRegistrationChart").getContext("2d");

      if (courseRegistrationChartRef.current) {
        courseRegistrationChartRef.current.destroy();
      }

      courseRegistrationChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: courseTitles,
          datasets: [
            {
              label: "Users Registered",
              data: userCounts,
              backgroundColor: "#36a2eb",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (courseRegistrationChartRef.current) {
        courseRegistrationChartRef.current.destroy();
      }
    };
  }, [courseRegistrationStats]);

  return (
    <div>
      <Layout>
        <div className="main-content">
          <div className="dashboard">
            <div className="card-dashboard">
              <h2 className="h2">Total Courses</h2>
              <p>{stats.totalcourses}</p>
            </div>
            <div className="card-dashboard">
              <h2 className="h2">Total Lectures</h2>
              <p>{stats.totalLectures}</p>
            </div>
            <div className="card-dashboard">
              <h2 className="h2">Total Users</h2>
              <p>{stats.totalUser}</p>
            </div>
          </div>

          {/* User Distribution Chart */}
          <div className="chart-container">
          {/* Chart 1 */}
          <div className="chart-box">
            <h2>User Distribution by Role</h2>
            <canvas id="userDistributionChart4"></canvas>
          </div>

          {/* Chart 2 */}
          <div className="chart-box">
            <h2>Course Registration Statistics</h2>
            <canvas id="courseRegistrationChart"></canvas>
          </div>
        </div>

        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;
