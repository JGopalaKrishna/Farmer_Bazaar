import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProdectPageCss.css"


// Slide Images
const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    title: 'Farm Fresh Produce',
    description: 'Get the best quality produce directly from farms.',
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    title: 'Organic Vegetables',
    description: 'Fresh, organic vegetables at your doorstep.',
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
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

