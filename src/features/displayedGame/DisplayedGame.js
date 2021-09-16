import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGameDetail,
  selectGame,
  selectGameDetailStatus,
} from './displayedGameSlice';
import Button from '../../app/Button';

const DisplayedGame = ({ match }) => {
  const { gameSlug } = match.params;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const gameDetailStatus = useSelector(selectGameDetailStatus);

  useEffect(() => {
    dispatch(fetchGameDetail(gameSlug));
  }, [gameSlug]);

  const renderedImages = () => {
    return game.screenshots?.map((img) => {
      return (
        <li>
          <img src={img.image} />
        </li>
      );
    });
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
            Toggle desc
          </button>
          <div className="detail__grid">
            <div className="detail__grid__cell">
              <h3 className="cell__title">Developers:</h3>
              {game.developers}
            </div>
            <div className="detail__grid__cell">
              <h3 className="cell__title">Publishers:</h3>
              {game.publishers}
            </div>
            <div className="detail__grid__cell">
              <h3 className="cell__title">Genres:</h3>
              {game.genres}
            </div>
          </div>
        </div>
        <ul className="game-container__images">{renderedImages()}</ul>
      </div>
    </section>
  );
};

export default DisplayedGame;
