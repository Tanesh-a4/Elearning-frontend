import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"; // Import necessary Chart.js components
import axios from "axios";
import { useParams } from "react-router-dom"; // Use params from route
import { server } from "../../index"; // Import your server configuration
import "./Report.css";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = ({ closeReport }) => {
  const { id } = useParams(); // Get course ID from the route parameter
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch report data using the course ID
    const fetchReportData = async () => {
      try {
        const response = await axios.get(`${server}/api/courses/${id}/report`, {
          headers: { token: localStorage.getItem("token") },
        });
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
        alert("Failed to fetch report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  if (loading) return <p>Loading report...</p>;
  if (!reportData) return <p>No report data available.</p>;

  const { courseId, totalSubscribers, progress } = reportData;

  // Prepare data for the bar chart
  const chartData = {
    labels: progress.map((student) => student.name), // Student names as labels
    datasets: [
      {
        label: "Completed Lectures",
        data: progress.map((student) => student.completedLectures), // Number of completed lectures
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Bar border color
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Student Progress Chart",
        font: {
          size: 18,
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: totalSubscribers, // Set max value based on totalSubscribers
      },
    },
  };

  return (
    <div className="report-container">
      <button onClick={closeReport} className="close-btn">
        Close Report
      </button>
      <h2>Course Report</h2>
      <p>
        <strong>Course ID:</strong> {courseId}
      </p>
      <p>
        <strong>Total Subscribers:</strong> {totalSubscribers}
      </p>

      <table className="report-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Completed Lectures</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.completedLectures}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add the Bar Chart below the table */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Report;
