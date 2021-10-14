import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';
import ButtonDropdown from './ButtonDropdown';

const GameResultCard = ({ gameData }) => {
  return (
    <div className="result-card">
      <Link to={`/games/${gameData.slug}`}>
        <div className="result-card__title">{gameData.name}</div>
      </Link>
      <div className="result-card__options">
        <ButtonDropdown gameData={gameData} type="small" />
        <Button associatedSlice="wishlist" gameData={gameData} type="small" />
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
