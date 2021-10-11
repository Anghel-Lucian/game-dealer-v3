import React from 'react';
import { useSelector } from 'react-redux';

import { selectLibraryGames } from './librarySlice';
import GamesList from '../../components/GamesList';

const LibraryList = () => {
  const libraryGames = useSelector(selectLibraryGames);

  return <GamesList data={libraryGames} />;
};

export default LibraryList;
