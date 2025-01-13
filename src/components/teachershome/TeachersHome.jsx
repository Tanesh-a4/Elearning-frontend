import React, { useEffect, useRef, useState } from "react";
import { UserData } from "../../context/UserContext"; // Adjust the import path if needed
import "./TeachersHome.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const TeachersHome = () => {
  const { teachers, fetchTeachers } = UserData();
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers();
    }
  }, [teachers, fetchTeachers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div className="teachers-home container-fluid">
      <h2
        ref={headingRef}
        className={`h2-teachers-home ${isVisible ? "visible" : ""}`}
      >
        Our Top Teachers
      </h2>
      <div className="row">
        {teachers.length > 0 ? (
          teachers.slice(0, 3).map((teacher) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={teacher._id}>
              <div className="teacher-card">
                <div className="teacher-card-header">
                  <h3>{teacher.name}</h3>
                </div>
                <div className="teacher-card-body">
                  <p>{teacher.role}</p>
                  <p>
                    <strong>Email:</strong> {teacher.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No teachers found.</p>
        )}
      </div>
      <Link to="/teachers">
        <button
          className="common-btn"
        >
          View All Teachers
        </button>
      </Link>
    </div>
  );
};

export default TeachersHome;
