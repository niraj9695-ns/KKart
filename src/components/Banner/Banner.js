import React, { useState, useEffect } from "react";
import "./Banner.css";

const Banner = () => {
  const images = [
    require("../../images/dd484f1b19c67712.webp"),
    require("../../images/cf3eceea3f859d00.webp"),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Slide every 2 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="banner-container">
      <div
        className="banner-slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="banner-slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={handlePrev}>
        &lt;
      </button>
      <button className="next-button" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Banner;
