import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGameDetail,
  selectGame,
  selectGameDetailStatus,
} from './displayedGameSlice';

const DisplayedGame = ({ match }) => {
  const { gameSlug } = match.params;
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const gameDetailStatus = useSelector(selectGameDetailStatus);

  useEffect(() => {
    dispatch(fetchGameDetail(gameSlug));
  }, [gameSlug]);

  console.log(game);
  console.log(gameDetailStatus);

  return (
    <section className="game-container">
      <div className="game-container__top">
        <div className="game-container__title">{game.name}</div>
        <div className="game-container__meta">
          <span className="meta__release-date">{game.released}</span>
          <span className="meta__metascore metascore" title="Metascore">
            {game.metacritic}
          </span>
        </div>
        <div className="game-container__user-buttons">
          <button>Add to library</button>
        </div>
      </div>
      <div className="game-container__middle">
        <div className="game-container__detail">
          <div className="detail__description">{game.description}</div>
          <div className="detail__developers">
            Developers: {game.developers}
          </div>
          <div className="detail__publishers">
            Publishers: {game.publishers}
          </div>
          <div className="detail__genres">Genres: {game.genres}</div>
        </div>
        <div className="game-container__images"></div>
      </div>
    </section>
  );
};

export default DisplayedGame;
