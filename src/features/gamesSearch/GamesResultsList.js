import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGames, selectResults, selectStatus } from './gamesSearchSlice';
import { filterCharacters } from '../../app/helpers';
import GameResultCard from '../../app/GameResultCard';

const GamesResultsList = ({ match }) => {
  const { query } = match.params;
  const shownResults = useSelector(selectResults);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchGames(filterCharacters(query)));
  // }, [query]);

  const renderedGamesResults = () => {
    if (status === 'succeeded') {
      return shownResults.map((gameData) => {
        return <GameResultCard gameData={gameData} key={gameData.id} />;
      });
    }

    if (status === 'loading') {
      return (
        <div className="loading-spinner-container loading-spinner-container__results-list">
          <div className="loading-spinner loading-spinner__results-list"></div>
        </div>
      );
    }

    if (status === 'failed') {
      return (
        <div className="error error__results-list">
          <i className="fas fa-exclamation-triangle error__icon" />
          <span className="error__message">Could not find the game.</span>
        </div>
      );
    }
  };

  return <div className="game-results-list">{renderedGamesResults()}</div>;
};

export default GamesResultsList;
