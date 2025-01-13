// import React from "react";
// import "./Footer.css";
// import {
//   AiFillFacebook,
//   AiFillTwitterSquare,
//   AiFillInstagram,
// } from "react-icons/ai";

// const Footer = () => {
//   return (
//     <footer>
//       <div className="footer-content">
//         <p>
//           &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
//           with ❤️ <a href="">Akshayasree Padmanaban</a>
//         </p>
//         <div className="social-links">
//           <a href="">
//             <AiFillFacebook />
//           </a>
//           <a href="">
//             <AiFillTwitterSquare />
//           </a>
//           <a href="">
//             <AiFillInstagram />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import "./Footer.css";
import { FaGlobeAsia, FaAngleUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="deraj-ab">
      <div className="footer-innerdiv1">
        <div className="col1">
          <ul className="footer-ul">
            <li className="footer-li" style={{ fontWeight: 700 }}>
              QuikLearn for Business
            </li>
            <li className="footer-li" style={{ fontWeight: 700 }}>
              Become an Instructor
            </li>
            <li className="footer-li">Mobile Apps</li>
          </ul>
        </div>
        <div className="col2">
          <ul className="footer-ul">
            <li className="footer-li">
              <a href="/about">
              About Us
              </a></li>
              <li className="footer-li">
              <a href="/about">
              Careers
              </a></li>
            <li className="footer-li">
              <a href="/about">
              Blog
              </a></li>
          </ul>
        </div>
        <div className="col3">
          <ul className="footer-ul">
            <li className="footer-li">Topics</li>
            <li className="footer-li">Support</li>
            <li className="footer-li">Affiliate</li>
          </ul>
        </div>
        <div className="col4">
          <ul className="footer-ul" style={{ margin: 0 }}>
            <li className="footer-li">
              <a href="/contact">
                <button className="English-btn">
                  <span style={{ marginLeft: 10, marginRight: 15, padding: 5 }}>
                    <FaGlobeAsia style={{ marginRight: 10 }} />
                    Contact Us
                  </span>
                  <FaAngleUp />
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* LAST DIV */}
      <div className="footer-innerdiv2">
        {/* Div 1 */}
        <div className="left-contlist">
          <a href="/">
            <img src="images/logo2.svg" alt="QuikLearn" width="110px" />
            
          </a>
          <span
            className="copyright-span"
            style={{ marginLeft: 20, color: "#686f7a" }}
          >
            Copyright © 2024 QuikLearn, Inc.
          </span>
        </div>

        {/* Div 2 */}
        <div className="right-contlist">
          <ul className="ullist-right">
            <li className="r-li-itm">
              <a href="https://drive.google.com/file/d/1aLZzXga1so7-seV2U6I0k35-F4LDWiih/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                Terms
              </a></li>
            <li className="r-li-itm"><a href="https://drive.google.com/file/d/1zzef2-c1plB8wmdeOG9X6ZNFGAnJHwZ6/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            Privacy Policy and Cookie Policy
              </a></li>
            <li className="r-li-itm">Intellectual Property</li> 
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
