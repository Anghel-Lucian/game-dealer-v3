import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCategorizedGames, selectLibraryGames } from './librarySlice';
import GamesList from '../../components/GamesList';
import LibraryNav from './LibraryNav';

const LibraryList = ({ match }) => {
  const libraryGames = useSelector(selectLibraryGames);
  const categorizedGames = useSelector(selectCategorizedGames);
  const { category } = match.params;

  const renderedGames = () => {
    if (category) {
      return <GamesList data={categorizedGames[category]} />;
    }

    return <GamesList data={libraryGames} />;
  };

  return (
    <>
      <LibraryNav />
      {renderedGames()}
    </>
  );
};

export default LibraryList;
