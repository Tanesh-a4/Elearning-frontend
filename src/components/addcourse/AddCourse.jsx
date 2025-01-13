import React, { useState } from "react";
import axios from "axios";
import { server } from "../../index";
import { UserData } from "../../context/UserContext";
import Layout from "../../admin/Utils/Layout";
import "./AddCourse.css";

const AddCourse = () => {
  const { user } = UserData(); // Get user details from UserContext
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${server}/api/course/add`,
        {
          title,
          description,
          image,
          price,
          duration,
          category,
          createdBy: user?._id, // Send logged-in user's ID as createdBy
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        alert("Course added successfully");
        setTitle("");
        setDescription("");
        setImage("");
        setPrice("");
        setDuration("");
        setCategory("");
      }
    } catch (error) {
      console.error("Error adding course", error);
      alert("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="add-course-container">
        <div className="add-course-form">
          <h2>Add a New Course</h2>
          <form onSubmit={handleAddCourse}>
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Course Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Course Image URL</label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (in hours)</label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Adding Course..." : "Add Course"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddCourse;
