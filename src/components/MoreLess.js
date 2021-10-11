import React, { useState } from 'react';

const MoreLess = ({ shortDescription, fullDescription }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (shortDescription) {
    return (
      <React.Fragment>
        <div
          className="detail__description"
          dangerouslySetInnerHTML={{
            __html: showFullDescription ? fullDescription : shortDescription,
          }}
        ></div>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="btn__toggle-description"
        >
          {showFullDescription ? 'Read less' : 'Read more'}
        </button>
      </React.Fragment>
    );
  } else
    return (
      <div
        className="detail__description"
        dangerouslySetInnerHTML={{
          __html: fullDescription,
        }}
      ></div>
    );
};

export default MoreLess;
