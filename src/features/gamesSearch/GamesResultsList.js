import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGames, selectResults } from './gamesSearchSlice';
import { filterCharacters } from '../../app/helpers';
import GamesList from '../../components/GamesList';

const GamesResultsList = ({ match }) => {
  const { query } = match.params;
  const results = useSelector(selectResults);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGames(filterCharacters(query)));
  }, [query]);

  return <GamesList data={results} withStatus={true} />;
};

export default GamesResultsList;
