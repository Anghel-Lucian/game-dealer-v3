import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  selectPreviewResults,
  selectPreviewStatus,
  emptyPreviewResults,
} from './gamesSearchSlice';
import StatusDisplay from '../../app/StatusDisplay';

const GameResultsPreview = () => {
  const preliminaryResults = useSelector(selectPreviewResults);
  const previewStatus = useSelector(selectPreviewStatus);
  const dispatch = useDispatch();
  const resultsContainer = useRef();

  // document.addEventListener('click', (e) => {
  //   dispatch(emptyPreviewResults());
  // });

  const renderedPreviewResults = () => {
    if (previewStatus === 'succeeded') {
      return (
        <ul className="preliminary-game-results__list">
          {preliminaryResults.map((gameResult, i) => {
            return (
              <li key={gameResult.id} className="preliminary-game-result">
                <Link to={`/games/${gameResult.slug}`}>
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

    return <StatusDisplay status={previewStatus} />;
  };

  return (
    <section className="preliminary-game-results" ref={resultsContainer}>
      {renderedPreviewResults()}
    </section>
  );
};

export default GameResultsPreview;
