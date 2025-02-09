import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome is imported
import Farmer from '/farmer Bazaar Logo.jpeg';

function Footer() { 
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Information */}
        <div className="footer-section contact-info">
          
          <div className="logo">
                    <img src={Farmer} alt="Logo" />
                </div>
                <h4 className='farmer'>Farmers Bazaar</h4>
        </div>

        {/* Products Section */}
        <div className="footer-section products">
          <h4>Our Products</h4>
          <ul>
            <li><a href="#seeds">High-Quality Seeds</a></li>
            <li><a href="#fertilizers">Organic Fertilizers</a></li>
            <li><a href="#tools">Farm Tools & Machinery</a></li>
          </ul>
        </div>

        {/* Social Media Links with Icons */}
        <div className="footer-section social-media">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>

        {/* Additional Resources */}
        <div className="footer-section resources">
          <h4>Resources</h4>
          <ul>
            <li><a href="#Ratings">Ratings</a></li>
            <li><a href="#Reviews">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#Contact_Us">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
        <h4 className='hlo'>contact us</h4>
          <p> <a href="mailto:gkfarmerbazaar@gmail.com" className='hi'>Email:gkfarmerbazaar@gmail.com</a></p>
          <p className='hi'>Phone: +91 7780693599</p>
          <p className='hi'>Address: Aditya Nagar,Surempalem,East Godavari,AP</p>
        </div>
      </div>

      {/* Copyright Notice */}
      
    </footer>
  );
}

export default Footer;