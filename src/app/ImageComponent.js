import React from 'react';
import { useSelector } from 'react-redux';

import { selectGameScreenshots } from '../features/displayedGame/displayedGameSlice';

const ImageComponent = ({ currentImageIndex }) => {
  const images = useSelector(selectGameScreenshots);

  if (images) {
    return (
      <React.Fragment>
        <img
          src={images[currentImageIndex]?.image}
          className="slider-container__displayed-image"
        />
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default ImageComponent;
