import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  fetchGames,
  emptyPreviewResults,
  fillShownResults,
  changeStatusToIdle,
} from './gamesSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [timerId, setTimerId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

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
      dispatch(changeStatusToIdle());
      return;
    }
    const timerId = setTimeout(
      () =>
        dispatch(
          fetchGames({ query: filterCharacters(query), fullResultsOnly: false })
        ),
      750
    );

    setTimerId(timerId);

    return () => clearInterval(timerId);
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    clearInterval(timerId);
    dispatch(
      fetchGames({ query: filterCharacters(query), fullResultsOnly: true })
    );
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
