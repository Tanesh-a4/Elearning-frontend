import React from 'react';
import './FaqsHome.css'; // Import CSS for styling

const FaqsHome = () => {    
    const faqs = {
      
        rows: [
          {
            title: "How do I choose a course?",
            content: "You can browse our course catalog by subject, popularity, or rating. Each course page includes a description, syllabus, and user reviews to help you make an informed decision."
          },
          {
            title: "What is the duration of the courses?",
            content:
              "Course durations vary depending on the content. Most courses provide an estimated time for completion, typically ranging from a few hours to several weeks.",
          },
          {
            title: "Can I access course materials after completing the course?",
            content: `Yes, once you enroll in a course, you will have lifetime access to the course materials, even after you complete it.`,
          },
                  
        
        ]}
  return (
    <div className="faq-sections">
  <h2 className="faq-heading">FAQs</h2>
  <div className="faq-container">
    {faqs.rows.map((faq, index) => (
      <div className="faq-card" key={index}>
        <h3 className="faq-question">{faq.title}</h3>
        <p className="faq-answer">{faq.content}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default FaqsHome;