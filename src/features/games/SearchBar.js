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
      () => dispatch(fetchGames(filterCharacters(query))),
      500
    );

    setTimerId(timerId);

    return () => clearInterval(timerId);
  }, [query]);

  // TODO: add the functionality so that if the user clicks outside the results preview list it closes

  // TODO: add the functionality of transitioning for the results preview list, now it looks a bit janky

  // FIXME: after you type in the input and immediately press enter, the results will not appear. Instead, the user is required to wait 500 ms and then if they press enter they will finally see the results in the main section. Maybe you could use routing for that, like rawg.io. This happens because the API call is made after 500 ms on typing to show the previews. Another solution is to make two separate API calls: one each time 500ms passes after typing, one when the user submits the form, take into consideration that you need to cancel the previous request or at least its value from appearing in the preview list
  const onSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    // Effect wanted: preview window closes on submit immediately. Effect that took place: the preview window closes immediately but we cancel the request when clearing the timer. I think we still need to make two separate ones
    // clearInterval(timerId);
    // emptying results, results preview component will stop showing
    // put some kind of condition with a parameter so that onSubmit only the big results array is filled
    // dispatch(fetchGames(filterCharacters(query)));

    dispatch(emptyPreviewResults());
    // only show the full results when the user submits the form
    dispatch(fillShownResults());
    // programmatically changing the URL
    // For fixing the bug written above onSubmit
    // history.push(`/games?search=${query}`);
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
