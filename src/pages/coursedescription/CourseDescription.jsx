import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./CourseDescription.css"
import { CourseData } from '../../context/CourseContext';
import { server } from '../../index.js'
import axios from 'axios';
import { UserData } from '../../context/UserContext';   
import { toast } from 'react-hot-toast';
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate();
  
    const [loading, setLoading] = useState(false);
  
    const { fetchUser } = UserData();
  
    const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();
  
    useEffect(() => {
      fetchCourse(params.id);
    }, []);
  
    const checkoutHandler = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
  
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );
  
      const options = {
        key: "rzp_test_leLkLRv4XKicDR", // Enter the Key ID generated from the Dashboard
        amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "QuikLearn", //your business name
        description: "Learn with us",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
  
          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );
  
            // await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            console.error('Payment verification error:', error);
  
            // Safe error message extraction
            const errorMessage = error.response?.data?.message || 
                                error.message || 
                                'Payment verification failed';
            
            toast.error(errorMessage);
            setLoading(false);
          }
        },
        theme: {
          color: "darkcyan",
        },
      };
      const razorpay = new window.Razorpay(options);
  
      razorpay.open();
    };
  
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            {course ? (
              <div className="course-description">
                <div className="course-header">
                  <img
                    src={`${server}/${course.image}`}
                    alt={course.title || "Course Image"}
                    className="course-image"
                  />
                  <div className="course-info">
                    <h2>{course.title}</h2>
                    <p><strong>Instructor:</strong> {course.createdBy}</p>
                    <p><strong>Duration:</strong> {course.duration} weeks</p>
                    <p><strong>Category:</strong> {course.category || "N/A"}</p>
                  </div>
                </div>
    
                <div className="course-details">
                  <h3>About the Course</h3>
                  <p>{course.description || "No description available."}</p>
                </div>
    
                <div className="course-price">
                  <p>
                    <strong>Price:</strong> ₹{course.price || "Free"}
                  </p>
                  {user && user.subscription.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="common-btn"
                    >
                      Study
                    </button>
                  ) : (
                    <button onClick={checkoutHandler} className="common-btn">
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p>Course details not found.</p>
            )}
          </>
        )}
      </>
    );
    
  };
  
  export default CourseDescription;