import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPreviewResults, selectFetchGamesStatus } from './gamesSlice';
import { Link } from 'react-router-dom';

const GameResultsPreview = () => {
  const preliminaryResults = useSelector(selectPreviewResults);
  const fetchGamesStatus = useSelector(selectFetchGamesStatus);
  const resultsContainer = useRef();

  const renderedPreviewResults = () => {
    if (fetchGamesStatus === 'succeeded') {
      return (
        <ul className="preliminary-game-results__list">
          {preliminaryResults.map((gameResult) => {
            return (
              <li key={gameResult.id} className="preliminary-game-result">
                <Link to="/">
                  <div className="preliminary-game-result__image-container">
                    <img
                      className="preliminary-game-result__image"
                      alt="Game thumbnail"
                      src={gameResult.background_image}
                    />
                  </div>
                  <h1 className="preliminary-game-result__title">
                    {gameResult.name}
                  </h1>
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }

    if (fetchGamesStatus === 'loading')
      return (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      );

    if (fetchGamesStatus === 'error')
      return (
        <div className="error">
          <i className="fas fa-exclamation-triangle error__icon" />
          <span className="error__message">Could not find the game.</span>
        </div>
      );

    // if (user clicks outside of list)
    //   return null;
  };

  return (
    <section className="preliminary-game-results" ref={resultsContainer}>
      {renderedPreviewResults()}
    </section>
  );
};

export default GameResultsPreview;
