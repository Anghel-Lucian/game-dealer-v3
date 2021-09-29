import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchGames,
  selectResults,
  selectFetchingStatus,
} from './gamesSearchSlice';
import { filterCharacters } from '../../app/helpers';
import GameResultCard from '../../app/GameResultCard';
import StatusDisplay from '../../app/StatusDisplay';

const GamesResultsList = ({ match }) => {
  const { query } = match.params;
  const shownResults = useSelector(selectResults);
  const fetchingStatus = useSelector(selectFetchingStatus);
  const dispatch = useDispatch();

  // TODO: fetch the games from here, on route change
  // useEffect(() => {
  //   dispatch(fetchGames(filterCharacters(query)));
  // }, [query]);

  const renderedGamesResults = () => {
    if (fetchingStatus === 'succeeded') {
      return shownResults.map((gameData) => {
        return <GameResultCard gameData={gameData} key={gameData.id} />;
      });
    }

    return (
      <StatusDisplay
        status={fetchingStatus}
        additionalStyleClass="results-list"
        errorMessage="Could not find the game."
      />
    );
  };

  return <div className="game-results-list">{renderedGamesResults()}</div>;
};

export default GamesResultsList;
