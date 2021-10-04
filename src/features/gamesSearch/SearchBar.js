import React, { useState } from 'react';
import { useHistory } from 'react-router';

import GameResultsPreview from './GameResultsPreview';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

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

    history.push(`/search/${query}`);
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

      {/* <GameResultsPreview query={query} /> */}
    </div>
  );
};

export default SearchBar;
