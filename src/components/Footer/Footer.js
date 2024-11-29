import React from "react";
import "./Footer.css";
import yourLogo from "../../images/kLogo.png"; // Replace with the path to your logo file
import razorpayLogo from "../../images/rpay.png"; // Replace with the path to the Razorpay logo

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="back-to-top" onClick={scrollToTop}>
        Back to top
      </div>
      <div className="footer-top">
        <div className="footer-section">
          <h4>Get to Know Us</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/press">Press Releases</a>
            </li>
            <li>
              <a href="/science">Our Science</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect with Us</h4>
          <ul className="social-icons">
            <li>
              <a href="https://facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com">Twitter</a>
            </li>
            <li>
              <a href="https://instagram.com">Instagram</a>
            </li>
            <li>
              <a href="https://linkedin.com">LinkedIn</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Make Money with Us</h4>
          <ul>
            <li>
              <a href="/sell">Sell on Our Platform</a>
            </li>
            <li>
              <a href="/affiliate">Become an Affiliate</a>
            </li>
            <li>
              <a href="/advertise">Advertise Your Products</a>
            </li>
            <li>
              <a href="/fulfillment">Fulfillment Services</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Let Us Help You</h4>
          <ul>
            <li>
              <a href="/account">Your Account</a>
            </li>
            <li>
              <a href="/returns">Returns Center</a>
            </li>
            <li>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <a href="/safety">Safety & Recall Alerts</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">
          <img src={yourLogo} alt="Your Logo" />
        </div>
        <div className="footer-legal">
          <p>
            © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
            |<a href="/privacy"> Privacy Policy</a> |{" "}
            <a href="/terms">Terms of Use</a>
          </p>
        </div>
        <div className="footer-payments">
          <img src={razorpayLogo} alt="Razorpay" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
