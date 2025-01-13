import React, { useState, useEffect } from 'react';
import Layout from "../../../src/admin/Utils/Layout";
import { UserData } from "../../context/UserContext";
import axios from "axios";
import { server } from '../../index';
import Report from "./Report"; // Import the Report component
import "./TeacherCourses.css";
import { useNavigate } from "react-router-dom";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const TeacherCourses = () => {
  const { user } = UserData();
  const [loading, setLoading] = useState(false);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false); // Modal state for adding course
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const [reportLoading, setReportLoading] = useState(false);
  useEffect(() => {
    if (user && user._id) {
      fetchTeacherCourses();
    }
  }, [user]);

  const fetchTeacherCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/teacher/${user._id}/courses`, {
        headers: { token: localStorage.getItem("token") }
      });
      setTeacherCourses(data.data);
    } catch (error) {
      console.error("Error fetching teacher courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (courseId) => {
    console.log(`Update course details with ID: ${courseId}`);
    // Implement update course details functionality
  };

 

const handleReport = async (courseId) => {
  setReportLoading(true);
  try {
    const response = await axios.get(`${server}/api/courses/${courseId}/report`, {
      headers: { token: localStorage.getItem("token") },
    });
    console.log(response);
    setReportData(response.data);
    setShowReport(true);
  } catch (error) {
    console.error("Error generating report:", error.message);
    alert("Error generating report. Please try again.");
  } finally {
    setReportLoading(false);
  }
};


  const handleDelete = async (courseId) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this course?");
      if (!confirmation) return;

      await axios.delete(`${server}/api/teacher/course/${courseId}`, {
        headers: { token: localStorage.getItem("token") }
      });

      fetchTeacherCourses();
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course.");
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      alert(data.message);
      setBtnLoading(false);
      fetchTeacherCourses(); // Refresh course list
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setCreatedBy("");
      setDuration("");
      setImage("");
      setImagePrev("");
      setShowAddCourseModal(false); // Close the Add Course modal
    } catch (error) {
      console.error("Error adding course:", error);
      setBtnLoading(false);
      alert("Error adding course.");
    }
  };

  const closeReport = () => {
    setShowReport(false); // Close the Report component
    setReportData(null); // Clear the report data
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <Layout>
      <div className="teacher-courses">
        <h1>Your Courses</h1>

        {/* Button to open Add Course modal */}
        <button
          onClick={() => setShowAddCourseModal(true)}
          style={{
            position: "absolute",
            right: "20px",
            top: "100px",
            background: "darkcyan",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Course
        </button>

        {loading ? (
          <p>Loading courses...</p>
        ) : showReport ? (
          <Report data={reportData} closeReport={closeReport} /> // Render the Report component
        ) : (
          <div className="course-cards">
            {teacherCourses.length > 0 ? (
              teacherCourses.map((course) => (
                <div key={course._id} className="course-card">
                  {course.image && (
                    <img src={`${server}/${course.image}`} alt={course.title} className="course-image" />
                  )}
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-buttons">
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="btn update-btn"
                    >
                      Add Lecture
                    </button>
                    <button onClick={() => handleReport(course._id)} className="btn report-btn">
                      Report
                    </button>
                    <button onClick={() => handleDelete(course._id)} className="btn delete-btn">
                      Delete Course
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        )}

        {/* Modal to Add Course */}
        {showAddCourseModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-modal" onClick={() => setShowAddCourseModal(false)}>
                &times;
              </button>
              <h2>Add Course</h2>
              <form onSubmit={handleAddCourse}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <label htmlFor="createdBy">Your Name</label>
                <input
                  type="text"
                  id="createdBy"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                />

                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <label htmlFor="duration">Duration</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />

                <label htmlFor="file">Upload Image</label>
                <input type="file" id="file" onChange={changeImageHandler} required />
                {imagePrev && <img src={imagePrev} alt="Preview" />}

                <button type="submit" className="common-btn" disabled={btnLoading}>
                  {btnLoading ? "Please Wait..." : "Add Course"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TeacherCourses;