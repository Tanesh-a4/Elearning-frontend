import React, { useEffect } from 'react';
import { UserData } from '../../context/UserContext'; // Adjust the import path if needed
import "./Teacher.css"
import { Link } from 'react-router-dom';

const Teacher = () => {
  const { teachers, fetchTeachers } = UserData(); // Access teachers and fetchTeachers from context

  // Fetch teachers when the component mounts (if not already done in the context)
  useEffect(() => {
    if (teachers.length === 0) {
      fetchTeachers(); // Fetch teachers if not already available
    }
  }, [teachers, fetchTeachers]);

  return (
    <div className="teachers">
      <h2 className='h2-teacher'style={{color: 'white'}}>All Teachers</h2>
      <div className="teachers-cards">
        {teachers.length > 0 ? (
          teachers.map((teacher) => (
            <div className="teacher-card" key={teacher._id}>
              <div className="teacher-card-header">
                <h3>{teacher.name}</h3>
                
              </div>
              <div className="teacher-card-body">
              <p >{teacher.role}</p>
                <p><strong>Email:</strong> {teacher.email}</p>
                
              </div>
              
            </div>
          ))
        ) : (
          <p>No teachers found.</p>
        )}
      </div>
      
    </div>
  );
};

export default Teacher;
