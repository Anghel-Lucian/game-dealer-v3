import React from 'react';
import { useSelector } from 'react-redux';
import { selectResults, selectStatus } from './gamesSearchSlice';
import GameResultCard from '../../app/GameResultCard';

const GamesResultsList = () => {
  const shownResults = useSelector(selectResults);
  const status = useSelector(selectStatus);

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
