import React from "react";
import "./Courseshome.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";


const   CoursesHome = () => {
  const { courses } = CourseData();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust threshold as needed
  });
  console.log(courses);

  return (
    <div ref={ref} className={`courses-home ${inView ? 'slide-in' : ''}`}>
      <h2 className="mt-0">Top Courses</h2>
      <div className="course-container mt-2">
        {courses && courses.length > 0 ? (
          courses.slice(0, 3).map((e) => <CourseCard key={e._id} course={e} />)
          
        ) : (
          <p className="no-courses">No Courses Yet!</p>
        )}
      </div>
      <Link to="/courses">
      <button className="common-btn" >
        View All Courses
      </button>
    </Link>
    </div>
  );
};

export default CoursesHome;
