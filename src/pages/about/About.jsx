import React from 'react';
import './About.css';
import Testimonials from '../../components/testimonials/Testimonials';

const About = () => {
  return (
    <div className="about-container">
      {/* Video Section */}
      <div className="video-section">
        <video className="about-video" src="/Anthem_V6.mp4" controls autoPlay loop muted />
      </div>

      {/* About Section */}
      <div className="about-content">
        <h1>Welcome to QuikLearn</h1>
        <p>
          At <strong>QuikLearn</strong>, we believe learning should be accessible, engaging, and transformative. 
          Whether you're a student stepping into a new field, a professional enhancing your skills, 
          or a curious mind looking to explore, QuikLearn is your one-stop solution for quality education.
        </p>
        <p>
          Our platform is home to an ever-growing catalog of courses designed to cater to diverse interests
          and career goals. With interactive content, practical projects, and real-world applications, 
          learning becomes not just effective but enjoyable. Discover why thousands of learners worldwide trust QuikLearn.
        </p>

        {/* Features Section */}
        <div className="features-container">
          <div className="feature">
            <h2>Top-Rated Instructors</h2>
            <p>
              Learn from global experts with years of experience in their respective domains. 
              Our instructors are passionate about teaching.
            </p>
          </div>
          <div className="feature">
            <h2>Interactive Learning</h2>
            <p>
              Engage in hands-on projects, quizzes, and live sessions to gain practical knowledge 
              and sharpen your skills effectively.
            </p>
          </div>
          <div className="feature">
            <h2>Career Advancement</h2>
            <p>
              Boost your resume with certifications from QuikLearn and unlock new opportunities in your career journey.
            </p>
          </div>
        </div>

        {/* Additional Highlights */}
        <div className="highlights-container">
          <h2>Why Choose Us?</h2>
          <ul className="highlights-list">
            <li>🔥 Over 1,000+ courses across multiple disciplines.</li>
            <li>📈 Personalized learning paths tailored to your goals.</li>
            <li>🌐 Flexible access anytime, anywhere on any device.</li>
            <li>💬 Active community support and mentoring.</li>
            <li>🏆 Recognized certifications for professional growth.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;