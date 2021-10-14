import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGameDetail,
  selectGame,
  selectFetchingGameDetailStatus,
} from './displayedGameSlice';
import Button from '../../components/Button';
import ButtonDropdown from '../../components/ButtonDropdown';
import ImageSlider from '../../components/ImageSlider';
import StatusDisplay from '../../components/StatusDisplay';
import MoreLess from '../../components/MoreLess';

const DisplayedGame = ({ match }) => {
  const { gameSlug } = match.params;
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const gameDetailStatus = useSelector(selectFetchingGameDetailStatus);

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

  if (gameDetailStatus === 'succeeded' || gameDetailStatus === 'idle')
    return (
      <section className="game-container">
        <div className="game-container__top">
          <div className="game-container__top__background">
            <img
              src={game.backgroundImage}
              alt={`${gameSlug} background image`}
              className="game-container__top__image"
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
              <ButtonDropdown gameData={game} type="large" />
              <Button associatedSlice="wishlist" gameData={game} type="large" />
            </div>
          </div>
        </div>
        <div className="game-container__middle">
          <div className="game-container__detail">
            <MoreLess
              shortDescription={game.shortDescription}
              fullDescription={game.description}
            />
            <div className="detail__grid">
              {renderDetailCells('Developers:', game.developers)}
              {renderDetailCells('Publishers:', game.publishers)}
              {renderDetailCells('Genres:', game.genres)}
            </div>
          </div>
          <ImageSlider />
        </div>
      </section>
    );
  else
    return (
      <StatusDisplay
        status={gameDetailStatus}
        additionalStyleClass="displayed-game"
        errorMessage="Something went wrong when loading the game's page."
      />
    );
};

export default DisplayedGame;
