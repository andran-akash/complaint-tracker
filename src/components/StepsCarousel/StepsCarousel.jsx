import React, { useState } from "react";
import "./stepscarousel.css";
import Image1 from "../Images/road.jpg";
import Image2 from "../Images/rain_water.jpg";
import Image3 from "../Images/water.jpg";
import Image4 from "../Images/street_lights.jpg";
import Image5 from "../Images/waste_collection.jpg";

const StepsCarousel = () => {
  const images = [Image1, Image2, Image3, Image4, Image5];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="steps-main-container">
      <div className="carousel">
        <img
          className="steps-images"
          src={images[currentImageIndex]}
          alt="images"
        />
        <blockquote className="testimonial">
          <p class="testimonial-text"></p>
          <p class="testimonial-author">Maria de Almeida</p>
          <p class="testimonial-job">Senior Product Manager at EDP Comercial</p>
        </blockquote>

        <button className="steps-btn btn--left" onClick={handlePreviousClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="steps-btn-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="steps-btn btn--right" onClick={handleNextClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="steps-btn-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="steps-dots">
          <button className="steps-dot dot--fill">&nbsp;</button>
          <button className="steps-dot">&nbsp;</button>
          <button className="steps-dot">&nbsp;</button>
          <button className="steps-dot">&nbsp;</button>
          <button className="steps-dot">&nbsp;</button>
        </div>
      </div>
    </div>
  );
};

export default StepsCarousel;
