import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'; // Hook from IntersectionObserver
import './Home.css';
import Testimonials from '../../components/testimonials/Testimonials.jsx';
import CoursesHome from '../../components/courseshome/CoursesHome.jsx';
import Slider from '../../components/slider/Slider.jsx';
import FaqSection from '../faq/Faq.jsx';
import FaqsHome from '../../components/faqshome/FaqsHome.jsx';
import TeachersHome from '../../components/teachershome/TeachersHome.jsx';

const Home = () => {
  const navigate = useNavigate();

  const { ref: cardRef, inView } = useInView({
    triggerOnce: true, // Trigger only once when the element enters the viewport
    threshold: 0.5, // 50% of the element should be in the viewport
  });

  return (
    <div className="home">
      <Slider />
      <CoursesHome />
      <TeachersHome />
      <FaqsHome />

      <div className="home-content">
        <div
          className={`card ${inView ? 'visible' : ''}`}
          ref={cardRef}
        >
          <h1>Welcome to Our Platform!</h1>
          <p>Explore our courses, connect with experts, and achieve your learning goals.</p>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
