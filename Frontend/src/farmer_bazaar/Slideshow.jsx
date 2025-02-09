import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProdectPageCss.css"


// Slide Images
const slideImages = [
  {
    url: 'https://media.licdn.com/dms/image/v2/D5612AQH7TRwvcbGKYA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1729782637847?e=2147483647&v=beta&t=JbMyXVDxQgW8oGmdft2UBLP6NsIwUk9E9ODuFq-5xdc',
    title: 'Farm Fresh Produce',
    description: 'Get the best quality produce directly from farms.',
  },
  {
    url: 'https://agriculturepost.com/wp-content/uploads/2022/12/Farmers-must-make-the-best-of-%E2%80%98farm-to-home-concept-700x400.jpg',
    title: 'Organic Vegetables',
    description: 'Fresh, organic vegetables at your doorstep.',
  },
  {
    url: 'https://www.sattvika.in/content/images/size/w2000/2023/08/WhatsApp-Image-2023-08-17-at-3.23.48-PM.jpeg',
    title: 'Supporting Farmers',
    description: 'Join hands to empower local farmers.',
  },
];

export const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, 
};
  return (
    <div className="slide-container">
      <Slider {...settings}>
        {slideImages.map((slideImage, index) => (
          <div key={index} className="each-slide">
            <div className="slide-image" style={{ backgroundImage: `url(${slideImage.url})` }}>
              <div className="text-overlay">
                <h1>{slideImage.title}</h1>
                <p>{slideImage.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

