import React, { useEffect } from "react";
import "./CourseStudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../index";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  // Conditional Access Logic
  if (user) {
    const isAdmin = user.role === "admin";
    const isTeacher = user.role === "teacher";
    const hasSubscription = user.subscription?.includes(params.id);

    if (!isAdmin && !isTeacher && !hasSubscription) {
      return navigate("/");
    }
  } else {
    return navigate("/login"); // Redirect unauthenticated users to login
  }

  return (
    <>
      {course && (
        <div className="course-study-page">
          <div className="course-card">
            <img src={`${server}/${course.image}`} alt="Course Image" />
            <h2>{course.title}</h2>
            <h4>{course.description}</h4>
            <h5>by - {course.createdBy}</h5>
            <h5>Duration - {course.duration} weeks</h5>
            <Link to={`/lectures/${course._id}`}>
              View Lectures
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
