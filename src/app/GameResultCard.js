import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';

const GameResultCard = ({ gameData }) => {
  return (
    <div className="result-card">
      {/* here a mini img slider */}
      {/* <div className="result-card__meta">
        <div className="result-card__platform-icons">
          <i className="fas fa-xbox"></i>
        </div>
        <div className="result-card__metascore">78</div>
      </div> */}
      <Link to={`/games/${gameData.slug}`}>
        <div className="result-card__title">{gameData.name}</div>
      </Link>
      <div className="result-card__options">
        <Button addTo="library" gameSlug={gameData.slug} type="small" />
        <Button addTo="wishlist" gameSlug={gameData.slug} type="small" />
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

export default GameResultCard;
