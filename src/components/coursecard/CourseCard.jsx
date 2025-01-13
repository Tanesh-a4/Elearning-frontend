import React, { useState, useEffect } from "react";
import "./CourseCard.css";
import { server } from "../../index";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  // Track enrollment status in local state
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Check if the user is enrolled when the component mounts or user data changes
  useEffect(() => {
    if (user && Array.isArray(user.subscription) && user.subscription.includes(course._id)) {
      setIsEnrolled(true);
    }
  }, [user, course._id]);  // Re-run effect when user or course changes

  // Unenroll handler
  const unenrollHandler = async (courseId) => {
    try {
      const { data } = await axios.post(
      `${server}/api/unenroll`,
        { courseId, user },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setIsEnrolled(false); 
      fetchCourses(); 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Delete handler for admin
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/course/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      fetchCourses();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor- {course.createdBy}</p>
      <p>Duration- {course.duration} weeks</p>
      <p>Price- ₹{course.price}</p>

      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {isEnrolled ? (
                <>
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="common-btn"
                  >
                    Study
                  </button>
                  <button
                    onClick={() => unenrollHandler(course._id)}
                    className="common-btn"
                    style={{ backgroundColor: "red" }}
                  >
                    Unenroll
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}

      <br />

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
