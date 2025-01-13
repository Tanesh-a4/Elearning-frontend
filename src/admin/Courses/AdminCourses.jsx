import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../index";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

  if (user && user.role !== "admin") return navigate("/");

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
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

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
      setShowModal(false); // Close modal after submission
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1 style={{ marginTop: "5%",position:"sticky" }}>All Courses</h1>
          {/* Button to open modal */}
          <button
            className="toggle-form-btn"
            onClick={() => setShowModal(true)}
            style={{
              display:"flex",
              position: "absolute",
              right: "20px",
              top: "100px",
              background: "darkcyan",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              // cursor: "pointer",
            }}
          >
            Add Course
          </button>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((e) => {
                return <CourseCard key={e._id} course={e} />;
              })
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

        {/* Modal */}
      {showModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal" onClick={() => setShowModal(false)}>
            &times;
          </button>
          <h2>Add Course</h2>
          <form onSubmit={submitHandler}>
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

            <label htmlFor="createdBy">Created By</label>
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
              <option value={""}>Select Category</option>
              {categories.map((e) => (
                <option value={e} key={e}>
                  {e}
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
            <input type="file" id="file" required onChange={changeImageHandler} />
            {imagePrev && <img src={imagePrev} alt="Preview" />}

            <button type="submit" className="common-btn" disabled={btnLoading}>
              {btnLoading ? "Please Wait..." : "Add"}
            </button>
          </form>
        </div>
      </div>
)}

      </div>
    </Layout>
  );
};

export default AdminCourses;
