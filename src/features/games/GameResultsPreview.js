import React from 'react';
import { useSelector } from 'react-redux';
import { selectPreviewResults, selectFetchGamesStatus } from './gamesSlice';
import { Link } from 'react-router-dom';

const GameResultsPreview = () => {
  const preliminaryResults = useSelector(selectPreviewResults);
  const fetchGamesStatus = useSelector(selectFetchGamesStatus);

  const renderedPreviewResults = () => {
    if (fetchGamesStatus === 'succeeded') {
      return (
        <ul className="preliminary-game-results">
          {preliminaryResults.map((gameResult) => {
            return (
              <li key={gameResult.id} className="preliminary-game-result">
                <Link to="/">
                  <h1>{gameResult.name}</h1>
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
      {renderedPreviewResults()}
    </section>
  );
};

export default GameResultsPreview;
