import React from 'react';
import { useSelector } from 'react-redux';

import GameResultCard from './GameResultCard';
import StatusDisplay from './StatusDisplay';
import { selectFetchingStatus } from '../features/gamesSearch/gamesSearchSlice';

const GamesList = ({ data, withStatus = false }) => {
  const fetchingStatus = useSelector(selectFetchingStatus);

  const renderedGames = () => {
    if (withStatus) {
      if (fetchingStatus === 'succeeded') {
        return data.map((gameData) => (
          <GameResultCard gameData={gameData} key={gameData.id} />
        ));
      }

      return (
        <StatusDisplay
          status={fetchingStatus}
          additionalStyleClass="results-list"
          errorMessage="Could not find the game."
        />
      );
    }

    return data.map((game) => <GameResultCard gameData={game} key={game.id} />);
  };

  return <div className="game-results-list">{renderedGames()}</div>;
};

export default GamesList;
