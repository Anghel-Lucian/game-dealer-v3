import React from 'react';
import { useSelector } from 'react-redux';
import { selectShownResults } from './gamesSlice';
import GameResultCard from '../../app/GameResultCard';

const GamesResultsList = () => {
  const shownResults = useSelector(selectShownResults);

  const renderedGamesResults = () =>
    shownResults.map((gameData) => {
      return <GameResultCard gameData={gameData} key={gameData.id} />;
    });

  return <div className="game-results-list">{renderedGamesResults()}</div>;
};

export default GamesResultsList;
