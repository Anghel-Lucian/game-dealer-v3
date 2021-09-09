import React from 'react';

const Card = ({ gameData }) => {
  return (
    <div className="result-card">
      {/* here a mini img slider */}
      <div className="result-card__meta">
        <div className="result-card__platform-icons">
          <i className="fas fa-xbox"></i>
        </div>
        <div className="result-card__metascore">78</div>
      </div>
      <div className="result-card__title">{gameData.name}</div>
      <div className="result-card__options">
        <button className="btn btn__add-to-library"></button>
        <button className="btn btn__add-to-wishlist"></button>
      </div>
      <div className="result-card__detail">
        <div className="result-card__row">
          <span className="result-card__row--field">Release date:</span>
          <span className="result-card__row--value">{gameData.released}</span>
        </div>
        <div className="result-card__row">
          <span className="result-card__row--field">Genres(one):</span>
          <span className="result-card__row--value">
            {gameData.genres[0].name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
