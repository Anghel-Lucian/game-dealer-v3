import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectGameScreenshots } from '../features/displayedGame/displayedGameSlice';

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = useSelector(selectGameScreenshots);

  const renderHoverableElements = () => {
    return images?.map((_, i) => {
      return (
        <li
          key={i}
          className="slider-container__hoverable-element"
          onMouseOver={() => setCurrentImageIndex(i)}
        ></li>
      );
    });
  };

  const renderImages = () => {
    return images?.map((imageData, i) => {
      return (
        <img
          key={imageData.image}
          src={imageData.image}
          className={`slider-container__displayed-image ${
            i === currentImageIndex
              ? 'slider-container__displayed-image--visible'
              : ''
          }`}
        />
      );
    });
  };

  return (
    <div className="slider-container">
      <ul className="slider-container__hoverable-elements">
        {renderHoverableElements()}
      </ul>
      {renderImages()}
    </div>
  );
};

export default ImageSlider;
