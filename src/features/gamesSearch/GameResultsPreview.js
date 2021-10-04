import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchGames,
  selectPreviewResults,
  selectPreviewStatus,
  emptyPreviewResults,
} from './gamesSearchSlice';
import { filterCharacters } from '../../app/helpers';
import StatusDisplay from '../../app/StatusDisplay';

const GameResultsPreview = ({ query }) => {
  const previewResults = useSelector(selectPreviewResults);
  const previewStatus = useSelector(selectPreviewStatus);
  const dispatch = useDispatch();
  const resultsContainer = useRef();

  useEffect(() => {
    if (!query) return;

    const timerId = setTimeout(() => {
      dispatch(fetchGames(filterCharacters(query)));
    }, 500);

    return () => clearInterval(timerId);
  }, [query]);

  // document.addEventListener('click', (e) => {
  //   dispatch(emptyPreviewResults());
  // });

  const renderedPreviewResults = () => {
    // if (previewStatus === 'succeeded') {
    return (
      <ul className="preliminary-game-results__list">
        {previewResults.map((gameResult, i) => {
          console.log(gameResult);
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
    // }

    // return <StatusDisplay status={previewStatus} />;
  };

  return (
    <section className="preliminary-game-results" ref={resultsContainer}>
      {renderedPreviewResults()}
    </section>
  );
};

export default GameResultsPreview;
