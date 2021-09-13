import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ gameData }) => {
  return (
    <div className="result-card">
      {/* here a mini img slider */}
      {/* <div className="result-card__meta">
        <div className="result-card__platform-icons">
          <i className="fas fa-xbox"></i>
        </div>
        <div className="result-card__metascore">78</div>
      </div> */}
      <Link to="/">
        <div className="result-card__title">{gameData.name}</div>
      </Link>
      <div className="result-card__options">
        {/* I think I need to create a component for these buttons. I want them to dictate if the user adds or removes a game from the library/wishlist, so it will be a bit complex */}
        <button className="btn btn__add-to-library">
          Add to library <i className="fas fa-layer-group" />
        </button>
        <button className="btn btn__add-to-wishlist">
          Add to wishlist <i className="fas fa-gift" />
        </button>
      </div>
      <div className="result-card__detail">
        {gameData.released ? (
          <>
            <div className="result-card__row">
              <span className="result-card__row--field">Release date:</span>
              <span className="result-card__row--value">
                {gameData.released}
              </span>
            </div>
          </>
        ) : null}
        <div className="result-card__row">
          <span className="result-card__row--field">Genres:</span>
          <span className="result-card__row--value">{gameData.genres}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
