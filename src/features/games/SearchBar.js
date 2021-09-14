import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  fetchGames,
  emptyPreviewResults,
  changeStatusToIdle,
  changePreviewStatusToIdle,
  changeFullResultsOnly,
} from './gamesSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [timerId, setTimerId] = useState(null);
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
      dispatch(changePreviewStatusToIdle());
      return;
    }
    const timerId = setTimeout(() => {
      dispatch(changeFullResultsOnly(false));
      dispatch(fetchGames(filterCharacters(query)));
    }, 750);

    setTimerId(timerId);

    return () => clearInterval(timerId);
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    clearInterval(timerId);
    dispatch(changeFullResultsOnly(true));
    dispatch(changeStatusToIdle());
    dispatch(fetchGames(filterCharacters(query)));
    dispatch(emptyPreviewResults());
  };

  return (
    <div className="searchbar">
      <form onSubmit={onSubmit}>
        <input
          className="searchbar__input"
          type="text"
          placeholder="Search for a game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
