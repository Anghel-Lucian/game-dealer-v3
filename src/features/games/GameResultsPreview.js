import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectLimitedGamesResults,
  selectFetchGamesStatus,
} from './gamesSlice';
import { Link } from 'react-router-dom';

const GameResultsPreview = () => {
  const gamesResults = useSelector(selectLimitedGamesResults);
  const fetchGamesStatus = useSelector(selectFetchGamesStatus);

  const renderedGamesResults = () => {
    if (fetchGamesStatus === 'succeeded') {
      return (
        <ul className="preliminary-game-results">
          {gamesResults.map((gameResult) => {
            return (
              <li key={gameResult.gameId} className="preliminary-game-result">
                <Link to="/">
                  <h1>{gameResult.external}</h1>
                  <p>{gameResult.cheapest}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }

    if (fetchGamesStatus === 'loading')
      return <div className="loading-spinner">Loading...</div>;

    if (fetchGamesStatus === 'error')
      return (
        <div className="error">
          <i className="fas fa-exclamation-triangle" />
        </div>
      );
  };

  return (
    <section className="preliminary-game-results-list">
      {renderedGamesResults()}
    </section>
  );
};

export default GameResultsPreview;
