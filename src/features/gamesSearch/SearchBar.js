import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import {
  fetchGames,
  emptyPreviewResults,
  changeFetchingStatusToIdle,
  changePreviewStatusToIdle,
  changeFullResultsOnly,
} from './gamesSearchSlice';
import { filterCharacters } from '../../app/helpers';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [timerId, setTimerId] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   if (!query) {
  //     dispatch(emptyPreviewResults());
  //     dispatch(changePreviewStatusToIdle());
  //     return;
  //   }

  // const timerId = setTimeout(() => {
  //   history.push(`/search/${query}`);
  // });
  // }, []);

  // useEffect(() => {
  //   if (!query) {
  //     dispatch(emptyPreviewResults());
  //     dispatch(changePreviewStatusToIdle());
  //     return;
  //   }
  //   const timerId = setTimeout(() => {
  //     dispatch(changeFullResultsOnly(false));
  //     dispatch(fetchGames(filterCharacters(query)));
  //   }, 750);

  //   setTimerId(timerId);

  //   return () => clearInterval(timerId);
  // }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    clearInterval(timerId);
    history.push(`/search/${query}`);
    dispatch(changeFullResultsOnly(true));
    dispatch(changeFetchingStatusToIdle());
    dispatch(fetchGames(filterCharacters(query)));
    // dispatch(emptyPreviewResults());
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
