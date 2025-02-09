import React, { useState,useEffect } from 'react';
import Farmer from '/farmer Bazaar Logo.jpeg';
import 'font-awesome/css/font-awesome.min.css'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import {FAQ} from './Faq';
import './FarmerHomePage1.css' 
import { useNavigate } from "react-router-dom";
import VanillaTilt from 'vanilla-tilt';
import { FaHome } from "react-icons/fa";


//header.jsx
export function Header(props) {
  var Register=props.Register;
  const navigate = useNavigate();
  const handleRegisterClick = () => { 
    navigate("/Registration");
  };
  const GotoHome = () => { 
    navigate("/");
  };


    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src={Farmer} alt="Logo" />
                    <span className="logo-textt">Farmers Bazaar</span> 
                </div>
                <div style={{display:"flex",gap:10}}>
                <div className="register-button">
                    <button onClick={GotoHome}><FaHome size={25} style={{margin:0,padding:0}}/> <span className='RemoveHome_when_Phone_View'>Home</span></button>
                </div>

                <div className="register-button">
                    <button onClick={handleRegisterClick}> Register / Login</button>
                </div>
                </div>
            </header>
        </>
    );
}

//cardsection.jsx

export const CardSection = () => {

  useEffect(() => {
    const cards = document.querySelectorAll(".farmercard");
    cards.forEach((card) => {
      VanillaTilt.init(card, {
        max: 5,
        speed: 400, 
      }); 
    });
  });

  return (
    <div className='division'>
    <section className="card-section">
      {/* Card 1 */}
      <div className="farmercard">
        <i className="fa-solid fa-wheat-awn"></i>
        {/* <img src="https://media.istockphoto.com/id/650844854/vector/support-local-farmers-creative-organic-eco-vector-illustration-on-recycled-paper-background.jpg?s=612x612&w=0&k=20&c=X3ElxN605IUKXLnjciHU9QE-K1H9tdMMyR1PC4E8F7Q="/> */}
        <h3>Farm Support</h3>
        <p>Providing essential resources and support for sustainable farming practices.</p>
      </div>

      {/* Card 2 */}
      <div className="farmercard">
        <i className="fa-solid fa-arrows-to-dot"></i>
        <h3>Agri-Products</h3>
        <p>High-quality agricultural products straight from the fields to your doorstep.</p>
      </div>

      {/* Card 3 */}
      <div className="farmercard">
        <i className="fa-solid fa-person-rays"></i>
        <h3>Farmer Empowerment</h3>
        <p>Empowering local farmers with tools, knowledge, and financial support.</p>
      </div>

      {/* Card 4 */}
      <div className="farmercard">
        <i className="fa-solid fa-people-group"></i>
        <h3>Community Engagement</h3>
        <p>Fostering strong relationships between consumers and farmers for mutual growth.</p>
      </div>
    </section>
    </div>
  );
};
//homeimage.jsx

 export function HomeImage() {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    questions: ''
  });

  const [rating, setRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    });
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${contact.name}! We will reach out to you at ${contact.email}.`);
    setContact({
      name: '',
    email: '',
    questions: ''
    })
  };

  // Slick settings for carousel
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true
  };

  return (
    <div className="home-content">
      {/* Paragraph about account creation */}
      <div className="account-info">
        <h2>Create an Account</h2>
        <p>
          Creating an account on our platform is quick and easy. Start by clicking the "Register" button at the top-right corner
          of the page. After providing your basic information, such as name, email, and a secure password, you will receive a
          verification email. Once your email is verified, you can log in and begin exploring the various features and services we offer.
        </p>

        {/* Additional points */}
        <h3>Why Register?</h3>
        <ul>
          <li>Access to exclusive farming resources.</li>
          <li>Personalized dashboard for managing your farm-related tasks.</li>
          <li>Stay updated with the latest trends in agriculture.</li>
          <li>Receive expert advice from agricultural professionals.</li>
        </ul>
      </div>

      {/* Rating Section */}
      <div className="rating-section" id='Ratings'>
        <h3>Rate Our Services</h3>
        <p className="rating-instruction">Please rate our services by clicking on the stars below:</p>
        <div className="star-rating">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fa fa-star ${i < rating ? 'filled' : ''}`}
              onClick={() => handleRating(i + 1)}
            ></i>
          ))}
        </div>
        <p className="rating-feedback">You rated us: {rating} / 5</p>

        {/* Rating feedback based on selected rating */}
        <div className="rating-feedback">
          {rating === 5 && <p className="feedback">🌟 Thank you for the perfect score! We’re thrilled to have your support!</p>}
          {rating === 4 && <p className="feedback">😊 Thank you! We're glad you enjoyed our service. Your feedback helps us improve!</p>}
          {rating === 3 && <p className="feedback">😐 Thank you! We appreciate your input. Let us know how we can do better!</p>}
          {rating === 2 && <p className="feedback">😞 We're sorry to hear that. Please share your thoughts so we can improve!</p>}
          {rating === 1 && <p className="feedback">😡 We apologize for the experience. We're committed to improving, please tell us what went wrong.</p>}
        </div>

        <button className="rate-button" onClick={()=>{alert("Thanks For Giving Rating");setRating(0);}}>Submit Rating</button>
      </div>

      {/* Reviews Section with Slick Carousel */}
      <div className="review-container" id='Reviews'>
        <h3>Reviews from our customers</h3>
        <Slider {...slickSettings}>
          <div className="reviews">
            <h4>Thomson</h4>
            <h5>Organic farmer</h5>
            <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-o"></i>
            <p>'I’ve been purchasing seeds and equipment from this site for the last two years, and I’ve seen nothing but excellent results. Their seeds have consistently outperformed others in the market, and the customer support is always available to help when needed. Highly recommend!'</p>
          </div>
          <div className="reviews">
            <h4>Jane</h4>
            <h5>Vegetable gardener</h5>
            <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-o"></i><i class="fa-regular fa-star"></i>
            <p>'This platform has been a game-changer for my small vegetable garden. The seeds are always fresh, and the planting tips have really helped increase my yield. The tutorials and advice from the community have been invaluable, and I’ve saved so much time using their tools. Great service overall!'</p>
          </div>
          {/* Add more reviews as needed */}
        </Slider>
      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Us Section */}
      <div className="contact-us" id='Contact_Us'>
        <h3>Contact Us</h3>
        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={contact.name} onChange={handleInputChange} required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={contact.email} onChange={handleInputChange} required
              />
            </div>
            <div className="form-group">
              <label htmlFor="questions">Questions:</label>
              <textarea id="questions" name="questions" value={contact.questions} onChange={handleInputChange} rows="4" required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d653.7207329852663!2d82.06740614123737!3d17.093339767491447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1730297406264!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location of Our Business"
            />
          </div>
        </div>
      </div>
      <br/>
    </div>
  );
}
