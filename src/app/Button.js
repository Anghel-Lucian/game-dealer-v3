import React from 'react';

const Button = ({ addTo, gameSlug, type }) => {
  const onClick = () => {
    console.log(`Game with slug: ${gameSlug}, was added to ${addTo}`);
  };

  return (
    <button
      onClick={onClick}
      className={`btn-add btn-add__${addTo} btn-add__${type}`}
    >
      Add to {addTo}
    </button>
  );
};

export default Button;
