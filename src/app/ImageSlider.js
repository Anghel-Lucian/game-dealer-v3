import React, { useEffect, useState } from 'react';

const ImageSlider = ({ imagesData }) => {
  console.log(imagesData);
  const [currentImageSrc, setCurrentImageSrc] = useState('');

  useEffect(
    () => (imagesData ? setCurrentImageSrc(imagesData[0].image) : ''),
    [imagesData]
  );

  const renderHoverableElements = () => {
    return imagesData?.map((imageData) => {
      return (
        <li
          className="slider-container__hoverable-element"
          onMouseOver={() => setCurrentImageSrc(imageData.image)}
        ></li>
      );
    });
  };

  return (
    <div className="slider-container">
      <ul className="slider-container__hoverable-elements">
        {renderHoverableElements()}
      </ul>
      <img
        src={currentImageSrc}
        className="slider-container__displayed-image"
      />
    </div>
  );
};

export default ImageSlider;
