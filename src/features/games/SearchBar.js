import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTyping, fetchGames, changeTypingValue } from './gamesSlice';
import GameResultsPreview from './GameResultsPreview';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const typing = useSelector(selectTyping);

  useEffect(() => {
    if (!query) return;
    const timerId = setTimeout(() => dispatch(fetchGames(query)), 500);
    dispatch(changeTypingValue(true));

    return () => clearInterval(timerId);
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();

    // TODO: when the preview list unmounts, you need to reset the preliminary results to an empty array, otherwise, the next time you start typing, the old results will appear for a split second
    dispatch(changeTypingValue(false));
  };

  return (
    <div className="searchbar">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {typing ? <GameResultsPreview /> : null}
    </div>
  );
};

export default SearchBar;
