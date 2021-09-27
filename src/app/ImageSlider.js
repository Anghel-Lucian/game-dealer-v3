import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGameScreenshots,
  selectGameScreenshots,
} from '../features/displayedGame/displayedGameSlice';
// import ImageComponent from './ImageComponent';

const ImageSlider = ({ gameSlug }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGameScreenshots(gameSlug));
  }, [gameSlug]);

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
