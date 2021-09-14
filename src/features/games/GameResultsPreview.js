import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPreviewResults, selectPreviewStatus } from './gamesSlice';
import { Link } from 'react-router-dom';

const GameResultsPreview = () => {
  const preliminaryResults = useSelector(selectPreviewResults);
  const previewStatus = useSelector(selectPreviewStatus);
  const resultsContainer = useRef();

  const renderedPreviewResults = () => {
    if (previewStatus === 'succeeded') {
      return (
        <ul className="preliminary-game-results__list">
          {preliminaryResults.map((gameResult, i) => {
            return (
              <li key={gameResult.id} className="preliminary-game-result">
                {/* link to /games/:gameTitle OR id */}
                <Link to="/">
                  <div className="preliminary-game-result__image-container">
                    <img
                      className="preliminary-game-result__image"
                      alt={`${gameResult.name} thumbnail`}
                      src={gameResult.backgroundImage}
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

    if (previewStatus === 'loading')
      return (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      );

    if (previewStatus === 'failed')
      return (
        <div className="error">
          <i className="fas fa-exclamation-triangle error__icon" />
          <span className="error__message">Could not find the game.</span>
        </div>
      );

    // TODO:
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
