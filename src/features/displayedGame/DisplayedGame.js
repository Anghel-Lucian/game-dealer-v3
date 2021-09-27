import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGameDetail,
  selectGame,
  selectGameDetailStatus,
} from './displayedGameSlice';
import Button from '../../app/Button';
import ImageSlider from '../../app/ImageSlider';

const DisplayedGame = ({ match }) => {
  const { gameSlug } = match.params;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const gameDetailStatus = useSelector(selectGameDetailStatus);

  useEffect(() => {
    dispatch(fetchGameDetail(gameSlug));
  }, [gameSlug]);

  const renderDetailCells = (field, string) => {
    if (string) {
      return (
        <div className="detail__grid__cell">
          <h3 className="cell__title">{field}</h3>
          {string}
        </div>
      );
    } else return null;
  };

  return (
    <section className="game-container">
      <div className="game-container__top">
        <div className="game-container__top__background">
          <img
            src={game.backgroundImage}
            alt={`${gameSlug} background image`}
            className="game-container__top__image"
            onLoad={() => console.log('img finished loading')}
          />
        </div>
        <div className="game-container__content">
          <div className="game-container__meta">
            {game.released ? (
              <span className="meta__release-date">{game.released}</span>
            ) : null}
            {game.metacritic ? (
              <span className="meta__metascore metascore" title="Metascore">
                {game.metacritic}
              </span>
            ) : null}
          </div>
          <div className="game-container__title">{game.name}</div>
          <div className="game-container__user-buttons">
            <Button addTo="library" gameSlug={gameSlug} type="large" />
            <Button addTo="wishlist" gameSlug={gameSlug} type="large" />
          </div>
        </div>
      </div>
      <div className="game-container__middle">
        <div className="game-container__detail">
          {game.shortDescription ? (
            <React.Fragment>
              <div
                className="detail__description"
                dangerouslySetInnerHTML={{
                  __html: showFullDescription
                    ? game.description
                    : game.shortDescription,
                }}
              ></div>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="btn__toggle-description"
              >
                {showFullDescription ? 'Read less' : 'Read more'}
              </button>
            </React.Fragment>
          ) : (
            <div
              className="detail__description"
              dangerouslySetInnerHTML={{
                __html: game.description,
              }}
            ></div>
          )}
          <div className="detail__grid">
            {renderDetailCells('Developers:', game.developers)}
            {renderDetailCells('Publishers:', game.publishers)}
            {renderDetailCells('Genres:', game.genres)}
          </div>
        </div>
        {/* Move data selection to component itself, use selectors */}
        <ImageSlider gameSlug={game.slug} />
      </div>
    </section>
  );
};

export default DisplayedGame;
