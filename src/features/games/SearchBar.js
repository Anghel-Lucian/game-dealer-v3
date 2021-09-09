import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchGames,
  emptyPreviewResults,
  fillShownResults,
} from './gamesSlice';
import GameResultsPreview from './GameResultsPreview';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const filterCharacters = function (string) {
    let modified = [];
    string.split(' ').forEach((stringEl) => {
      modified.push(
        stringEl
          .split('')
          .filter((char) => char.match(/^[a-zA-Z0-9]+$/))
          .join('')
      );
    });

    return modified.join('-');
  };

  useEffect(() => {
    if (!query) {
      dispatch(emptyPreviewResults());
      return;
    }
    const timerId = setTimeout(
      () => dispatch(fetchGames(filterCharacters(query))),
      500
    );

    return () => clearInterval(timerId);
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    // emptying results, results preview component will stop showing
    dispatch(emptyPreviewResults());
    // only show the full results when the user submits the form
    dispatch(fillShownResults());
  };

  return (
    <div className="searchbar">
      <form onSubmit={onSubmit}>
        <div className="searchbar__container">
          <i className="fas fa-search searchbar__icon" />
          <input
            className="searchbar__input"
            type="text"
            placeholder="Search for a game..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>
      <GameResultsPreview />
    </div>
  );
};

export default SearchBar;
